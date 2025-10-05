# Chapter 10: Distribution Strategy

In 2023, two AI coding assistants launched with similar capabilities: Both could generate code, debug, and explain technical concepts. Both achieved 85%+ accuracy on benchmarks.

**Startup A** had superior technology:
- Better code completion (90% vs. 85% acceptance rate)
- Faster inference (0.5s vs. 1.5s)
- More programming languages supported (50 vs. 30)

**Startup A's distribution:**
- Built beautiful website
- Posted on Hacker News
- Waited for developers to find them
- Result: 5,000 users in first year

**GitHub Copilot** had good technology and **100 million developers on GitHub:**
- Launched to existing GitHub users
- One-click installation from IDE
- Free for students and open-source maintainers
- Result: 1.5 million paying users in 18 months

**The difference**: Distribution > Product. GitHub Copilot's built-in distribution to 100M developers beat superior technology without distribution.

This chapter teaches you how to choose and execute the right distribution strategy for Services-as-Software.

## The Five Go-to-Market Strategies

### Strategy 1: Product-Led Growth (PLG)

**What it is**: Users discover, try, and adopt the product without sales involvement. Self-serve, bottom-up adoption.

**Best for:**
- Prosumer and SMB markets
- Clear, immediate value proposition
- Low price point ($10-$500/month)
- Product can be used without onboarding

**Examples:**
- **GitHub Copilot**: Install extension → Start coding → See value immediately
- **Jasper**: Sign up → Generate content → Get results in 30 seconds
- **Grammarly**: Browser extension → Catches errors as you write

**Key PLG motions:**

**1. Viral loops**
```
User tries product → Loves it → Shares with colleagues → Colleagues try → Repeat
```

**Example: Loom**
- User records video with Loom
- Sends link to recipient
- Recipient sees "Recorded with Loom" branding
- Recipient signs up
- **Viral coefficient: 1.3** (each user brings 1.3 new users)

**2. Freemium conversion**
```
Free tier → User hits limit → Upgrades to paid
```

**Example: Jasper**
- Free: 10,000 words/month
- 40% of users hit limit within first month
- 3-5% convert to paid ($49-$125/month)

**3. Usage-based triggers**
```
Track usage → When user hits threshold → Show upgrade prompt
```

**Example:**
```javascript
if (user.tasks_completed > 50 && user.plan === 'free') {
  showUpgradePrompt({
    message: "You've completed 50 tasks! Upgrade to Pro for unlimited tasks.",
    cta: "Upgrade Now",
    offer: "50% off first month"
  })
}
```

**PLG Requirements:**

**Product must be:**
- **Self-explanatory**: User understands value without demo
- **Fast time-to-value**: See results in minutes, not weeks
- **Low friction**: Sign up with email, no credit card required for trial
- **Viral-capable**: Natural sharing mechanism (output, collaboration, links)

**Team required:**
- 80% engineers (product is the GTM)
- 10% growth/marketing (optimize funnel)
- 10% customer success (help power users)

**Economics:**
- CAC: $50-$200 (mostly ads, content marketing)
- ACV: $500-$5,000/year
- Payback: 3-12 months
- Scale: 10,000-100,000+ customers

**When PLG works for SaS:**
- Prosumer tools (individual developers, writers, designers)
- SMB tools with clear ROI (bookkeeping, content generation)
- Horizontal platforms (support, dev tools) where users can self-onboard

**When PLG doesn't work:**
- Complex workflows requiring training
- Enterprise customers with procurement processes
- Regulated industries requiring compliance review
- High-touch products needing customization

### Strategy 2: Enterprise Sales

**What it is**: High-touch sales motion with dedicated account executives selling to large organizations.

**Best for:**
- Large enterprises (1,000+ employees)
- High ACV ($50K-$1M+/year)
- Complex products requiring customization
- Regulated industries (legal, finance, healthcare)

**Examples:**
- **Harvey AI**: Sell to AmLaw 100 law firms via partnerships and direct sales
- **Pilot.com** (enterprise tier): CFO services to $50M+ revenue companies
- **Scale AI**: Enterprise data labeling contracts

**Enterprise sales motion:**

**Phase 1: Outbound (Months 1-3)**
```
Identify target accounts → Warm intro via investor/advisor → Initial call with champion
```

**Phase 2: Discovery and Demo (Months 3-4)**
```
Understand pain points → Customize demo → Show ROI calculation
```

**Phase 3: Pilot/POC (Months 4-6)**
```
3-month paid pilot → Track metrics → Prove value → Build business case
```

**Phase 4: Procurement (Months 6-9)**
```
Security review → Legal review → Negotiate contract → Get approvals
```

**Phase 5: Rollout (Months 9-12)**
```
Onboard initial users → Measure success → Expand to more teams
```

**Total sales cycle: 6-12 months** (legal/finance) to **12-18 months** (highly regulated)

**Enterprise Sales Requirements:**

**Team:**
- 1 AE per $1-2M quota (typically 1 AE closes 5-10 deals/year at $100K-$200K each)
- 1 SE (Sales Engineer) per 2-3 AEs
- 1 CSM (Customer Success Manager) per $2-3M ARR
- SDRs for outbound (1 SDR per 2 AEs)

**Process:**
- CRM (Salesforce, HubSpot) for pipeline management
- Contract templates with legal review
- Security documentation (SOC 2, GDPR, HIPAA)
- Custom pilots and POCs

**Economics:**
- CAC: $20K-$100K per customer
- ACV: $100K-$1M+
- Payback: 12-24 months
- Scale: 100-1,000 customers

**When enterprise sales works for SaS:**
- Legal, finance, healthcare (high-stakes, regulated)
- Products requiring customization or integration
- Services replacing critical business functions
- Customers with compliance/procurement requirements

**When enterprise sales doesn't work:**
- Low ACV (<$10K) doesn't support sales cost
- Product isn't mature enough (enterprise has zero tolerance for bugs)
- Team lacks enterprise sales experience
- Long sales cycles drain runway before revenue materializes

### Strategy 3: Partnerships

**What it is**: Partner with platforms, incumbents, or complementary products for distribution.

**Best for:**
- Need distribution fast
- Customers already using partner's platform
- Natural integration points
- Willing to share revenue (20-30% to partner)

**Partnership Types:**

**A. Platform Integrations**

**Examples:**
- **Jasper + Webflow**: Content generation integrated into website builder
- **Harvey AI + NetDocuments**: Legal AI integrated into document management
- **AI support tools + Zendesk**: Support AI integrated into Zendesk inbox

**Value exchange:**
- Partner gets feature enhancement (AI capabilities)
- You get distribution to partner's customer base
- Revenue share: 20-30% to partner typical

**B. Reseller Partnerships**

**Examples:**
- **Pilot.com + Brex**: Brex resells Pilot bookkeeping to their customers
- **Legal AI + law firms**: Law firms resell AI tools to their clients (white-labeled)

**Value exchange:**
- Partner earns commission (15-30%)
- You get trusted distribution channel
- Partner handles sales, you handle product

**C. Technology Partnerships**

**Examples:**
- **OpenAI + Microsoft**: Azure OpenAI Service
- **Anthropic + AWS**: Claude on AWS Bedrock

**Value exchange:**
- You get enterprise distribution and compliance
- Partner gets AI capabilities for their platform
- Revenue share varies (often 30-50% to platform)

**D. Strategic Partnerships (Co-selling)**

**Examples:**
- **Harvey AI + Allen & Overy**: Joint GTM, co-marketing
- **AI startups + Big 4 consulting**: Consulting firms sell AI tools to their clients

**Value exchange:**
- Partner gets innovation story and client value
- You get credibility and warm intros
- No revenue share, but shared pipeline

**Partnership Economics:**

**Pros:**
- Fast distribution (leverage partner's customer base)
- Lower CAC (partner does sales)
- Credibility (partner endorsement)

**Cons:**
- Lower margins (20-30% revenue share)
- Dependence risk (partner controls relationship)
- Integration overhead (engineering time)
- Slower iteration (partner release cycles)

**When partnerships work:**
- You have unique capability partner needs (AI, automation)
- Partner has distribution you lack
- Integration creates 1+1=3 value
- Willing to trade margin for growth

**When partnerships don't work:**
- You have strong direct distribution already
- Partner's incentives misalign (competes with their services)
- Integration is complex and expensive
- Revenue share makes unit economics unsustainable

### Strategy 4: Content Marketing

**What it is**: Attract customers through valuable content (blog posts, guides, tools) that ranks in search and builds brand.

**Best for:**
- Long buying cycles (6-12 months consideration)
- Education-heavy categories (new technology, complex workflows)
- SEO-friendly search terms (high volume, clear intent)
- Willing to invest 12-18 months before ROI

**Content Marketing Playbook:**

**Phase 1: Build Foundation (Months 1-6)**

**1. Keyword research**
```
Identify high-intent keywords:
- "contract review software" (500 searches/month)
- "AI legal research" (1,200 searches/month)
- "automated bookkeeping for startups" (800 searches/month)

Prioritize: High intent + low competition + >100 searches/month
```

**2. Create cornerstone content**
```
Write 10-20 comprehensive guides (2,000-5,000 words each):
- "The Complete Guide to AI Contract Review"
- "How to Automate Legal Research with AI"
- "Bookkeeping for Startups: A Complete Guide"

Goal: Rank #1 for target keywords
```

**3. Build topic authority**
```
Write 50+ supporting articles:
- Answer specific questions ("How much does contract review cost?")
- Compare alternatives ("Harvey AI vs. Traditional Law Firms")
- Case studies ("How Acme Corp Saved $200K with AI Legal")

Goal: Become the authority in your category
```

**Phase 2: Drive Traffic (Months 7-12)**

**1. SEO optimization**
- Internal linking strategy
- Backlink building (guest posts, PR)
- Technical SEO (site speed, mobile optimization)

**2. Distribution**
- Share on social (LinkedIn, Twitter)
- Post on communities (Reddit, Hacker News, industry forums)
- Email newsletter (weekly)

**3. Conversion optimization**
- CTAs in every article ("Try free for 14 days")
- Lead magnets ("Download: The SaaS Bookkeeping Checklist")
- Retargeting ads for blog visitors

**Phase 3: Scale (Months 13+)**

**1. Content velocity**
- 2-4 new articles per week
- Update old content quarterly
- Expand to video, podcasts, webinars

**2. Compounding growth**
- Each article attracts traffic
- Traffic compounds month-over-month
- After 18 months: 50,000-100,000 monthly visitors typical

**Content Marketing Economics:**

**Investment:**
- Writers: $0.10-$0.50 per word × 10K words/week = $1K-$5K/week
- SEO tools: $500-$2K/month (Ahrefs, SEMrush)
- Editor: $5K-$10K/month

**Total: $10K-$30K/month**

**Return (after 18 months):**
- 50K monthly visitors
- 2% convert to trial: 1,000 trials/month
- 10% trial to paid: 100 customers/month
- $99/month ACV: $10K MRR = $120K ARR from content alone

**Payback: 12-18 months, then scales efficiently**

**When content marketing works:**
- You can create truly valuable content (not generic)
- Target keywords have search volume (100+ searches/month)
- Long buying cycle gives time for nurture
- Can invest 12-18 months before significant ROI

**When content marketing doesn't work:**
- No search volume for target keywords (too niche)
- Category is too new (people don't search for it yet)
- Fast decisions (users buy same day they discover)
- Better spent on paid ads or sales

### Strategy 5: Hybrid (Multiple Motions)

**What it is**: Different GTM strategies for different customer segments.

**Most SaS companies end up hybrid within 12-24 months.**

**Example: Intercom Fin**

**Segment 1: SMB ($0-$2K/month) → PLG**
- Self-serve sign-up
- Free trial → Paid conversion
- No sales involvement
- Support via chat/email

**Segment 2: Mid-Market ($2K-$10K/month) → Sales-Assisted PLG**
- Self-serve trial
- Sales rep reaches out after 7 days
- Demo and ROI discussion
- Close in 2-4 weeks

**Segment 3: Enterprise ($10K+/month) → Enterprise Sales**
- Outbound or inbound via content
- Custom pilots (3-6 months)
- Procurement and security review
- Close in 6-12 months

**Hybrid Motion Design:**

**Segment by ACV:**
```python
def assign_sales_motion(customer):
    estimated_acv = predict_acv(customer)

    if estimated_acv < 5000:
        return "PLG"  # Self-serve
    elif estimated_acv < 25000:
        return "Sales-Assisted"  # SDR + AE touch
    else:
        return "Enterprise"  # Full enterprise sales cycle
```

**Hybrid Team Structure:**

**PLG team (for SMB):**
- Growth engineers (optimize conversion)
- Product managers (improve onboarding)
- Customer success (reactive support)

**Sales team (for mid-market/enterprise):**
- SDRs (outbound prospecting)
- AEs (close deals)
- SEs (technical demos)
- CSMs (proactive account management)

**Content team (feeds all motions):**
- Writers (SEO content)
- Demand gen (paid ads, webinars)
- Product marketing (positioning, messaging)

**When to go hybrid:**
- After reaching $2M-$5M ARR via single motion
- Seeing demand from multiple customer segments
- Economics support multiple motions (ACV varies 10x+ across segments)
- Team has expertise in multiple GTM strategies

## Choosing Your Distribution Strategy

### Decision Framework

**Step 1: Identify your ICP (Ideal Customer Profile)**

**Questions:**
- Who gets most value from your product? (role, company size, industry)
- Who has budget authority? (individual, department head, C-suite)
- What's their buying process? (self-serve, committee, procurement)

**Example: Harvey AI**
- ICP: Corporate associates at AmLaw 100 law firms
- Budget: Law firm partners (approve department spend)
- Buying: Enterprise procurement (6-12 months)
- **→ Enterprise sales motion required**

**Example: Jasper**
- ICP: Content marketers at SMBs and agencies
- Budget: Marketing manager ($50-$500/month discretionary)
- Buying: Try and buy same day
- **→ PLG motion ideal**

**Step 2: Calculate your ACV and CAC capacity**

```
Can you afford a sales team?

Sales team cost = (AE salary $120K + quota $1.2M) = 10% of bookings
+ SE, SDR, CSM = Total sales cost = 15-20% of ARR

Minimum ACV to support sales team: $25K-$50K

If ACV < $25K: PLG or partnerships
If ACV $25K-$100K: Sales-assisted PLG or content marketing
If ACV > $100K: Enterprise sales
```

**Step 3: Assess product complexity**

**Simple product (can explain in 30 seconds):**
- "AI that writes blog posts" → PLG
- "AI that categorizes expenses" → PLG

**Complex product (requires demo):**
- "AI legal research with custom training" → Sales
- "AI CFO platform with forecasting" → Sales

**Step 4: Evaluate distribution advantages**

**Do you have:**
- Built-in distribution? (existing customer base, platform) → Leverage it
- Strong brand? (founder, previous company) → Content marketing works faster
- Network? (investors, advisors) → Enterprise sales easier (warm intros)
- Technical moat? (unique AI capability) → Partnerships (others want to integrate)

**Decision matrix:**

| **ICP** | **ACV** | **Product Complexity** | **Distribution Advantage** | **Recommended Strategy** |
|---------|---------|----------------------|--------------------------|------------------------|
| **Prosumers** | <$1K | Simple | None | **PLG** (freemium) |
| **SMB** | $1K-$10K | Simple | None | **PLG** + content marketing |
| **SMB** | $1K-$10K | Complex | Platform | **Partnerships** |
| **Mid-Market** | $10K-$50K | Medium | Network | **Sales-assisted PLG** |
| **Enterprise** | $50K+ | Complex | Network | **Enterprise sales** |
| **Enterprise** | $50K+ | Complex | None | **Partnerships** or enterprise sales |

## Execution Playbooks

### Playbook 1: Launching with PLG

**Month 1-2: Build self-serve experience**
- Sign-up flow (email → verify → onboarding)
- In-product onboarding (tutorial, tooltips, sample tasks)
- Free tier or trial (14-30 days, generous limits)

**Month 3-4: Launch to initial audience**
- Post on Product Hunt, Hacker News
- Share with existing network (Twitter, LinkedIn)
- Seed to 100-500 users

**Month 5-6: Optimize conversion funnel**
```
Sign-up → Activation → Aha Moment → Habit → Paid

Track metrics:
- Sign-up to activation: Target 60%+
- Activation to paid: Target 5-10%
- Free trial to paid: Target 15-25%
```

**Month 7-12: Growth loops**
- Referral program ("Invite 3 friends → Get 1 month free")
- Content marketing (SEO for inbound)
- Paid ads (Facebook, Google, LinkedIn) if CAC < LTV/3

**Target: $100K ARR by Month 12**

### Playbook 2: Launching with Enterprise Sales

**Month 1-3: Build pipeline**
- Identify 50-100 target accounts (specific companies)
- Get warm intros (via investors, advisors, board)
- Schedule 20-30 first calls

**Month 4-6: Discovery and pilots**
- Understand pain points deeply
- Propose 3-month paid pilot ($10K-$25K)
- Define success metrics (e.g., "Save 100 hours/month")

**Month 7-12: Close first deals**
- Deliver pilot results
- Build business case (ROI, time savings)
- Navigate procurement
- Target: 3-5 customers at $50K-$100K each = $150K-$500K ARR

**Month 13-18: Scale pipeline**
- Hire first AE (once you've closed 3-5 deals yourself)
- Refine sales process
- Build case studies
- Target: $1M-$2M ARR

**Month 19-24: Build sales team**
- Hire 2-3 more AEs
- Hire SE and CSMs
- Target: $5M-$10M ARR

### Playbook 3: Launching with Partnerships

**Month 1-3: Identify partners**
- Who has your ICP as customers?
- Who has complementary product?
- Who would benefit from AI capabilities?

**Example: Legal AI**
- Targets: Document management systems (NetDocuments, iManage)
- Value prop: "Add AI legal research to your platform"

**Month 4-6: Build relationships**
- Warm intros via investors/advisors
- Pitch partnership (revenue share, co-marketing)
- Get champion inside partner org

**Month 7-12: Build integration**
- Technical integration (API, SDK, embedded UI)
- Co-marketing (joint webinars, case studies)
- Train partner's sales team

**Month 13-18: Launch partnership**
- Announce publicly (press release, blog posts)
- Partner promotes to their customers
- Track pipeline from partnership

**Target: 20-30% of ARR from partnership by Month 24**

## Common Distribution Mistakes

### Mistake 1: Trying to do everything**

**Symptom**: Doing PLG + enterprise sales + partnerships + content simultaneously

**Why it fails**:
- Each motion requires focus and resources
- Team is spread too thin
- None of the motions work well

**Fix**: Choose ONE primary motion for first 12-18 months. Add others after PMF.

### Mistake 2: Choosing PLG with complex product

**Symptom**: Complex product requiring training, but trying to make it self-serve

**Example**: Legal AI requiring lawyers to understand AI prompting, with 30-min onboarding

**Result**: 80% of users sign up but never complete onboarding

**Fix**: Admit product requires high-touch. Switch to enterprise sales or build simpler product.

### Mistake 3: Building sales team too early

**Symptom**: Hiring AEs before reaching $1M ARR

**Why it fails**:
- AEs can't sell what founder can't sell
- Founder hasn't refined pitch/process yet
- Sales team churns (nothing to sell)

**Fix**: Founder does first 10-20 sales. Then hire first AE. Scale team after $2M ARR.

### Mistake 4: Ignoring economics

**Symptom**: PLG motion with $50/month ACV but $200 CAC

**Math**:
- LTV (assuming 12-month retention): $600
- CAC: $200
- LTV/CAC = 3:1 (seems okay)
- Payback: 4 months (seems okay)

**Hidden problem**: Volume required
- Need 1,000 customers for $50K MRR
- At 3% conversion, need 33,000 trials/month
- That requires massive traffic (300K monthly visitors)

**Fix**: Either increase ACV (upgrade tiers, upsells) or reduce CAC (organic channels).

### Mistake 5: Underestimating enterprise sales cycle

**Symptom**: Expecting to close enterprise deals in 1-3 months

**Reality**: 6-12 months typical, 12-18 months for regulated industries

**Why it fails**:
- Burn through runway waiting for deals to close
- Pressure to discount (desperate for revenue)
- Cash flow crisis

**Fix**: Plan for 9-12 month sales cycles. Raise enough capital. Don't count on revenue until contracts signed.

## Key Takeaways

**1. Distribution beats product**
- GitHub Copilot's 100M built-in distribution > superior competitor without distribution
- Spend 50% of effort on GTM, 50% on product
- Distribution is part of product-market fit

**2. Choose distribution based on ICP and ACV**
- **PLG**: Prosumers and SMB, <$10K ACV, simple product
- **Enterprise sales**: Large companies, >$50K ACV, complex product
- **Partnerships**: Need fast distribution, have unique capability
- **Content marketing**: Long buying cycle, search volume exists
- **Hybrid**: After finding PMF, expand to multiple segments

**3. One motion at a time**
- Focus on one primary GTM motion for 12-18 months
- Add secondary motions after reaching $2M-$5M ARR
- Hybrid motions require different teams and processes

**4. Enterprise sales cycle is 6-12 months**
- Plan capital and cash flow accordingly
- Don't expect revenue in first 6 months
- Founder must sell first 10-20 deals before hiring sales team

**5. PLG requires product-market fit first**
- Self-serve only works if product is obviously valuable
- Time-to-value must be minutes, not weeks
- If activation rate <40%, product isn't ready for PLG

**6. Partnerships trade margin for distribution**
- Expect to share 20-30% revenue
- Partner gets distribution control
- Only pursue if you lack better distribution

**7. Content marketing is 12-18 month investment**
- Don't expect ROI before 12 months
- Compounds over time (traffic grows month-over-month)
- Best for categories with high search volume

---

You've now learned how to choose and execute the right distribution strategy for Services-as-Software, from PLG to enterprise sales to partnerships.

**Next**: Chapter 11 covers sales specifically—how to sell against human alternatives, overcome trust objections, and close deals for Services-as-Software.
