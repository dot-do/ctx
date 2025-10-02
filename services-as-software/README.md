# Services-as-Software

Define services that AI can deliver scalably - services that traditionally required human labor.

## Overview

**Services-as-Software** transforms human-delivered services into software-deliverable services using AI agents, code, and hybrid automation. Map services to **ONET occupations** (skill requirements) and **GDPval tasks** (economic value).

## Core Concept

### Traditional Service Delivery

```
Customer Request
  ↓
Human Worker (hours/days)
  ↓
Manual Delivery
  ↓
Variable Quality
  ↓
Limited Scale
```

### Services-as-Software

```
Customer Request (API/Web)
  ↓
AI Agent (minutes)
  ↓
Automated Delivery
  ↓
Consistent Quality
  ↓
Infinite Scale
```

## Integration Points

**ONET (Occupational Information Network):**
- 1,016 occupations with structured data
- 19,000+ task statements
- Knowledge, Skills, Abilities (KSA) taxonomy
- Map services to occupations for skill requirements

**GDPval (Economic Value Measurement):**
- 1,320 real-world tasks across 44 occupations
- Economic value per task
- Automation potential scoring
- GDP contribution tracking

**.do Platform:**
- Functions: Execute service tasks (code/generative/human/agentic)
- Agents: Autonomous workers for complex services
- Workflows: Multi-step service orchestration
- Marketplace: Services.Delivery for discovery and transactions

## Directory Structure

```
services-as-software/
├── services/          # Service definitions
│   ├── tax-return-preparation.mdx
│   ├── content-writing.mdx
│   ├── customer-support.mdx
│   └── data-entry.mdx
├── tasks/             # Task decomposition (ONET-aligned)
├── deliverables/      # Output specifications
├── quality/           # Standards and SLAs
├── pricing/           # Value and pricing models
├── delivery/          # Execution mechanisms
├── types.ts           # TypeScript interface definitions
└── README.md          # This file
```

## Creating a Service

### Basic Structure

```mdx
---
title: Service Name
tagline: One-line value proposition
description: Detailed service description
category: Professional Services | Creative Services | Business Services
specialty: Specific specialty area
onetCode: "##-####.##"  # ONET occupation code
onetTitle: ONET occupation title
gdpvalTaskId: GDPVAL-XXX-###
estimatedValue: 150  # Economic value per transaction ($)
automationLevel: 0.85  # 0-1 (percentage automated)
deliveryType: automated | agent-driven | human-assisted | fully-managed
turnaroundTime: 24 hours | instant | etc.
pricing:
  model: fixed | hourly | per-unit | subscription | value-based | tiered
  basePrice: 99
  currency: USD
metadata:
  ns: service
  visibility: public | private | unlisted
  status: draft | active | paused | archived
  featured: true | false
tags:
  - tag1
  - tag2
---

# Service Name

Detailed service description...

## Service Overview

What's included, how it works, expected outcomes.

## Pricing

Tiers, add-ons, volume discounts.

## Service Delivery

Execution model (AI/human split), turnaround time, capacity.

## Quality Standards

Accuracy guarantees, SLAs, remediation.

## Integration with ONET

Task mapping, knowledge requirements, automation potential.

## Integration with GDPval

Economic value, productivity gains, market impact.
```

### Example: Tax Return Preparation

See [`services/tax-return-preparation.mdx`](./services/tax-return-preparation.mdx) for a comprehensive example showing:

- **ONET Mapping**: 13-2082.00 (Tax Preparers)
- **GDPval Task**: GDPVAL-TAX-001
- **Automation**: 85% (AI agent + 15% CPA review)
- **Economic Value**: $350 per return
- **Pricing**: Tiered ($49/$99/$199)
- **Quality**: 99.5% accuracy with CPA oversight

## ONET Integration

### Occupation Mapping

Every service should map to an ONET occupation:

```mdx
---
onetCode: "13-2082.00"
onetTitle: Tax Preparers
---

## Integration with ONET

### Tasks Automated

From ONET task list for Tax Preparers (13-2082.00):

1. ✅ **Review financial records** (100% automated)
   - AI extracts data from W-2, 1099, receipts

2. ✅ **Compute taxes owed** (100% automated)
   - tax-calculator.do handles all calculations

3. 🔄 **Prepare tax returns** (85% automated)
   - AI prepares, human CPA reviews

4. ✅ **Check for accuracy** (90% automated)
   - Multi-layer AI validation + spot checks

### Knowledge Requirements

**From ONET Knowledge Scale (1-7):**
- Tax Law: Level 7 (Expert) - ✅ AI trained on latest code
- Mathematics: Level 6 (Advanced) - ✅ Perfect calculations
- Accounting: Level 6 (Advanced) - ✅ GAAP compliant
```

### KSA Analysis

**Knowledge, Skills, Abilities required:**

```typescript
interface ServiceKSA {
  knowledge: [
    { domain: "Tax Law", level: "expert", automated: true },
    { domain: "Accounting", level: "advanced", automated: true }
  ],
  skills: [
    { skill: "Mathematics", level: "advanced", automated: true },
    { skill: "Active Listening", level: "intermediate", automated: false }
  ],
  abilities: [
    { ability: "Deductive Reasoning", level: "advanced", automated: true },
    { ability: "Problem Sensitivity", level: "advanced", automated: false }
  ]
}
```

## GDPval Integration

### Economic Value Measurement

Every service should quantify economic value:

```mdx
## Integration with GDPval

### Economic Value Delivered

**GDPval Task**: GDPVAL-TAX-001
**Occupation**: Tax Preparers (13-2082.00)
**Industry**: Professional Services
**Complexity**: Medium-High

**Value Metrics:**
- Service value to customer: $350 (time + optimization)
- Cost to deliver (traditional CPA): $300
- Cost to deliver (AI): $17
- Value created: $333 net benefit to customer
- Productivity gain: 17.6x vs. traditional

**GDP Contribution:**
- Traditional: 1 CPA serves 200 clients/year
- AI-driven: Same capacity serves 4,700 clients/year
- Productivity multiplier: 23.5x
- Expanded market access: Can serve customers at lower price points
```

### Automation Potential

**GDPval Automation Scoring:**

```
Current Automation: 85%
Theoretical Maximum: 95% (some cases require human judgment)
Achievement Rate: 89% of theoretical max

Breakdown:
- Data collection: 100% automated (OCR, integrations)
- Calculation: 100% automated (perfect accuracy)
- Form preparation: 95% automated (5% human review)
- Complex scenarios: 60% automated (40% CPA expertise)
- Customer communication: 70% automated (30% personalized)
```

## Delivery Mechanisms

### Execution Models

**1. Fully Automated (Code)**
- Deterministic tasks
- Rule-based processing
- No judgment required
- Examples: Data entry, calculations, formatting

**2. AI-Driven (Generative)**
- Content creation
- Analysis and insights
- Pattern recognition
- Examples: Writing, research, summarization

**3. Agent-Driven (Agentic)**
- Multi-step workflows
- Tool use and integrations
- Adaptive decision-making
- Examples: Tax prep, customer support

**4. Human-Assisted (Hybrid)**
- AI handles routine work
- Human reviews quality
- Escalation for edge cases
- Examples: Legal research, financial planning

**5. Fully Managed (Human + AI)**
- White-glove service
- Relationship management
- Complex problem-solving
- Examples: Executive coaching, strategic consulting

### Choosing the Right Model

```
Task Complexity × Judgment Required × Volume
        ↓
Low complexity + No judgment + High volume
        → Fully Automated (Code)

Medium complexity + Some judgment + Medium volume
        → AI-Driven (Generative)

High complexity + Adaptive judgment + Medium volume
        → Agent-Driven (Agentic)

High complexity + Human judgment + Lower volume
        → Human-Assisted (Hybrid)

Very high complexity + Relationship-based + Low volume
        → Fully Managed (Human-led)
```

## Pricing Models

### Fixed Price
Best for standardized services with predictable effort.

```mdx
pricing:
  model: fixed
  basePrice: 99
  currency: USD
```

### Per-Unit
Best for scalable services with variable volume.

```mdx
pricing:
  model: per-unit
  basePrice: 0.10  # per field/item/transaction
  currency: USD
```

### Subscription
Best for ongoing services with continuous value.

```mdx
pricing:
  model: subscription
  basePrice: 499
  currency: USD
  billingCycle: monthly
```

### Tiered
Best for services with multiple complexity levels.

```mdx
pricing:
  model: tiered
  tiers:
    - name: Simple
      price: 49
      features: [...]
    - name: Standard
      price: 99
    - name: Complex
      price: 199
```

### Value-Based
Best for services with measurable ROI.

```mdx
pricing:
  model: value-based
  percentage: 15  # % of value created
  cap: 10000
  floor: 500
```

## Quality Standards

### Accuracy

Define measurable quality targets:

```mdx
quality:
  - name: Accuracy Rate
    target: 99.5
    minimum: 99.0
    unit: percent
    measurement: automated-validation
```

### SLAs

Guarantee service levels:

```mdx
sla:
  uptime: 99.9
  responseTime:
    p95: 200  # milliseconds
    p99: 500
  support:
    critical: 15 minutes
    high: 2 hours
    normal: 24 hours
```

### Remediation

Define what happens when quality isn't met:

```mdx
remedies:
  - violation: "Accuracy < 99%"
    remedy: "Full refund + free re-work"
  - violation: "Late delivery (>24h)"
    remedy: "50% discount"
```

## Service Examples

### Professional Services

**Tax Preparation** ([details](./services/tax-return-preparation.mdx))
- ONET: 13-2082.00 (Tax Preparers)
- Automation: 85%
- Pricing: $49-$199
- Value: $350 per return

**Legal Research**
- ONET: 23-2011.00 (Paralegals)
- Automation: 70%
- Pricing: $75/hour
- Value: $200/hour savings vs. attorney

### Creative Services

**Content Writing** ([details](./services/content-writing.mdx))
- ONET: 27-3043.00 (Writers and Authors)
- Automation: 90%
- Pricing: $99 per article
- Value: $300 (time savings + quality)

**Graphic Design**
- ONET: 27-1024.00 (Graphic Designers)
- Automation: 75%
- Pricing: $150 per design
- Value: $400 vs. designer

### Business Services

**Customer Support** ([details](./services/customer-support.mdx))
- ONET: 43-4051.00 (Customer Service Reps)
- Automation: 75%
- Pricing: $499/month
- Value: $3,500/month savings

**Data Entry** ([details](./services/data-entry.mdx))
- ONET: 43-9021.00 (Data Entry Keyers)
- Automation: 95%
- Pricing: $0.10 per field
- Value: $0.50 (time + accuracy)

## Market Opportunities

### High-Automation Potential

Services with 80%+ automation potential:

1. **Data Processing**: Data entry, document digitization
2. **Calculation**: Tax prep, accounting, financial analysis
3. **Content**: Writing, translation, transcription
4. **Research**: Market research, competitive analysis
5. **Scheduling**: Calendar management, appointment setting

### Medium-Automation Potential

Services with 50-80% automation:

1. **Customer Service**: Support, sales outreach
2. **Creative Work**: Design, video editing
3. **Analysis**: Business intelligence, reporting
4. **Recruiting**: Candidate sourcing, screening
5. **Marketing**: Social media, email campaigns

### Human-Critical (but AI-Assisted)

Services requiring human judgment but enhanced by AI:

1. **Strategy**: Business planning, consulting
2. **Relationships**: Sales, account management
3. **Complex Problem-Solving**: Engineering, architecture
4. **Creative Direction**: Art direction, branding
5. **Negotiation**: M&A, contracts, partnerships

## Business Impact

### Productivity Gains

**Average across all services:**
- Traditional service time: 2-8 hours
- AI-delivered service time: 5-30 minutes
- **Productivity multiplier: 10-25x**

**Cost Reduction:**
- Traditional service cost: $100-$500
- AI-delivered service cost: $50-$150
- **Cost savings: 50-80%**

### Market Expansion

**New Markets Unlocked:**
- Small businesses previously priced out
- International customers (language/timezone barriers removed)
- Long-tail use cases (economically viable at scale)

**Volume Increase:**
- Traditional provider capacity: 100-500 clients/year
- AI-driven capacity: 10,000-50,000 clients/year
- **100x scale potential**

## Platform Integration

### Services.Delivery Marketplace

List services on Services.Delivery marketplace:

```bash
# Publish service
do service publish --id=tax-prep --marketplace=services.delivery

# Monitor performance
do service metrics --id=tax-prep
```

**Marketplace Features:**
- Service discovery and search
- Provider verification
- Transaction processing
- Reviews and ratings
- Escrow and payments

### API Access

All services accessible via API:

```typescript
import { services } from '@dot-do/services'

// Get service definition
const taxPrep = await services.get('tax-return-preparation')

// Request service delivery
const order = await services.order({
  serviceId: 'tax-return-preparation',
  tier: 'standard',
  inputs: {
    w2Forms: [...],
    deductions: [...]
  }
})

// Track progress
const status = await services.status(order.id)
```

## Tools and Workflows

### Service Designer (Services.Studio)

Create services with natural language:

```
Prompt: "Create a service for AI-powered invoice processing.
        Extract data from invoices, validate against PO, flag discrepancies.
        Target: accounting departments at mid-size companies.
        Pricing: $99/month + $0.50 per invoice."

→ Generates:
  - Service definition MDX
  - ONET occupation mapping
  - Task breakdown
  - Pricing tiers
  - Quality standards
  - Delivery workflow
```

### CLI Commands

```bash
# Create new service
do service create --category=professional --name="Invoice Processing"

# Add ONET mapping
do service onet --code=43-3051.00 --title="Payroll and Timekeeping Clerks"

# Set pricing
do service pricing --model=subscription --base=99

# Validate and publish
do service validate
do service publish
```

## TypeScript Types

Full type definitions in [`types.ts`](./types.ts).

Key interfaces:
- `Service` - Core service entity
- `Task` - Individual task (ONET-aligned)
- `Deliverable` - Customer-facing output
- `QualityStandard` - Quality criteria
- `ServicePricing` - Pricing model
- `ServiceDelivery` - Execution mechanism
- `ServiceSLA` - Service level agreement

## Best Practices

### 1. Start with ONET
- Find relevant occupation
- Review task list
- Identify automation opportunities
- Map knowledge/skills/abilities

### 2. Measure Economic Value
- Calculate traditional cost
- Calculate AI-driven cost
- Quantify time savings
- Document productivity gains

### 3. Design for Quality
- Define measurable standards
- Automate validation where possible
- Plan human review for critical paths
- Guarantee accuracy

### 4. Price for Value
- Understand customer willingness-to-pay
- Price based on value created, not cost
- Offer tiers for different complexity
- Test and iterate

### 5. Scale Thoughtfully
- Start with simple cases
- Add complexity gradually
- Monitor quality metrics
- Maintain human oversight

## Resources

- [ONET Database](https://www.onetonline.org/) - Occupation data
- [GDPval Framework](https://openai.com/index/gdpval/) - Economic value measurement
- [Services.Delivery](https://services.delivery) - Marketplace platform
- [Services.Studio](https://services.studio) - Service designer

---

**Status**: Active - Framework ready for use
**Last Updated**: 2025-10-02
**Maintained By**: Dot Do Platform Team
