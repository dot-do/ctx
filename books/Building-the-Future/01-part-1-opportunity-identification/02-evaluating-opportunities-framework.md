# Chapter 2: Evaluating Opportunities: The Framework

Mark Sullivan had three promising Services-as-Software ideas:

**Idea 1:** AI-powered legal brief writing for litigation lawyers. Large market ($50B), clear pain point (briefs take 20-40 hours), high willingness to pay ($400/hour lawyer time).

**Idea 2:** AI customer support for e-commerce companies. Massive market ($80B), obvious value (24/7 support at fraction of cost), proven demand (Intercom Fin, Ada succeeding).

**Idea 3:** AI financial analysis for investment firms. Smaller market ($5B), but Mark had worked in finance for 10 years—deep domain expertise and personal network.

All three seemed viable. Mark spent two weeks building scoring models, talking to potential customers, and researching competition.

His analysis: **Idea 1 scored 82/100, Idea 2 scored 68/100, Idea 3 scored 71/100.**

He chose Idea 1 (legal briefs) despite having no legal background. The market size and automation potential outweighed his lack of domain expertise. He could hire legal experts; he couldn't create a larger market.

Eighteen months later, he'd built a working product with 5 paying law firms generating $400K ARR. His biggest challenges weren't what he expected:
- Distribution was harder than anticipated (lawyers are conservative)
- Quality requirements were higher (99.5% accuracy vs. 95% he'd assumed)
- Sales cycles were 9 months (not 6 months projected)

But the fundamentals were sound. The opportunity was real. He'd picked correctly.

This chapter provides the systematic framework Mark used—and how you can apply it to evaluate any Services-as-Software opportunity.

## The Opportunity Evaluation Framework

Successful Services-as-Software opportunities share eight characteristics. Evaluate every idea across these dimensions using a weighted scoring system.

### Dimension 1: Market Size (Weight: 15%)

**Question:** Is the serviceable addressable market large enough to build a venture-scale company?

**Why it matters:** Even with perfect execution, you're limited by market size. A $100M market caps your business at $20-50M revenue (20-50% market share). A $10B market can support a $1B+ company.

**How to evaluate:**

**Step 1: Define Total Addressable Market (TAM)**
- All spending on the professional service globally
- Be realistic, not aspirational

Example (Legal contract review):
- All legal services: $1.5T
- Contract-related legal work: ~$300B (20% of legal spend)
- TAM: $300B

**Step 2: Define Serviceable Addressable Market (SAM)**
- Portion amenable to your solution
- Geographic, segment, or technical constraints

Example:
- AI-automatable contract work: $210B (70% of $300B)
- English-speaking markets: $150B (72% of $210B)
- SAM: $150B

**Step 3: Define Serviceable Obtainable Market (SOM)**
- Realistic market share in 5-10 years
- Account for competition, adoption curves, distribution

Example:
- Year 5 market share: 1-2% (typical for category leader)
- SOM: $1.5-3B

**Scoring:**
- **10 points:** SOM $1B+, SAM $10B+
- **8-9 points:** SOM $500M-$1B, SAM $5-10B
- **6-7 points:** SOM $100-500M, SAM $1-5B
- **4-5 points:** SOM $50-100M, SAM $500M-$1B
- **1-3 points:** SOM <$50M, SAM <$500M

**Red flags:**
- Can't articulate clear TAM → SAM → SOM path
- Market size based on "if we get X% of Y" without justification
- Conflating TAM with SOM

**Green flags:**
- Multiple sources validate market size
- Can name 50+ potential customers
- Clear path from initial niche to larger market

### Dimension 2: Automation Potential (Weight: 20%)

**Question:** What percentage of the professional service can AI reliably automate with current technology?

**Why it matters:** This determines your unit economics, competitive advantage, and customer value proposition. 90% automation = 10x cost reduction. 50% automation = 2x cost reduction.

**How to evaluate:**

**Step 1: Task decomposition**
Break the professional service into discrete tasks:

Example (Legal contract review):
1. Read and understand contract (5% of time)
2. Identify standard clauses (15% of time)
3. Check for completeness (10% of time)
4. Flag unusual terms (20% of time)
5. Assess risk and implications (25% of time)
6. Draft redlines and recommendations (20% of time)
7. Client communication (5% of time)

**Step 2: AI capability assessment**
For each task, evaluate AI capability today:

1. Read/understand: 95% (AI excellent at document comprehension)
2. Identify standard clauses: 98% (pattern matching)
3. Check completeness: 90% (checklist-based)
4. Flag unusual terms: 85% (anomaly detection)
5. Assess risk: 70% (requires judgment, context)
6. Draft redlines: 80% (generation with templates)
7. Client communication: 40% (relationship, nuance)

**Step 3: Calculate weighted automation**

Weighted Automation = Σ (Task Time% × AI Capability%)

Example:
(5% × 95%) + (15% × 98%) + (10% × 90%) + (20% × 85%) + (25% × 70%) + (20% × 80%) + (5% × 40%)
= 4.75% + 14.7% + 9% + 17% + 17.5% + 16% + 2%
= **80.95% automation potential**

**Scoring:**
- **10 points:** 80%+ automation potential
- **8-9 points:** 70-80% automation
- **6-7 points:** 60-70% automation
- **4-5 points:** 50-60% automation
- **1-3 points:** <50% automation

**Red flags:**
- Assuming AI can do more than it can (wishful thinking)
- Not accounting for edge cases and exceptions
- Ignoring relationship/communication elements

**Green flags:**
- Conservative estimates validated by experts
- Clear understanding of AI limitations
- Plan for human-in-the-loop for low-confidence cases

**Key insight:** 95% automation is much harder than 85% automation. Last 10-20% often requires disproportionate effort.

### Dimension 3: Customer Pain (Weight: 15%)

**Question:** How desperate are customers for a solution? Is this a vitamin or painkiller?

**Why it matters:** Pain creates urgency. Urgent buyers have shorter sales cycles, higher willingness to pay, and better retention. "Nice to have" features rarely succeed.

**How to evaluate:**

**Pain Severity Matrix:**

**Critical Pain (9-10 points):**
- "We're losing money/customers because of this problem"
- "We've tried everything and nothing works"
- "We're actively seeking alternatives right now"

Examples:
- Law firms losing clients to cheaper alternatives
- E-commerce companies with 24/7 support needs, no affordable solution
- Startups needing bookkeeping but can't afford traditional accountants

**Significant Pain (7-8 points):**
- "This is a major frustration but we've found workarounds"
- "We'd love a better solution but not urgent"
- "We're spending too much but it's manageable"

Examples:
- Developers writing boilerplate code manually
- Marketing teams creating content, process is slow
- Companies doing manual data entry

**Moderate Pain (5-6 points):**
- "This could be better but it's not top priority"
- "We'd try a solution if it was easy and cheap"
- "Minor annoyance, not worth much effort to fix"

Examples:
- Improving existing documentation
- Slightly faster report generation
- Incremental productivity gains

**Low Pain (1-4 points):**
- "This is fine, don't need to change"
- "Not sure this is really a problem"
- "We'd only consider if it was free"

**Validation methods:**

**Quantitative:**
- Survey: "How much does this problem cost you monthly?" ($ estimate)
- Survey: "How urgent is solving this?" (1-10 scale)
- Behavioral: Track what customers pay for workarounds

**Qualitative:**
- Interview: "Walk me through your current process"
- Interview: "What have you tried to solve this?"
- Interview: "What happens if you don't solve this?"

**Scoring based on indicators:**
- **10 points:** Active budget allocated, deadline driven, consequences quantified
- **7-9 points:** Clear pain articulated, seeking solutions, workarounds expensive
- **4-6 points:** Acknowledged pain, but low priority, no active search
- **1-3 points:** Pain not validated or theoretical

**Red flags:**
- Customers say "that would be nice" not "I need that"
- Can't articulate financial impact
- No current spending on the problem
- "I'd use it if it was free" responses

**Green flags:**
- Customers have tried multiple solutions
- Actively budgeting for alternatives
- Can quantify cost of current state
- Unprompted "when can we buy this?"

### Dimension 4: Willingness to Pay (Weight: 15%)

**Question:** How much do customers currently pay for human alternatives?

**Why it matters:** Willingness to pay determines your pricing ceiling and total revenue potential. Can't charge $100K if customers only pay $5K for human alternatives.

**How to evaluate:**

**Step 1: Identify human alternatives**

Example (AI legal research):
- Law firm associates: $200-400/hour
- Legal research services (Westlaw, LexisNexis): $3,000-10,000/seat/year
- Freelance lawyers: $100-200/hour
- In-house legal research time: $150-300/hour (fully loaded)

**Step 2: Calculate annual spend per customer**

Small law firm (10 lawyers):
- 5 lawyers × $5,000/year Westlaw = $25,000/year
- 500 hours research × $250/hour = $125,000/year
- Total: $150,000/year on legal research

**Step 3: Determine your price positioning**

AI solutions typically price at 30-70% of human alternatives:

- **30-40%:** Aggressive, adoption-focused pricing
  - Your price: $45-60K/year
  - Customer saves: $90-105K/year (60-70% reduction)

- **50-60%:** Balanced, value-capture pricing
  - Your price: $75-90K/year
  - Customer saves: $60-75K/year (40-50% reduction)

- **60-70%:** Premium, differentiation pricing
  - Your price: $90-105K/year
  - Customer saves: $45-60K/year (30-40% reduction)

**Step 4: Calculate Customer Lifetime Value (LTV)**

LTV = (Annual Contract Value × Gross Margin) / Churn Rate

Example:
- ACV: $75,000
- Gross Margin: 85%
- Annual Churn: 10%
- LTV = ($75,000 × 0.85) / 0.10 = **$637,500**

**Scoring:**
- **10 points:** Current spend $100K+/year per customer, LTV $500K+
- **8-9 points:** Current spend $50-100K/year, LTV $250-500K
- **6-7 points:** Current spend $10-50K/year, LTV $50-250K
- **4-5 points:** Current spend $1-10K/year, LTV $10-50K
- **1-3 points:** Current spend <$1K/year, LTV <$10K

**Red flags:**
- Customers don't currently pay for the service (free alternatives)
- Can't articulate pricing relative to alternatives
- Assuming customers will pay more for AI than for humans
- Conflating "price I want to charge" with "price customers will pay"

**Green flags:**
- Clear benchmark pricing from human alternatives
- Multiple customer segments at different price points
- Customers actively seeking cost reduction
- Pricing validated through customer interviews

### Dimension 5: Competitive Landscape (Weight: 10%)

**Question:** How crowded is the market? How fast are incumbents responding?

**Why it matters:** First movers build trust and distribution advantages. Latecomers face steep CAC, commoditization, and feature parity challenges.

**How to evaluate:**

**Competitor Categories:**

**1. AI-Native Competitors**
- Startups building similar AI solutions
- Direct competition for same customers

Assessment:
- Count active competitors (fundraising, revenue, customers)
- Evaluate their traction (ARR, customer count, funding)
- Understand differentiation (better AI, better UX, vertical focus)

**2. Incumbent SaaS/Software**
- Established software companies adding AI features
- Have distribution advantage but may have technical debt

Assessment:
- Are they actively building AI features?
- How quickly are they moving?
- Quality of their AI implementation?

**3. Professional Services Incumbents**
- Traditional firms (law firms, accounting firms, consultancies)
- Leverage trust and relationships but higher cost structure

Assessment:
- Are they adopting AI internally?
- Are they offering AI-powered services?
- Speed of transformation?

**4. Foundation Model Providers**
- OpenAI, Anthropic, Google building vertical solutions
- Massive resources and technology advantage

Assessment:
- Are they targeting your vertical?
- Enterprise GTM or consumer?
- Partnership opportunities?

**Competitive Intensity Scoring:**

**Low Intensity (9-10 points):**
- 0-1 AI-native competitors
- Incumbents not responding
- No foundation model provider vertical solutions

**Moderate Intensity (6-8 points):**
- 2-4 AI-native competitors
- Some incumbent response (pilots, partnerships)
- Foundation models experimenting

**High Intensity (3-5 points):**
- 5-10 AI-native competitors
- Incumbents actively building
- Foundation models have offerings

**Saturated (1-2 points):**
- 10+ AI-native competitors
- Incumbents have competitive AI offerings
- Foundation models dominant in space

**Positioning evaluation:**

For each competitor, assess:
- **Funding:** How much capital have they raised?
- **Traction:** Reported ARR, customer count
- **Differentiation:** What's their unique value proposition?
- **Weaknesses:** Where are they vulnerable?

**Scoring:**
- **10 points:** No direct competitors, clear opening
- **7-9 points:** 1-2 competitors, differentiation possible
- **4-6 points:** 3-5 competitors, crowded but viable
- **1-3 points:** 6+ competitors, late to market

**Red flags:**
- Assuming you can "out-execute" 10 competitors
- Ignoring incumbent advantages (brand, distribution)
- Underestimating foundation model provider speed
- "There are no competitors" (there always are)

**Green flags:**
- Clear differentiation from existing competitors
- Competitors validate market but haven't achieved dominance
- Weak incumbent response despite opportunity
- Partnerships possible with complementary players

### Dimension 6: Regulatory Barriers (Weight: 10%)

**Question:** Do regulations prohibit, restrict, or permit AI autonomy in this domain?

**Why it matters:** Regulations can be moats (protect you from competition) or walls (prevent you from building). Must understand before committing.

**Regulatory Risk Assessment:**

**Low Risk (9-10 points):**
- No specific regulations on AI in this domain
- Self-regulation or industry standards
- Early adopter advantage

Examples:
- Content creation
- General business software
- Internal productivity tools

**Manageable Risk (7-8 points):**
- Some regulations but AI with human oversight permitted
- Compliance requirements but not prohibitive
- May need certifications (SOC 2, ISO)

Examples:
- Customer support (can use AI with human escalation)
- Code development (no specific regulations)
- HR and recruiting (EEOC compliance, bias audits)

**Moderate Risk (5-6 points):**
- Significant regulations requiring compliance
- Human-in-the-loop likely required
- May need professional licensing/partnership

Examples:
- Financial advice (RIA registration, fiduciary duties)
- Accounting (CPA involvement for audits, tax filing)
- Healthcare (HIPAA compliance, physician oversight)

**High Risk (3-4 points):**
- Heavy regulation, autonomous AI prohibited
- Professional licensing strictly enforced
- Liability and malpractice concerns

Examples:
- Legal services (unauthorized practice of law)
- Medical diagnosis/treatment (practice of medicine)
- Architecture and engineering (licensed professional stamps)

**Prohibitive Risk (1-2 points):**
- Regulations explicitly prohibit AI autonomy
- No path to compliance
- Regulatory approval process uncertain

**Evaluation checklist:**

- [ ] Identify all applicable regulations (federal, state, international)
- [ ] Determine if AI is explicitly addressed
- [ ] Assess human-in-the-loop requirements
- [ ] Understand licensing needs (do you need CPAs, lawyers, etc.?)
- [ ] Evaluate liability and insurance requirements
- [ ] Research precedent (have regulators approved similar AI?)
- [ ] Consult with regulatory experts

**Scoring:**
- **10 points:** No regulatory barriers
- **7-9 points:** Minor compliance requirements, manageable
- **4-6 points:** Significant regulation, human oversight required
- **1-3 points:** Prohibitive regulations or uncertain path

**Red flags:**
- Assuming regulations don't apply to you
- "We'll figure out compliance later"
- Ignoring professional licensing requirements
- Building first, asking permission later in heavily regulated space

**Green flags:**
- Clear regulatory path with human oversight
- Precedent of AI adoption in domain
- Regulatory experts on advisory board
- Compliance built into product from day one

### Dimension 7: Distribution Channels (Weight: 10%)

**Question:** How will customers discover and buy your service?

**Why it matters:** Great product + poor distribution = failure. Distribution determines CAC, growth rate, and capital efficiency.

**Distribution Channel Assessment:**

**Product-Led Growth (PLG):**
- Self-serve signup, free tier or trial
- Bottom-up adoption (users choose tools)
- Viral loops and network effects

**Viability for SaS:**
- Works: Developer tools, content creation, simple support use cases
- Doesn't work: Complex enterprise needs, regulated industries

**Scoring:** 2-3 points per viable PLG path (max 10)
- Self-serve trial drives conversions
- Freemium to paid upgrade path
- User invites create virality

**Enterprise Sales:**
- High-touch sales process
- POC/pilot required
- 6-12 month sales cycles

**Viability for SaS:**
- Works: High-value use cases ($100K+ ACV), complex workflows, risk-sensitive
- Doesn't work: Low ACV, simple use cases

**Scoring:** 2-3 points per viable enterprise path
- Executive champion identification
- ROI/business case development
- Professional services to support adoption

**Partnership/Channel Sales:**
- Integrate with existing platforms
- Co-sell with complementary vendors
- White-label for established players

**Viability for SaS:**
- Works: Complement existing workflows, clear integration points
- Doesn't work: Compete with partner's roadmap, unclear value add

**Scoring:** 2-3 points per strong partnership opportunity
- Integration with market leader's platform
- Co-selling agreement with complementary vendor
- White-label opportunity with distribution

**Content/Inbound Marketing:**
- SEO-driven organic discovery
- Thought leadership and education
- Community building

**Viability for SaS:**
- Works: Search volume exists, educational content valued
- Doesn't work: Low search volume, buyers don't research online

**Scoring:** 2-3 points per viable inbound path
- High-volume keywords target buyers
- Thought leadership resonates with audience
- Community exists and is active

**Outbound Sales:**
- Cold outreach (email, calls, LinkedIn)
- Account-based marketing
- Events and conferences

**Viability for SaS:**
- Works: Clear ICP, reachable via outbound
- Doesn't work: Dispersed market, low response rates

**Scoring:** 2-3 points per viable outbound path
- Target accounts clearly identifiable
- Effective messaging validated
- Reasonable response rates

**Channel Scoring:**
- **10 points:** 3+ strong distribution channels (multi-modal GTM)
- **7-9 points:** 2 strong channels
- **4-6 points:** 1 viable channel
- **1-3 points:** No clear distribution path

**Red flags:**
- "We'll figure out distribution once we build the product"
- Assuming PLG will work without viral mechanics
- Relying solely on paid ads (unsustainable CAC)
- No validation of channel viability

**Green flags:**
- Multiple channel testing planned
- Founder has distribution advantage (network, audience)
- Early channel validation (landing page signups, pilot interest)
- Clear path from awareness to purchase

### Dimension 8: Your Advantage (Weight: 5%)

**Question:** Do you have an unfair advantage in this market?

**Why it matters:** Pure execution plays rarely win. Advantage creates defensibility, speeds time to market, and improves odds of success.

**Advantage Types:**

**Domain Expertise (3-4 points):**
- Deep understanding of professional service workflows
- Industry credibility and network
- Ability to evaluate quality and build trust

Examples:
- Former lawyer building legal AI
- Ex-accountant building bookkeeping AI
- Enterprise support manager building support AI

**Distribution (3-4 points):**
- Existing customer base for adjacent products
- Large audience (newsletter, community, social)
- Partnerships with distributors

Examples:
- Intercom building Fin for existing 100K customers
- Creator with 100K newsletter building for audience
- Partnership with incumbent platform

**Technology (2-3 points):**
- Proprietary AI models or training data
- Unique technical capabilities
- AI research talent from top labs

Examples:
- Access to proprietary training data
- Team from OpenAI/Anthropic/Google
- Novel AI architecture or approach

**Multiple Advantages (bonus):**
- Domain + Distribution: 7-8 points
- Domain + Technology: 6-7 points
- Distribution + Technology: 6-7 points
- All three: 9-10 points

**Scoring:**
- **10 points:** 2+ strong advantages (rare)
- **7-9 points:** 1 very strong advantage or 2 moderate advantages
- **4-6 points:** 1 moderate advantage or strong network
- **1-3 points:** No clear advantage

**Red flags:**
- "We'll outwork the competition" (not an advantage)
- "We're passionate" (not enough)
- Advantages are theoretical not demonstrated

**Green flags:**
- Demonstrable advantage (not claimed)
- Multiple advisors/co-founders bringing advantages
- Advantage compounds over time (network effects, data)

## The Complete Scoring Framework

**Weighted Calculation:**

```
Total Score =
  (Market Size × 0.15) +
  (Automation Potential × 0.20) +
  (Customer Pain × 0.15) +
  (Willingness to Pay × 0.15) +
  (Competitive Landscape × 0.10) +
  (Regulatory Barriers × 0.10) +
  (Distribution Channels × 0.10) +
  (Your Advantage × 0.05)
```

**Interpreting Scores:**

**90-100 (Exceptional):**
- Pursue immediately
- Raise capital if needed
- This is a once-in-a-decade opportunity

**80-89 (Excellent):**
- Strong opportunity
- Do deeper diligence on weak dimensions
- Build with confidence

**70-79 (Good):**
- Solid opportunity
- Address weaknesses before fully committing
- May require more capital or time

**60-69 (Moderate):**
- Viable but challenging
- Significant risk in one or more dimensions
- Consider if you have high risk tolerance

**50-59 (Weak):**
- High risk, multiple weaknesses
- Only pursue if you can address gaps
- May want different opportunity

**Below 50 (Poor):**
- Too many challenges
- Look for different opportunity
- Don't pursue

## Worked Example: AI Tax Preparation for SMBs

Let's score a hypothetical opportunity: AI-powered tax return preparation for small businesses.

**1. Market Size (15% weight):**
- TAM: $50B (small business tax prep in US)
- SAM: $30B (businesses $1-10M revenue, automatable)
- SOM: $300M-600M (1-2% in 5 years)
- **Score: 8/10** (SAM $10B+, SOM $300M+)
- **Weighted: 1.2**

**2. Automation Potential (20% weight):**
- Task breakdown:
  - Data gathering: 20% (90% automatable via OCR, integrations)
  - Data entry: 30% (95% automatable)
  - Tax calculation: 25% (98% automatable with tax engine)
  - Deduction identification: 15% (80% automatable)
  - Tax strategy: 5% (40% automatable, needs human expertise)
  - Review and filing: 5% (90% automatable)
- Weighted automation: 88%
- **Score: 10/10** (80%+ automation)
- **Weighted: 2.0**

**3. Customer Pain (15% weight):**
- SMBs hate tax prep, anxious about accuracy
- Currently expensive ($2-5K for accountant)
- Urgent (quarterly estimated taxes, annual filing)
- But not critical (can DIY with TurboTax Business if desperate)
- **Score: 8/10** (significant pain, clear urgency)
- **Weighted: 1.2**

**4. Willingness to Pay (15% weight):**
- Current spend: $2,000-5,000/year per SMB
- AI pricing at 50% of human: $1,000-2,500/year
- Annual Contract Value: $1,500 (midpoint)
- LTV (at 85% margin, 15% churn): $8,500
- **Score: 6/10** (ACV $1-10K range, LTV reasonable)
- **Weighted: 0.9**

**5. Competitive Landscape (10% weight):**
- AI competitors: 3-4 (Pilot.com does some tax, startups emerging)
- Incumbents: TurboTax, H&R Block adding AI features
- Not yet saturated but competition building
- **Score: 6/10** (moderate competition)
- **Weighted: 0.6**

**6. Regulatory Barriers (10% weight):**
- Tax prep allowed with PTIN (preparer tax ID)
- No CPA required for preparation (vs. audit)
- IRS allows e-filing by software
- Liability manageable with E&O insurance
- **Score: 8/10** (manageable regulations)
- **Weighted: 0.8**

**7. Distribution Channels (10% weight):**
- PLG possible (self-serve tax prep)
- Content marketing (tax advice SEO)
- Partnerships (accounting software, banks)
- Outbound (to SMBs via industry lists)
- **Score: 9/10** (3+ viable channels)
- **Weighted: 0.9**

**8. Your Advantage (5% weight):**
- Hypothetical founder: Former IRS agent (domain expertise)
- Built tax prep software previously (tech + domain)
- Network in accounting industry (distribution)
- **Score: 8/10** (domain + technology + some distribution)
- **Weighted: 0.4**

**Total Score: 8.0/10 = 80/100 (Excellent)**

This is a strong opportunity. High automation potential, clear pain, manageable regulations, multiple distribution channels, and founder advantage offset the moderate competition and mid-range willingness to pay.

**Recommendation:** Pursue with confidence, but monitor competitive landscape closely.

## Red Flags: When NOT to Pursue

Sometimes the scoring reveals an opportunity isn't viable:

**Disqualifying Red Flags:**
- Automation potential <50% (can't deliver 2x+ value improvement)
- No clear distribution channel (CAC will be unsustainable)
- Regulatory prohibition (can't legally operate)
- Market size <$100M SAM (can't build venture-scale company)
- No customer pain validation (won't pay or adopt)

**Major Concerns (proceed with caution):**
- Intense competition (5+ well-funded AI competitors)
- Low willingness to pay (<$100/month per customer)
- No founder advantage (pure execution play)
- Multiple weak dimensions (score <60)

**Minor Concerns (addressable):**
- Emerging competition (can differentiate)
- Moderate regulations (can comply)
- Single distribution channel (can build others)

## Common Pitfalls

**Pitfall 1: Confirmation Bias**

Symptom: Scoring your own idea highly across all dimensions.

Fix: Have someone else score it. Seek disconfirming evidence. Be intellectually honest.

**Pitfall 2: Ignoring Weak Dimensions**

Symptom: "The market size is huge, so competition doesn't matter."

Fix: Weak dimensions often become fatal. Address them or choose different opportunity.

**Pitfall 3: Overweighting Personal Interest**

Symptom: "I'm passionate about this, so it must be a good opportunity."

Fix: Passion is necessary but not sufficient. Score objectively first, then decide if you're passionate enough about good opportunities.

**Pitfall 4: Analysis Paralysis**

Symptom: Scoring 10 opportunities, unable to commit to one.

Fix: Pick top 2-3. Do customer validation. Commit to one within 30 days.

## Taking Action

Once you've scored an opportunity:

**Score 80+:** Start building immediately. This is exceptional.

**Score 70-79:** Do deeper validation:
- 20 customer interviews
- Competitive product testing
- Regulatory consultation if needed
- Build if validation confirms

**Score 60-69:** Significant risk, but can de-risk:
- Identify the weak dimensions
- Develop plan to address them
- Re-score after addressing
- Build only if score improves

**Score <60:** Look for different opportunity, or fundamentally change your approach to improve weak dimensions.

## Key Takeaways

1. **Use systematic evaluation, not gut feel.** The Opportunity Scoring Framework across 8 dimensions provides structure and reduces bias.

2. **Weight automation potential highest (20%).** This determines unit economics and competitive advantage. <70% automation is challenging for venture-scale outcomes.

3. **Market size matters, but 1% of $10B beats 10% of $1B.** Think big (SAM) but be realistic about market share (SOM).

4. **Customer pain drives urgency.** Urgent problems have shorter sales cycles and higher willingness to pay. Vitamins rarely succeed; painkillers do.

5. **Distribution often determines success more than product.** 3+ viable channels dramatically improve odds. One channel is risky.

6. **Regulatory barriers can be moats or walls.** Understand before committing. Heavy regulation isn't always bad—it can protect you from competition.

7. **Your unfair advantage is multiplier.** Domain expertise, distribution, or technology—ideally you have two. Zero advantages = pure execution play (high risk).

8. **Scores 80+ are exceptional, 70+ are good, 60+ are moderate risk, <60 are poor.** Be honest. Most ideas score 50-70. That's okay—iterate or find better opportunities.

9. **Weak dimensions often become fatal.** Don't ignore them. A single weak dimension (competition, regulation, distribution) can kill an otherwise strong opportunity.

10. **Validation beats analysis.** Scoring guides decisions but doesn't replace customer conversations. Score to prioritize, validate to confirm.

You now have a systematic framework for evaluating any Services-as-Software opportunity. Next chapter: The vertical vs. horizontal decision—choosing your strategic approach.
