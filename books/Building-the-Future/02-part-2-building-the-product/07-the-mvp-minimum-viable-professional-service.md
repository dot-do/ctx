# Chapter 7: The MVP: Minimum Viable Professional Service

In early 2023, two legal AI startups launched within weeks of each other.

**Startup A** built a comprehensive platform:
- Draft contracts (15 types)
- Review and redline contracts
- Legal research across all practice areas
- Case law database
- Client management system
- Billing and invoicing

**Time to launch**: 18 months
**First customer**: Month 21
**Funding raised**: $8M
**Status**: Shut down in Month 24 (ran out of money before finding product-market fit)

**Startup B** (Harvey AI) launched with one feature:
- Legal research for corporate law

**Time to launch**: 4 months
**First customer**: Month 5 (Allen & Overy, prestigious law firm)
**Funding raised**: $5M at launch, $100M by Month 18
**Status**: Category leader with 10,000+ users

**The difference**: Startup B understood the Minimum Viable Professional Service.

This chapter teaches you how to scope your MVP to deliver real value without building for 18 months.

## What is an MVP in Services-as-Software?

### Traditional SaaS MVP vs. Services-as-Software MVP

**Traditional SaaS MVP:**
- Core features of a software product
- May not be "complete" (users understand it's early)
- Value: Saves time or enables new workflows
- Example: Dropbox MVP was just file syncing (no sharing, no mobile app)

**Services-as-Software MVP:**
- Must deliver a complete professional service end-to-end
- Quality must be comparable to human alternative (80%+)
- Value: Replaces or augments human expert
- Example: Harvey MVP did full legal research (not partial)

**Key difference**: SaaS MVPs can be "unfinished." Services-as-Software MVPs must be "complete for one use case."

### The MVP Scoping Framework

Your MVP should:

**1. Solve one complete task**
- Not "part of a workflow" but "entire workflow from start to finish"
- Example: "Draft Series A term sheet" (complete) not "Suggest term sheet clauses" (partial)

**2. Serve one specific customer segment**
- Not "all lawyers" but "corporate lawyers at law firms"
- Easier to build trust, easier to sell, easier to measure quality

**3. Achieve 80%+ quality compared to human alternative**
- Not "impressive for AI" but "comparable to a human professional"
- Users must trust outputs enough to use them

**4. Deliver 10x improvement on one dimension**
- Usually speed (minutes vs. hours) or cost (10% of human cost)
- The 10x must be obvious and measurable

**5. Be buildable in 3-6 months**
- Longer than 6 months = too ambitious for MVP
- Shorter than 3 months = probably too simple to matter

## Step 1: Choose Your One Task

### How to Identify the Right Task

**Criteria for good MVP tasks:**

**1. Repeatable and common**
- Customers do this task frequently (weekly or daily)
- Example: Contract review happens 100x/year at a law firm
- Counter-example: Mergers & acquisitions only happen 1-2x/year

**2. Clear input and output**
- Input: Specific, well-defined (e.g., "employment contract + company policies")
- Output: Concrete deliverable (e.g., "reviewed contract with risks highlighted")
- Counter-example: "Provide strategic advice" (too vague)

**3. Currently paid for**
- Customers already spend money on this task
- Proves willingness to pay
- Counter-example: Tasks humans do for free because they're easy

**4. Quality is measurable**
- You can objectively assess if AI did it well
- Example: Expense categorization (can validate against accounting standards)
- Counter-example: "Creative brainstorming" (subjective quality)

**5. Low "catastrophic failure" risk**
- Mistakes are correctable, not catastrophic
- Example: Blog post draft (user can edit)
- Counter-example: Surgical robot (mistakes could kill)

**6. Automatable with current AI**
- GPT-4 can handle this task today (not "will be able to in 2 years")
- Test with ChatGPT before building

### Task Selection Exercise

**List all tasks in your target professional service**

Example: Legal services
- Contract drafting
- Contract review
- Legal research
- Due diligence
- Litigation prep
- Client communication
- Filing documents
- Negotiations
- Appeals

**Score each task (1-5 on each criterion):**

| Task | Repeatable? | Clear I/O? | Paid For? | Measurable? | Low Risk? | Automatable? | **Total** |
|------|------------|-----------|-----------|------------|-----------|-------------|----------|
| **Contract review** | 5 | 5 | 5 | 4 | 4 | 5 | **28/30** |
| **Legal research** | 5 | 5 | 5 | 4 | 5 | 5 | **29/30** |
| **Contract drafting** | 4 | 5 | 5 | 4 | 3 | 4 | **25/30** |
| Due diligence | 3 | 3 | 5 | 3 | 3 | 3 | 20/30 |
| Litigation prep | 2 | 3 | 5 | 3 | 2 | 3 | 18/30 |
| Negotiations | 2 | 2 | 5 | 2 | 2 | 2 | 15/30 |
| Filing documents | 3 | 4 | 3 | 4 | 4 | 4 | 22/30 |

**Choose top-scoring task for your MVP.**

In this example: Legal research (29/30) or Contract review (28/30) are best MVP candidates.

### Real-World MVP Examples

**Harvey AI: Legal Research**
- **Task**: Answer legal questions with case law citations
- **Input**: Legal question (e.g., "Can we terminate an at-will employee in California for social media posts?")
- **Output**: Answer + relevant cases + statutory citations
- **Why this task**: Corporate lawyers do legal research daily, quality is measurable (correct citations), low catastrophic risk (humans review before advising clients)

**Pilot.com: Bookkeeping**
- **Task**: Categorize business expenses for financial reporting
- **Input**: Bank transactions + vendor descriptions
- **Output**: Categorized expenses mapped to chart of accounts
- **Why this task**: Every business does this monthly, quality is measurable (GAAP compliance), humans can review

**Jasper: Blog Post Generation**
- **Task**: Generate blog post from topic + outline
- **Input**: Topic ("10 ways to improve email marketing") + target audience
- **Output**: 1,500-word blog post
- **Why this task**: Content marketers create 4-8 blog posts/month, quality is measurable (readability, SEO), low risk (users edit before publishing)

**GitHub Copilot: Code Completion**
- **Task**: Suggest next lines of code based on context
- **Input**: Existing code + cursor position
- **Output**: 1-10 lines of code
- **Why this task**: Developers write code continuously, quality is measurable (code runs or doesn't), low risk (developers review before committing)

## Step 2: Define Your Customer Segment

### Why Narrow Segmentation Matters for MVP

**Mistake**: "Our MVP is for all lawyers."

**Problem**:
- Corporate lawyers have different needs than criminal defense lawyers
- In-house counsel at tech startups have different needs than partners at BigLaw
- Impossible to build trust across all segments simultaneously

**Better**: "Our MVP is for corporate associates at law firms handling M&A transactions."

**Benefits**:
- Specific pain points (M&A due diligence is time-consuming)
- Similar workflows (all M&A associates follow similar processes)
- Easier to build trust (one community, word of mouth spreads)
- Clearer GTM (target M&A practices at top 100 law firms)

### Segmentation Framework

**Choose ONE segment for MVP:**

**Option 1: Segment by vertical + role**
- Example: "Accountants at SaaS startups" (not "all accountants")
- Example: "Corporate lawyers at law firms" (not "in-house counsel")

**Option 2: Segment by use case**
- Example: "Contract review for SaaS vendor agreements" (not "all contracts")
- Example: "Blog posts for B2B SaaS marketing teams" (not "all content")

**Option 3: Segment by company size**
- Example: "Mid-market companies ($10M-$100M revenue)" (not "all businesses")
- Avoids competing with enterprise incumbents and having to build consumer-scale products

### Real-World Segmentation Examples

**Harvey AI (Launch, 2022)**
- **Segment**: Corporate associates at elite law firms (AmLaw 100)
- **Why**: High willingness to pay, pain point is acute (60-80 hour weeks), trust can be built through partnership with prestigious firm (Allen & Overy)
- **Expansion path**: Other practice areas (litigation, tax, IP) → mid-market firms → in-house counsel

**Pilot.com (Launch, 2018)**
- **Segment**: Venture-backed startups ($1M-$50M revenue)
- **Why**: These companies need CFO-level bookkeeping but can't afford Big 4, high growth creates urgency
- **Expansion path**: E-commerce → SaaS → professional services → all SMBs

**Intercom Fin (Launch, 2023)**
- **Segment**: Intercom's existing customers (50,000+ companies)
- **Why**: Built-in distribution, already using Intercom for support, can dogfood the product
- **Expansion path**: New Intercom customers → standalone product

## Step 3: Set Your Quality Bar

### The 80% Quality Threshold

**Observation**: Services-as-Software MVP must achieve 80% quality compared to human alternative to gain initial adoption.

**Why 80%?**
- **Below 70%**: Too many mistakes, customers lose trust
- **70-80%**: Marginal—early adopters might try, but most won't
- **80-85%**: Good enough for early adopters if 10x faster or cheaper
- **85-90%**: Good enough for mainstream adoption
- **90-95%**: Required for enterprise and regulated industries
- **95%+**: Diminishing returns—very hard to achieve

### How to Measure Quality

**Step 1: Define your quality metric**

Examples:
- **Legal research**: % of relevant cases found + 0 incorrect citations
- **Expense categorization**: % categorized correctly per GAAP
- **Blog post generation**: Readability score + SEO score + human rating (1-5)
- **Code completion**: % of suggestions accepted by developers

**Step 2: Build a golden dataset**

- Collect 100-500 examples of the task
- Have human experts complete them (the "correct" answer)
- Use this dataset to benchmark AI quality

**Example: Pilot.com's expense categorization golden dataset**
- 500 real expenses from 50 companies
- Categorized by 3 CPAs independently
- Consensus categorization is "ground truth"
- AI must match 80%+ to pass quality bar

**Step 3: Test before you build**

Before building your MVP, test whether AI can reach 80% quality:

```python
# Pseudocode for quality testing
golden_dataset = load_golden_dataset()  # 500 examples

results = []
for example in golden_dataset:
    ai_output = gpt4.generate(example.input)
    correct = (ai_output == example.ground_truth)
    results.append(correct)

accuracy = sum(results) / len(results)

if accuracy < 0.80:
    print("AI not ready for this task. Try a different task or improve prompts.")
else:
    print(f"AI achieves {accuracy:.0%} quality. Ready to build MVP.")
```

**If AI can't reach 80% on your golden dataset, choose a different task or improve your prompts/retrieval until you can.**

### Quality vs. Speed Tradeoff

Sometimes you can't reach 80% quality *and* 10x speed. You must choose.

**Example: Harvey AI's choice**

**Option A: Fast but lower quality**
- GPT-4o-mini for legal research
- 5 seconds per query
- 75% accuracy (misses some relevant cases)

**Option B: Slower but higher quality**
- GPT-4o with extensive RAG + cross-validation
- 30 seconds per query
- 90% accuracy (comprehensive results)

**Harvey chose Option B**: Quality matters more than speed in legal. Lawyers would rather wait 30 seconds for comprehensive results than get fast but incomplete answers.

**Contrast with Intercom Fin**: Speed matters more than perfection in support.
- 2 second response time is critical (users expect real-time)
- 80% accuracy acceptable (can escalate to human if AI fails)
- Choose GPT-4o-mini for speed

**Your decision**: Depends on user expectations in your domain.

## Step 4: Build Your MVP (The Right Way)

### MVP Architecture (Minimum Complexity)

**Goal**: Build the simplest system that delivers 80%+ quality.

**Typical MVP stack:**

**Layer 1: Foundation Model**
- OpenAI GPT-4o or Anthropic Claude 3.5
- Don't fine-tune, don't build custom models
- Budget: $0.01-0.10 per task

**Layer 2: Knowledge (if needed)**
- pgvector (Postgres extension) for vector search
- OpenAI embeddings for document retrieval
- Budget: $0-100/month

**Layer 3: Simple Orchestration**
- Basic workflow: Retrieve → Generate → Validate
- No complex agent framework needed
- LangChain if you want, but simple Python works

**Layer 4: Domain Logic (your IP)**
- Validation rules (10-50 rules)
- Quality checks specific to your task
- This is what differentiates you

**Layer 5: Basic UI**
- Next.js + shadcn/ui for web app
- Vercel for hosting
- Budget: $20/month

**Total time to build: 8-16 weeks**
**Total cost: $50K-$150K** (1-2 engineers for 3 months)

### MVP Workflow Example: Contract Review

**User uploads employment contract → AI reviews for risks → Returns annotated contract with risks highlighted**

**Step 1: User Input**
```typescript
// Frontend: Simple file upload
<FileUpload
  accept=".pdf,.docx"
  onUpload={async (file) => {
    const result = await reviewContract(file)
    setResult(result)
  }}
/>
```

**Step 2: Extract Text**
```python
# Backend: Extract text from PDF/Word
def extract_text(file):
    if file.type == "pdf":
        return extract_from_pdf(file)
    elif file.type == "docx":
        return extract_from_docx(file)
```

**Step 3: Retrieve Relevant Rules**
```python
# Optional: RAG to find relevant legal rules
def retrieve_legal_rules(contract_type):
    # Query vector database for relevant employment law rules
    rules = vector_db.search(
        query=f"employment law risks and red flags",
        filter={"jurisdiction": "California"},
        top_k=10
    )
    return rules
```

**Step 4: AI Analysis**
```python
# Generate risk analysis
def analyze_contract(contract_text, legal_rules):
    prompt = f"""
You are a corporate attorney reviewing an employment contract.

Analyze this contract for legal risks and red flags:

{contract_text}

Relevant legal rules:
{legal_rules}

For each risk you identify:
1. Quote the specific clause
2. Explain the legal risk
3. Cite relevant law
4. Rate severity (Low/Medium/High)
5. Provide recommendation

Format as JSON:
{{
  "risks": [
    {{
      "clause": "...",
      "risk": "...",
      "law": "...",
      "severity": "High",
      "recommendation": "..."
    }}
  ],
  "overall_risk": "Low|Medium|High"
}}
"""

    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    return json.loads(response.choices[0].message.content)
```

**Step 5: Validation**
```python
# Domain expertise: Validate AI output
def validate_risks(risks):
    validated_risks = []

    for risk in risks:
        # Rule 1: Must quote actual clause from contract
        if not risk["clause"] in contract_text:
            continue  # Skip hallucinated risks

        # Rule 2: Severity must match legal standards
        if risk["severity"] == "High":
            # High severity requires strong justification
            if not risk["law"] or len(risk["recommendation"]) < 50:
                risk["severity"] = "Medium"  # Downgrade

        # Rule 3: Check against known false positives
        if is_false_positive(risk):
            continue

        validated_risks.append(risk)

    return validated_risks
```

**Step 6: Deliver Results**
```typescript
// Frontend: Display annotated contract
<ContractViewer
  contract={contract}
  risks={risks}
  highlightClauses={true}
/>
```

**Total code: ~500 lines for MVP** (excluding UI boilerplate)

### What NOT to Build in Your MVP

**Don't build:**

**1. Multi-task workflows**
- MVP = one task done well
- Don't try to do contract review + drafting + research

**2. Complex agent systems**
- Simple workflows (retrieve → generate → validate) work fine for MVP
- Don't use AutoGPT, multi-agent frameworks

**3. Custom models or fine-tuning**
- GPT-4o out-of-box is good enough for 80% quality
- Fine-tuning can wait until post-PMF

**4. Integrations**
- Manual import/export (CSV, file upload) is fine for MVP
- Zapier, Salesforce integrations can wait

**5. Enterprise features**
- SSO, SCIM, audit logs not needed until first enterprise customer
- Don't build for enterprise until you have enterprise demand

**6. Custom UI frameworks**
- Use Next.js starter templates
- Don't design custom component library

**7. Billing infrastructure**
- Stripe Checkout (simple subscribe button) is enough
- Complex usage-based billing can wait

**Exception**: If a feature is required for your ONE task to work, build it. Otherwise, skip.

## Step 5: Test with 10-20 Early Customers

### The 10-Customer Test

Before scaling, validate your MVP with 10-20 customers:

**Goals:**
1. **Quality validation**: Does AI achieve 80%+ quality in real-world use?
2. **Value validation**: Do customers find it 10x better (faster/cheaper)?
3. **Workflow validation**: Does it fit into their existing workflows?
4. **Willingness to pay**: Will they pay for this?

**Who to recruit:**
- Friendly customers (people you know or warm intros)
- Representative of target segment (corporate lawyers if that's your segment)
- Willing to give detailed feedback
- Not expecting perfection

**What to charge:**
- **Option 1**: Free during beta, with commitment to pay once launched ($X/month agreed upfront)
- **Option 2**: Deeply discounted (50% off) in exchange for feedback
- **Option 3**: Pay-what-you-want (learn willingness to pay)

**Avoid**: Completely free with no commitment—customers won't take it seriously

### The Feedback Loop

**Week 1-2: Onboarding**
- Set up accounts
- Walk through product (live demo)
- Set expectations ("This is beta, please report any issues")

**Week 3-8: Usage**
- Customers use product for real work
- You monitor usage, quality, errors
- Weekly check-ins (30 min call)

**Week 9-10: Debrief**
- Structured feedback sessions (1 hour each)
- Ask:
  - What worked well?
  - What didn't work?
  - Would you pay for this? How much?
  - What's missing?
  - Would you recommend to colleagues?

**Week 11-12: Iterate**
- Prioritize feedback
- Fix critical bugs
- Improve quality for most common use cases
- Add one or two most-requested features

### Success Criteria for MVP

**Quantitative:**
- **80%+ task completion rate**: Customers complete tasks without escalating to humans
- **80%+ quality**: Outputs match human baseline
- **10x improvement**: Measurably faster, cheaper, or better than alternative
- **50%+ would pay**: At least half of test customers commit to paying

**Qualitative:**
- **"I'd recommend this"**: Net Promoter Score (NPS) >30
- **"I can't go back"**: Customers find it hard to switch back to old method
- **"Saves me hours"**: Customers volunteer value prop (you don't have to convince them)

**If you hit these metrics with 10-20 customers, you have product-market fit for your one task. Time to scale.**

**If you don't hit these metrics:**
- Improve quality (better prompts, retrieval, validation)
- Simplify task (maybe too complex for current AI)
- Change task (maybe this isn't the right one)
- Change segment (maybe this segment doesn't value it)

Don't raise a big Series A until you have these metrics.

## Real-World MVP Stories

### Harvey AI: MVP to $100M in 18 Months

**MVP (Q1 2022):**
- **Task**: Legal research for corporate lawyers
- **Segment**: Allen & Overy (1 law firm, 3,000 lawyers)
- **Quality**: 85% compared to junior associates
- **Time to build**: 4 months (founded Nov 2022, launched March 2023)
- **Team**: 2 founders + 3 engineers

**Traction (Q2-Q3 2023):**
- Allen & Overy partnership announced (instant credibility)
- 1,000 lawyers using Harvey within 6 months
- NPS: 60+ (very high for legal tech)
- Expanded to contract review (second task) based on customer demand

**Fundraising (Q4 2023):**
- $80M Series B led by Kleiner Perkins
- Validation: PMF proven, ready to scale

**Key insight**: Harvey stayed focused on ONE task (legal research) for 6+ months before expanding. Built deep trust with one prestigious customer (Allen & Overy) before scaling to others.

### Pilot.com: MVP to $120M ARR

**MVP (2018):**
- **Task**: Categorize expenses for financial reporting
- **Segment**: Venture-backed startups (Y Combinator companies)
- **Quality**: 85% categorization accuracy (with human review)
- **Time to build**: 6 months
- **Team**: Founder + 2 engineers + 3 accountants

**Traction (2019):**
- 50 YC companies as customers
- $500K ARR by end of first year
- Strong retention (90%+)—hard to switch accountants

**Expansion (2020-2023):**
- Added full bookkeeping (monthly close, financial statements)
- Added tax filing
- Added CFO services
- Expanded beyond YC (all startups)

**By 2023:**
- $120M ARR
- 2,000+ customers
- Still using same MVP architecture (AI + human review)

**Key insight**: Pilot started with ONE task (expense categorization) for ONE segment (YC startups), then expanded horizontally (more tasks) and vertically (more customer segments).

### Intercom Fin: MVP in 3 Months

**MVP (Q1 2023):**
- **Task**: Answer customer support questions
- **Segment**: Intercom's own support (dogfooding)
- **Quality**: 60% autonomous resolution (40% escalated to humans)
- **Time to build**: 3 months
- **Team**: 10 engineers (from existing Intercom team)

**Traction (Q2 2023):**
- Used internally for 2 months (refined quality to 72% resolution)
- Launched to select Intercom customers (beta)
- 50 customers in beta, strong feedback

**Public launch (Q3 2023):**
- 72% autonomous resolution rate
- Average response time: 2 seconds
- Available to all 50,000+ Intercom customers

**By Q4 2023:**
- 1,000+ paying customers
- 75% autonomous resolution (improved over time)
- Organizational impact: Intercom reduced support team from 85 to 25

**Key insight**: Intercom dogfooded Fin internally before launching to customers. This accelerated iteration (immediate feedback) and provided the best case study (Intercom's own support results).

## Common MVP Mistakes

### Mistake 1: Building for 18 Months Before Launch

**Symptom**: MVP includes 5+ features, complex workflows, enterprise integrations

**Why it fails**: Market changes, competitors launch, money runs out before first customer

**Fix**: Scope to ONE task, ship in 3-6 months

### Mistake 2: 70% Quality ("It's Impressive for AI")

**Symptom**: AI works in demos but fails in real use cases

**Why it fails**: Customers don't care that "it's hard to build AI"—they need 80%+ quality

**Fix**: Test quality on golden dataset before building. If you can't hit 80%, choose different task.

### Mistake 3: Solving "Part of a Workflow"

**Symptom**: AI suggests contract clauses, but user still has to draft contract themselves

**Why it fails**: Partial solutions don't deliver 10x value

**Fix**: Solve complete workflow (draft entire contract), not just part of it

### Mistake 4: Targeting Everyone

**Symptom**: "Our MVP is for all professionals"

**Why it fails**: Can't build trust with everyone. Can't tailor value prop.

**Fix**: Pick ONE customer segment (e.g., "corporate associates at law firms"), expand later

### Mistake 5: No Human Feedback Loop

**Symptom**: Launch MVP, customers use it, but you don't know if outputs are correct

**Why it fails**: Can't improve if you don't know what's wrong

**Fix**: Build feedback mechanism (thumbs up/down, human review, customer interviews)

### Mistake 6: Ignoring Quality Measurement

**Symptom**: "We think the AI is pretty good"

**Why it fails**: Guessing quality doesn't work. Customers will discover errors you didn't anticipate.

**Fix**: Build golden dataset, measure quality objectively, improve systematically

## Key Takeaways

**1. MVP = One Complete Task, Not Many Partial Tasks**
- Solve entire workflow (contract review, not "suggest clauses")
- Customers need complete solutions, not toolkits

**2. Target 80%+ Quality on Your First Task**
- Test with golden dataset before building
- If AI can't reach 80%, choose different task
- Quality threshold varies by domain (legal needs 95%, content needs 80%)

**3. Build in 3-6 Months, Not 12-18**
- Use off-the-shelf infrastructure (GPT-4, pgvector, Next.js)
- Don't build custom models, complex agents, or integrations
- Focus on domain expertise (validation rules, quality checks)

**4. Test with 10-20 Customers Before Scaling**
- Validate quality, value, workflow fit, willingness to pay
- Get detailed feedback, iterate quickly
- Don't raise Series A until you have clear PMF metrics

**5. Narrow Your Customer Segment**
- ONE vertical + ONE role (e.g., "corporate lawyers at law firms")
- Easier to build trust, easier to sell, clearer product requirements
- Expand to adjacent segments post-PMF

**6. Deliver 10x Improvement on One Dimension**
- Usually speed (10x faster) or cost (1/10th the cost)
- Must be obvious and measurable
- "Slightly better" isn't enough—needs to be transformative

**7. Build Feedback Loops from Day One**
- Track quality (accuracy, customer satisfaction)
- Collect corrections (when humans override AI)
- Improve systematically (weekly or monthly)

---

You've now learned how to scope and build your Minimum Viable Professional Service—one complete task, one customer segment, 80%+ quality, delivered in 3-6 months.

**Next**: Chapter 8 shows how to measure quality and accuracy systematically, enabling continuous improvement as you scale from MVP to mature product.
