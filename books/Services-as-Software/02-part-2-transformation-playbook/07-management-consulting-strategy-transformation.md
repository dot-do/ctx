# Chapter 7: Management Consulting and Strategy Transformation

In October 2023, McKinsey & Company published a research report that surprised observers: **"Generative AI will transform consulting by 2025, automating 40-60% of junior consultant work."**

Coming from McKinsey—a firm built on the pyramid model where junior analysts do research and build slides while partners focus on client relationships—this was remarkable. McKinsey was predicting its own disruption.

But the real shock came six months later: **Internal data showed AI was already automating 45% of analyst work.**

- **Market research**: 70% faster with AI (20 hours → 6 hours)
- **Financial modeling**: 60% faster (12 hours → 5 hours)
- **Slide generation**: 80% faster (30 hours → 6 hours)
- **Data analysis**: 55% faster (15 hours → 7 hours)

The numbers were better than expected. And McKinsey's clients noticed.

**In Q2 2024, clients started demanding "AI-adjusted rates."** Goldman Sachs negotiated a 25% discount for projects where AI did the heavy lifting. JPMorgan did the same. Within six months, 60% of McKinsey's Fortune 500 clients had renegotiated pricing to reflect AI efficiencies.

**The pyramid was collapsing.**

McKinsey, Bain, and BCG (MBB—the "Big Three" strategy firms) all launched massive AI initiatives in 2023-2024. They had to. Because if they didn't, clients would ask: "Why pay $500K for a strategy project when I can hire two senior consultants and AI tools for $150K?"

This chapter examines the transformation of management consulting and strategy services—a $450 billion market where AI is automating research, analysis, and content creation while raising hard questions about what value consultants actually provide.

---

## The Management Consulting Market

Management consulting encompasses strategy, operations, and transformation advisory services.

**Market segmentation** ($450B global):

**Strategy Consulting** ($100B):
- **Players**: McKinsey, Bain, BCG, boutique firms (Oliver Wyman, LEK, etc.)
- **Services**: Corporate strategy, M&A strategy, market entry, growth strategy
- **Clients**: Fortune 500, PE firms, startups
- **Rates**: Partners $800-$1,200/hour, managers $400-$600/hour, analysts $200-$350/hour
- **Project size**: $200K-$5M+
- **AI disruption potential**: 60-70%

**Operations Consulting** ($150B):
- **Players**: McKinsey, Bain, BCG, Deloitte, PwC, EY, KPMG
- **Services**: Supply chain optimization, process improvement, cost reduction
- **Clients**: Large enterprises
- **Rates**: $300-$800/hour
- **AI disruption potential**: 70-80% (highly data-driven)

**Technology Consulting** ($100B):
- **Players**: Big Four, Accenture, IBM
- **Services**: Digital transformation, IT strategy, enterprise architecture
- **Clients**: Enterprises
- **Rates**: $250-$600/hour
- **AI disruption potential**: 65-75%

**HR and Organizational Consulting** ($50B):
- **Players**: Mercer, Aon, Korn Ferry, McKinsey
- **Services**: Talent strategy, org design, change management
- **Clients**: Enterprises
- **Rates**: $250-$600/hour
- **AI disruption potential**: 50-60%

**Marketing and Sales Consulting** ($50B):
- **Players**: McKinsey, Bain, specialized boutiques
- **Services**: Go-to-market strategy, pricing, customer experience
- **Clients**: Consumer goods, retail, tech
- **Rates**: $300-$700/hour
- **AI disruption potential**: 65-75%

**Total addressable market**: $450B, growing 6-8% annually

### The Leverage Model

Consulting firms use extreme leverage: one partner supervises 10-20 junior consultants.

**Typical McKinsey economics**:

```yaml
Project: Corporate strategy for Fortune 500 company
Duration: 3 months
Team: 1 partner + 2 managers + 4 analysts

Hours:
  Partner: 200 hours × $1,000 = $200K
  Managers: 400 hours × $500 = $200K
  Analysts: 1,200 hours × $300 = $360K

Total: $760K
Cost to firm:
  Partner: $100K (salary prorated)
  Managers: $60K
  Analysts: $90K
  Overhead: $50K
  Total cost: $300K

Profit: $460K (61% margin)
```

**The leverage**: 67% of revenue comes from analysts (the most junior, most automatable work).

**The vulnerability**: When AI can do analyst work at 1/100th the cost, the model breaks.

---

## What AI Can Do Today

Consulting AI crossed critical thresholds in 2023-2024. Let's examine capabilities.

### Market Research and Analysis

**Traditional process**:
- Analyst spends 20-40 hours researching market
- Reads industry reports, company filings, news articles
- Builds Excel models of market size
- Creates slides summarizing findings
- Cost: $6,000-$12,000 (analyst time)
- Time: 1-2 weeks

**AI process** (Crayon, Kompyte, AlphaSense):

```yaml
# AI Market Research Workflow

Query: "Analyze the enterprise SaaS CRM market. Include:
- Market size and growth rate
- Top 5 players and market share
- Competitive dynamics
- Trends and future outlook
- Key success factors"

AI Process (4 hours):

Step 1: Data Collection (30 minutes)
  Sources:
    - Public company filings (Salesforce, Microsoft, Adobe, SAP, Oracle)
    - Industry research reports (Gartner, Forrester, IDC)
    - News articles (past 12 months)
    - Company websites and product pages
    - Job postings (proxy for hiring trends)
    - Social media sentiment

Step 2: Analysis (1 hour)
  - Calculate market size from public data
  - Identify growth trends (YoY, QoQ)
  - Compare competitive positioning
  - Extract key themes from qualitative data
  - Build competitive matrix

Step 3: Synthesis (1 hour)
  - Generate executive summary
  - Create market sizing model (Excel)
  - Build competitive landscape chart
  - Identify strategic implications

Step 4: Slide Generation (1.5 hours)
  - Create 25-slide deck with:
    · Market overview
    · Competitive landscape
    · Trend analysis
    · Strategic recommendations

Total Time: 4 hours (vs. 20-40 hours)
Cost: $50 (API costs) vs. $6,000-$12,000
Quality: 85-90% of human analyst quality
```

**What AI automates**:

```yaml
Data Collection:
  - Web scraping (company websites, job boards)
  - Financial data extraction (10-Ks, earnings calls)
  - News monitoring (past 12-24 months)
  - Social listening (sentiment analysis)
  - Patent analysis (innovation trends)

Analysis:
  - Market sizing (top-down and bottom-up)
  - Growth rate calculations
  - Market share estimates
  - Competitive positioning (2x2 matrices)
  - SWOT analysis
  - Porter's Five Forces

Synthesis:
  - Executive summary generation
  - Strategic implications
  - Recommendations (prioritized)
  - Risk assessment
```

**Performance comparison**:

| Metric | Human Analyst | AI (AlphaSense) | Improvement |
|--------|--------------|-----------------|-------------|
| Time | 20-40 hours | 4-6 hours | 5-10x faster |
| Cost | $6K-$12K | $50-$200 | 30-240x cheaper |
| Sources analyzed | 50-100 documents | 10,000+ documents | 100-200x more |
| Objectivity | Confirmation bias risk | Data-driven | More objective |
| Recency | Manual updates | Real-time | Always current |

### Financial Modeling and Valuation

**Traditional process**:
- Analyst builds financial model in Excel (DCF, comps, precedent transactions)
- Time: 12-20 hours
- Cost: $3,600-$6,000
- Quality: Depends on analyst skill

**AI process** (Causal, Mosaic, Jirav):

```typescript
// Example: AI financial modeling

const model = await causal.build({
  company: "Tech Startup Inc.",
  modelType: "three_statement",  // P&L, balance sheet, cash flow
  projection: "5 years",
  assumptions: {
    revenue: {
      current: 5000000,  // $5M ARR
      growth: [0.5, 0.4, 0.35, 0.30, 0.25],  // 50% YoY declining to 25%
      model: "saas_recurring"
    },
    costs: {
      cogs: 0.25,  // 25% of revenue
      sales_marketing: 0.40,  // 40% of revenue
      rd: 0.25,  // 25% of revenue
      ga: 0.15  // 15% of revenue
    },
    working_capital: {
      dso: 45,  // days sales outstanding
      dpo: 30,  // days payable outstanding
      inventory_days: 0  // SaaS, no inventory
    }
  },
  valuation: {
    method: "dcf",
    wacc: 0.12,  // 12% weighted average cost of capital
    terminal_growth: 0.03,  // 3% perpetual growth
    revenue_multiple_comps: [8, 10, 12]  // Public SaaS comps
  }
})

// AI generates:
// - Full three-statement model (P&L, BS, CF) with 60+ line items
// - DCF valuation with sensitivity analysis
// - Comparable company analysis
// - Precedent transaction analysis
// - Scenario analysis (base, upside, downside)
// - Executive summary with key metrics

console.log(model.valuation)
```

**Output**:

```json
{
  "valuation": {
    "dcf": {
      "enterprise_value": 42500000,
      "equity_value": 39800000,
      "per_share": 19.90
    },
    "comps": {
      "revenue_multiple_low": 40000000,
      "revenue_multiple_mid": 50000000,
      "revenue_multiple_high": 60000000
    },
    "implied_range": {
      "low": 40000000,
      "mid": 47500000,
      "high": 60000000
    }
  },
  "key_metrics": {
    "rule_of_40": 35,  // Growth + Profit Margin = 50% - 15% = 35%
    "ltv_cac": 4.2,
    "payback_period": 8.5,
    "gross_margin": 75,
    "net_dollar_retention": 115
  },
  "scenarios": {
    "base": 47500000,
    "upside_30%_faster_growth": 62000000,
    "downside_churn_doubles": 32000000
  },
  "time": "22 minutes",
  "cost": "$15"
}
```

**What AI automates**:

```yaml
Financial Modeling:
  - Three-statement models (P&L, balance sheet, cash flow)
  - Revenue projections (cohort-based, bottom-up, top-down)
  - Expense forecasting (OpEx categories)
  - Working capital calculations
  - Debt schedules and covenants
  - Scenario analysis (base, upside, downside)

Valuation:
  - DCF (discounted cash flow)
  - Comparable company analysis
  - Precedent transaction analysis
  - LBO (leveraged buyout) models
  - Accretion/dilution analysis (M&A)

Analysis:
  - Sensitivity tables (WACC, growth rates)
  - Break-even analysis
  - Return on investment (ROI)
  - Payback period
  - Unit economics (CAC, LTV, payback)
```

**Performance comparison**:

| Metric | Human Analyst | AI (Causal) | Improvement |
|--------|--------------|-------------|-------------|
| Time | 12-20 hours | 20-40 minutes | 18-60x faster |
| Cost | $3.6K-$6K | $15-$30 | 120-400x cheaper |
| Error rate | 5-10% (Excel errors common) | <1% | 5-10x fewer errors |
| Scenario analysis | 3-5 scenarios | Unlimited | Real-time |
| Updates | Manual | Real-time | Always current |

### Slide Generation and Storytelling

**Traditional process**:
- Analyst spends 30-50 hours building PowerPoint deck
- Creates charts, formats slides, writes executive summary
- Partner reviews and requests revisions (3-5 iterations)
- Total time: 40-70 hours
- Cost: $12K-$21K

**AI process** (Beautiful.ai, Tome, Gamma):

```yaml
# AI Slide Generation

Input: Market research data + financial model + strategic recommendations

AI Generates (6 hours):

Slide 1: Executive Summary
  - Key findings (3-5 bullets)
  - Strategic recommendations
  - Expected impact (quantified)

Slides 2-5: Market Overview
  - Market size and growth
  - Competitive landscape (2x2 matrix)
  - Customer segments
  - Market trends

Slides 6-10: Competitive Analysis
  - Top 5 players (market share chart)
  - Competitive positioning
  - Strengths and weaknesses (SWOT)
  - Strategic implications

Slides 11-15: Financial Analysis
  - Revenue projections (5-year chart)
  - Profitability forecast (P&L waterfall)
  - Cash flow analysis
  - Valuation (DCF and comps)

Slides 16-20: Strategic Recommendations
  - Option 1: Build in-house (pros/cons, financials)
  - Option 2: Acquire competitor (pros/cons, financials)
  - Option 3: Partnership (pros/cons, financials)
  - Recommended path forward

Slides 21-25: Implementation Plan
  - Roadmap (timeline)
  - Resource requirements
  - Key risks and mitigation
  - Success metrics

Total Slides: 25
Total Time: 6 hours (AI generation + human review)
Cost: $100 (AI) + $1,200 (2 hours human review)
vs. Traditional: 40-70 hours, $12K-$21K
Savings: 85-94%
```

**What AI automates**:

```yaml
Content Creation:
  - Executive summaries
  - Situation analysis
  - Strategic options
  - Recommendations
  - Implementation plans

Visual Design:
  - Chart generation (bar, line, pie, waterfall)
  - 2x2 matrices (competitive positioning, BCG matrix)
  - Org charts
  - Timelines and Gantt charts
  - Flowcharts and process diagrams

Formatting:
  - Consistent styling (fonts, colors, spacing)
  - Brand guidelines (client logo, color palette)
  - Slide layouts (title slides, content slides, appendix)
  - Transitions and animations

Quality Control:
  - Spell check
  - Data accuracy validation
  - Citation management
  - Version control
```

### Data Analysis and Insights

**Traditional process**:
- Analyst analyzes client data (sales, operations, financial)
- Builds dashboards in Excel or Tableau
- Identifies trends and anomalies
- Time: 15-30 hours
- Cost: $4,500-$9,000

**AI process** (Hex, Observable, Mode):

```python
# Example: AI data analysis

import ai_analyst

# Connect to client database
data = ai_analyst.connect(
    source="client_crm",
    tables=["sales", "customers", "products", "support_tickets"]
)

# Ask questions in natural language
analysis = ai_analyst.analyze(
    data=data,
    questions=[
        "What are our top 10 customers by revenue?",
        "Which products have highest churn rate?",
        "What customer segments are most profitable?",
        "Are there seasonal trends in sales?",
        "What factors correlate with customer churn?"
    ]
)

# AI automatically:
# 1. Writes SQL queries to extract data
# 2. Performs statistical analysis
# 3. Generates visualizations (charts, dashboards)
# 4. Identifies insights and anomalies
# 5. Creates executive summary

print(analysis.executive_summary)
```

**Output**:

```markdown
# Executive Summary: Customer Analysis

## Key Findings

1. **Revenue Concentration**: Top 10 customers represent 45% of revenue (high risk)
   - Recommendation: Diversify customer base

2. **Product Churn**: Enterprise plan has 18% annual churn (vs. 8% industry avg)
   - Root cause: Lack of onboarding and poor customer success
   - Recommendation: Invest $500K in customer success team (estimated ROI: 3.2x)

3. **Profitable Segments**: Mid-market (50-200 employees) is most profitable
   - LTV:CAC ratio: 5.8x (vs. 3.1x for enterprise)
   - Recommendation: Focus sales and marketing on mid-market

4. **Seasonality**: Q4 sales 40% higher than Q1-Q3 avg
   - Pattern: Budget flush in December
   - Recommendation: Shift sales incentives to Q1-Q3 to smooth revenue

5. **Churn Predictors**: 3 factors correlate with churn (R² = 0.73):
   - Low product usage (<5 sessions/month)
   - No executive sponsor identified
   - Support tickets unresolved >7 days

## Recommended Actions (Prioritized)

[Details...]

Time: 3 hours (AI analysis + human review)
Cost: $50 (AI) + $600 (1 hour human review) = $650
vs. Traditional: 15-30 hours, $4,500-$9,000
Savings: 86-93%
```

---

## The Services-as-Software Consulting Stack

Consulting AI companies have built platforms for different use cases.

### AlphaSense - AI Market Intelligence

**Founded**: 2011 (pre-GPT era, but AI-powered)
**Customers**: 4,000+ enterprises (Goldman Sachs, McKinsey, JPMorgan)
**Revenue**: $200M+ ARR

**How it works**:

```yaml
Technology:
  - Proprietary AI for financial document analysis
  - NLP for extracting insights from text
  - Integration with GPT-4 for synthesis

Data Sources (10M+ documents):
  - Public company filings (10-Ks, 10-Qs, 8-Ks)
  - Earnings call transcripts (20+ years)
  - Broker research reports (Wall Street analysts)
  - News articles and press releases
  - Expert interviews (primary research)

Features:
  1. Search (Google for business intelligence)
  2. Sentiment analysis (positive/negative mentions)
  3. Trend analysis (emerging themes over time)
  4. Competitive intelligence (compare companies)
  5. AI-generated summaries (executive summaries of findings)

Use Cases:
  - Investment research (due diligence)
  - Competitive analysis
  - Market sizing
  - Customer research
  - M&A target screening
```

**Pricing**: $10K-$50K per seat per year (enterprise)

**ROI for consulting firms**:

```yaml
Traditional Research (per project):
  - Analyst time: 30 hours × $300/hour = $9,000
  - Data costs: $1,000 (industry reports)
  - Total: $10,000

With AlphaSense:
  - Analyst time: 8 hours × $300/hour = $2,400
  - AlphaSense cost: $200 (amortized)
  - Total: $2,600

Savings per project: $7,400 (74%)
Projects per year: 50
Annual savings: $370,000
AlphaSense cost: $30,000/year (3 seats)
Net savings: $340,000 (1,133% ROI)
```

### Causal - AI Financial Modeling

**Founded**: 2020
**Customers**: 5,000+ finance teams
**Revenue**: $50M+ ARR

**How it works**:

```yaml
Capability: Build financial models in minutes (vs. days)

Technology:
  - Spreadsheet replacement (no Excel formulas)
  - Natural language modeling ("Revenue grows 30% YoY")
  - AI-powered forecasting
  - Scenario analysis (unlimited scenarios)

Features:
  1. Three-statement models (P&L, BS, CF)
  2. Revenue forecasting (cohort-based, bottoms-up)
  3. Expense planning (headcount, OpEx)
  4. Scenario planning ("What if we raise $10M?")
  5. Valuation (DCF, comps)
  6. Board reporting (auto-generated decks)

Differentiation vs. Excel:
  - 10x faster model building
  - No formula errors
  - Real-time collaboration
  - Auto-updating dashboards
  - Version control
```

**Pricing**: $50-$200 per user per month

### Crayon - AI Competitive Intelligence

**Founded**: 2017
**Customers**: 5,000+ companies
**Revenue**: $75M+ ARR

**How it works**:

```yaml
Capability: Monitor competitors automatically

Technology:
  - Web scraping (competitor websites, social media)
  - AI-powered analysis (what changed, why it matters)
  - Alerts (notify when competitors make moves)

What It Tracks:
  - Website changes (pricing, messaging, features)
  - Product releases
  - Hiring trends (new roles, team growth)
  - Marketing campaigns (ads, content)
  - Customer reviews (G2, Capterra, Trustpilot)
  - News mentions

Features:
  1. Competitive intel feed (real-time updates)
  2. Battlecards (sales enablement: how to win vs. each competitor)
  3. Win/loss analysis (why deals are won or lost)
  4. Market share tracking (estimate based on web traffic, hiring, etc.)

Use Case: Sales teams know exactly how to position against competitors
```

**Pricing**: $1,000-$5,000 per month

---

## What Remains Human

Despite AI's capabilities, certain consulting work remains fundamentally human:

### High-Stakes Strategy

**Example**: Should we acquire our competitor or build organically?

```yaml
AI Can Provide:
  - Financial analysis (DCF, accretion/dilution)
  - Market analysis (market share, synergies)
  - Risk assessment (integration challenges)
  - Scenario modeling (3-5 scenarios)

Humans Required:
  - CEO relationship (trust and influence)
  - Board persuasion (navigating politics)
  - Deal structuring creativity (earnouts, escrows, stock/cash mix)
  - Negotiation strategy (when to walk away)
  - Cultural assessment (will teams integrate well?)

Why Humans:
  - High stakes ($1B+ decision)
  - No "right answer" (trade-offs and judgment)
  - Relationships matter (CEO trusts partner, not AI)
  - Emotional intelligence (reading the room)
```

**Reality**: CEOs pay McKinsey partners $1M-$5M for these engagements—and partners earn it with judgment, not analysis.

### Change Management

**Example**: Implement new operating model across 50,000-person organization

```yaml
AI Can Help:
  - Design new org structure
  - Calculate cost savings
  - Generate implementation plan
  - Create training materials

Humans Required:
  - Stakeholder management (convince executives to support change)
  - Communication strategy (how to message to 50K employees)
  - Resistance management (address fears and concerns)
  - Culture alignment (ensure change fits company values)

Why Humans:
  - People don't trust AI for major life changes (layoffs, role changes)
  - Emotional intelligence required
  - Politics and power dynamics
  - Trust and relationships
```

### Executive Advisory (Confidant Role)

**Example**: CEO considering replacing CFO

```yaml
AI Can't Provide:
  - Judgment on people (is CFO really the problem?)
  - Advice on sensitive matters (how to handle termination)
  - Emotional support (CEO is stressed, needs confidant)
  - Reputation management (how will this look to board?)

Humans Required:
  - Trust relationship (CEO confides in partner)
  - Discretion (highly confidential)
  - Experience-based wisdom (seen this before)
  - Coaching (help CEO navigate emotions)

Why Humans:
  - CEOs need confidants, not algorithms
  - Trust is personal
  - Judgment on people can't be automated
```

---

## Implementation Guide

How should consulting firms adopt AI?

### For Strategy Firms (McKinsey, Bain, BCG)

**Phase 1: Pilot AI Tools (3-6 months)**

```yaml
Goal: Prove AI improves quality and speed without sacrificing client satisfaction

Steps:
  1. Select 3-5 projects for pilot
  2. Deploy AI tools:
     - AlphaSense for market research
     - Causal for financial modeling
     - Beautiful.ai for slide generation
  3. Track metrics:
     - Time savings
     - Cost reduction
     - Quality (partner review scores)
     - Client satisfaction

Success Criteria:
  - 50%+ time savings on analyst work
  - Equal or better quality
  - Client acceptance of AI-augmented deliverables
```

**Phase 2: Firm-Wide Rollout (6-12 months)**

```yaml
Goal: AI-augment all projects

Changes:
  1. Technology:
     - Deploy AI tools to all teams
     - Train consultants on AI platforms
     - Build internal AI capabilities

  2. Pricing:
     - Offer "AI-accelerated engagements" (faster, same price)
     - Or discount 20-30% for AI-heavy projects
     - Or shift to value-based pricing (not hourly)

  3. Staffing:
     - Reduce analyst hiring 40-50%
     - Retain AI-savvy analysts (1 analyst = 3x capacity)
     - Hire AI engineers (new role: optimize AI usage)

Outcomes:
  - Revenue per consultant: +40% (more output per person)
  - Margin: +20% (fewer people, same revenue)
  - Client satisfaction: +25% (faster delivery)
```

**Phase 3: Business Model Transformation (12-24 months)**

```yaml
Goal: Restructure around AI-first delivery

New Model:
  1. Services:
     - AI-powered analysis (70% of work)
     - Human strategic advisory (30% - high-stakes decisions)

  2. Pricing:
     - Subscriptions for ongoing advisory ($50K-$200K/month)
     - Project-based for complex strategy ($200K-$2M)
     - Hourly only for partners ($1,000+/hour)

  3. Organization:
     - Partners: Same (client relationships)
     - Managers: -30% (less need for middle management)
     - Analysts: -60% (AI replaces bulk of work)
     - AI engineers: +50 (new role)

Results:
  - Revenue: -10% (lower prices, but more clients)
  - Margin: +25% (fewer people)
  - Projects per year: +60% (faster delivery)
```

---

## The Future of Consulting

Where is consulting AI headed?

### Trend 1: AI Strategy Partners (2025-2027)

**What**: AI agents that provide strategic advice end-to-end.

**Example**: "Strategy Copilot"

```yaml
CEO: "Should we enter the European market?"

AI Strategy Partner:
  1. Market Analysis (2 hours):
     - European SaaS market size and growth
     - Regulatory requirements (GDPR, data residency)
     - Competitive landscape

  2. Financial Modeling (1 hour):
     - Revenue projections (5 years)
     - Cost estimates (sales, marketing, ops)
     - Break-even analysis

  3. Risk Assessment (1 hour):
     - Currency risk
     - Regulatory risk
     - Execution risk

  4. Strategic Recommendation (30 minutes):
     - Recommended approach: Acquire European competitor
     - Rationale: Faster time to market, local team, lower risk
     - Alternative: Partner with European distributor
     - Next steps: Identify 3-5 acquisition targets

Total Time: 4.5 hours
Cost: $500 (vs. $200K-$500K for McKinsey)
Quality: 80-85% of McKinsey (good enough for most decisions)

Human Partner: For $2M+ acquisitions, bring in human for final judgment
```

### Trend 2: Consulting as a Subscription (2026-2028)

**What**: Ongoing AI-powered strategic advisory (not project-based).

**Model**:

```yaml
Pricing: $10K-$50K per month

What's Included:
  - Unlimited market research
  - Monthly strategy sessions (AI + human)
  - Financial modeling and scenario planning
  - Competitive intelligence monitoring
  - Board deck preparation
  - Quarterly business reviews

Value Prop:
  - Always-on strategic support
  - Proactive insights (AI monitors market trends)
  - Lower cost than project fees
  - Predictable budgeting

Who Buys:
  - Mid-market companies ($100M-$1B revenue)
  - PE-backed portfolio companies
  - Growth-stage startups ($50M+ ARR)
```

### Trend 3: Disaggregation of Consulting (2027-2030)

**What**: Consulting unbundles completely.

**Before**: Hire McKinsey for everything (research, analysis, slides, strategy)

**After**: Buy specialized services à la carte

```yaml
Market Research: AlphaSense, $10K-$50K/year
Financial Modeling: Causal, $2K-$10K/year
Competitive Intelligence: Crayon, $12K-$60K/year
Slide Generation: Beautiful.ai, $1K-$5K/year
Data Analysis: Hex, $5K-$20K/year

Human Consultants (only for):
  - High-stakes strategy ($500K-$5M projects)
  - Change management
  - Executive coaching

Total Cost: $30K-$145K/year (vs. $500K-$2M for full McKinsey engagement)
Savings: 70-95%
```

### Trend 4: Consulting Firms Shrink 50%+ (2028-2030)

**What**: Traditional consulting firms cut headcount dramatically.

**Prediction**:

```yaml
McKinsey (2024):
  - Consultants: 45,000
  - Revenue: $16B
  - Revenue per consultant: $356K

McKinsey (2030):
  - Consultants: 20,000 (-56%)
  - Revenue: $12B (-25%)
  - Revenue per consultant: $600K (+69% leverage)

Why:
  - AI automates 60-70% of analyst and manager work
  - Firms need fewer people for same output
  - Clients pay less but get faster delivery
  - Winners: AI-augmented senior consultants earning more
  - Losers: Junior consultants (jobs eliminated)
```

---

## Conclusion: Consulting in 2030

By 2030, management consulting will be transformed:

**Market size**: $450B → $200B (-56%)

**Structure**:
- **MBB**: 50-60% smaller, focused on high-stakes strategy
- **Big Four**: 40-50% smaller, focused on complex transformation
- **Boutiques**: 70%+ smaller or exited (automated out)
- **AI consulting platforms**: $50B+ market (AlphaSense, Causal, etc.)

**Professionals**:
- Consultants: 1.1M → 500K (-55%)
- AI strategy engineers: 0 → 50K (new roles)
- Senior partners: Stable (AI augments, doesn't replace relationships)

**Clients**:
- Cost: -60% average (from $500K-$2M to $200K-$800K per project)
- Speed: 50-70% faster (weeks instead of months)
- Access: Mid-market can afford consulting (vs. Fortune 500 only)

**The winners**:
1. **AI consulting platforms** (AlphaSense, Causal, Crayon)
2. **AI-native boutiques** (fast, cheap, AI-powered)
3. **Clients** (better, faster, cheaper consulting)
4. **Senior consultants** (AI makes them more productive)

**The losers**:
1. **Traditional firms** (McKinsey, Bain, BCG shrink 50-60%)
2. **Junior consultants** (70-80% of analyst jobs eliminated)
3. **MBA programs** (fewer consulting jobs = less demand)

**The transformation is inevitable.** Consulting is too expensive, too slow, and too pyramid-dependent. AI solves all three problems at 10-100x better economics.

In the next chapter, we'll examine customer support and success services—where AI agents are already resolving 70-80% of tickets autonomously.

---
