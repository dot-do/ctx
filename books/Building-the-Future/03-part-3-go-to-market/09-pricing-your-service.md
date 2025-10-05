# Chapter 9: Pricing Your Service

In early 2023, two AI content generation startups launched similar products.

**Startup A** priced at $5,000/month (close to human content writer cost):
- Reasoning: "Our AI is as good as a human writer, so we should charge similar prices"
- Result: 5 paying customers in first 6 months, struggled to compete with $40K/year human writers

**Startup B** (Jasper) priced at $99/month:
- Reasoning: "Price low enough that adoption friction is minimal, capture value through volume"
- Result: 100,000+ paying customers within 24 months, $40M+ ARR

**The difference**: Pricing strategy determines adoption velocity, customer segment, and competitive positioning.

This chapter teaches you how to price Services-as-Software to balance adoption and revenue capture.

## Why Services-as-Software Pricing is Different

### Traditional Software vs. Services-as-Software Pricing

**Traditional SaaS:**
- Pricing based on features, seats, usage
- Cost of delivery is negligible (hosting, bandwidth)
- Gross margins: 75-85%
- Value perceived: "Software that makes me more productive"

**Services-as-Software:**
- Pricing anchored to human service cost
- Cost of delivery is significant (LLM API calls, human review)
- Gross margins: 60-90% (depending on automation level)
- Value perceived: "Replacement for expensive human labor"

**Key insight**: SaS customers think "How much am I saving vs. hiring a human?" not "How much is this software worth?"

### The SaS Pricing Equation

```
Customer Value = Cost of Human Alternative - (Cost of SaS + Residual Cost)

Where:
- Cost of Human Alternative: What customer currently pays for human service
- Cost of SaS: Your pricing
- Residual Cost: Remaining work customer must do (reviewing outputs, edge cases)
```

**Example: Legal contract review**
- Human cost: $600 (attorney at $300/hour × 2 hours)
- SaS cost: $50 per contract
- Residual cost: $100 (30 minutes attorney review of AI output)
- **Customer value: $600 - ($50 + $100) = $450 saved per contract**

**Pricing sweet spot**: Charge enough to capture value but low enough that customer saves significantly.

**Rule of thumb**: Price at 30-50% of human alternative for early market. Can increase to 50-70% once established.

## Five Services-as-Software Pricing Models

### Model 1: Per-Transaction Pricing

**What it is**: Charge per task completed (per contract, per blog post, per support ticket)

**Example pricing:**
- Harvey AI: ~$50-$150 per contract reviewed
- Legal research: $25-$50 per query
- Content generation: $10-$30 per blog post

**When to use:**
- Task value varies significantly (simple contract vs. complex M&A agreement)
- Usage is sporadic (not daily)
- Customers want to "try before committing" (low risk—pay for what you use)

**Advantages:**
- Easy to understand pricing (pay per use)
- Low barrier to entry (no monthly commitment)
- Scales naturally with customer value

**Disadvantages:**
- Revenue unpredictability (usage varies month-to-month)
- High CAC payback period (takes time to recoup acquisition cost)
- Harder to forecast revenue

**Pricing strategy:**

**Tier by complexity:**
```
Simple contract review: $50
Standard contract review: $100
Complex M&A review: $300
```

**Volume discounts:**
```
1-10 contracts/month: $100 each
11-50 contracts/month: $80 each (-20%)
51+ contracts/month: $60 each (-40%)
```

**Enterprise packaging:**
```
Unlimited contract reviews: $5,000/month
(Breakeven at 50 reviews/month; average enterprise customer does 60-80)
```

### Model 2: Subscription Tiers

**What it is**: Monthly or annual subscription with usage limits or feature tiers

**Example pricing:**

**Pilot.com (Bookkeeping):**
```
Starter: $1,500/month
- Up to 50 transactions/month
- Monthly financial statements
- Basic tax support

Growth: $3,000/month
- Up to 200 transactions/month
- Monthly financial statements + cash flow forecasting
- Full tax support
- CFO advisory (5 hours/month)

Scale: $6,000/month
- Unlimited transactions
- Weekly financial reporting
- Full tax support + compliance
- CFO advisory (15 hours/month)
```

**When to use:**
- Customers use service regularly (daily/weekly)
- Predictable usage patterns
- Want revenue predictability

**Advantages:**
- Predictable recurring revenue
- Lower churn (monthly commitment creates stickiness)
- Easier financial planning

**Disadvantages:**
- Requires customer to commit before seeing full value
- May leave money on table (heavy users pay same as light users)
- Customer resistance to subscription fatigue

**Pricing strategy:**

**Segment by company size:**
```
Small Business (<20 employees): $500/month
Mid-Market (20-200 employees): $2,000/month
Enterprise (200+ employees): $10,000/month
```

**Segment by usage:**
```
Basic (100 tasks/month): $200/month ($2 per task)
Professional (500 tasks/month): $750/month ($1.50 per task)
Enterprise (2,000 tasks/month): $2,000/month ($1 per task)
```

### Model 3: Freemium

**What it is**: Free tier with limited usage, paid tier for power users

**Example pricing:**

**Jasper (Content Generation):**
```
Free:
- 10,000 words/month
- Basic templates
- GPT-3.5

Starter ($49/month):
- 100,000 words/month
- All templates
- GPT-4
- Brand voice training

Pro ($125/month):
- Unlimited words
- All templates
- GPT-4 + Claude
- Brand voice + SEO tools
- Priority support
```

**When to use:**
- Low marginal cost to serve free users (<$1/user)
- Product is self-serve (no sales team needed)
- Viral or network effects possible
- High volume, low ACV market (prosumers, SMBs)

**Advantages:**
- Low barrier to adoption (free = no friction)
- Large user base for feedback and iteration
- Viral growth potential

**Disadvantages:**
- Free users may never convert (1-5% conversion typical)
- High support burden from free users
- Revenue concentration risk (90% of revenue from 10% of users)

**Conversion optimization:**

**Usage-based triggers:**
- User hits limit (100 tasks/month free → upgrade to 500 tasks)
- User wants premium feature (advanced AI models, integrations)

**Time-based triggers:**
- 30-day free trial → Convert to paid
- Seasonal offers (50% off first month)

**Value realization triggers:**
- User completes 10 tasks → Show ROI calculator ("You've saved 5 hours. Upgrade to save 50 hours/month.")

**Benchmark conversion rates:**
- Free to Paid: 2-5% (typical)
- Free to Paid (high-quality product): 5-10%
- Free to Paid (best-in-class): 10-20%

### Model 4: Value-Based Pricing

**What it is**: Charge based on outcome delivered, not tasks completed

**Example pricing:**

**Recruiting AI:**
```
Pricing: 15% of first-year salary for successful hires
(Human recruiter: 20-25% of first-year salary)

Outcome metric: Only pay if hire stays 90+ days
```

**Sales AI:**
```
Pricing: 5% of closed deals generated by AI
(Human SDR: 10-15% commission + base salary)

Outcome metric: Pay only for deals that close and are attributed to AI
```

**When to use:**
- Clear, measurable outcome (hire made, deal closed, revenue generated)
- Customer risk-averse (only want to pay for results)
- High-value outcomes (>$10K per outcome)

**Advantages:**
- Aligned incentives (you win when customer wins)
- Overcomes adoption resistance (no risk—pay for performance)
- Can charge premium (20-50% of outcome value)

**Disadvantages:**
- Revenue timing unpredictable (outcomes may take months)
- Attribution challenges (did AI really cause the outcome?)
- Requires sophisticated tracking systems

**Implementation challenges:**

**Attribution:**
- How do you know AI generated the outcome?
- Example: If AI surfaces lead and human closes deal, who gets credit?

**Solution**: Hybrid model
```
Base fee: $1,000/month (for platform access)
Success fee: 5% of AI-generated deals (tracked via CRM integration)
```

**Tracking:**
```python
class OutcomeTracker:
    def track_lead(self, lead):
        # Tag AI-sourced leads
        lead.source = "ai_generated"
        lead.ai_score = self.ai_model.score(lead)

    def attribute_deal(self, deal):
        if deal.lead.source == "ai_generated":
            # Check if AI was primary factor
            if deal.lead.ai_score > 0.80:
                return "full_attribution"  # 100% credit to AI
            else:
                return "partial_attribution"  # 50% credit to AI
        else:
            return "no_attribution"
```

### Model 5: Hybrid (Subscription + Usage)

**What it is**: Base subscription + usage-based charges for excess

**Example pricing:**

**Intercom Fin (Customer Support AI):**
```
Base: $0.99 per resolution (pay per use)

OR

Subscription: $1,000/month for 1,500 resolutions
+ $0.50 per additional resolution (50% discount)
```

**When to use:**
- Usage varies significantly across customers
- Want predictable revenue (subscription) while capturing high-value customers (usage)
- Enterprise customers prefer flat fees, SMBs prefer pay-per-use

**Advantages:**
- Revenue predictability from subscriptions
- Capture upside from heavy users
- Flexibility for different customer segments

**Disadvantages:**
- Complex pricing (harder to explain)
- Requires sophisticated billing system
- Can feel "nickel-and-dime" if not communicated well

**Design patterns:**

**Pattern A: Subscription + Overage**
```
$1,000/month for 100 tasks
$12 per additional task
```

**Pattern B: Subscription + Add-Ons**
```
Base: $500/month (core features)
Add-on: $200/month (advanced AI models)
Add-on: $300/month (integrations pack)
Add-on: $100/month (priority support)
```

**Pattern C: Seat + Usage**
```
$50/user/month (unlimited seats)
+ $0.10 per API call
```

## Pricing Strategy Framework

### Step 1: Understand Your Costs

**Calculate Cost to Serve (per task):**

```
Cost per Task = (LLM API Costs + Human Review Costs + Infrastructure + Overhead) / Tasks

Example (Legal Contract Review):
- LLM API: $0.50 (GPT-4o, 10K tokens in + 5K tokens out)
- Human review (10% of tasks): $30 × 0.10 = $3.00
- Infrastructure (vector DB, hosting): $0.20
- Overhead (support, sales): $1.30
Total: $5.00 per contract review
```

**Target gross margin: 70-80%**

```
Price = Cost / (1 - Target Margin)

Example:
Cost = $5.00
Target margin = 75%
Price = $5.00 / (1 - 0.75) = $20.00 minimum
```

**But wait: Also anchor to customer value (human alternative cost).**

### Step 2: Benchmark Against Human Alternative

**Research what customers currently pay:**

**Legal services:**
- Junior attorney: $200-$300/hour
- Senior attorney: $400-$800/hour
- Contract review: 1-3 hours = $200-$2,400

**Accounting services:**
- Bookkeeping: $2,000-$5,000/month (for startups)
- Tax prep: $2,000-$10,000 (one-time)
- CFO services: $10,000-$30,000/month (fractional)

**Content creation:**
- Blog post (1,500 words): $200-$500 (freelancer)
- Content agency: $5,000-$15,000/month (10-20 pieces)

**Customer support:**
- Support agent: $3,000-$5,000/month (fully loaded)
- Support ticket: $5-$15 per ticket (agent time)

**Software development:**
- Junior developer: $70,000-$100,000/year
- Senior developer: $150,000-$200,000/year
- Contractor: $100-$200/hour

### Step 3: Set Initial Pricing (30-50% of Human Cost)

**Early market (first 100 customers):**
- Price at 30-50% of human alternative
- Goal: Minimize adoption friction, maximize learning

**Example: Contract review**
- Human cost: $600 (average)
- Initial SaS price: $180-$300 (30-50%)
- Actual price chosen: $200

**Why start low?**
- Overcome skepticism ("Will AI really work?")
- Build case studies and testimonials
- Learn willingness to pay
- Establish market presence before competitors

### Step 4: Increase Prices Over Time

**As you build trust and prove value:**

**Year 1:** 30-50% of human cost (early adopter discount)
**Year 2:** 50-60% of human cost (gaining traction)
**Year 3+:** 60-80% of human cost (established player)

**Example: Jasper's pricing evolution**

**2021 Launch:**
- Starter: $29/month (40,000 words)
- Pro: $59/month (100,000 words)

**2022 (After PMF):**
- Starter: $49/month (100,000 words)
- Pro: $125/month (unlimited words)

**2023 (Established):**
- Starter: $49/month (100,000 words)
- Pro: $125/month (unlimited words)
- Business: $499/month (unlimited words + team features + brand voice)

**Price increase: 69% on Starter, 112% on Pro over 2 years**

**How to increase without churn:**

**Grandfather existing customers:**
```
"Your current plan stays at $49/month.
New customers pay $69/month.
You're welcome!"
```

**Add value before increasing:**
- Improve quality (85% → 95% accuracy)
- Add features (integrations, advanced AI)
- Better support (24/7 chat)

**Communicate clearly:**
```
Email: "We're updating pricing for new customers starting May 1.

Your price won't change.

Why the increase? We've 2x'd quality and added 10 new features this year.
New customers will pay $99/month (you pay $49). Thanks for being an early supporter!"
```

### Step 5: Segment Pricing by Customer Type

**Different customer segments have different willingness to pay:**

| **Segment** | **Willingness to Pay** | **Price Sensitivity** | **Pricing Model** |
|-------------|----------------------|---------------------|------------------|
| **Individuals/Prosumers** | Low ($10-$50/mo) | High | Freemium or subscription |
| **SMB (<50 employees)** | Medium ($100-$1,000/mo) | Medium | Subscription or usage-based |
| **Mid-Market (50-500)** | High ($1,000-$10,000/mo) | Medium | Subscription with custom tiers |
| **Enterprise (500+)** | Very high ($10,000-$100,000+/mo) | Low | Custom pricing, annual contracts |

**Pricing tiers aligned to segments:**

```
Individual: $49/month
Small Business: $199/month
Mid-Market: $999/month
Enterprise: Custom (typically $5,000-$50,000/month)
```

**What changes across tiers:**

**Compute/Usage limits:**
- Individual: 100 tasks/month
- SMB: 500 tasks/month
- Mid-Market: 2,000 tasks/month
- Enterprise: Unlimited

**Features:**
- Individual: Basic AI, standard support
- SMB: Advanced AI, priority support
- Mid-Market: Advanced AI, integrations, dedicated success manager
- Enterprise: Custom AI training, white-glove service, SLAs, on-prem option

**Support:**
- Individual: Email support (48-hour response)
- SMB: Chat support (24-hour response)
- Mid-Market: Phone support (4-hour response)
- Enterprise: Dedicated Slack channel, named CSM, 1-hour response SLA

### Step 6: Experiment and Iterate

**Pricing is not set-it-and-forget-it.** Continuously test:

**A/B test pricing:**
- Test $49/month vs. $69/month (see impact on conversion)
- Test annual discounts (10% off vs. 20% off)

**Survey willingness to pay:**
```
Survey question: "What would you pay for this service?"

Responses (100 customers):
- $0-$25: 15%
- $25-$50: 40%
- $50-$100: 30%
- $100-$200: 12%
- $200+: 3%

Insight: Price at $50-$75 to capture 70%+ of market.
```

**Monitor metrics:**
- Conversion rate (free → paid)
- Churn rate
- LTV/CAC ratio
- Revenue per customer

**Adjust quarterly:**
- If conversion rate is high (>10%) and churn is low (<3%/month), raise prices
- If conversion rate is low (<2%) and churn is high (>7%/month), lower prices or add value

## Common Pricing Mistakes

### Mistake 1: Pricing Too High (Anchoring to Human Cost)

**Symptom**: Pricing at 80-100% of human cost ("We're as good as humans")

**Why it fails:**
- Customers won't risk switching if savings are minimal
- "Why not just use a human?" resistance

**Fix**: Price at 30-50% of human cost to create obvious value

**Example of failure:**
- Legal AI startup priced at $400/contract review (vs. $600 human)
- Customers: "For $200 savings, I'd rather use a human I trust"
- Sales cycle: 12+ months
- Conversion rate: 5%

**Example of success:**
- Same startup repriced at $150/contract review
- Customers: "75% savings is worth trying"
- Sales cycle: 2-3 months
- Conversion rate: 25%

### Mistake 2: Pricing Too Low (Leaving Money on Table)

**Symptom**: Freemium product where 95% of users stay free forever

**Why it fails:**
- Can't cover CAC
- Business not sustainable

**Example:**
- Content AI with free tier: Unlimited words, all features
- Paid tier: $29/month for... faster generation?
- Conversion rate: 0.5%
- Result: $50K MRR from 10M users (not sustainable)

**Fix**: Make free tier truly limited
```
Free: 10,000 words/month, GPT-3.5, basic templates
Paid: 100,000 words/month, GPT-4, all templates, brand voice, SEO
```

**New conversion rate: 3%**
**New MRR: $300K** from 10M users (sustainable)

### Mistake 3: Complex Pricing (Too Many Tiers)

**Symptom**: 6+ pricing tiers with 20+ features differentiated

**Why it fails:**
- Decision paralysis ("Which tier should I choose?")
- Hard to communicate value

**Example of complexity:**
```
Basic: $49/month - Features A, B, C
Standard: $99/month - Features A, B, C, D, E
Pro: $199/month - Features A, B, C, D, E, F, G
Business: $499/month - Features A-G, plus H, I
Enterprise: Custom - All features plus J, K, L
```

**User reaction**: "I don't understand the difference. I'll just not buy."

**Fix: Simplify to 3 tiers (Good, Better, Best)**
```
Starter: $49/month - For individuals
Pro: $199/month - For teams (10x the value)
Enterprise: Custom - For large companies (white-glove service)
```

**Clear value prop for each tier.**

### Mistake 4: Not Increasing Prices as Value Increases

**Symptom**: Quality improves 2x, features increase 3x, but pricing stays same

**Why it fails**: Leave money on table, signal low value

**Example:**
- AI product launched at $49/month (70% accuracy)
- 2 years later: $49/month (95% accuracy, 10x more features)
- Customers: "If it's still $49, it must not be that valuable"

**Fix**: Increase prices as value increases
```
Year 1: $49/month (70% accuracy)
Year 2: $79/month (85% accuracy, 5 new features)
Year 3: $99/month (95% accuracy, 10 new features)
```

**Grandfather existing customers, but signal value through pricing.**

### Mistake 5: No Annual Plans (Missing LTV Opportunity)

**Symptom**: Only offer monthly subscriptions

**Why it's a mistake:**
- Higher churn (easier to cancel monthly)
- Lower LTV
- Unpredictable cash flow

**Fix: Offer annual plans with 10-20% discount**
```
Monthly: $99/month ($1,188/year)
Annual: $990/year (save $198 - 17% off)
```

**Benefits:**
- Upfront cash
- Lower churn (sunk cost fallacy)
- Predictable revenue

**Conversion to annual:**
- 20-40% of customers choose annual (if discount is 15%+)
- Higher among enterprise (50-70% choose annual)

## Pricing Evolution: From Launch to Scale

### Phase 1: Launch (Months 1-6)

**Pricing goal**: Minimize friction, maximize learning

**Strategy:**
- Price at 30-40% of human alternative
- Simple pricing (1-2 tiers)
- Generous free trial (30 days)
- No annual plans yet

**Example:**
```
Free Trial: 30 days, unlimited usage
Paid: $99/month
```

**Focus**: Get first 50-100 customers, learn willingness to pay

### Phase 2: Early Traction (Months 7-18)

**Pricing goal**: Optimize conversion and retention

**Strategy:**
- A/B test pricing ($99 vs. $149)
- Add second tier (for power users)
- Introduce annual plans (15% discount)
- Increase free trial limits

**Example:**
```
Starter: $99/month (100 tasks)
Pro: $299/month (unlimited tasks)
Annual: 15% discount
```

**Focus**: Reach $1M ARR, improve unit economics

### Phase 3: Growth (Months 19-36)

**Pricing goal**: Maximize revenue and market penetration

**Strategy:**
- Add enterprise tier (custom pricing)
- Increase prices 20-30% (grandfather existing)
- Add usage-based overage fees
- Offer multi-year contracts (20% discount)

**Example:**
```
Starter: $149/month
Pro: $399/month
Enterprise: Custom ($5K-$50K/month)
Annual: 17% discount
2-Year: 20% discount
```

**Focus**: Reach $10M ARR, expand upmarket

### Phase 4: Scale (Year 3+)

**Pricing goal**: Maximize LTV, segment precisely

**Strategy:**
- Segment pricing by vertical (SaaS pricing ≠ e-commerce pricing)
- Volume pricing for large customers
- Platform fees (if building ecosystem)

**Example:**
```
SaaS Plan: $499/month (optimized for SaaS workflows)
E-commerce Plan: $699/month (includes inventory features)
Enterprise: $10K-$100K/month (white-label, custom AI training)
```

**Focus**: $50M+ ARR, category leadership

## Key Takeaways

**1. Anchor to human alternative cost (30-50% initially)**
- Customers think "How much am I saving?" not "How much is software worth?"
- Start at 30-50% of human cost to minimize adoption friction
- Increase to 50-70% as you prove value and build trust

**2. Choose pricing model that fits your market**
- **Freemium**: High-volume, low-touch (prosumers, SMBs)
- **Subscription**: Predictable usage, regular need (bookkeeping, support)
- **Per-transaction**: Variable usage, high-value tasks (legal, recruiting)
- **Value-based**: Clear outcomes, risk-averse customers (recruiting, sales)
- **Hybrid**: Best of both worlds (subscription + usage overages)

**3. Segment pricing by customer type**
- Individual/Prosumer: $10-$50/month
- SMB: $100-$1,000/month
- Mid-Market: $1,000-$10,000/month
- Enterprise: $10,000-$100,000+/month (custom)

**4. Pricing evolves as value increases**
- Year 1: Price low (build trust, learn)
- Year 2: Increase 20-30% (grandfather existing customers)
- Year 3+: Segment by vertical, add enterprise tiers

**5. Keep pricing simple (3 tiers max)**
- Too many options create decision paralysis
- Good, Better, Best (Starter, Pro, Enterprise)
- Clear differentiation between tiers

**6. Offer annual plans (10-20% discount)**
- Lower churn
- Upfront cash
- Higher LTV
- 20-40% of customers choose annual if discount is compelling

**7. Continuously test and iterate**
- A/B test pricing every 6-12 months
- Survey willingness to pay
- Monitor conversion, churn, LTV/CAC
- Adjust based on data, not gut feeling

---

You've now learned how to price Services-as-Software strategically, balancing adoption and revenue capture across different customer segments and growth stages.

**Next**: Chapter 10 covers distribution strategy—how customers discover and adopt your service through product-led growth, enterprise sales, partnerships, content marketing, or hybrid approaches.
