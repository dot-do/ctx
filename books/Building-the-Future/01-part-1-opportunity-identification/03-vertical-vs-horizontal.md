# Chapter 3: Vertical vs. Horizontal: Choosing Your Approach

Six months after launch, two AI startups faced a strategic crossroads:

**Company A (LegalAI):** Built AI contract review specifically for software licensing agreements in SaaS companies. 50 customers, $1M ARR, 95%+ accuracy, strong customer satisfaction. But TAM capped at ~$500M (niche market). Investors pushing to expand horizontally to all contract types, all industries.

**Company B (ContractOS):** Built horizontal contract management platform with AI review for all contract types, all industries. 200 customers, $2M ARR, but 75% accuracy (too general), high churn (30%), difficult to differentiate. Investors pushing to focus vertically on one industry.

Company A expanded horizontally. Eighteen months later: 80 customers, $1.5M ARR (slow growth), accuracy dropped to 80% (serving diverse contracts was harder), team spread thin building features for different industries. Struggling.

Company B focused vertically on healthcare. Eighteen months later: 150 customers (in healthcare), $6M ARR, 92% accuracy (specialized domain), became "the healthcare contract solution," raising Series A at strong valuation.

This chapter explores the most important early strategic decision for Services-as-Software founders: vertical-first or horizontal-first?

## The Vertical vs. Horizontal Spectrum

Every Services-as-Software company falls somewhere on the vertical-horizontal spectrum:

**Pure Vertical (Deep Specialist):**
- Single use case in single industry
- Example: "AI legal research for patent litigation lawyers"
- Characteristics: Narrowest market, deepest expertise, fastest trust-building

**Vertical-First (Industry Specialist):**
- Multiple use cases in single industry
- Example: "All legal AI for law firms"
- Characteristics: Moderate market, industry expertise, good trust-building

**Horizontal with Vertical Entry (Wedge Strategy):**
- Start vertical, expand horizontal
- Example: "Contract AI for tech, expanding to all industries"
- Characteristics: Staged expansion, prove model then scale

**Horizontal with Vertical Features:**
- Broad platform with industry customizations
- Example: "Customer support AI for all industries with templates"
- Characteristics: Large market, thin differentiation, slower adoption

**Pure Horizontal (Broad Platform):**
- General-purpose across industries and use cases
- Example: "AI for all professional services"
- Characteristics: Largest market, least differentiation, hardest trust-building

**The Pattern: 90% of successful SaS companies start vertical, then expand horizontal.**

Why? Trust, focus, and speed to product-market fit.

## Why Vertical-First Usually Wins

### Advantage 1: Faster Product-Market Fit

**Vertical approach:**
- Single customer profile with consistent needs
- Same pain points across customers
- Clear feature prioritization
- Fast iteration cycles

Example: Harvey AI focused on BigLaw contract review
- 10 beta customers, all at AmLaw 100 firms
- Same contract types (M&A, NDA, licensing)
- Same quality bar (99%+ accuracy)
- Same buyer (partners and legal ops)
- 6 months to strong PMF

**Horizontal approach:**
- Diverse customer profiles with different needs
- Pain points vary by industry
- Feature requests conflict
- Slow iteration (can't prioritize)

Example: General contract AI
- 50 beta customers across 10 industries
- Different contract types (healthcare, construction, real estate, employment, vendor)
- Different quality requirements
- Different buyers (lawyers, procurement, ops)
- 18 months to weak PMF

**Time to PMF: Vertical is 2-3x faster.**

### Advantage 2: Better AI Quality

AI performs better when trained on specific domain data:

**Vertical AI:**
- Training data from single domain
- Consistent terminology and patterns
- Domain-specific quality metrics
- Can achieve 95%+ accuracy

Example: Medical AI trained on radiology
- Training: 100,000 chest X-rays with expert labels
- Terminology: Consistent medical language
- Quality: 96% accuracy (matches human radiologists)

**Horizontal AI:**
- Training data across domains
- Inconsistent terminology and patterns
- Generic quality metrics
- Typically 70-85% accuracy

Example: General document analysis AI
- Training: Mixed documents (contracts, reports, emails, forms)
- Terminology: Varies wildly by industry
- Quality: 75% accuracy (good enough for some, not others)

**Quality gap: Vertical AI is 10-20 percentage points more accurate.**

### Advantage 3: Easier Trust-Building

Trust is the primary barrier to Services-as-Software adoption. Vertical makes trust easier:

**Vertical trust-building:**
- "We specialize in YOUR specific need"
- Domain expertise signals (terminology, features, case studies)
- Comparable to hiring specialist consultants
- Early adopters become evangelists in tight-knit industry

Example: Legal AI for IP lawyers
- Speaks patent law language
- Features match IP workflow (prior art search, claim analysis)
- Case study from top IP firm
- IP lawyer community trusts it

**Horizontal trust-building:**
- "We work for everyone"
- Generic positioning (hard to differentiate)
- Comparable to hiring generalist (less credibility)
- No tight-knit community to evangelize

**Trust-building time: Vertical is 2-3x faster.**

### Advantage 4: Clearer Go-to-Market

Vertical provides GTM clarity:

**Customer profile:**
- Specific title (e.g., "Legal Operations Directors at AmLaw 100 firms")
- Reachable through specific channels (Legal Ops Association)
- Same buying process (legal, security, procurement)

**Messaging:**
- Specific pain points (reduce outside counsel spending by 40%)
- Industry-specific ROI (cost per contract review)
- Domain-relevant case studies

**Distribution:**
- Industry conferences (LegalTech, Legalweek)
- Industry publications (Law.com, Legal Ops Report)
- Industry influencers and networks

**Horizontal GTM:**
- Generic customer profile ("business professionals")
- Generic channels (LinkedIn, Google ads)
- Generic messaging ("save time with AI")
- Hard to reach any specific audience effectively

**CAC: Vertical is 50-70% lower than horizontal (initially).**

### Advantage 5: Defensibility Through Depth

Vertical specialization creates moats:

**Data moat:**
- Accumulate domain-specific training data
- Each customer improves model for vertical
- Competitors must rebuild dataset

Example: Accounting AI for restaurants
- 1,000 restaurant customers
- Restaurant-specific transactions (POS systems, tips, inventory)
- Chart of accounts specific to restaurants
- New competitor can't match without building same dataset

**Network effects:**
- Value increases as more customers in vertical join
- Benchmarking, best practices, integrations specific to industry

**Brand moat:**
- Become "the [vertical] solution"
- Word-of-mouth within tight-knit industry
- Hard for generalist to displace specialist

**Horizontal defensibility:**
- Data less differentiated (everyone has contracts)
- Weak network effects across industries
- Brand is "one of many"

**Moat strength: Vertical is 3-5x stronger.**

## Why Horizontal Can Work (Sometimes)

Despite advantages of vertical-first, horizontal sometimes wins:

### Scenario 1: You Have Massive Distribution

If you already have 100K+ customers, horizontal makes sense.

**Examples:**
- Intercom building Fin for support (100K+ existing customers)
- GitHub building Copilot (100M+ developers)
- Salesforce building Einstein (150K+ customers)

**Why it works:**
- Can test with existing base
- Trust already established
- Fast feedback loops
- Distribution compensates for lack of focus

**Prerequisite:** You already have the distribution. Building horizontal without it is much harder.

### Scenario 2: The Use Case is Truly Universal

Some professional services are identical across industries:

**Examples:**
- Email writing (same across industries)
- Meeting notes (same across industries)
- Basic customer support (similar patterns)

**Why it works:**
- No domain-specific expertise required
- Quality bar is lower (70% good enough)
- Training data transfers across domains

**Prerequisite:** Use case must be truly universal, not "sort of the same" across industries. Test this assumption carefully.

### Scenario 3: You Have Proprietary Technology Moat

If your AI capability is years ahead, you can afford horizontal approach:

**Examples:**
- Foundation model providers (OpenAI, Anthropic, Google)
- Unique AI architecture or training approach
- Proprietary dataset that's horizontal

**Why it works:**
- Technology advantage compensates for lack of focus
- Can serve multiple verticals before competitors catch up

**Prerequisite:** Your technology advantage must be real and durable (2+ years). Most founders overestimate this.

### Scenario 4: Vertical Markets Are Too Small

If verticals are <$100M SAM each, you may need horizontal:

**Example:**
- AI for municipal government procurement (niche)
- AI for scientific journal editing (niche)
- Each vertical too small for venture-scale outcome

**Why horizontal makes sense:**
- Stack multiple small verticals to reach scale
- Common technology platform across verticals
- Accept slower PMF for larger eventual market

**Trade-off:** Will take longer and cost more capital, but necessary if verticals are too small.

## The Hybrid Approach: Vertical Entry, Horizontal Expansion

Most successful SaS companies use hybrid "bowling pin" strategy:

### Phase 1: Vertical Entry (Year 0-2)

**Focus:** Single industry or use case
**Goal:** Achieve product-market fit, build initial moat
**Metrics:** $2-5M ARR, 95%+ gross retention, strong NPS

Example: Harvey AI
- Started with legal research for BigLaw corporate M&A
- 50-100 customers, $2-3M ARR
- Dominated that niche

### Phase 2: Adjacent Vertical Expansion (Year 2-4)

**Focus:** Expand to adjacent verticals that share technology
**Goal:** Prove expansion playbook, reach $20-50M ARR
**Metrics:** 3-5 verticals, $20-50M ARR

Example: Harvey AI
- Expanded to litigation, IP, tax (adjacent legal practices)
- Then to mid-size law firms (adjacent customer segment)
- $10-20M ARR (estimated)

### Phase 3: Horizontal Platform (Year 4-7)

**Focus:** Build horizontal platform across many verticals
**Goal:** Category leadership, $100M+ ARR
**Metrics:** 10+ verticals, $100M+ ARR, platform effects

Example: (Harvey AI future state)
- All legal work for all firm sizes
- Platform for legal professionals
- $100M+ ARR

### Phase 4: Ecosystem (Year 7+)

**Focus:** Enable others to build on your platform
**Goal:** Dominant platform, $500M+ ARR
**Metrics:** 3rd party integrations, marketplace, API revenue

**Key insight: You can't skip phases.** Start horizontal before achieving vertical PMF = struggling in multiple verticals simultaneously.

## Choosing Your Approach: Decision Framework

### Question 1: Do you have massive distribution?

**Yes (100K+ existing customers):** Horizontal viable
**No:** Vertical-first

### Question 2: Is the use case truly universal?

**Yes (identical across industries):** Horizontal viable
**No (domain expertise required):** Vertical-first

### Question 3: Do you have years-ahead technology moat?

**Yes (proprietary AI capability):** Horizontal viable
**No (using commercial models/tools):** Vertical-first

### Question 4: Are vertical markets large enough?

**Yes ($500M+ per vertical):** Vertical-first
**No (<$500M per vertical):** Consider horizontal or stacking small verticals

### Question 5: What's your founder background?

**Deep domain expertise in one vertical:** Vertical-first (leverage expertise)
**Generalist technical founder:** Vertical-first anyway (focus compensates)
**Platform builder from FAANG:** Horizontal possible but still risky

**Default recommendation for 90% of founders: Start vertical, expand horizontal.**

## Vertical Selection: Which Vertical Should You Pick?

If going vertical-first, which vertical?

### Selection Criteria:

**1. Market size**
- Target $500M-$5B per vertical
- Too small (<$100M) = can't build venture-scale company
- Too large (>$10B) = likely competitive

**2. Your advantage**
- Domain expertise (you worked in the industry)
- Network (you can reach buyers)
- Unique insight (you see problem others don't)

**3. Automation potential**
- 70%+ of work must be automatable
- Clear tasks amenable to AI
- Not primarily relationship-driven

**4. Willingness to pay**
- Currently spending $10K+ per customer
- Clear ROI calculation
- Budget exists (not creating new category)

**5. Regulatory clarity**
- AI permitted with or without human oversight
- Path to compliance clear
- Not waiting on regulatory approval

**6. Competition**
- 0-2 well-funded competitors
- Incumbents slow to respond
- Differentiation possible

### Vertical Scoring:

Score each potential vertical 1-10 on each criterion above:

**50-60 points:** Excellent vertical
**40-49 points:** Good vertical
**30-39 points:** Moderate vertical
**<30 points:** Weak vertical, look elsewhere

### Example: Choosing Between Three Verticals

A founder considering AI for professional services in three verticals:

**Option A: Legal (contract review for tech companies)**
- Market size: 8/10 ($2B)
- Founder advantage: 6/10 (some legal exposure, strong tech network)
- Automation: 9/10 (80% automatable)
- Willingness to pay: 9/10 ($50K+ per customer)
- Regulatory: 6/10 (attorney-client privilege concerns)
- Competition: 5/10 (Harvey AI, others entering)
- **Total: 43/60 (Good)**

**Option B: Accounting (bookkeeping for e-commerce)**
- Market size: 7/10 ($1.5B)
- Founder advantage: 5/10 (no accounting background, some e-commerce network)
- Automation: 10/10 (90% automatable)
- Willingness to pay: 6/10 ($2K per customer)
- Regulatory: 9/10 (minimal barriers)
- Competition: 6/10 (Pilot, Bench, others)
- **Total: 43/60 (Good)**

**Option C: Healthcare (medical coding for practices)**
- Market size: 9/10 ($5B+)
- Founder advantage: 9/10 (former healthcare administrator, strong network)
- Automation: 8/10 (75% automatable)
- Willingness to pay: 8/10 ($20K+ per practice)
- Regulatory: 5/10 (HIPAA compliance required)
- Competition: 8/10 (few AI competitors)
- **Total: 47/60 (Good, highest score)**

**Choice: Option C (healthcare coding)** - Highest total score, founder advantage strongest there.

## Expansion Strategy: When and How to Go Horizontal

Assume you've achieved PMF in initial vertical. When do you expand?

### Readiness Checklist:

Before expanding to second vertical:

- [ ] $3-5M ARR in initial vertical
- [ ] 95%+ gross revenue retention
- [ ] NPS 50+
- [ ] Clear understanding of what made you successful
- [ ] Product/technology platform that can support new vertical
- [ ] Team capacity (not stretched thin)
- [ ] Capital to fund expansion (12-18 month runway)

**Red flag: Expanding to escape weak PMF in first vertical.** This almost never works. Fix PMF in V1 before adding V2.

### Expansion Paths:

**Path 1: Adjacent Use Case (Same Industry)**

Example: Harvey AI
- V1: Legal research
- V2: Contract drafting (same industry, adjacent use case)
- Leverage: Same customers, same GTM

**Pros:**
- Existing customers buy more
- Understand the industry
- Similar buyers and sales process

**Cons:**
- Limited market expansion
- May not prove horizontal viability

**Path 2: Adjacent Industry (Same Use Case)**

Example: Contract AI
- V1: Contract review for tech companies
- V2: Contract review for healthcare companies
- Leverage: Same technology, similar workflow

**Pros:**
- Proves horizontal viability
- Significant market expansion
- Similar tech platform

**Cons:**
- New customer profile
- New GTM channels
- Different domain expertise required

**Path 3: Geographic Expansion**

Example: Pilot.com
- V1: US bookkeeping
- V2: International bookkeeping (UK, Canada, etc.)
- Leverage: Same service, different geography

**Pros:**
- Proven model
- Clear playbook

**Cons:**
- Different regulations
- Different tax systems
- May not provide platform leverage

**Path 4: Customer Segment Expansion**

Example: Harvey AI
- V1: AmLaw 100 (large law firms)
- V2: Mid-size firms (50-250 lawyers)
- Leverage: Same legal work, different segment

**Pros:**
- Same domain expertise
- Similar product
- Large market expansion

**Cons:**
- Different buying process
- Different price points
- Different distribution

**Most common pattern: Adjacent use case (same industry) → Adjacent industry → Multiple industries (platform)**

## Common Mistakes

### Mistake 1: Starting Too Horizontal

"We're AI for all professional services."

**Why it fails:**
- No clear customer profile
- Weak messaging and differentiation
- Slow product-market fit
- High CAC

**Fix:** Pick one vertical, dominate it, then expand.

### Mistake 2: Expanding Too Early

"We have 10 customers in V1, let's add V2."

**Why it fails:**
- PMF not proven in V1
- Resources split across two weak verticals
- Learning slows down
- Burn rate increases without proportional revenue

**Fix:** Don't expand until V1 is clearly working (95%+ retention, NPS 50+, $3-5M ARR).

### Mistake 3: Expanding Too Slowly

"We have $20M ARR in V1, but let's wait to expand."

**Why it fails:**
- Competitors enter adjacent verticals
- Growth slows in single vertical
- Miss horizontal platform opportunity

**Fix:** Once V1 is proven ($5M+ ARR), expand aggressively to adjacent verticals.

### Mistake 4: Choosing Wrong Adjacent Vertical

"V1 is legal for tech, let's do legal for manufacturing next."

**Why it fails:**
- Tech and manufacturing are very different
- Buyers are different
- Little technology leverage

**Fix:** Choose adjacent verticals that share technology, customer profile, or distribution.

### Mistake 5: Platform Too Early

"Let's build a platform that anyone can customize for their vertical."

**Why it fails:**
- Platform without users is worthless
- Platform complexity slows V1 development
- No one knows what platform should include

**Fix:** Build specific solutions first, extract platform later once patterns are clear.

## The Vertical-to-Horizontal Timeline

Typical successful timeline:

**Year 1:** Launch in V1, achieve initial PMF
- Milestone: 20-50 customers, $500K-2M ARR

**Year 2:** Scale V1, begin V2 exploration
- Milestone: 100-200 customers in V1, $3-5M ARR, pilot V2

**Year 3:** Scale V1, launch V2, explore V3
- Milestone: $10-15M ARR across V1+V2

**Year 4:** Scale V1-V3, platform thinking
- Milestone: $25-40M ARR across 3-4 verticals

**Year 5:** Horizontal platform, V4-V6
- Milestone: $60-100M ARR across 5-6 verticals

**Year 6-7:** Category leadership
- Milestone: $150-300M ARR, 8-10+ verticals

**Key insight: 5-7 years from vertical start to horizontal platform leadership.** Shortcuts rarely work.

## Key Takeaways

1. **90% of successful SaS companies start vertical, then expand horizontal.** Trust, focus, and PMF are faster vertical. Horizontal is expansion strategy, not starting point.

2. **Vertical-first advantages: 2-3x faster PMF, 10-20% better AI quality, 50-70% lower CAC, stronger defensibility.** These compound over time.

3. **Horizontal works when: You have massive distribution, truly universal use case, proprietary technology moat, or vertical markets too small.** Most founders don't have these advantages.

4. **The bowling pin strategy: Dominate one vertical, expand to adjacent verticals, build horizontal platform, enable ecosystem.** This is the proven path.

5. **Choose your initial vertical based on: Market size ($500M-5B), your advantage (domain/network), automation potential (70%+), willingness to pay ($10K+), regulatory clarity, limited competition.** Score systematically.

6. **Don't expand until V1 is proven: $3-5M ARR, 95%+ retention, NPS 50+, clear understanding of success factors.** Expanding to escape weak PMF fails.

7. **Expansion paths: Adjacent use case (same industry) → Adjacent industry (same use case) → Geographic → Customer segment.** Choose path that maximizes leverage.

8. **Platform emerges from vertical success, not vice versa.** Build specific vertical solutions first (years 1-3), extract platform later (years 4-5) once patterns are clear.

9. **Timeline: Year 1 = V1 PMF, Year 2 = V1 scale + V2 launch, Year 3-4 = 3-4 verticals, Year 5-7 = horizontal platform.** This is the typical path; shortcuts rarely work.

10. **Common mistakes: Starting too horizontal, expanding too early, expanding too slowly, choosing wrong adjacencies, building platform too early.** Be systematic, not opportunistic.

You've now evaluated your opportunity (Chapter 2) and chosen your strategic approach (vertical vs. horizontal). Next: Building the product—understanding the Services-as-Software technology stack.
