# Chapter 5: Build vs. Buy Decisions

In early 2022, a well-funded legal AI startup spent 18 months building their own vector database from scratch. Their reasoning: "Vector databases are too slow and expensive. We can build something better optimized for legal documents."

By mid-2023, they had:
- Spent $3M on infrastructure engineering
- Achieved performance comparable to Pinecone (but not better)
- Fallen 12 months behind competitors in product features
- Still hadn't reached product-market fit

Meanwhile, Harvey AI—launched 6 months later—used off-the-shelf infrastructure (Pinecone, LangChain, OpenAI) and focused engineering on legal domain expertise. Result: $100M raised, 10,000+ lawyers, clear category leadership.

**The lesson**: In Services-as-Software, build vs. buy decisions determine whether you reach product-market fit before running out of money.

This chapter provides a systematic framework for deciding what to build, what to buy, and what to customize.

## The Build vs. Buy Framework

### Three Questions to Ask

For every technical component, answer:

**1. Does this create competitive advantage?**
- Will building this better than competitors increase win rates?
- Will customers pay more for your version?
- Is this defensible (can't be easily copied)?

**If YES**: Consider building
**If NO**: Strong signal to buy

**2. Is this a commodity or differentiator?**
- Are multiple vendors offering comparable solutions?
- Is the technology rapidly improving (would your version become obsolete)?
- Do you have unique requirements that off-the-shelf doesn't meet?

**If commodity**: Buy
**If differentiator**: Build

**3. Can you build and maintain it without derailing core roadmap?**
- Do you have expertise in-house?
- Will this take >20% of engineering time?
- Will you need to maintain/update it continuously?

**If YES**: Building is feasible
**If NO**: You can't afford to build

### The Build vs. Buy Matrix

| Component | Competitive Advantage? | Commodity? | Build or Buy? |
|-----------|----------------------|-----------|---------------|
| **Foundation Models** | No (everyone uses same) | Yes (OpenAI, Anthropic, etc.) | **BUY** |
| **Vector Database** | No (retrieval is table stakes) | Yes (Pinecone, Weaviate, etc.) | **BUY** |
| **Agent Framework** | Partial (orchestration matters) | Partially (LangChain exists, but generic) | **CUSTOMIZE** |
| **Domain Logic** | YES (core IP) | No (unique to your vertical) | **BUILD** |
| **Data Pipelines** | YES (determines quality) | No (specific to your sources) | **BUILD** |
| **Quality Assurance** | YES (trust differentiator) | Partial (tools exist, but domain-specific) | **BUILD** |
| **UI Components** | Partial (UX matters at scale) | Yes (React libraries, Tailwind, etc.) | **BUY THEN BUILD** |
| **Auth/Billing** | No (basic business functionality) | Yes (Auth0, Stripe, etc.) | **BUY** |
| **Hosting** | No (infrastructure commodity) | Yes (AWS, GCP, Cloudflare, etc.) | **BUY** |

**General rule**: Buy infrastructure, build differentiation.

## Layer 1: Foundation Models

**Decision: ALWAYS BUY**

### Why Not Build Your Own Model

**Cost analysis:**

**Building GPT-4 equivalent:**
- Compute: 25,000 A100 GPUs × 3 months = $50-80M
- Data: Licensing, cleaning, curation = $10-20M
- Team: 50 researchers/engineers × 2 years = $20-30M
- **Total**: $80-130M for first model

**Annual maintenance:**
- Continuous training on new data: $10-20M/year
- Infrastructure: $5-10M/year
- Team: $10-15M/year
- **Total**: $25-45M/year

**Alternative: Buy API access**
- OpenAI GPT-4: $0.03/1K tokens input, $0.06/1K tokens output
- Typical SaS app: 100K requests/day × 2K tokens = $6,000/day = $2.2M/year

**Break-even**: Would need to spend $80M+/year on API calls before building makes sense. Very few SaS companies ever reach this scale.

### Exceptions: When Building Makes Sense

**Exception 1: You're an AI research lab**
- Mission is to advance AI capabilities, not build applications
- Have $100M+ funding specifically for model development
- Team is primarily researchers, not product engineers

**Examples**: OpenAI, Anthropic, Mistral, Cohere

**Exception 2: Your domain requires massive proprietary data**
- Training on public data isn't sufficient
- You have 100M+ domain-specific training examples
- Fine-tuning doesn't achieve required performance

**Example**: Medical imaging model trained on 50M radiology scans with expert annotations. Fine-tuning GPT-4 on radiology reports doesn't work—need vision model trained from scratch.

**Exception 3: Regulatory constraints prohibit external APIs**
- Can't send data to third-party APIs (HIPAA, classified info)
- Must run inference on-premises
- No commercial APIs meet compliance requirements

**Solution**: Deploy open-source models (Llama 3.1, Mistral) on your infrastructure. Still "buy" (use pre-trained weights), just self-host.

### Model Selection: Which API to Buy

**Decision tree:**

**Question 1: What's your budget?**
- **High budget** ($50K+/month inference costs): Use best model (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro)
- **Medium budget** ($10K-$50K/month): Mix of top-tier and mid-tier models
- **Low budget** (<$10K/month): Primarily mid-tier models (GPT-4o-mini, Claude 3 Haiku)

**Question 2: What are latency requirements?**
- **Real-time** (<2 seconds): Use fastest models (GPT-4o-mini, Claude 3 Haiku)
- **Interactive** (2-10 seconds): Most models work
- **Batch** (>10 seconds OK): Use cheapest models that meet quality bar

**Question 3: Do you need multimodal?**
- **Text only**: All models work
- **Text + images**: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro
- **Text + video**: Gemini 1.5 Pro

**Question 4: Privacy/compliance constraints?**
- **Standard**: Use any commercial API
- **Enterprise data privacy**: Use Azure OpenAI, AWS Bedrock (data isolation)
- **On-premises required**: Deploy Llama 3.1, Mistral, or other open-source models

**Recommendation for most SaS startups:**

**Pre-seed to Seed**: Start with one provider (OpenAI or Anthropic), one model tier
- **Simple tasks**: GPT-4o-mini ($0.15/$0.60 per 1M tokens)
- **Complex tasks**: GPT-4o ($2.50/$10 per 1M tokens)

**Series A**: Add second provider for redundancy, use multiple model tiers
- **Classify/extract**: GPT-4o-mini or Claude 3 Haiku
- **Generate/analyze**: GPT-4o or Claude 3.5 Sonnet
- **Critical/high-value**: GPT-4 or Claude 3 Opus (highest quality)

**Series B+**: Multi-provider strategy, optimize costs aggressively
- Route tasks to cheapest model that meets quality bar
- Self-host open-source models for high-volume, low-margin tasks
- Negotiate volume discounts with providers

## Layer 2: Knowledge Systems

**Decision: USUALLY BUY**

### Vector Databases: Buy Off-the-Shelf

**Options:**

**Managed services (recommended for most):**
- **Pinecone**: Easiest, fastest, most expensive ($70/month + $0.10/million vectors)
- **Weaviate Cloud**: Good balance of features and cost
- **Qdrant Cloud**: Cheapest managed option ($0.20/GB/month)

**Database extensions:**
- **pgvector (Postgres)**: Free (existing DB), slower at scale
- **MongoDB Atlas Vector Search**: Good if already using MongoDB
- **Elasticsearch/OpenSearch**: Good if already using for text search

**Self-hosted open source:**
- **Weaviate**: Feature-rich, production-ready
- **Qdrant**: High performance, Rust-based
- **Milvus**: Scales to billions of vectors, complex setup

**Decision framework:**

| Stage | Annual Vector Costs | Recommendation | Rationale |
|-------|-------------------|----------------|-----------|
| **Pre-seed** | <$5K | pgvector or Pinecone | Simple, low cost |
| **Seed** | $5K-$50K | Pinecone or Weaviate Cloud | Managed, reliable |
| **Series A** | $50K-$500K | Evaluate self-hosted | Cost optimization |
| **Series B+** | >$500K | Self-hosted (Weaviate, Qdrant, Milvus) | 70-80% cost savings |

**Why buy instead of build:**
- Vector databases are technically complex (indexing algorithms, distributed systems)
- Multiple mature options exist
- Building takes 12-18 months for basic version
- Maintaining/scaling requires dedicated infrastructure team
- **Your retrieval quality depends more on chunking strategy and embeddings than database choice**

### Embedding Models: Buy or Fine-Tune?

**Options:**

**Pre-trained (buy):**
- **OpenAI text-embedding-3-large**: $0.13/1M tokens, 3,072 dimensions, high quality
- **Cohere embed-v3**: $0.10/1M tokens, multilingual
- **Sentence Transformers (open source)**: Free, self-hosted

**Fine-tuned (buy + customize):**
- Take pre-trained model (e.g., Sentence Transformers)
- Fine-tune on domain-specific data (10K-100K examples)
- Cost: $1K-$10K one-time, plus hosting

**Build from scratch (almost never):**
- Train embedding model from scratch
- Cost: $100K-$1M+
- Only makes sense if you have 100M+ unique training examples

**Recommendation:**

**Pre-seed to Series A**: Use OpenAI embeddings (simple, high quality)

**Series B+**: Consider fine-tuning if:
- You have >10K domain-specific query-document pairs
- Retrieval quality is a major differentiator
- Embedding costs exceed $50K/year (fine-tuning + self-hosting is cheaper)

**Example: Harvey AI's embedding strategy**

**Phase 1 (2022-2023)**: OpenAI text-embedding-ada-002
- Cost: $30K/year
- Retrieval quality: 75% relevant docs in top 3

**Phase 2 (2023-2024)**: Fine-tuned Sentence Transformers on legal documents
- Cost: $10K fine-tuning + $5K/year hosting
- Retrieval quality: 89% relevant docs in top 3
- **ROI**: 14 percentage point improvement worth the investment for legal accuracy

**Phase 3 (2024+)**: Considering training custom embeddings on 1M+ legal documents
- Estimated cost: $200K-$500K
- Expected improvement: 89% → 93%+ retrieval quality
- **Decision pending**: Is 4 percentage points worth $200K+?

### Retrieval Logic: Build Custom

**What to buy**: Vector database, embedding models
**What to build**: Retrieval strategy

**Custom components:**

**1. Chunking strategy**
- How to split documents (sentence, paragraph, semantic boundaries)
- Overlap between chunks
- Metadata to store (source, date, author, document type)

**Domain-specific**: Legal documents chunk differently than financial reports

**2. Query transformation**
- Rewrite user queries for better retrieval
- Generate multiple query variations
- Extract filters from queries (date ranges, document types)

**Example:**
```python
# User query: "What did we agree on payment terms with Acme Corp in 2023?"

# Transformed queries:
1. "payment terms Acme Corp"
2. "invoicing schedule Acme"
3. "billing agreement Acme Corporation"

# Extracted filters:
- vendor: "Acme Corp"
- date_range: [2023-01-01, 2023-12-31]
- document_type: ["contract", "agreement", "invoice"]
```

**3. Hybrid retrieval**
- Combine vector search (semantic) with keyword search (lexical)
- Combine search with SQL filters (metadata)
- Fusion algorithms (how to merge results)

**Research shows**: Hybrid retrieval (vector + keyword) outperforms either alone by 10-15 percentage points.

**4. Re-ranking**
- Initial retrieval: Get top 50 candidates
- Re-ranking: Use cross-encoder model to get top 5
- Improves relevance by 15-20% vs. vector search alone

**5. Contextual retrieval**
- Add document-level context to chunks
- "This contract clause is from Section 3.2 of the Master Service Agreement between X and Y, dated January 2023"
- Improves LLM understanding of retrieved content

**Why build**: These strategies are domain-specific and create competitive advantage. Off-the-shelf RAG solutions don't optimize for your use case.

**Time to build**: 2-4 months for initial version, ongoing refinement

## Layer 3: Agent Orchestration

**Decision: CUSTOMIZE OPEN SOURCE**

### Start with Frameworks, Customize Heavily

**Why not build from scratch:**
- Agent orchestration is complex (error handling, retries, state management, tool calling)
- Takes 6-12 months to reach production quality
- Open-source frameworks (LangChain, LlamaIndex) are battle-tested by thousands of companies

**Why not use off-the-shelf:**
- Generic frameworks don't encode your domain workflows
- Abstractions are too high-level for production needs
- You'll end up "fighting the framework" as requirements grow

**The hybrid approach: Customize open source**

### Framework Selection

**LangChain**
- **Pros**: Most mature, huge ecosystem, supports chains/agents/memory
- **Cons**: Heavy abstractions, verbose code, can be opaque
- **Best for**: Complex multi-step workflows, need lots of integrations

**LlamaIndex**
- **Pros**: RAG-focused, clean API, good for data-centric apps
- **Cons**: Less flexible for non-RAG use cases
- **Best for**: Applications where retrieval is core workflow

**Haystack**
- **Pros**: Production-ready, modular, good for pipelines
- **Cons**: Smaller ecosystem, less community content
- **Best for**: Teams that want less abstraction, more control

**CrewAI**
- **Pros**: Multi-agent collaboration, role-based design
- **Cons**: Still maturing, fewer production examples
- **Best for**: Workflows requiring multiple specialized agents

**Recommendation:**

**Pre-seed**: Start with LangChain (most documentation, easiest to prototype)

**Seed to Series A**: Fork and customize
- Start with LangChain templates
- Replace abstractions with custom code as you understand requirements
- Keep using LangChain components that work (tools, memory, chains)

**Series B+**: Most companies have largely replaced LangChain
- Keep some components (tool interfaces, prompt templates)
- Replace core orchestration with custom framework
- More control, less dependency risk, better performance

### What to Customize

**1. Workflow orchestration**

**Off-the-shelf LangChain**:
```python
from langchain.chains import SequentialChain

chain = SequentialChain(
    chains=[
        retrieve_chain,
        analysis_chain,
        generation_chain
    ]
)
result = chain.run(input)
```

**Custom orchestration**:
```python
class ContractDraftingWorkflow:
    def __init__(self, llm, retriever, validator):
        self.llm = llm
        self.retriever = retriever
        self.validator = validator

    async def run(self, input):
        # Step 1: Retrieve templates
        templates = await self.retriever.search(input.contract_type)

        # Step 2: Draft outline (with custom retry logic)
        outline = await self._draft_with_retries(
            prompt=build_outline_prompt(templates, input),
            max_retries=3
        )

        # Step 3: Generate sections in parallel
        sections = await asyncio.gather(*[
            self._generate_section(section, input)
            for section in outline.sections
        ])

        # Step 4: Validate (domain-specific)
        validation = self.validator.check(sections)
        if not validation.passed:
            # Custom error handling
            sections = await self._fix_errors(sections, validation.errors)

        return Contract(sections=sections, metadata=validation)

    async def _draft_with_retries(self, prompt, max_retries):
        # Custom retry logic with exponential backoff
        # and quality checks
        ...
```

**Why custom**: More control over error handling, parallelization, validation, retries

**2. Error handling and fallbacks**

**Generic framework**:
- Single retry strategy for all failures
- No context-specific fallbacks
- Limited error categorization

**Custom error handling**:
```python
class SmartRetryHandler:
    async def execute_with_fallbacks(self, task):
        try:
            # Try primary strategy (GPT-4o with full context)
            return await self._execute_primary(task)
        except RateLimitError:
            # Fallback 1: Wait and retry
            await self._wait_exponential()
            return await self._execute_primary(task)
        except ContextLengthError:
            # Fallback 2: Reduce context and use same model
            return await self._execute_with_reduced_context(task)
        except ModelError:
            # Fallback 3: Use alternative model (Claude)
            return await self._execute_with_alternative_model(task)
        except AllFallbacksFailed:
            # Fallback 4: Escalate to human
            return await self._escalate_to_human(task)
```

**Why custom**: Domain-specific error handling creates better user experience

**3. State management and memory**

**Framework memory**:
```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()
# Stores conversation history generically
```

**Custom state management**:
```python
class ContractDraftingState:
    """Domain-specific state management"""

    def __init__(self, contract_id):
        self.contract_id = contract_id
        self.template = None
        self.sections_completed = set()
        self.validation_results = []
        self.user_feedback = []
        self.version_history = []

    async def save(self):
        # Persist to database
        await db.contracts.upsert({
            'id': self.contract_id,
            'state': self.to_dict(),
            'updated_at': datetime.now()
        })

    async def resume(self):
        # Resume from last checkpoint
        state = await db.contracts.get(self.contract_id)
        return self.from_dict(state['state'])
```

**Why custom**: Professional services need robust state management (long-running tasks, user interruptions, multi-session workflows)

### Time and Cost to Customize

**Phase 1: Use framework out-of-box (0-3 months)**
- Cost: $0 (open source)
- Time: 1-2 engineers
- Outcome: MVP with basic workflows

**Phase 2: Customize core workflows (3-12 months)**
- Cost: 2-3 engineers @ $200K/year = $400K-$600K
- Time: 9 months
- Outcome: Production-ready orchestration with domain logic

**Phase 3: Build custom framework (12-24 months)**
- Cost: 3-5 engineers @ $200K/year = $600K-$1M/year
- Time: 12-18 months
- Outcome: Fully custom framework optimized for your needs

**ROI**: Custom orchestration enables:
- 20-30% better quality (domain-specific workflows)
- 30-50% lower costs (optimize for your patterns)
- Faster iteration (no framework constraints)

## Layer 4: Domain Expertise

**Decision: ALWAYS BUILD**

This is your moat. Domain expertise—business rules, quality checks, proprietary data, workflow understanding—must be built in-house.

### What Domain Expertise Includes

**1. Business logic and validation rules**

**Example: Pilot.com (Accounting SaS)**

```python
class ExpenseCategorizationRules:
    """Domain expertise: Accounting rules"""

    def categorize(self, expense):
        # Rule 1: Certain vendors always map to specific categories
        if expense.vendor in KNOWN_VENDORS:
            return KNOWN_VENDORS[expense.vendor].category

        # Rule 2: Amount thresholds trigger different categories
        if expense.amount > 5000:
            return "CapitalExpenditure"  # Must be capitalized, not expensed

        # Rule 3: Date-based rules (fiscal year end)
        if self._is_near_fiscal_year_end(expense.date):
            # Different treatment for year-end expenses
            return self._year_end_categorization(expense)

        # Rule 4: Industry-specific rules
        if self.company.industry == "SaaS":
            if "AWS" in expense.description or "hosting" in expense.description:
                return "CostOfGoodsSold"  # COGS for SaaS, not OpEx

        # Use AI only after rules-based logic
        return self._ai_categorization(expense)
```

**Why build**: These rules are:
- Specific to your vertical (SaaS accounting differs from manufacturing)
- Regulatory requirements (GAAP, tax law)
- Competitive advantage (accurate categorization = better financial reporting)

**2. Quality assurance and validation**

**Example: Harvey AI (Legal SaS)**

```python
class LegalContractValidator:
    """Domain expertise: Legal validation"""

    def validate_term_sheet(self, term_sheet):
        errors = []

        # Check 1: Required clauses present
        required = [
            "investment_amount", "valuation", "liquidation_preference",
            "board_composition", "anti_dilution", "vesting_schedule"
        ]
        for clause in required:
            if clause not in term_sheet.clauses:
                errors.append(f"Missing required clause: {clause}")

        # Check 2: Math validation
        if term_sheet.post_money_valuation != (
            term_sheet.pre_money_valuation + term_sheet.investment_amount
        ):
            errors.append("Valuation math doesn't add up")

        # Check 3: Market norms
        if term_sheet.liquidation_preference > 2.0:
            errors.append("Liquidation preference >2x is outside market norms")

        # Check 4: Logical consistency
        if term_sheet.board_size % 2 == 0:
            errors.append("Board size should be odd (avoid deadlock)")

        # Check 5: Legal risks
        risks = self._identify_legal_risks(term_sheet)
        if risks.has_high_risk:
            errors.append(f"High risk clauses detected: {risks.high_risk_clauses}")

        return ValidationResult(errors=errors, warnings=risks.warnings)
```

**Why build**: Generic validation misses domain-specific requirements

**3. Proprietary data and training examples**

**What to collect:**
- Customer data (anonymized, with permission)
- Human corrections to AI outputs (e.g., accountant overrides AI categorization)
- Quality ratings (thumbs up/down, 1-5 stars)
- Edge cases and failures
- Industry-specific templates and examples

**Example: Jasper (Content SaS)**

Jasper collected:
- 50K+ examples of high-quality marketing copy (blog posts, ads, emails)
- User ratings on 2M+ generated outputs (which ones were used vs. discarded)
- Brand voice profiles from 10K+ customers
- Industry-specific templates (SaaS vs. e-commerce vs. B2B)

**Result**: AI generates content that matches customer's brand voice 80-90% of the time (vs. 40-50% with generic GPT-4)

**How to build this:**

**Step 1: Start with public/licensed data**
- Industry templates (legal templates, accounting guides)
- Public examples (sample contracts, financial statements)
- Licensed datasets (if available for your domain)

**Step 2: Collect customer data (with consent)**
- Every AI output gets "Was this helpful?" feedback
- Store outputs that customers used (implied approval)
- Track corrections (customer edited AI output → learn from edits)

**Step 3: Build golden dataset**
- 100-500 human-validated examples for each task type
- Used for evaluation (measure AI quality)
- Used for few-shot prompting (show AI examples)
- Updated quarterly as you learn edge cases

**Step 4: Fine-tune (optional)**
- Once you have 10K+ high-quality examples
- Fine-tune model for your domain
- Usually 10-20% quality improvement over prompting

**Timeline**: 18-36 months to build defensible data moat

### Investment Required

**Team:**
- **2-3 domain experts** (ex-lawyers for legal SaS, ex-accountants for finance SaS) @ $150K-$250K/year
- **3-5 engineers** to codify domain expertise @ $150K-$250K/year
- **1 data annotator/QA** (if collecting training data) @ $60K-$100K/year

**Cost**: $700K-$1.5M/year for 18-24 months = $1.4M-$3M total

**ROI**: This investment creates:
- Quality differentiation (85-95% accuracy vs. 70-80% for generic AI)
- Trust and credibility (domain experts signal legitimacy)
- Defensible moat (competitors can't copy your data and rules)

**This is the ONLY layer where "build" is mandatory for success.**

## Layer 5: Business Layer

**Decision: BUY FOR MVP, BUILD FOR SCALE**

### User Interface

**MVP (Pre-seed to Seed):**

**Buy/use templates:**
- **Next.js + shadcn/ui**: React framework + pre-built UI components
- **Tailwind CSS**: Utility-first styling
- **Vercel templates**: Free, production-ready starting points

**Cost**: $0 (open source) + $20/month hosting
**Time**: 2-4 weeks to customize template
**Quality**: Good enough for first 50-100 customers

**Example: Many SaS MVPs start with:**
```
- Next.js SaaS starter kit
- shadcn/ui components for forms, tables, dialogs
- Tailwind for custom styling
- Vercel for deployment
```

**Result**: Professional-looking MVP in 2-4 weeks vs. 3-6 months building from scratch.

**Scale (Series A+):**

**Build custom:**
- As you learn user needs, templates become constraining
- Enterprise customers expect polished, branded experience
- Custom workflows require custom UI

**Investment:**
- 2-3 frontend engineers @ $180K/year = $360K-$540K/year
- 6-12 months to build production-quality custom UI

**When to make the switch:**
- After reaching $1M ARR (can afford investment)
- When template limitations block key features
- When competing for enterprise deals (brand matters)

### Authentication and Access Control

**Always buy:**

**Options:**
- **Auth0**: $240-$800/month, enterprise features, battle-tested
- **Clerk**: $25-$100/month, modern DX, good for startups
- **WorkOS**: $0 (free tier) + $6/user/month, best for B2B SSO
- **Supabase Auth**: Free (self-hosted), simple, PostgreSQL-based

**Why buy:**
- Security is hard (don't build your own auth)
- Compliance requirements (SOC 2, GDPR, HIPAA) are built-in
- Enterprise features (SSO, SCIM) take 6-12 months to build
- Cost is negligible ($200-$2,000/month) vs. risk

**Recommendation:**
- **Pre-seed to Seed**: Clerk (simple, cheap, great DX)
- **Series A+**: WorkOS (enterprise SSO becomes dealbreaker for $100K+ contracts)

### Billing and Subscriptions

**Always buy:**

**Options:**
- **Stripe**: Most popular, excellent API, $0 + 2.9% + $0.30 per transaction
- **Chargebee**: Better for complex pricing, $0-$599/month + lower transaction fees at scale
- **Paddle**: Merchant of record (handles tax), 5% + $0.50 per transaction

**Why buy:**
- Payment processing is complex (PCI compliance, fraud detection)
- Tax calculation requires constant updates (Stripe Tax handles 130+ jurisdictions)
- Building invoicing, dunning, reporting takes 3-6 months
- Bugs in billing = lost revenue and angry customers

**Recommendation:**
- **Pre-seed to Series A**: Stripe (simple, well-documented, great ecosystem)
- **Series B+ with complex pricing**: Consider Chargebee (better for usage-based + subscriptions)

### Integrations

**Hybrid: Build top 3-5, buy the rest**

**Buy (use integration platforms):**
- **Zapier**: 7,000+ app integrations, $0-$20/user/month
- **Make (Integromat)**: More complex workflows, lower cost at scale
- **Tray.io**: Enterprise integration platform, $600+/month

**Build (native integrations):**
- Top 3-5 integrations your customers demand
- Examples:
  - **Legal SaS**: Google Drive, Salesforce, Slack
  - **Finance SaS**: QuickBooks, Xero, NetSuite
  - **Support SaS**: Zendesk, Intercom, Salesforce
  - **Dev SaS**: GitHub, GitLab, Jira

**Decision framework:**

| Integration | % Customers Requesting | Build or Buy? |
|-------------|------------------------|---------------|
| Top 1-3 integrations | >50% | **Build** (native) |
| Top 4-10 integrations | 20-50% | **Build or Zapier** (depends on complexity) |
| Long tail (10+) | <20% | **Zapier** |

**Example: Pilot.com's integration strategy**

**Phase 1 (MVP)**: Manual CSV import/export
**Phase 2 (PMF)**: Built native integrations with QuickBooks, Xero, Stripe (top 3 for their market)
**Phase 3 (Scale)**: Zapier integration for 50+ additional apps

**Time to build:**
- Native integration: 2-4 weeks per integration
- Zapier integration: 1-2 weeks one-time setup

## Common Build vs. Buy Mistakes

### Mistake 1: Building Too Much Infrastructure

**Symptom**: 12+ months of development before first customer

**Example**: Legal AI startup that built:
- Custom vector database
- Custom embedding model
- Custom agent framework
- Custom frontend framework

**Result**: $4M spent, 18 months elapsed, 0 customers. Competitors launched in 6 months with off-the-shelf tools and reached product-market fit.

**Fix**: Default to buy for all infrastructure. Build only domain expertise and core workflows.

### Mistake 2: Buying When You Should Build Domain Logic

**Symptom**: Product is just a thin wrapper around GPT-4

**Example**: Tax advisory SaS that used GPT-4 for tax advice without encoding tax rules, validation, or compliance requirements.

**Result**: 65% accuracy. Customers churned after first mistake. Company shut down after 9 months.

**Fix**: Domain expertise must be built in-house. No shortcuts.

### Mistake 3: Not Planning for Rebuild

**Symptom**: MVP architecture can't scale, requires full rewrite at 100 customers

**Example**: Bookkeeping SaS built MVP on serverless functions + D1 (SQLite). Worked great for first 50 customers. At 100 customers, D1 hit limits, needed to migrate to PostgreSQL.

**Migration cost**: 3 months, $200K, lots of bugs, customer churn during transition.

**Fix**: Use scalable infrastructure from day one (e.g., PostgreSQL instead of SQLite, even for MVP).

### Mistake 4: Vendor Lock-In Without Exit Strategy

**Symptom**: Deeply integrated with vendor, can't switch without full rewrite

**Example**: SaS company built on LangChain 0.1. LangChain released breaking changes in 0.2. Migration required 6 months.

**Fix**: Abstract vendor dependencies behind interfaces. Example:

```python
# Bad: Direct LangChain usage everywhere
from langchain.chains import LLMChain

chain = LLMChain(llm=OpenAI(), prompt=prompt)
result = chain.run(input)

# Good: Abstracted behind interface
from app.orchestration import WorkflowEngine

engine = WorkflowEngine()  # Can swap LangChain for custom framework
result = engine.run_workflow("contract_drafting", input)
```

### Mistake 5: Over-Optimizing Too Early

**Symptom**: Spending 3 months optimizing inference costs before reaching $10K MRR

**Example**: Startup spent 4 months fine-tuning custom model to reduce costs from $0.05 to $0.02 per request.

**Savings**: $0.03 × 1,000 requests/month = $30/month saved
**Cost**: 4 months × 2 engineers = ~$120K spent

**ROI**: Would need 4,000 months (333 years) to break even.

**Fix**: Optimize only when costs exceed $5K/month. Focus on growth, not cost optimization, pre-PMF.

## The Build vs. Buy Decision Tree

### Use This Framework for Every Component

```
Decision Tree:

1. Does this create competitive advantage?
   ├─ NO → BUY (unless buying doesn't exist)
   └─ YES → Continue to #2

2. Can we buy something that meets 80% of our needs?
   ├─ YES → BUY and customize the 20%
   └─ NO → Continue to #3

3. Do we have expertise to build this well?
   ├─ NO → BUY or hire expertise
   └─ YES → Continue to #4

4. Will building this take <20% of engineering time?
   ├─ NO → BUY (can't afford to build)
   └─ YES → Continue to #5

5. Will this need continuous maintenance?
   ├─ YES → BUY (maintenance is a distraction)
   └─ NO → BUILD

Default: BUY
Exception: Domain expertise (always build)
```

## Summary: What to Build vs. Buy

**ALWAYS BUY:**
- Foundation models (OpenAI, Anthropic, etc.)
- Vector databases (Pinecone, pgvector, Weaviate)
- Auth (Clerk, Auth0, WorkOS)
- Billing (Stripe, Chargebee)
- Hosting (AWS, GCP, Cloudflare)

**CUSTOMIZE OPEN SOURCE:**
- Agent orchestration (start with LangChain, customize heavily)
- Agent frameworks (CrewAI, AutoGPT for multi-agent)

**BUILD FOR MVP, BUY FOR SCALE:**
- UI (start with Next.js templates, build custom later)

**BUY FOR MVP, BUILD FOR SCALE:**
- Integrations (use Zapier for MVP, build top 3-5 native integrations)

**ALWAYS BUILD:**
- Domain expertise (business rules, validation, quality checks)
- Proprietary data and training examples
- Core workflows and orchestration (customize from frameworks)
- Quality assurance systems

## Key Takeaways

**1. Default to buy for infrastructure**
- Foundation models, vector databases, auth, billing are commodities
- Building these delays product-market fit by 12-24 months
- Focus engineering resources on domain expertise

**2. Domain expertise is your moat—always build**
- Business logic, validation rules, proprietary data
- Requires domain experts on the team (ex-professionals from your vertical)
- 18-36 months to build defensible position

**3. Customize, don't adopt, agent frameworks**
- Start with LangChain or LlamaIndex to save 6-12 months
- Heavily customize as requirements grow
- Most companies build custom orchestration by Series A

**4. Plan for rebuilds**
- MVP architecture won't scale to 1,000 customers
- Use scalable infrastructure from day one (PostgreSQL, not SQLite)
- Abstract vendor dependencies to avoid lock-in

**5. Don't over-optimize pre-PMF**
- Inference costs <$5K/month aren't worth optimizing
- Focus on growth and product-market fit
- Optimize costs aggressively post-PMF (Series A+)

**6. Technical debt is inevitable**
- You'll rebuild major components 2-3 times as you scale
- Budget 15-20% of engineering time for infrastructure improvements
- The alternative (building "perfect" architecture upfront) delays PMF

---

You now have a framework for deciding what to build vs. buy at every layer of the Services-as-Software stack.

**Next**: Chapter 6 shows how to design for trust—the primary barrier to Services-as-Software adoption. Learn the Trust Architecture Canvas and how to build products customers believe in.
