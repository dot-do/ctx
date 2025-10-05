# Chapter 13: Customer Success in SaS

In 2023, an AI bookkeeping startup closed a deal with a promising customer: a Series B startup doing $20M revenue, paying $3,000/month.

**Month 1**: Customer signed up, uploaded bank statements, excited to start.

**Month 2**: Customer used the product 3 times, called support twice with questions.

**Month 3**: Customer used the product 0 times. Support tickets went unanswered.

**Month 4**: Customer churned (canceled subscription).

**Post-mortem interview:**
"The AI was good, but we never figured out how to integrate it into our workflow. Our accountant didn't trust it, so she just kept doing things the old way. It was easier to cancel than to force adoption."

**What went wrong**: The company sold the product but didn't ensure the customer succeeded with it.

This chapter teaches you how to build customer success for Services-as-Software.

## Why Customer Success is Critical for SaS

### The SaS Customer Success Challenge

**Traditional SaaS:**
- Customer signs up → Uses software → Gets value (usually self-directed)
- CS role: Answer questions, help with edge cases
- Churn reason: Product doesn't have needed features

**Services-as-Software:**
- Customer signs up → Needs to change workflow → Needs to build trust in AI → Gets value (requires hand-holding)
- CS role: Drive adoption, prove quality, enable workflow change
- Churn reason: "Never got comfortable using it" (even if product is good)

**Key difference**: SaS requires customers to change how they work (trust AI instead of humans). This is behavior change, not just software adoption.

### The Three Phases of SaS Customer Success

**Phase 1: Onboarding (Weeks 1-4)**
- **Goal**: Get customer to first successful use
- **Activity**: Training, setup, first tasks completed
- **Success metric**: Customer completes 10+ tasks in first 30 days

**Phase 2: Adoption (Months 2-6)**
- **Goal**: Customer integrates SaS into daily workflow
- **Activity**: Expand use cases, train more users, build trust
- **Success metric**: Customer uses 20+ times/month, satisfaction >85%

**Phase 3: Expansion (Months 7+)**
- **Goal**: Customer increases usage, expands to new use cases
- **Activity**: Identify growth opportunities, upsell, advocacy
- **Success metric**: ARR grows 20-30% through upsells/expansions

**Churn risk by phase:**
- **Phase 1 (Onboarding)**: 40% churn risk (never activate)
- **Phase 2 (Adoption)**: 20% churn risk (don't integrate into workflow)
- **Phase 3 (Expansion)**: <10% churn risk (sticky, getting value)

**Focus CS effort on Phase 1 and 2.** That's where churn happens.

## Phase 1: Onboarding (Weeks 1-4)

### Week 1: Kickoff and Setup

**Goal**: Customer understands how to use product, completes first task.

**Kickoff call agenda (60 minutes):**

**1. Introductions (5 min)**
- CS Manager introduces themselves
- Customer introduces team (who will use product, who will review outputs)
- Establish communication (Slack channel, weekly check-ins)

**2. Review goals (10 min)**
- What does success look like? (metrics: time saved, cost saved, quality maintained)
- What's the timeline? (when do you need to prove ROI?)
- What's the decision criteria for expanding vs. churning?

**3. Product walkthrough (20 min)**
- Live demo with customer's real data (not generic demo)
- Customer completes first task with guidance
- Show outputs, explain confidence scores, demonstrate human review workflow

**4. Training (15 min)**
- How to submit tasks
- How to review and approve outputs
- How to escalate issues
- How to interpret quality metrics

**5. Next steps (10 min)**
- Customer commits to submitting 5 tasks in Week 1
- Schedule Week 2 check-in (review first batch of results)
- Provide resources (help docs, video tutorials, support email)

**Week 1 deliverables:**
- Customer submits 5 tasks
- AI processes tasks
- Customer reviews outputs
- CS Manager reviews quality metrics

**Success metric: 5 tasks completed by end of Week 1**

If customer doesn't submit 5 tasks, CS Manager reaches out:
"I noticed we haven't received tasks yet. Is everything okay? Do you need help getting started?"

### Week 2: Quality Review

**Goal**: Prove AI quality meets customer standards.

**Week 2 check-in (30 min):**

**1. Review results (15 min)**
```
Results summary:
- Tasks submitted: 5
- AI accuracy: 4/5 correct (80%)
- Time saved: 8 hours (vs. baseline 10 hours)
- Cost: $250 (AI) vs. $3,000 (human alternative)

Let's review each task:
- Task 1: Contract review (correct) ✓
- Task 2: Contract review (missed 1 clause) ✗
- Task 3: Contract review (correct) ✓
- Task 4: Legal research (correct) ✓
- Task 5: Document drafting (correct) ✓

For Task 2, here's why AI missed the clause: [explanation]
We've updated our system to catch this pattern in future. Can you submit a few more similar contracts so we can verify the fix?
```

**2. Address concerns (10 min)**
- Customer: "The AI missed a clause in Task 2. How often does this happen?"
- CS: "Great question. Our overall accuracy is 95%, but we see 5-10% error rate in first batch while we learn your standards. By Week 4, accuracy should be 95%+. We'll review every output from you until we prove that threshold. Fair?"

**3. Plan Week 3 (5 min)**
- Customer commits to 10 tasks in Week 3
- Focus on task types where AI performed well
- CS will monitor results daily, flag issues proactively

**Success metric: Customer submits 10 tasks in Week 3 (if they do 5 in Week 1, they should scale to 10 in Week 3)**

### Week 3: Build Confidence

**Goal**: Customer gains confidence in AI quality.

**Week 3 check-in (30 min):**

**1. Review results**
```
Week 3 results:
- Tasks submitted: 10 (good!)
- AI accuracy: 9/10 correct (90%)
- Time saved: 15 hours
- Cost: $500 (AI) vs. $4,500 (human)

Quality is improving:
- Week 1: 80% accuracy
- Week 2: 85% accuracy (5 percentage point improvement)
- Week 3: 90% accuracy (on track for 95% by Week 4)
```

**2. Discuss workflow integration**
- CS: "How is your team using the AI? Are they reviewing outputs immediately or batching?"
- Customer: "Our attorney reviews outputs once a week in a batch."
- CS: "That works. Some customers prefer daily review (faster turnaround) but weekly batching is fine if timelines allow."

**3. Identify friction points**
- CS: "What's the biggest pain point so far?"
- Customer: "Uploading documents is tedious. We have 50 contracts/month—clicking upload 50 times is annoying."
- CS: "Got it. We can integrate with your document management system to auto-sync. I'll set that up for you by next week."

**Success metric: Customer comfortable enough to submit 20+ tasks in Week 4**

### Week 4: Proof of Value

**Goal**: Customer sees clear ROI, commits to continuing.

**Week 4 check-in (45 min):**

**1. 30-day results summary**
```
30-Day Pilot Results:

Volume:
- Tasks completed: 35 contracts reviewed
- Tasks per week: Weeks 1-2: 5, Week 3: 10, Week 4: 20 (scaling nicely)

Quality:
- Overall accuracy: 91% (33/35 tasks correct)
- Weeks 1-2: 82% accuracy
- Weeks 3-4: 95% accuracy (met threshold!)

Time Savings:
- Baseline: 35 contracts × 2 hours = 70 hours
- With AI: 35 contracts × 0.5 hours review = 17.5 hours
- Saved: 52.5 hours (75% reduction)

Cost Savings:
- Baseline: 70 hours × $300/hour = $21,000
- With AI: $1,750 (AI) + $5,250 (review) = $7,000
- Saved: $14,000 (67% reduction)

ROI: $14K saved / $3K cost = 4.7x return in first month
```

**2. Customer feedback**
- CS: "How do you feel about the results?"
- Customer: "Quality is good now. We're comfortable using this for routine contracts. Still want human-only for complex M&A deals."
- CS: "That makes sense. Let's scale up routine contracts (50/month) and keep M&A with your team."

**3. Commitment**
- CS: "Based on these results, does it make sense to continue?"
- Customer: "Yes, let's do it. Can we expand to 50 contracts/month?"
- CS: "Absolutely. Here's the plan for Month 2..." [discuss expansion]

**Success metric: Customer commits to continuing (renewal or expansion)**

**Typical conversion: 70-80% of customers who complete 4-week onboarding continue.**

## Phase 2: Adoption (Months 2-6)

### Month 2-3: Workflow Integration

**Goal**: Customer uses SaS as part of daily workflow (not "special project").

**Activities:**

**1. Integrations**
- Connect to customer's systems (Salesforce, NetDocuments, QuickBooks, etc.)
- Auto-sync data (no manual uploads)
- Automated triggers (e.g., "New contract in CRM → Send to AI for review")

**2. Training additional users**
- Expand from 1-2 pilot users to 5-10 team members
- Group training session (30 min)
- Individual check-ins with new users

**3. Process optimization**
- Identify bottlenecks (e.g., "Review is slow because outputs don't include X")
- Customize outputs to match customer's needs
- Optimize workflows (reduce clicks, automate steps)

**Monthly check-ins:**
- Review usage metrics (tasks/month, accuracy, satisfaction)
- Identify issues early (usage dropping? Quality concerns?)
- Collect feedback (what's working, what's not)

**Success metrics:**
- Customer using 40+ times/month (daily active usage)
- Satisfaction score >85% (thumbs up rate)
- Retention: 90%+ (few customers churn in Months 2-3)

### Month 4-6: Build Habit and Expand

**Goal**: Customer can't imagine working without SaS (habit formed).

**Activities:**

**1. Expand use cases**
- Customer started with "contract review" → Add "contract drafting"
- Customer used for "employment contracts" → Add "NDAs, vendor agreements"
- Example: Pilot.com started with expense categorization → Added financial statements, tax prep, CFO advisory

**2. Upsell and cross-sell**
- Customer paying $3K/month for 50 contracts → Upgrade to $5K/month for 100 contracts + advanced features
- Example: Harvey AI started with research → Added contract review → Added document drafting

**3. Build advocacy**
- Request testimonial or case study
- Ask for referral to similar companies
- Invite to customer advisory board

**Quarterly Business Reviews (QBRs):**

**Agenda (60 min):**

**1. Results review (20 min)**
```
Q1 Results:
- Volume: 450 contracts reviewed (150/month average)
- Quality: 96% accuracy (exceeding 95% target)
- Time saved: 675 hours (50 hours/month)
- Cost saved: $157,500 ($52,500/month)
- ROI: 17.5x (saved $157K for $9K cost)

Customer satisfaction: 92% (excellent!)
```

**2. Roadmap preview (15 min)**
- Show upcoming features
- Get customer input (what do they need next?)
- Set expectations (when features will ship)

**3. Expansion discussion (15 min)**
- "You're using us for contract review. Have you thought about contract drafting?"
- "You're at 150 contracts/month. Trending toward 200+. Should we upgrade your plan?"
- "Other teams (litigation, IP) have asked about using AI. Should we expand?"

**4. Strategic discussion (10 min)**
- "What are your goals for next quarter?"
- "How can we help you achieve them?"
- "What's the biggest challenge you're facing?"

**Success metrics:**
- Retention: 95%+ (very few customers churn by Month 6 if they've adopted)
- NPS: 50+ (customers are promoters)
- Expansion: 20-30% of customers increase spend in Months 4-6

## Phase 3: Expansion (Months 7+)

### Driving Account Growth

**Goal**: Grow each account by 2-3x over 12-18 months.

**Expansion vectors:**

**1. Volume growth**
- Customer using 150 contracts/month → 300 contracts/month
- Organic growth (business growing) + displacement (taking more work from incumbents)

**2. New use cases**
- Started with contract review → Add research, drafting, due diligence
- Example: Harvey AI average customer uses 3+ features by Month 12

**3. New teams/departments**
- Started with Corporate team → Expand to Litigation, IP, Tax
- Example: Multi-practice law firm using Harvey across all practices

**4. New companies (Enterprise accounts)**
- Started with one business unit → Expand to entire organization
- Example: Fortune 500 customer starts with one division, expands to 10+

**Net Revenue Retention (NRR):**

```
NRR = (Starting ARR + Expansion - Churn) / Starting ARR

Example:
- Starting ARR: $100K (100 customers × $1K each)
- Expansion: $30K (30 customers upgrade)
- Churn: $10K (10 customers cancel)
- Ending ARR: $120K

NRR = ($100K + $30K - $10K) / $100K = 120%
```

**Target NRR: 110-130%** (revenue grows even without new customer acquisition)

**Top quartile SaaS: 120%+ NRR**
**Top quartile SaS: 130-150%+ NRR** (higher expansion opportunity due to replacing humans)

### Building Advocacy

**Turn happy customers into advocates:**

**1. Testimonials**
- Request after 6 months (customer has experience to share)
- Make it easy (provide draft, interview customer, write on their behalf)
- Offer incentive (discount, swag, featured on website)

**2. Case studies**
- Deep dive: Customer story, results, metrics
- Use on website, in sales decks, for PR
- Target: 1 case study per quarter (4/year minimum)

**3. Referrals**
- Ask happy customers: "Do you know anyone else who could benefit?"
- Incentivize referrals ($500 credit for successful referral)
- Target: 10-20% of new customers from referrals by Year 2

**4. Reviews**
- G2, Capterra, TrustRadius (for B2B SaaS buyers)
- Glassdoor, Indeed (for hiring)
- Target: 4.5+ stars, 20+ reviews

**5. Advisory board**
- Invite 10-15 top customers
- Quarterly meetings (product roadmap, feedback, networking)
- Benefits: Early access to features, influence product, network with peers

## Customer Success Team Structure

### When to Hire CS

**Pre-$1M ARR (0-50 customers):**
- Founder is CS (no dedicated CS hire yet)
- Founder does onboarding, check-ins, QBRs
- Goal: Learn what customers need to succeed

**$1M-$5M ARR (50-200 customers):**
- Hire first CS Manager ($80K-$120K)
- CSM handles onboarding, adoption, renewals
- Ratio: 1 CSM per 50-100 customers (depending on ACV)

**$5M-$20M ARR (200-1,000 customers):**
- Build CS team (3-5 CSMs + 1 CS Director)
- Segment customers: High-touch (enterprise), medium-touch (mid-market), low-touch (SMB)
- Ratio: 1 CSM per $2M-$3M ARR

**$20M+ ARR:**
- Scale CS team (10+ CSMs, Support team, CS Ops)
- Specialize CSMs by vertical or customer segment
- Invest in CS tools (Gainsight, ChurnZero)

### CS Role Responsibilities

**Customer Success Manager (CSM):**
- Own customer relationship
- Drive onboarding and adoption
- Conduct QBRs and health checks
- Identify upsell opportunities
- Prevent churn

**Customer Support (different from CSM):**
- Answer questions (chat, email, phone)
- Troubleshoot technical issues
- Escalate to engineering when needed
- Goal: Fast response, high satisfaction

**Customer Success Operations:**
- Build playbooks and processes
- Track metrics (usage, satisfaction, churn)
- Identify trends and patterns
- Support CSMs with data and tools

### CS Metrics

**Leading indicators (predict churn):**
- **Usage frequency**: Logins/tasks per month
- **Feature adoption**: % of features used
- **Satisfaction**: NPS, CSAT
- **Support tickets**: Frequency and sentiment
- **QBR attendance**: Are they engaged?

**Lagging indicators (measure outcomes):**
- **Churn rate**: % of customers who cancel
- **NRR**: Net Revenue Retention
- **Expansion rate**: % of customers who upsell
- **LTV**: Customer lifetime value

**Customer Health Score:**

```python
def calculate_health_score(customer):
    # Usage (0-40 points)
    usage_score = min(customer.tasks_per_month / 50, 1) * 40

    # Satisfaction (0-30 points)
    satisfaction_score = (customer.nps + 100) / 200 * 30

    # Engagement (0-20 points)
    engagement_score = (
        (customer.attended_qbr * 5) +
        (customer.opened_emails * 10) +
        (customer.used_support * 5)
    )

    # Financial (0-10 points)
    financial_score = min(customer.arr / 50000, 1) * 10

    total_score = usage_score + satisfaction_score + engagement_score + financial_score

    if total_score >= 80:
        return "Healthy" (green)
    elif total_score >= 50:
        return "At Risk" (yellow)
    else:
        return "Churning" (red)
```

**Use health scores to prioritize CS time:**
- **Green (Healthy)**: Low-touch (quarterly QBRs, expansion conversations)
- **Yellow (At Risk)**: Medium-touch (monthly check-ins, identify issues)
- **Red (Churning)**: High-touch (weekly calls, executive escalation, save plan)

## Preventing Churn

### Common Churn Reasons

**Churn Reason 1: Never activated**
- Customer signed up but never used product
- **Prevention**: Aggressive onboarding (call within 24 hours, hand-hold through first task)

**Churn Reason 2: Quality issues**
- AI made mistakes, customer lost trust
- **Prevention**: Set expectations (95% not 100%), human review workflow, insurance

**Churn Reason 3: Workflow friction**
- Product doesn't fit into daily workflow, too much effort to use
- **Prevention**: Integrations, process optimization, reduce clicks

**Churn Reason 4: No champion**
- Person who signed up left company, no one else uses it
- **Prevention**: Expand to multiple users, build advocacy across team

**Churn Reason 5: Budget cuts**
- Company had layoffs, cutting all discretionary spend
- **Prevention**: Prove ROI (hard to cut something that saves money), offer discounts

**Churn Reason 6: Competitor won**
- Customer switched to competitor
- **Prevention**: Competitive differentiation, deliver value competitor doesn't

### Churn Recovery Process

**When customer cancels:**

**Step 1: Understand why (exit interview)**
- "Can you share why you're canceling?" [LISTEN]
- "What could we have done differently?"
- "Is there anything we can do to change your mind?"

**Step 2: Offer alternatives**
- **Pause subscription**: "How about we pause for 3 months instead of canceling? You might need us again."
- **Downgrade**: "Instead of $3K/month, how about $1K/month for limited usage?"
- **Discount**: "If budget is the issue, I can offer 30% off for 6 months."

**Step 3: If they still churn, win them back later**
- Stay in touch (quarterly check-in email)
- Share product updates
- 20-30% of churned customers come back within 12 months if you stay engaged

## Key Takeaways

**1. Onboarding is make-or-break**
- 40% churn risk in first 30 days (customers who never activate)
- Goal: Customer completes 10+ tasks in first month
- CS must drive activation (don't wait for customer to figure it out)

**2. Four-week onboarding process**
- Week 1: Setup, first 5 tasks
- Week 2: Quality review, address concerns
- Week 3: Build confidence, 10 tasks
- Week 4: Prove ROI, commit to continuing

**3. Adoption requires behavior change**
- SaS isn't just software—it's changing how customers work
- Requires training, integrations, process optimization
- CS role: Drive adoption, not just answer questions

**4. Expansion is the growth engine**
- Target: 110-130% Net Revenue Retention
- Expansion vectors: Volume growth, new use cases, new teams
- QBRs identify expansion opportunities

**5. Customer Health Score predicts churn**
- Leading indicators: Usage, satisfaction, engagement
- Lagging indicators: Churn, NRR, LTV
- Prioritize CS time based on health scores

**6. Build CS team at $1M ARR**
- Pre-$1M: Founder is CS
- $1M-$5M: Hire first CSM ($80K-$120K)
- $5M+: Build CS team (1 CSM per $2M-$3M ARR)

**7. Turn customers into advocates**
- Testimonials, case studies, referrals
- Target: 10-20% of new customers from referrals by Year 2
- Advisory board (10-15 top customers)

---

You've now learned how to build customer success for Services-as-Software, from onboarding through adoption to expansion and advocacy.

**Next**: Chapter 14 covers building trust at scale—how to maintain quality and trust as you grow from 10 to 1,000 to 10,000 customers.
