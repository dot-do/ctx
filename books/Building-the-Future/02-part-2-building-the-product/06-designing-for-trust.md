# Chapter 6: Designing for Trust: Quality, Explainability, Human Escalation

In 2023, a well-funded accounting AI startup launched with impressive accuracy: 94% correct categorization of business expenses, validated against human accountants.

They expected rapid adoption. Instead, they faced customer resistance.

**The feedback was consistent:**

"The AI is probably right, but I don't know *why* it categorized this way."

"What happens if it makes a mistake on my tax return?"

"I need to see its work before I trust it."

Despite accuracy superior to human bookkeepers (who typically achieve 85-90% accuracy), customers didn't trust the AI. The company struggled to reach $500K ARR before shutting down.

**The lesson**: Accuracy isn't enough. Professional services customers need to trust that the service is reliable, explainable, and has safeguards when things go wrong.

This chapter teaches you how to architect trust into Services-as-Software products.

## Why Trust is the Primary Barrier

### Traditional Software vs. Services-as-Software

**Traditional SaaS:**
- **Failure mode**: Software crashes, data doesn't save, feature doesn't work
- **Consequence**: User notices immediately, retries or contacts support
- **Recovery**: Fix bug, user continues
- **Trust requirement**: Moderate—users understand software has bugs

**Services-as-Software:**
- **Failure mode**: AI gives wrong answer, misses critical detail, generates plausible but incorrect output
- **Consequence**: User may not notice, acts on bad advice, faces legal/financial consequences
- **Recovery**: Difficult—damage already done (bad tax advice, missed contract clause, wrong diagnosis)
- **Trust requirement**: Extremely high—mistakes have real-world consequences

**Professional services involve high-stakes decisions**. A wrong answer in contract review, financial advice, or tax filing can cost thousands or millions of dollars.

Customers won't adopt AI unless they believe it's more reliable than the human alternative—or at least has safeguards when it fails.

### The Trust Equation

```
Trust = (Perceived Quality × Explainability) / Risk

Where:
- Perceived Quality: How accurate does the user think the AI is?
- Explainability: Can the user understand and verify the AI's reasoning?
- Risk: What are the consequences of a mistake?
```

**Key insight**: To increase trust, you must:
1. Increase perceived quality (confidence scoring, validation, consistency)
2. Increase explainability (show reasoning, cite sources, provide audit trails)
3. Decrease risk (human review, insurance, guarantees)

## The Trust Architecture Canvas

The Trust Architecture Canvas is a framework for systematically building trust into your product across three dimensions:

### The Three Dimensions of Trust

**1. Quality Assurance**
- How do you ensure outputs are correct?
- What validation layers catch errors?
- How do you measure and improve quality over time?

**2. Explainability**
- Can users understand how the AI reached its conclusion?
- Can they verify the AI's reasoning?
- Do they have visibility into the process?

**3. Human Escalation**
- When should humans review AI outputs?
- How do you route tasks to human experts?
- What's the balance between automation and human oversight?

All three dimensions must be strong for customers to trust your service.

### The Trust Architecture Canvas (Template)

| **Dimension** | **Questions to Answer** | **Implementation** |
|---------------|------------------------|-------------------|
| **Quality Assurance** | How do we ensure accuracy? | - Validation layers<br>- Confidence scoring<br>- Consistency checks<br>- A/B testing<br>- Regression tests |
| **Explainability** | How do users verify outputs? | - Show reasoning<br>- Cite sources<br>- Audit trails<br>- Step-by-step breakdowns<br>- Comparison to alternatives |
| **Human Escalation** | When do humans get involved? | - Escalation triggers<br>- Human review workflows<br>- Expert availability<br>- Feedback loops<br>- Quality monitoring |

Let's explore each dimension in depth.

## Dimension 1: Quality Assurance

Quality assurance is about ensuring outputs are correct and building systems to detect errors.

### Layer 1: Validation Rules

**What it is**: Programmatic checks that outputs meet basic requirements.

**Example: Harvey AI (Legal Contracts)**

```python
class ContractValidator:
    def validate(self, contract):
        errors = []

        # Schema validation
        if not contract.parties or len(contract.parties) < 2:
            errors.append("Contract must have at least 2 parties")

        if not contract.effective_date:
            errors.append("Contract must have effective date")

        # Business logic validation
        if contract.termination_date <= contract.effective_date:
            errors.append("Termination date must be after effective date")

        if contract.payment_terms.amount <= 0:
            errors.append("Payment amount must be positive")

        # Domain-specific validation
        if "unlimited liability" in contract.text.lower():
            errors.append("Unlimited liability clause detected - high risk")

        if contract.type == "employment" and not contract.has_clause("at-will"):
            errors.append("Employment contracts typically include at-will clause")

        return ValidationResult(
            passed=len(errors) == 0,
            errors=errors
        )
```

**Why it matters**: Catches obvious errors before showing to customer. Should catch 30-50% of AI mistakes.

### Layer 2: Confidence Scoring

**What it is**: AI assigns confidence score (0-1) to each output based on uncertainty.

**How to implement**:

**Option 1: Model-native confidence**
- Some models (GPT-4, Claude) provide logprobs (log probabilities)
- Lower probability = lower confidence
- **Limitation**: Logprobs don't always correlate with correctness

**Option 2: Consistency checking**
- Generate same output 3-5 times
- If outputs agree: high confidence
- If outputs diverge: low confidence

```python
async def generate_with_confidence(prompt):
    # Generate 3 responses
    responses = await asyncio.gather(*[
        llm.generate(prompt) for _ in range(3)
    ])

    # Check consistency
    if all_similar(responses):
        return ConfidentOutput(
            result=responses[0],
            confidence=0.95
        )
    elif any_similar(responses, threshold=2):
        return ModerateConfidenceOutput(
            result=most_common(responses),
            confidence=0.75
        )
    else:
        return LowConfidenceOutput(
            result=responses[0],
            confidence=0.40
        )
```

**Option 3: Retrieval confidence**
- For RAG-based systems: How relevant were retrieved documents?
- High relevance = high confidence
- Low relevance = low confidence

**Why it matters**: Confidence scores enable smart escalation (send low-confidence outputs to humans).

### Layer 3: Cross-Validation

**What it is**: Use multiple approaches and compare results.

**Example: Pilot.com (Expense Categorization)**

```python
class ExpenseCategorizationSystem:
    def categorize(self, expense):
        # Approach 1: AI prediction
        ai_category = self.ai_model.predict(expense)
        ai_confidence = self.ai_model.confidence

        # Approach 2: Rules-based (vendor patterns)
        rule_category = self.rule_engine.categorize(expense)
        rule_confidence = self.rule_engine.confidence

        # Approach 3: Historical data (similar expenses)
        similar = self.find_similar_expenses(expense)
        historical_category = mode([e.category for e in similar])
        historical_confidence = similarity_score(similar)

        # Cross-validate
        if ai_category == rule_category == historical_category:
            # All agree: high confidence
            return CategoryResult(
                category=ai_category,
                confidence=0.95,
                escalate=False
            )
        elif ai_category == rule_category or ai_category == historical_category:
            # Two agree: moderate confidence
            return CategoryResult(
                category=ai_category,
                confidence=0.80,
                escalate=False
            )
        else:
            # Disagreement: low confidence, escalate
            return CategoryResult(
                category=ai_category,
                confidence=0.50,
                escalate=True,
                reason=f"AI={ai_category}, Rules={rule_category}, Historical={historical_category}"
            )
```

**Why it matters**: Cross-validation catches AI mistakes that single-approach systems miss.

**Result for Pilot.com**: 97% accuracy with cross-validation vs. 88% with AI alone.

### Layer 4: Quality Monitoring

**What it is**: Continuous monitoring of output quality, drift detection, and improvement.

**Key metrics to track:**

**1. Accuracy (when ground truth is known)**
```python
# For cases where human reviews AI output
accuracy = correct_outputs / total_outputs

# Track by:
- Task type (contract review vs. drafting)
- Customer segment (enterprise vs. SMB)
- Time period (detect drift over time)
```

**2. Override rate (when humans modify AI outputs)**
```python
override_rate = (outputs_modified_by_humans) / total_outputs

# Low override rate (5-10%) = AI is accurate
# High override rate (30%+) = AI needs improvement
```

**3. Escalation rate (outputs sent to humans)**
```python
escalation_rate = outputs_escalated_to_humans / total_outputs

# Target: Start at 30-50%, decrease to 5-10% over 12-18 months
```

**4. Customer satisfaction**
```python
# Thumbs up/down on AI outputs
satisfaction_rate = thumbs_up / (thumbs_up + thumbs_down)

# Target: 85%+ satisfaction
```

**Implementation: Real-time quality dashboard**

```python
class QualityMonitor:
    async def track_output(self, output, human_feedback):
        await self.metrics.record({
            'timestamp': datetime.now(),
            'task_type': output.task_type,
            'confidence': output.confidence,
            'escalated': output.escalated,
            'human_modified': human_feedback.modified,
            'customer_satisfaction': human_feedback.rating,
            'error_type': human_feedback.error_type if human_feedback.error else None
        })

    async def detect_drift(self):
        # Check if quality is degrading
        last_7_days = await self.metrics.get_accuracy(days=7)
        previous_30_days = await self.metrics.get_accuracy(days=30, offset=7)

        if last_7_days < previous_30_days - 0.05:  # 5 percentage point drop
            await self.alert_team("Quality drift detected!")

    async def identify_problem_areas(self):
        # Which task types have lowest quality?
        return await self.metrics.aggregate([
            {'group_by': 'task_type'},
            {'sort_by': 'accuracy', 'order': 'asc'}
        ])
```

**Why it matters**: You can't improve what you don't measure. Quality monitoring enables systematic improvement.

### The 90/95/99 Rule

**Observation from the field:**

- **90% automation** is relatively easy (achievable with GPT-4 + basic RAG in 3-6 months)
- **95% automation** is hard (requires domain expertise, validation, 12-18 months)
- **99% automation** might be impossible (edge cases, ambiguity, evolving regulations)

**Implications:**

**For 90% automation:**
- Good enough for low-stakes tasks (FAQ answering, content drafts)
- Not sufficient for professional services (too many mistakes)
- Requires 10% human review or accept 10% error rate

**For 95% automation:**
- Sufficient for many professional services (with 5% human review)
- Requires significant investment in domain expertise
- Most successful SaS companies target this level

**For 99% automation:**
- Required for highest-stakes domains (medical diagnosis, legal advice)
- May not be technically feasible with current AI
- Requires extensive human oversight (reduces cost savings)

**Decision framework:**

| **Quality Target** | **Use Cases** | **Investment Required** | **Human Review** |
|-------------------|---------------|------------------------|------------------|
| **90%** | Content generation, basic categorization, FAQ | 3-6 months, $500K-$1M | 10-20% |
| **95%** | Financial reporting, contract review, code review | 12-18 months, $2M-$5M | 5-10% |
| **99%** | Medical diagnosis, tax filing, legal advice | 24+ months, $10M+ | 20-30% |

**Key insight**: Most SaS companies target 95% automation with 5% human review. Trying to reach 99% delivers diminishing returns.

## Dimension 2: Explainability

Explainability is about helping users understand and verify AI outputs.

### Why Explainability Matters

**Study from Stanford (2023)**: When users could see AI reasoning, trust increased 40% even when accuracy was identical.

**Why**: Humans need to verify outputs for themselves. "Black box" AI feels risky.

### Explainability Technique 1: Show Reasoning (Chain of Thought)

**What it is**: Show the AI's step-by-step thinking process.

**Example: Harvey AI (Contract Analysis)**

**Without explainability:**
```
User: "Review this employment agreement for risks."

AI: "This contract has high risk. I recommend revisions."
```

**With explainability:**
```
User: "Review this employment agreement for risks."

AI: "I've identified 3 high-risk areas:

Risk 1: Unlimited Non-Compete Clause (Clause 7.2)
└─ Reasoning:
   1. Clause 7.2 prohibits employee from working for competitors "indefinitely"
   2. Non-competes without time limits are generally unenforceable in California (Business & Professions Code § 16600)
   3. This creates legal risk and may not provide intended protection
└─ Recommendation: Limit to 1-2 years, standard for industry

Risk 2: Ambiguous IP Assignment (Clause 5.1)
└─ Reasoning:
   1. Clause 5.1 assigns "all inventions" to company
   2. Does not clarify if this includes inventions made:
      - Before employment
      - Outside work hours
      - Using personal resources
   3. California Labor Code § 2870 limits employer IP rights
└─ Recommendation: Clarify scope per § 2870 requirements

Risk 3: No At-Will Disclaimer (Missing)
└─ Reasoning:
   1. Contract does not state employment is "at-will"
   2. Without explicit at-will language, employee may claim implied contract
   3. This limits employer's ability to terminate
└─ Recommendation: Add at-will disclaimer in Section 1
```

**Result**: User can verify each risk independently, increasing trust.

**Implementation:**
```python
# Use chain-of-thought prompting
prompt = """
Analyze this contract for risks. For each risk you identify:
1. State the risk
2. Explain your reasoning step-by-step
3. Cite specific clauses and laws
4. Provide a recommendation

Contract: {contract_text}
"""
```

### Explainability Technique 2: Cite Sources

**What it is**: Show where information came from.

**Example: Intercom Fin (Customer Support)**

**Without citations:**
```
User: "How do I reset my password?"

AI: "You can reset your password by going to Settings > Security > Reset Password."
```

**With citations:**
```
User: "How do I reset my password?"

AI: "You can reset your password by going to Settings > Security > Reset Password. [1]

If you've forgotten your email, contact support at support@example.com. [2]

[1] Source: Help Center > Account Management > Password Reset
[2] Source: Help Center > Contact Support
```

**Why it matters**: Users can verify answers independently. If sources look authoritative, trust increases.

**Implementation (RAG with citations):**
```python
async def generate_answer_with_citations(query):
    # Retrieve relevant documents
    docs = await retriever.search(query, top_k=5)

    # Generate answer with citations
    prompt = f"""
Answer this question using the provided sources.
For each fact, cite the source using [1], [2], etc.

Question: {query}

Sources:
[1] {docs[0].content} (from {docs[0].source})
[2] {docs[1].content} (from {docs[1].source})
...

Answer:
"""

    answer = await llm.generate(prompt)

    return AnswerWithCitations(
        answer=answer,
        sources=[
            {"id": i+1, "title": doc.title, "url": doc.url}
            for i, doc in enumerate(docs)
        ]
    )
```

### Explainability Technique 3: Show Confidence and Alternatives

**What it is**: Show how confident the AI is and present alternatives.

**Example: Pilot.com (Expense Categorization)**

```
Expense: "Dinner at Nobu - $347"

AI Categorization:
✓ Meals & Entertainment (Confidence: 85%)

Alternative Categorizations:
• Client Entertainment (Confidence: 60%)
• Travel Meals (Confidence: 40%)

Reasoning:
• "Nobu" is a known restaurant (high confidence it's a meal)
• Amount ($347) suggests business meal, not personal
• Without additional context (client meeting notes, travel dates), defaulting to Meals & Entertainment
• If this was a client meeting, recategorize as Client Entertainment

[Correct] [Recategorize] [Add Context]
```

**Why it matters**: Shows AI is uncertain, invites user correction, builds trust through transparency.

### Explainability Technique 4: Audit Trails

**What it is**: Log every step of the process for later review.

**Example: Harvey AI (Contract Drafting)**

```
Audit Trail for Contract #12345:

1. User Input Received (2024-03-15 10:23 AM)
   └─ Contract Type: Series A Term Sheet
   └─ Amount: $15M
   └─ Valuation: $75M post-money

2. Template Retrieved (10:23 AM)
   └─ Source: Y Combinator Series A Template v3.2
   └─ Relevance Score: 0.94

3. Sections Generated (10:23-10:25 AM)
   └─ Investment Amount: GPT-4o (confidence: 0.99)
   └─ Valuation: GPT-4o (confidence: 0.99)
   └─ Liquidation Preference: GPT-4o (confidence: 0.87)
   └─ Board Composition: GPT-4o (confidence: 0.82)
   ...

4. Validation Checks (10:25 AM)
   ✓ Math validated (post-money = pre-money + investment)
   ✓ Required clauses present (17/17)
   ⚠ Board size is even (flagged for review)

5. Human Review (10:25 AM)
   └─ Assigned to: Sarah Chen, Attorney
   └─ Review time: 8 minutes
   └─ Changes: Modified board composition from 4 to 5 members

6. Final Output (10:33 AM)
   └─ Delivered to: jason@startup.com
   └─ Format: PDF + Word
```

**Why it matters**: Enterprise customers need audit trails for compliance. Investors want to see exactly how decisions were made.

**Implementation:**
```python
class AuditLogger:
    async def log_step(self, contract_id, step_name, details):
        await self.db.audit_logs.insert({
            'contract_id': contract_id,
            'timestamp': datetime.now(),
            'step': step_name,
            'details': details,
            'user': current_user(),
            'model': self.config.model_version
        })

    async def get_audit_trail(self, contract_id):
        logs = await self.db.audit_logs.find({'contract_id': contract_id})
        return self.format_timeline(logs)
```

### Explainability Technique 5: Comparison to Human Baseline

**What it is**: Show how AI output compares to what a human would do.

**Example: Jasper (Content Generation)**

```
Blog Post Generated by AI:

AI Version (GPT-4):
"10 Strategies to Boost Your E-commerce Conversion Rate"

Word count: 1,847 words
Reading level: Grade 8
SEO score: 87/100
Estimated human time: 3-4 hours
Generated in: 2 minutes

Comparison to Human Benchmark:
• Length: Similar to typical blog posts (1,500-2,000 words)
• Quality: Comparable to mid-level content writer (Grammarly score: 94)
• SEO: Above average (typical score: 75-85)
• Originality: 100% original (passed Copyscape)

[Use This Version] [Regenerate] [Edit Manually]
```

**Why it matters**: Grounds AI output in familiar terms ("comparable to mid-level writer"). Users understand what they're getting.

## Dimension 3: Human Escalation

Human escalation is about knowing when to involve experts and building workflows to route tasks efficiently.

### When to Escalate: Three Triggers

**Trigger 1: Low Confidence**
- AI confidence score below threshold (e.g., <70%)
- Example: Legal contract analysis with ambiguous clauses

**Trigger 2: High Stakes**
- Task has significant financial or legal consequences
- Example: Tax return review (mistakes = IRS audit)

**Trigger 3: Novel Situations**
- Task doesn't match training data patterns
- Example: First-of-its-kind contract structure

**Escalation decision tree:**
```python
def should_escalate(task, output):
    # Rule 1: Always escalate if confidence is low
    if output.confidence < 0.70:
        return True, "Low confidence"

    # Rule 2: Escalate high-value tasks regardless of confidence
    if task.value > 10000:  # $10K+
        return True, "High stakes"

    # Rule 3: Escalate novel situations
    similarity_to_training = compute_similarity(task, training_data)
    if similarity_to_training < 0.60:
        return True, "Novel situation"

    # Rule 4: Random sampling for quality control
    if random.random() < 0.05:  # 5% random sample
        return True, "Quality control sample"

    return False, None
```

### Human Review Workflows

**Pattern 1: Review Before Delivery**

```
AI Generates Output → Human Reviews → Approve or Edit → Deliver to Customer
```

**When to use**: High-stakes domains (legal, medical, finance)
**Pros**: Catches errors before customer sees them
**Cons**: Slower, requires human availability

**Example: Harvey AI**
- All contract drafts reviewed by attorney before sending to customer
- Review time: 5-15 minutes (vs. 2-4 hours to draft from scratch)
- Error rate: <1% after review (vs. 5-10% AI-only)

**Pattern 2: Deliver with Review Option**

```
AI Generates Output → Deliver to Customer → Customer Requests Review → Human Reviews
```

**When to use**: Medium-stakes domains where most outputs are correct
**Pros**: Faster, fewer human hours required
**Cons**: Customer sees AI errors occasionally

**Example: Pilot.com (Bookkeeping)**
- AI categorizes expenses, delivers to customer monthly
- Customer can flag any categorization for accountant review
- ~3% of expenses get flagged (vs. 30-50% in early days)

**Pattern 3: Async Review + Feedback Loop**

```
AI Generates Output → Deliver to Customer → Human Audits Sample → Improve AI
```

**When to use**: Lower-stakes, high-volume tasks
**Pros**: Scales well, continuous improvement
**Cons**: Some errors reach customers

**Example: Intercom Fin (Customer Support)**
- AI answers support queries autonomously
- Human agents review 5% of conversations weekly
- Feedback used to improve AI prompts and retrieval

### Building the Review Team

**Two organizational models:**

**Model 1: Centralized Expert Team**
- Dedicated team of domain experts (lawyers, accountants, etc.)
- They review all escalated tasks
- **Pros**: Consistent quality, easier to train
- **Cons**: Can become bottleneck

**Example: Harvey AI**
- Team of 15 attorneys review all contract drafts
- Each attorney reviews 20-30 contracts per day
- Supported by 100+ engineers building AI

**Model 2: Distributed Experts**
- Customers have their own experts (in-house accountants, lawyers)
- AI delivers to customer's expert for review
- **Pros**: Scales better, no bottleneck
- **Cons**: Quality varies, harder to get feedback

**Example: Jasper**
- AI generates content
- Customer's marketing team reviews and edits
- Jasper doesn't employ content experts

**Recommendation:**

| Stage | Model | Rationale |
|-------|-------|-----------|
| **Pre-PMF** | Centralized | Learn from every review, improve quality quickly |
| **Early Growth** | Hybrid | Centralized for complex, distributed for simple |
| **Scale** | Distributed | Can't afford to review everything, trust has been built |

### Reducing Human Review Over Time

**Goal**: Start with 30-50% human review, decrease to 5-10% over 12-18 months.

**How to reduce review rate:**

**Month 1-3: High Review (30-50%)**
- Review all high-stakes tasks
- Review random sample of low-stakes tasks
- Collect feedback on AI errors

**Month 4-6: Identify Patterns (20-30% review)**
- Analyze errors: What patterns emerge?
- Improve AI prompts and retrieval for common errors
- Increase confidence threshold for auto-approval

**Month 7-12: Targeted Review (10-20%)**
- Only review low-confidence outputs
- Auto-approve high-confidence, low-stakes tasks
- Continue random sampling (5%) for quality control

**Month 13-18: Mature System (5-10%)**
- Auto-approve 90-95% of outputs
- Review only edge cases and quality samples
- Human experts shift focus to improving AI, not reviewing outputs

**Example: Pilot.com's journey**

| Time Period | Review Rate | Accuracy | Strategy |
|-------------|-------------|----------|----------|
| **Launch (2019)** | 80% | 75% | Accountants review almost everything |
| **Year 1 (2020)** | 50% | 85% | Review only ambiguous expenses |
| **Year 2 (2021)** | 20% | 92% | Review only low-confidence + random sample |
| **Year 3 (2022)** | 8% | 97% | Review only edge cases |
| **Year 4 (2023)** | 5% | 97% | Review for quality control + continuous improvement |

**Key insight**: As AI improves, human role shifts from "review all outputs" to "improve the AI."

## Trust Thresholds by Customer Segment

Different customers have different trust requirements.

### Enterprise (>1,000 employees)

**Trust requirements: Highest (99%+ accuracy)**

**Why:**
- Mistakes have massive consequences (legal liability, brand risk)
- Procurement requires vendor due diligence
- Compliance and audit requirements

**What enterprises need:**
- SOC 2 certification
- SLAs with financial penalties
- Insurance coverage (errors & omissions)
- Audit trails for all AI decisions
- Option for human review on every task
- On-premises deployment (for some industries)

**Sales cycle**: 6-12 months (due to trust-building requirements)

**Example: Harvey AI's enterprise approach**
- All contracts reviewed by human attorney before delivery
- SOC 2 Type II certification
- $5M E&O insurance policy
- Full audit trails
- Contractual SLAs (99.9% uptime, <1% error rate)

### Mid-Market (100-1,000 employees)

**Trust requirements: High (95%+ accuracy)**

**Why:**
- Mistakes are costly but not catastrophic
- Less formal procurement, but still diligent
- Some compliance requirements

**What mid-market needs:**
- High accuracy with spot-checking
- Clear escalation path to human experts
- SOC 2 (nice to have, not requirement)
- Case studies from similar companies
- Risk mitigation (satisfaction guarantees)

**Sales cycle**: 2-4 months

**Example: Pilot.com's mid-market approach**
- 95% accuracy via AI + human review of edge cases
- 30-day money-back guarantee
- Access to accountants for questions
- No formal SLAs, but high quality

### SMB (<100 employees)

**Trust requirements: Moderate (90%+ accuracy)**

**Why:**
- Cost savings outweigh occasional mistakes
- Less formal procurement
- Higher risk tolerance

**What SMBs need:**
- "Good enough" quality at low price
- Fast turnaround time
- Easy to use (self-serve)
- Option to upgrade to human review

**Sales cycle**: Days to weeks (self-serve or light-touch sales)

**Example: Jasper's SMB approach**
- AI-generated content with no human review
- Free trial (low risk)
- 90%+ customer satisfaction (per Jasper's metrics)
- Users edit outputs themselves if needed

### Consumer / Prosumer

**Trust requirements: Lower (80-90% accuracy)**

**Why:**
- Free or low cost (expect some issues)
- Non-critical use cases
- Can easily regenerate or try again

**What consumers need:**
- Fast and free (or cheap)
- Transparency about AI limitations
- Easy regeneration

**Example: ChatGPT**
- No human review
- No accuracy guarantees
- Free tier available
- Users understand outputs may be wrong

**Key insight**: Enterprise customers pay 10-100x more than SMBs but require much higher trust levels. Design your product and GTM strategy accordingly.

## Common Trust Mistakes

### Mistake 1: Adding Trust Features After Launch

**Symptom**: Launch with basic AI, plan to add explainability and review workflows later.

**Why it fails**: Customers form trust opinions immediately. If first impression is "black box AI," they won't come back.

**Fix**: Build trust architecture from day one. Explainability and human escalation should be in your MVP.

### Mistake 2: Over-Indexing on Accuracy

**Symptom**: Focus 100% on improving accuracy, neglect explainability.

**Why it fails**: 95% AI with no explainability is less trusted than 90% AI with full explainability.

**Fix**: Balance accuracy improvements with explainability features.

### Mistake 3: No Path to Improve

**Symptom**: AI makes mistakes, but no feedback loop to learn from them.

**Why it fails**: Quality stagnates, customer trust erodes over time.

**Fix**: Build quality monitoring and feedback loops from day one. Track every error and improve.

### Mistake 4: Eliminating Humans Too Early

**Symptom**: Remove human review to cut costs before AI is ready.

**Why it fails**: Accuracy drops, customer trust disappears, churn increases.

**Fix**: Reduce human review gradually over 12-18 months as AI improves. Don't rush it.

### Mistake 5: One-Size-Fits-All Trust

**Symptom**: Same trust level for all customers (enterprise and SMB get same experience).

**Why it fails**: Enterprises need more trust features than SMBs. SMBs don't want to pay for enterprise-grade review.

**Fix**: Segment by customer size. Enterprise gets human review + audit trails. SMB gets self-serve with optional review.

## Key Takeaways

**1. Trust must be architected from day one**
- Quality assurance, explainability, and human escalation are not "nice to have"
- Build trust features into your MVP, not as "phase 2"
- Customers form trust opinions on first use—get it right from the start

**2. Explainability > Accuracy for adoption**
- 90% accurate AI with full explainability beats 95% accurate black box
- Show reasoning, cite sources, provide audit trails
- Transparency builds trust even when AI makes mistakes

**3. The 90/95/99 Rule**
- 90% automation is easy, 95% is hard, 99% might be impossible
- Most SaS companies should target 95% with 5-10% human review
- Diminishing returns beyond 95%

**4. Human review should decrease over time**
- Start: 30-50% human review
- Mature: 5-10% human review
- Shift humans from "reviewing outputs" to "improving AI"

**5. Trust thresholds vary by customer segment**
- Enterprise needs 99%+ accuracy, audit trails, SLAs
- SMB accepts 90% if cost is low
- Design product and pricing for your target segment

**6. Confidence scoring enables smart escalation**
- Every output should have a confidence score
- Low confidence → human review
- High confidence → auto-approve
- Confidence threshold should increase over time as AI improves

**7. Quality monitoring is essential**
- Track accuracy, override rate, escalation rate, customer satisfaction
- Detect drift (quality degrading over time)
- Build feedback loops to improve systematically

---

You've now learned how to architect trust into Services-as-Software products through quality assurance, explainability, and human escalation.

**Next**: Chapter 7 covers the MVP—how to scope your Minimum Viable Professional Service to deliver real value while staying lean.
