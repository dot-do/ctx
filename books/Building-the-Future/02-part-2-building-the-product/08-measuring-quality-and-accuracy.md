# Chapter 8: Measuring Quality and Accuracy

In mid-2023, a customer support AI startup noticed their NPS dropping from 45 to 20 over three months.

They investigated:
- AI response time: Still fast (2 seconds average)
- Autonomous resolution rate: Actually *improved* from 68% to 72%
- Customer complaints: Increasing

**What was happening?**

The AI had started giving factually correct but tonally inappropriate responses. Example:

**User**: "Your product deleted my data. I'm furious."
**AI**: "According to our knowledge base, data deletion requires explicit user confirmation. Please check your trash folder. Is there anything else I can help you with today?"

**Technically correct. But terrible customer service.**

The team realized: **They were measuring the wrong things.** They tracked *accuracy* (correct information) but not *quality* (appropriate tone, empathy, customer satisfaction).

This chapter teaches you how to measure what actually matters for Services-as-Software quality.

## Why Measurement Matters

### "You Can't Improve What You Don't Measure"

**Without measurement:**
- You don't know if quality is getting better or worse
- You can't identify specific problems to fix
- You can't compare different approaches objectively
- Customers discover quality issues before you do

**With systematic measurement:**
- Detect quality drift before customers complain
- Identify which tasks/edge cases need improvement
- Validate improvements objectively
- Build trust through transparency (publish quality metrics)

### The Four Layers of Quality Measurement

**Layer 1: Accuracy Metrics**
- Is the output factually correct?
- Measurable objectively (correct vs. incorrect)
- Example: Did AI categorize expense correctly?

**Layer 2: Output Quality Metrics**
- Is the output high-quality (beyond just correctness)?
- Requires human judgment
- Example: Is the generated blog post well-written?

**Layer 3: Customer Satisfaction Metrics**
- Does the customer find value in the output?
- Measured through feedback and behavior
- Example: Did customer use the AI output or regenerate?

**Layer 4: Business Metrics**
- Does the service deliver business value?
- Measured in outcomes, not outputs
- Example: Did automated support reduce cost per ticket?

**You need all four layers** to understand true quality. Accuracy alone isn't sufficient.

## Layer 1: Accuracy Metrics

Accuracy metrics measure objective correctness when ground truth is known.

### When Accuracy Metrics Apply

**Good for:**
- Classification tasks (expense categorization, document type detection)
- Extraction tasks (pulling contract terms, extracting invoice data)
- Q&A with verifiable answers (legal research, technical support)
- Tasks with clear right/wrong answers

**Not applicable for:**
- Creative generation (writing, brainstorming) – quality is subjective
- Strategic advice (consulting, investment recommendations) – no single right answer
- Open-ended tasks (research, analysis) – multiple valid approaches

### Core Accuracy Metrics

**1. Accuracy (Simple)**

```
Accuracy = Correct Outputs / Total Outputs
```

**Example: Expense Categorization**
- 500 expenses
- AI correctly categorizes 475
- Accuracy = 475/500 = 95%

**When to use**: Simple binary tasks (correct or incorrect, no nuance)

**Limitation**: Doesn't account for class imbalance

**2. Precision and Recall**

**Precision**: Of the outputs AI flagged as positive, how many were actually positive?
```
Precision = True Positives / (True Positives + False Positives)
```

**Recall**: Of all the actual positives, how many did AI find?
```
Recall = True Positives / (True Positives + False Negatives)
```

**Example: Contract Risk Detection**
- 100 contracts reviewed
- AI flags 25 contracts as "high risk"
- Of those 25, 20 are actually high risk (Precision = 20/25 = 80%)
- But there were 30 high-risk contracts total (Recall = 20/30 = 67%)

**Precision-Recall tradeoff**: Higher precision = fewer false alarms, but might miss some. Higher recall = catch everything, but more false alarms.

**When to use**: Imbalanced classes (rare events like contract risks, fraud detection)

**3. F1 Score**

**F1**: Harmonic mean of precision and recall
```
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```

**Why harmonic mean**: Balances precision and recall. Only high if both are high.

**Example from above:**
- Precision = 80%
- Recall = 67%
- F1 = 2 × (0.80 × 0.67) / (0.80 + 0.67) = 0.73 = 73%

**When to use**: Single metric to balance precision and recall

### Building Your Golden Dataset

**What is a golden dataset?**

A curated set of examples with known correct answers, used for testing AI quality.

**Size recommendations:**
- **Minimum**: 100 examples (statistically meaningful)
- **Good**: 300-500 examples (covers common cases)
- **Excellent**: 1,000+ examples (covers edge cases)

**How to build:**

**Step 1: Collect representative examples**

```python
# Sample from real customer data (anonymized)
examples = []

# Get diverse examples
for task_type in ['contract_review', 'legal_research', 'drafting']:
    # Sample 100 from each task type
    samples = db.tasks.sample(task_type, n=100)
    examples.extend(samples)

# Ensure edge cases represented
edge_cases = db.tasks.filter(flagged=True).sample(n=50)
examples.extend(edge_cases)
```

**Step 2: Get ground truth labels**

**Option A: Expert annotation** (most reliable)
- Hire 2-3 domain experts (lawyers for legal AI, accountants for finance AI)
- Have each expert label independently
- Use majority vote or consensus as ground truth
- Cost: $50-$150/hour × 2-5 hours = $100-$750 per 100 examples

**Option B: Customer corrections** (free, but biased)
- Track cases where customers corrected AI outputs
- Use customer correction as ground truth
- Limitation: Only captures errors customers noticed

**Option C: Synthetic generation** (fast, but may not reflect reality)
- Generate examples + answers using GPT-4
- Have humans verify
- Limitation: May not cover real-world edge cases

**Recommendation**: Start with Option B (customer corrections), invest in Option A (expert annotation) once you have $1M+ ARR.

**Step 3: Version and maintain**

```python
# Version your dataset
golden_dataset_v1 = {
    'version': '1.0',
    'created': '2024-01-15',
    'examples': examples,
    'metadata': {
        'num_examples': len(examples),
        'task_types': count_by_type(examples),
        'annotators': ['expert_1', 'expert_2', 'expert_3'],
        'inter_annotator_agreement': 0.92  # How much experts agreed
    }
}

# Update quarterly
# Add new edge cases discovered in production
# Remove outdated examples
```

**Step 4: Stratify for testing**

```python
# Split dataset
train_set = golden_dataset[0:400]      # 80% for training/prompting
test_set = golden_dataset[400:500]     # 20% for testing

# Never test on training set (overfitting)
# Test set should be held out, only used for evaluation
```

### Running Evaluations

**Automated evaluation pipeline:**

```python
class QualityEvaluator:
    def __init__(self, golden_dataset):
        self.test_set = golden_dataset.test_set

    async def evaluate_model(self, model_version):
        results = []

        for example in self.test_set:
            # Generate AI output
            ai_output = await model_version.predict(example.input)

            # Compare to ground truth
            correct = self.compare(ai_output, example.ground_truth)

            results.append({
                'example_id': example.id,
                'input': example.input,
                'expected': example.ground_truth,
                'actual': ai_output,
                'correct': correct
            })

        # Calculate metrics
        accuracy = sum(r['correct'] for r in results) / len(results)

        return EvaluationReport(
            model_version=model_version.name,
            accuracy=accuracy,
            results=results,
            timestamp=datetime.now()
        )

    def compare(self, ai_output, ground_truth):
        # Implement comparison logic (exact match, fuzzy match, etc.)
        if self.task_type == "classification":
            return ai_output == ground_truth
        elif self.task_type == "extraction":
            return self.fuzzy_match(ai_output, ground_truth, threshold=0.9)
        # ... other comparison methods
```

**Frequency:**
- **Before every deployment**: Run full evaluation on test set
- **Daily**: Run evaluation on subset (faster feedback loop)
- **After every prompt change**: Verify improvement (not regression)

**Guardrail**: Don't deploy if accuracy drops >2 percentage points vs. previous version.

### Example: Pilot.com's Expense Categorization Accuracy

**Golden dataset:**
- 1,000 expenses from 100 customers
- Labeled by 3 CPAs (consensus = ground truth)
- Covers 50+ expense categories
- Updated quarterly with new edge cases

**Evaluation metrics:**
- **Overall accuracy**: 97.2%
- **Per-category accuracy**: Ranges from 88% (ambiguous categories like "Office Supplies vs. Software") to 99.9% (unambiguous like "Payroll")
- **Precision**: 96.8% (low false positives)
- **Recall**: 97.5% (catches most expenses correctly)
- **F1 score**: 97.1%

**Result**: Pilot publishes these metrics on their website, building trust through transparency.

## Layer 2: Output Quality Metrics

Output quality measures subjective quality beyond correctness.

### When Quality Metrics Matter

**Critical for:**
- Content generation (blog posts, emails, marketing copy)
- Creative tasks (brainstorming, design, strategy)
- Professional communication (legal writing, reports)
- Code generation (readability, maintainability, not just correctness)

**Example**: A legal brief can be factually correct but poorly written (verbose, unclear, missing persuasive framing).

### Quality Evaluation Methods

**Method 1: Human Rating Scales**

**Approach**: Have humans rate outputs on 1-5 scale across multiple dimensions.

**Example: Jasper (Content Generation)**

```python
class ContentQualityRubric:
    dimensions = {
        'relevance': {
            1: 'Off-topic',
            2: 'Somewhat related',
            3: 'On-topic',
            4: 'Highly relevant',
            5: 'Perfectly addresses topic'
        },
        'clarity': {
            1: 'Confusing',
            2: 'Unclear in parts',
            3: 'Mostly clear',
            4: 'Very clear',
            5: 'Crystal clear'
        },
        'grammar': {
            1: 'Many errors',
            2: 'Several errors',
            3: 'Few errors',
            4: 'Nearly perfect',
            5: 'Perfect'
        },
        'tone': {
            1: 'Very inappropriate',
            2: 'Somewhat inappropriate',
            3: 'Acceptable',
            4: 'Good tone',
            5: 'Perfect tone'
        },
        'originality': {
            1: 'Generic/cliché',
            2: 'Somewhat generic',
            3: 'Acceptable originality',
            4: 'Quite original',
            5: 'Highly original'
        }
    }

    def evaluate(self, content):
        scores = {}
        for dimension in self.dimensions:
            score = self.get_human_rating(dimension, content)
            scores[dimension] = score

        overall = sum(scores.values()) / len(scores)
        return QualityScore(scores=scores, overall=overall)
```

**How to scale human evaluation:**
- Weekly quality reviews (1-2 hours, review 50-100 outputs)
- Hire part-time evaluators (English teachers for content, domain experts for specialized tasks)
- Cost: $25-$50/hour, can evaluate 20-30 outputs per hour

**Method 2: Pairwise Comparison (A/B)**

**Approach**: Show humans two outputs, ask which is better.

**Why it works**: Easier for humans to compare than to rate absolutely.

**Example:**
```python
async def pairwise_comparison(input_prompt):
    # Generate two versions
    output_a = await model_a.generate(input_prompt)
    output_b = await model_b.generate(input_prompt)

    # Ask human to choose
    choice = await present_to_human(
        prompt="Which contract review is better?",
        option_a=output_a,
        option_b=output_b
    )

    return choice  # "A", "B", or "Tie"
```

**Use Elo rating system** (like chess) to rank models:
- Start each model at 1,000 Elo
- When Model A beats Model B, increase A's Elo, decrease B's
- After 100+ comparisons, Elo scores reflect relative quality

**Advantage**: Can compare many models/prompt versions efficiently.

**Platforms for pairwise comparison**:
- Chatbot Arena (open source for LLMs)
- Scale AI (paid human labeling)
- Internal tool (custom-built for your domain)

**Method 3: Automated Quality Metrics**

**Use AI to evaluate AI outputs.**

**Example: Use GPT-4 as judge**

```python
async def ai_quality_judge(output, rubric):
    judge_prompt = f"""
You are an expert evaluating AI-generated content.

Rate this legal contract review on the following dimensions (1-5):
- Accuracy: Are the legal analyses correct?
- Completeness: Are all risks identified?
- Clarity: Is the analysis clear and actionable?
- Professional tone: Is the tone appropriate for legal advice?

Output:
{output}

Provide scores and justification for each dimension.
Format as JSON.
"""

    judgment = await gpt4.generate(judge_prompt, response_format="json")
    return json.loads(judgment)
```

**Validation**: AI judgments should correlate 80%+ with human judgments (test on subset).

**Advantage**: Scales infinitely, instant feedback.
**Limitation**: AI judge may have biases, doesn't replace human judgment entirely.

**Method 4: Domain-Specific Automated Metrics**

**For specific domains, programmatic quality checks:**

**Content generation:**
- **Readability score**: Flesch-Kincaid, Gunning Fog
- **SEO score**: Keyword density, meta tags, headings
- **Originality**: Copyscape, plagiarism detection
- **Tone**: Sentiment analysis

**Code generation:**
- **Correctness**: Does code run? Pass tests?
- **Complexity**: Cyclomatic complexity
- **Maintainability**: Code smells, duplication
- **Style**: PEP 8 (Python), ESLint (JavaScript)

**Legal/financial:**
- **Completeness**: Are required sections present?
- **Compliance**: Do outputs follow regulatory standards?
- **Citation quality**: Are legal citations formatted correctly?

**Example: GitHub Copilot's quality metrics**
- **Acceptance rate**: % of code suggestions accepted by developers (55%)
- **Retention rate**: % of accepted code still in codebase after 1 week (75%)
- **Test pass rate**: % of generated code that passes unit tests (90%+)

### Example: Harvey AI's Contract Review Quality

**Rubric dimensions (1-5 scale):**
1. **Accuracy**: Are identified risks actually risks?
2. **Completeness**: Are all material risks identified?
3. **Legal reasoning**: Is analysis legally sound?
4. **Actionability**: Are recommendations clear and specific?
5. **Professional tone**: Appropriate for attorney-client communication?

**Evaluation process:**
- 100 contract reviews evaluated weekly
- Rated by 3 senior attorneys
- Inter-rater reliability: 0.88 (high agreement)

**Current scores (as of 2024):**
- Accuracy: 4.7/5
- Completeness: 4.5/5
- Legal reasoning: 4.6/5
- Actionability: 4.4/5
- Professional tone: 4.8/5
- **Overall: 4.6/5** ("between good and excellent")

**Guardrail**: If any dimension drops below 4.0, halt deployment and investigate.

## Layer 3: Customer Satisfaction Metrics

Customer satisfaction measures whether users find value, independent of objective quality.

**Key insight**: Customers may be satisfied even with imperfect outputs (if fast and cheap) or dissatisfied with perfect outputs (if slow and expensive).

### Core Satisfaction Metrics

**1. Net Promoter Score (NPS)**

**Question**: "How likely are you to recommend this product to a colleague?" (0-10 scale)

**Calculation**:
```
NPS = % Promoters (9-10) - % Detractors (0-6)
```

**Benchmarks:**
- **Negative NPS (<0)**: Poor product-market fit
- **0-30**: Acceptable, room for improvement
- **30-50**: Good, customers like the product
- **50-70**: Excellent, strong word-of-mouth
- **70+**: World-class (rare)

**Frequency**: Quarterly survey to active customers

**Example: Intercom Fin NPS**
- Q1 2023 (launch): NPS = 35
- Q4 2023 (mature): NPS = 58
- Improvement driven by quality increases (60% → 75% autonomous resolution)

**2. Customer Satisfaction Score (CSAT)**

**Question**: "How satisfied were you with this output?" (1-5 scale or thumbs up/down)

**Calculation**:
```
CSAT = (Satisfied customers / Total responses) × 100
```

**When to ask**: After every AI interaction (non-intrusive inline widget)

**Example implementation:**
```typescript
<OutputDisplay output={aiOutput}>
  <FeedbackWidget>
    Was this helpful?
    <ThumbsUp onClick={() => recordFeedback('positive')} />
    <ThumbsDown onClick={() => recordFeedback('negative')} />
  </FeedbackWidget>
</OutputDisplay>
```

**Response rate**: Typically 5-15% of users provide feedback (incentivize with "Help us improve" messaging)

**Benchmark**: Target 85%+ satisfaction (thumbs up rate)

**3. Task Completion Rate**

**Definition**: % of tasks users complete successfully without abandoning or escalating

**Measurement**:
```python
def calculate_task_completion_rate(user_sessions):
    completed = 0
    abandoned = 0

    for session in user_sessions:
        if session.user_accepted_output:
            completed += 1
        elif session.user_regenerated_3_times:
            abandoned += 1
        elif session.user_escalated_to_human:
            abandoned += 1

    return completed / (completed + abandoned)
```

**Benchmark**:
- **<70%**: Poor—users frequently give up
- **70-85%**: Acceptable—most users succeed
- **85-95%**: Good—high success rate
- **>95%**: Excellent—nearly everyone succeeds

**Example: Jasper's task completion**
- 89% of users who start generating a blog post complete it (don't abandon)
- 11% regenerate 3+ times or close without saving

**4. Retention and Churn**

**Monthly retention**: % of customers who use product this month who used it last month

**Churn rate**: % of customers who stop using product (cancel subscription)

**Why it matters**: High churn indicates customers aren't getting value long-term, even if initial satisfaction is high.

**Acceptable churn rates:**
- **SMB**: 3-5% monthly (36-60% annual)—acceptable for low-priced products
- **Mid-market**: 1-2% monthly (12-24% annual)—stickier than SMB
- **Enterprise**: <1% monthly (<12% annual)—very sticky

**Example: Pilot.com retention**
- Monthly churn: <2%
- Annual churn: ~20%
- Key driver: Switching accountants is painful (lots of context transfer required)

### Satisfaction vs. Accuracy: The Paradox

**Observation**: Customer satisfaction correlates more with *perceived* quality than *actual* accuracy.

**Example from support AI research (Stanford, 2023):**
- **Scenario A**: AI gives 95% accurate answer in 10 seconds
- **Scenario B**: AI gives 90% accurate answer in 2 seconds
- **Result**: Scenario B had 20% higher satisfaction despite lower accuracy

**Why**: Speed is visible, accuracy is often not (users don't verify every answer).

**Implications:**
1. **Balance quality and speed**: Don't over-optimize accuracy at the expense of UX
2. **Make quality visible**: Show confidence scores, citations, reasoning
3. **Set expectations**: If output will take time, communicate progress

## Layer 4: Business Metrics

Business metrics measure whether the service delivers tangible business value.

### Key Business Metrics

**1. Cost Savings**

**For customer:**
```
Cost Savings = (Cost of Human Alternative - Cost of AI Service) × Volume
```

**Example: Legal AI**
- Human cost: $300/hour attorney × 2 hours = $600 per contract review
- AI cost: $50 per contract review
- Savings: $550 per contract × 100 contracts/month = $55,000/month

**For your business:**
```
Cost per Task = (Inference Costs + Human Review Costs + Infrastructure) / Tasks
```

**Target**: Keep cost per task <10% of price charged

**2. Time Savings**

```
Time Savings = (Human Time - AI Time) × Volume
```

**Example: Pilot.com**
- Human bookkeeping: 20 hours/month per company
- AI bookkeeping: 2 hours/month human review
- Savings: 18 hours/month × $50/hour = $900/month value

**Make time savings visible**:
```typescript
<ResultDisplay>
  Contract reviewed in 3 minutes
  (Typical attorney time: 2 hours)
  ⚡ You saved 1 hour 57 minutes
</ResultDisplay>
```

**3. Autonomous Resolution Rate**

**Definition**: % of tasks completed by AI without human intervention

```
Autonomous Rate = (Tasks completed by AI) / (Total tasks)
```

**Example: Intercom Fin**
- 75% of support queries answered autonomously
- 25% escalated to humans
- Goal: Increase autonomous rate to 85% over next 12 months

**Why it matters**: Higher autonomous rate = better economics, scales better

**4. Escalation Rate**

**Definition**: % of tasks that require human review or intervention

```
Escalation Rate = (Tasks escalated to humans) / (Total tasks)
```

**Typical progression:**
- **Launch (Month 1)**: 40-50% escalation
- **Early traction (Month 6)**: 20-30% escalation
- **Mature (Month 18)**: 5-10% escalation

**Monitoring escalations:**
```python
class EscalationTracker:
    def track_escalation(self, task, reason):
        self.db.log({
            'task_id': task.id,
            'task_type': task.type,
            'reason': reason,  # "low_confidence", "customer_request", "quality_check"
            'timestamp': datetime.now()
        })

    def analyze_patterns(self):
        # Which task types have highest escalation?
        by_type = self.db.group_by('task_type').count()

        # What are common escalation reasons?
        by_reason = self.db.group_by('reason').count()

        return EscalationAnalysis(by_type=by_type, by_reason=by_reason)
```

**Use escalation analysis to prioritize improvements** (focus on high-escalation task types).

## A/B Testing and Experimentation

A/B testing validates whether changes improve quality.

### When to A/B Test

**Always test:**
- Model changes (GPT-4 → GPT-4o, Claude 3 → Claude 3.5)
- Major prompt changes (rewording system prompts)
- Retrieval changes (different chunking, re-ranking)
- UI changes (showing confidence scores, citations)

**Don't bother testing:**
- Bug fixes (just deploy)
- Minor copy changes (not worth the overhead)

### A/B Test Framework

**Step 1: Define hypothesis**

**Example**: "Adding confidence scores to outputs will increase customer satisfaction by 10%+"

**Step 2: Choose metric**

**Primary metric**: Customer satisfaction (CSAT)
**Secondary metrics**: Task completion rate, time on page

**Step 3: Design experiment**

```python
class ABTest:
    def __init__(self, test_name, variants):
        self.test_name = test_name
        self.variants = variants  # ['control', 'treatment']
        self.assignments = {}

    def assign_user(self, user_id):
        # Consistent assignment (user always gets same variant)
        hash = hashlib.md5(f"{test_name}-{user_id}".encode()).hexdigest()
        variant_index = int(hash, 16) % len(self.variants)
        variant = self.variants[variant_index]

        self.assignments[user_id] = variant
        return variant

    def show_output(self, user_id, output):
        variant = self.assign_user(user_id)

        if variant == 'control':
            return output  # No confidence score
        elif variant == 'treatment':
            return self.add_confidence_score(output)  # Show confidence

    def record_metric(self, user_id, metric, value):
        variant = self.assignments[user_id]
        self.db.log({
            'test_name': self.test_name,
            'user_id': user_id,
            'variant': variant,
            'metric': metric,
            'value': value,
            'timestamp': datetime.now()
        })
```

**Step 4: Run experiment**

**Sample size**: Need enough users for statistical significance
- Minimum: 100 users per variant
- Better: 1,000+ users per variant
- Calculate required sample size based on expected effect size

**Duration**: Run for 1-2 weeks (accounts for day-of-week effects)

**Step 5: Analyze results**

```python
def analyze_ab_test(test_name):
    results = db.fetch_test_results(test_name)

    control_scores = [r.value for r in results if r.variant == 'control']
    treatment_scores = [r.value for r in results if r.variant == 'treatment']

    # Calculate means
    control_mean = statistics.mean(control_scores)
    treatment_mean = statistics.mean(treatment_scores)

    # Statistical significance (t-test)
    t_stat, p_value = scipy.stats.ttest_ind(control_scores, treatment_scores)

    # Effect size
    effect_size = (treatment_mean - control_mean) / control_mean

    return ABTestResult(
        control_mean=control_mean,
        treatment_mean=treatment_mean,
        effect_size=effect_size,
        p_value=p_value,
        significant=p_value < 0.05
    )
```

**Step 6: Decision**

**If p_value < 0.05 and effect size > 5%:**
- Treatment is significantly better → Roll out to 100%

**If p_value >= 0.05 or effect size < 5%:**
- No significant difference → Keep control

**If treatment is worse:**
- Don't roll out, investigate why

### Example: Harvey AI A/B Test

**Hypothesis**: Showing step-by-step reasoning increases customer trust

**Experiment design:**
- **Control**: Show only final risk analysis
- **Treatment**: Show step-by-step reasoning ("I analyzed Clause 3.2, identified risk, cited California law...")

**Metrics:**
- Primary: NPS (measured after 2 weeks of use)
- Secondary: Task completion rate, time spent reviewing output

**Results (1,000 users per variant):**
- Control NPS: 52
- Treatment NPS: 61
- Effect size: +17% (significant, p < 0.001)
- Task completion: No significant difference

**Decision**: Roll out step-by-step reasoning to all users

**Impact**: NPS increased from 52 to 60 overall (sustained improvement)

## Quality Thresholds and Guardrails

Set minimum quality standards and halt deployments that don't meet them.

### Establishing Thresholds

**Framework:**

| Metric | Minimum | Target | Excellent |
|--------|---------|--------|-----------|
| **Accuracy** | 80% | 90% | 95% |
| **Customer Satisfaction (CSAT)** | 75% | 85% | 90% |
| **Task Completion Rate** | 70% | 85% | 95% |
| **NPS** | 20 | 40 | 60 |

**Deployment guardrail:**
```python
async def deployment_check(new_model):
    # Run evaluation on test set
    results = await evaluate_model(new_model)

    # Check thresholds
    if results.accuracy < 0.80:
        raise DeploymentBlocked("Accuracy below minimum threshold (80%)")

    if results.accuracy < current_model.accuracy - 0.02:
        raise DeploymentBlocked("Accuracy regression >2 percentage points")

    # Passed all checks
    return DeploymentApproved()
```

**Escalation if threshold violated:**
1. Alert engineering team (Slack, PagerDuty)
2. Halt deployment
3. Investigate root cause (prompt change? Model drift? Data issue?)
4. Fix and re-test
5. Only deploy after passing thresholds

## Drift Detection and Monitoring

Quality can degrade over time ("drift"). Detect and fix before customers notice.

### Types of Drift

**1. Model Drift**
- Foundation model behavior changes (provider updates GPT-4)
- Your prompts become less effective with new model version

**2. Data Drift**
- Customer use cases evolve (new document types, new industries)
- Training data becomes stale

**3. Concept Drift**
- Definitions change (new regulations, new accounting standards)
- What was correct 6 months ago is now incorrect

### Drift Detection Methods

**Method 1: Continuous Monitoring**

```python
class DriftDetector:
    def __init__(self, baseline_accuracy):
        self.baseline = baseline_accuracy
        self.window_size = 7  # days

    async def check_for_drift(self):
        # Get accuracy for last 7 days
        recent_accuracy = await self.get_recent_accuracy(days=self.window_size)

        # Compare to baseline
        drift = abs(recent_accuracy - self.baseline)

        if drift > 0.05:  # 5 percentage point drop
            await self.alert_team(f"Drift detected: {drift:.1%} drop in accuracy")

        # Update baseline if sustained
        if recent_accuracy > self.baseline + 0.02:  # Sustained improvement
            self.baseline = recent_accuracy
```

**Method 2: Weekly Golden Dataset Evaluation**

```python
async def weekly_quality_check():
    # Run evaluation on golden dataset
    results = await evaluate_model(current_model, golden_dataset)

    # Compare to last week
    last_week_results = db.get_evaluation('last_week')
    accuracy_change = results.accuracy - last_week_results.accuracy

    if accuracy_change < -0.03:  # 3 percentage point drop
        alert_team("Quality drift detected in weekly evaluation")

    # Log for trend analysis
    db.log_evaluation(results, timestamp=datetime.now())
```

**Method 3: Customer Feedback Trends**

```python
async def monitor_satisfaction_trends():
    # Get satisfaction scores for last 30 days
    daily_csat = await db.get_daily_csat(days=30)

    # Detect downward trend
    trend = calculate_trend(daily_csat)  # Linear regression slope

    if trend < -0.01:  # Negative trend
        alert_team(f"Customer satisfaction declining: {trend:.2%} per day")
```

## Continuous Improvement Process

Quality measurement enables systematic improvement.

### Monthly Quality Review Process

**Week 1: Data Collection**
- Run evaluation on golden dataset
- Collect customer feedback
- Review escalated tasks
- Analyze business metrics

**Week 2: Analysis**
- Identify patterns in failures
- Which task types have lowest quality?
- What are common error modes?
- Are there new edge cases?

**Week 3: Prioritization**
- Rank issues by impact (frequency × severity)
- Choose top 3-5 issues to address
- Estimate effort to fix

**Week 4: Implementation**
- Improve prompts
- Add validation rules
- Retrain embeddings
- Update knowledge base

**Week 5: Validation**
- Re-run evaluation
- A/B test changes in production
- Verify improvement (not regression)

**Repeat monthly.**

### Example: Pilot.com's Continuous Improvement

**Month 1 Review (Expense Categorization):**

**Data collected:**
- Accuracy: 94% (target: 97%)
- Top error: Confusing "Office Supplies" vs. "Software" (50 errors)
- Root cause: Similar vendor names ("Staples" sells both physical and digital products)

**Fix implemented:**
- Added rule: "If vendor=Staples AND description contains 'subscription', categorize as Software"
- Added 20 Staples examples to golden dataset
- Improved prompt to consider subscription keywords

**Result:**
- Accuracy improved: 94% → 96%
- Office Supplies errors decreased: 50 → 15
- New errors discovered: "Meals" vs. "Client Entertainment" (now top issue for next month)

**Continuous cycle of improvement.**

## Key Takeaways

**1. Measure all four layers**
- Accuracy (objective correctness)
- Output quality (subjective quality)
- Customer satisfaction (user feedback)
- Business metrics (tangible value)

**2. Build golden datasets from day one**
- 100-500 human-validated examples
- Representative of real use cases
- Updated quarterly with new edge cases

**3. Customer satisfaction ≠ Accuracy**
- Users care about perceived quality (speed, UX) not just correctness
- Balance quality and speed
- Make quality visible (confidence scores, citations)

**4. Set quality thresholds and don't deploy below them**
- Minimum thresholds (e.g., 80% accuracy)
- Regression detection (don't deploy if 2%+ worse than current)
- Guardrails prevent quality degradation

**5. Detect drift proactively**
- Continuous monitoring (daily/weekly)
- Compare to baseline
- Alert team before customers complain

**6. A/B test all major changes**
- Validate improvements objectively
- Don't assume changes help
- Measure impact on customer satisfaction and business metrics

**7. Monthly quality reviews drive improvement**
- Identify top issues
- Prioritize by impact
- Fix systematically
- Validate improvements

---

You've now learned how to measure and improve Services-as-Software quality systematically across accuracy, output quality, customer satisfaction, and business metrics.

**Next**: Part III (Go-to-Market) begins with Chapter 9, covering pricing strategies for Services-as-Software.
