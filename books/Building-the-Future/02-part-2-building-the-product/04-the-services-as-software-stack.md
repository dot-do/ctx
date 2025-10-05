# Chapter 4: The Services-as-Software Stack

When GitHub Copilot's CTO was asked about their technical architecture in 2023, he gave a surprising answer:

"The hard part isn't the AI. GPT-4 writes decent code out of the box. The hard part is knowing *when* to invoke it, *what* context to give it, *how* to verify the output, and *what* to do when it fails. That's 80% of our engineering effort."

This observation captures a fundamental truth about Services-as-Software: **the foundation model is just one layer in a complex stack**. Understanding this stack—what each layer does, which components you need, and how they interact—is critical for building successful SaS products.

Most founders make one of two mistakes:

**Mistake 1: "It's just an API wrapper"**—believing that calling GPT-4 with good prompts is sufficient. These founders launch quickly but hit a quality ceiling around 70% accuracy and can't improve further.

**Mistake 2: "We need to build everything"**—building custom foundation models, vector databases, orchestration frameworks, and UI components from scratch. These founders spend 18-24 months building infrastructure before having a product.

The right approach: **understand the five-layer SaS stack, build what creates competitive advantage, buy everything else**.

## The Five-Layer Services-as-Software Stack

Think of the SaS stack as analogous to traditional computing:

| **SaS Layer** | **Computing Analog** | **Primary Function** | **Build or Buy?** |
|---------------|---------------------|---------------------|-------------------|
| **Layer 1: Foundation Models** | CPU | Raw processing power | **Buy** |
| **Layer 2: Knowledge Systems** | RAM/Storage | Memory and retrieval | **Buy** |
| **Layer 3: Agent Orchestration** | Operating System | Workflow coordination | **Customize** |
| **Layer 4: Domain Expertise** | Applications | Business logic | **Build** |
| **Layer 5: Business Layer** | User Interface | Customer interaction | **Build** |

**Your competitive advantage lives in Layers 4-5.** Layers 1-3 are increasingly commoditized infrastructure.

Let's examine each layer in detail.

## Layer 1: Foundation Models (The "CPU")

Foundation models—GPT-4, Claude, Gemini, Llama—are the processing engines that power SaS products. They handle language understanding, generation, reasoning, and basic knowledge retrieval.

### What Foundation Models Do

**Core capabilities:**
- **Natural language understanding**: Parse complex documents, extract information, understand intent
- **Text generation**: Write contracts, emails, reports, code, marketing copy
- **Reasoning**: Multi-step problem solving, logical inference, planning
- **Knowledge recall**: Answer questions based on training data (up to knowledge cutoff)
- **Code execution**: Write, debug, and explain code

**What they DON'T do well:**
- Access current information (knowledge cutoff problem)
- Retrieve company-specific data (need external knowledge)
- Follow complex multi-step workflows (need orchestration)
- Maintain consistency across requests (need memory systems)
- Execute domain-specific logic (need custom business rules)

### The Commoditization Thesis

Foundation models are rapidly commoditizing:

**Evidence:**
- **Price compression**: GPT-4 API costs dropped 90% from March 2023 ($0.06/1K tokens) to November 2024 ($0.006/1K tokens for gpt-4o-mini)
- **Performance convergence**: Claude 3.5, GPT-4o, and Gemini 1.5 Pro have similar capabilities on most benchmarks
- **Open source alternatives**: Llama 3.1 405B approaches GPT-4 performance at fraction of the cost
- **Specialized models**: Cheaper task-specific models (Mistral for summarization, CodeLlama for coding) match general models on narrow tasks

**What this means for SaS founders:**
- Don't compete on model quality—foundation models aren't a moat
- Don't invest in fine-tuning unless absolutely necessary (usually not)
- Build for model-agnostic architecture—you'll switch models 3-5 times as better/cheaper options emerge
- Focus on Layers 3-5 where defensibility actually exists

### Build vs. Buy: Always Buy

**When to build your own foundation model:** Never (for 99.9% of SaS companies).

**Why not:**
- **Cost**: Training a GPT-4 scale model costs $50-100M
- **Time**: 12-24 months from start to deployment
- **Talent**: Requires 20-50 ML researchers and engineers
- **Infrastructure**: Needs 10,000+ GPUs
- **Continuous improvement**: Requires ongoing investment as incumbents improve

**Exceptions:**
- You're a well-funded AI lab (OpenAI, Anthropic, Google)
- Your domain requires a model trained on proprietary data at scale (e.g., medical imaging with 100M+ labeled images)
- You're building in a language/domain with poor existing model support

**For everyone else:** Use commercial APIs (OpenAI, Anthropic) or open source models (Llama, Mistral) deployed via hosting providers (Replicate, Hugging Face, AWS Bedrock).

### Model Selection Framework

**Factors to consider:**

1. **Task requirements**
   - Simple tasks (classification, extraction): Use cheaper models (GPT-4o-mini, Claude Instant)
   - Complex reasoning (legal analysis, code generation): Use frontier models (GPT-4o, Claude 3.5 Sonnet)
   - Structured output needs: Use models with JSON mode (GPT-4, Gemini)

2. **Latency requirements**
   - Real-time (customer support chat): Optimize for speed (GPT-4o-mini, Mistral)
   - Batch processing (document review): Optimize for cost (Llama 3.1, fine-tuned models)

3. **Cost constraints**
   - High volume, low margin: Use cheapest acceptable model
   - Low volume, high value: Use best model regardless of cost

4. **Privacy/compliance**
   - Enterprise data: Use models with data isolation guarantees (Azure OpenAI, AWS Bedrock)
   - Regulated industries: Consider on-prem deployment (open source models)

**Example: Harvey AI's model strategy**

Harvey uses **multiple models in a cascade**:
- GPT-4o-mini for initial document classification ($0.15/1K tokens → $0.60/1K tokens)
- Claude 3.5 Sonnet for contract drafting ($3/1M tokens → $15/1M tokens)
- GPT-4o for complex legal reasoning ($5/1M tokens → $15/1M tokens)
- Fine-tuned Llama for specific tasks (clause extraction) where cost matters

**Result**: 60% cost reduction vs. using GPT-4 for everything, with comparable quality.

## Layer 2: Knowledge Systems (The "Memory")

Foundation models have limited memory (context window) and static knowledge (training cutoff). Knowledge systems solve this by storing, indexing, and retrieving domain-specific information.

### The RAG Architecture

**Retrieval-Augmented Generation (RAG)** is the standard architecture for giving LLMs access to external knowledge:

```
User Query → Vector Search → Retrieve Relevant Docs → Inject into Context → LLM Generates Response
```

**How it works:**

1. **Ingestion**: Convert documents (PDFs, contracts, emails) into embeddings (vector representations)
2. **Storage**: Store embeddings in a vector database with metadata
3. **Retrieval**: When user asks a question, convert query to embedding and find similar documents
4. **Augmentation**: Inject relevant documents into LLM context window
5. **Generation**: LLM generates response based on retrieved context

**Why RAG beats fine-tuning:**
- Updates instantly (add new documents without retraining)
- Cites sources (shows where information came from)
- Costs less ($0.10/1K documents vs. $1,000+ to fine-tune)
- Works with any foundation model

### Vector Database Options

**Three deployment patterns:**

**1. Managed Vector Databases**
- **Pinecone**: Fully managed, excellent performance, expensive ($70/month + $0.10/million vectors)
- **Weaviate Cloud**: Open source with managed hosting, good for scale
- **Qdrant Cloud**: Open source, fast, affordable ($0.20/GB/month)

**When to use**: Early stage (pre-PMF), want zero ops overhead, can afford premium pricing

**2. Vector Search Extensions**
- **pgvector (Postgres)**: Add vector search to existing Postgres DB
- **OpenSearch**: Elasticsearch with vector search
- **MongoDB Atlas Vector Search**: Vector capabilities in MongoDB

**When to use**: Already using these databases, want unified stack, have DB expertise in-house

**3. Self-Hosted Open Source**
- **Weaviate**: Feature-rich, production-ready
- **Milvus**: High performance, complex setup
- **Chroma**: Simple, lightweight, good for development

**When to use**: Post-Series A, cost-sensitive at scale, have infrastructure team

**Recommendation for most SaS startups:**
- **Pre-seed to Seed**: Start with pgvector (simple, cheap) or Pinecone (fast, managed)
- **Series A+**: Evaluate self-hosted options when vector costs exceed $5K/month

### Knowledge Management Challenges

**Challenge 1: Document Chunking**

**Problem**: Documents must be split into chunks (e.g., 500 tokens) for embedding. Too small = lost context. Too large = irrelevant information retrieved.

**Solution**: Hierarchical chunking
```
Document → Sections → Paragraphs → Sentences
```
- Embed at multiple levels
- Retrieve at paragraph level, expand to section if needed
- Maintain document metadata (source, date, author)

**Example: Pilot.com's approach**

Pilot chunks financial documents hierarchically:
- **Invoice level**: Metadata (vendor, date, amount)
- **Line item level**: Individual expenses
- **Transaction level**: Bank transactions

When categorizing an expense, they retrieve:
1. Similar invoices (document level)
2. Similar line items (paragraph level)
3. Similar transactions (sentence level)

**Result**: 94% categorization accuracy vs. 78% with naive chunking.

**Challenge 2: Semantic Drift**

**Problem**: Embeddings created 6 months ago may not match current query embeddings (models change, terminology evolves).

**Solution**: Periodic re-embedding
- Re-embed entire corpus when switching embedding models
- Track embedding model version in metadata
- A/B test query quality before migrating

**Challenge 3: Multi-Modal Knowledge**

**Problem**: Professional services deal with text, images (charts, diagrams), tables, and structured data.

**Solution**: Multi-modal RAG architecture
- Extract text from images (OCR or vision models)
- Convert tables to text + structured metadata
- Embed text and metadata separately
- Use fusion retrieval (combine text search + metadata filters)

**Example: Harvey AI's multi-modal approach**

For contract analysis:
- Text: Embed contract clauses
- Tables: Convert financial terms to structured JSON + embed descriptions
- Images: Extract charts/diagrams to text descriptions
- Signatures: Metadata (who signed, when)

**Result**: Can answer "What payment terms did we agree to with vendors in Q3?" across 1,000+ contracts.

## Layer 3: Agent Orchestration (The "Operating System")

Foundation models and knowledge systems provide raw capabilities. Agent orchestration coordinates them into reliable workflows.

### What is an AI Agent?

**Definition**: An AI agent is a system that:
1. Receives a goal or task
2. Plans how to accomplish it
3. Executes steps (using tools, retrieving knowledge, reasoning)
4. Monitors progress and adapts
5. Returns results

**Contrast with simple LLM calls:**
- **LLM call**: "Draft a contract" → One response → Done
- **Agent**: "Draft a contract" → [Retrieves templates] → [Drafts outline] → [Fills sections] → [Reviews for errors] → [Formats] → Done

Agents handle multi-step workflows that require iteration, tool use, and decision-making.

### Agent Orchestration Frameworks

**Three categories:**

**1. Code-First Frameworks**
- **LangChain**: Most popular, extensive tool ecosystem, Python/JS
- **LlamaIndex**: Data-focused, strong RAG support
- **Haystack**: Production-ready, modular, fewer abstractions

**Pros**: Maximum flexibility, full control, extensive community
**Cons**: Steep learning curve, verbose code, need to build guardrails

**When to use**: Custom workflows, complex business logic, engineering team comfortable with Python

**2. Low-Code Agent Platforms**
- **LangFlow**: Visual workflow builder on top of LangChain
- **Flowise**: Open source, drag-and-drop agent creation
- **Relevance AI**: Managed platform for building and deploying agents

**Pros**: Faster prototyping, less code, easier for non-engineers
**Cons**: Less flexibility, vendor lock-in risk, limited customization

**When to use**: Rapid MVPs, non-technical founding teams, standard workflows

**3. Agentic Frameworks**
- **AutoGPT**: Autonomous agents with minimal guidance
- **BabyAGI**: Task-driven autonomous agents
- **CrewAI**: Multi-agent collaboration framework

**Pros**: Handles complex tasks autonomously, impressive demos
**Cons**: Unreliable in production, expensive (many LLM calls), hard to debug

**When to use**: Research, experimentation, non-critical workflows

**Recommendation:**
- **Pre-seed**: Start with LangChain (most mature) or Flowise (faster prototyping)
- **Seed to Series A**: Build custom orchestration on top of LangChain or migrate to custom framework
- **Series B+**: Most companies build custom orchestration (frameworks are too generic)

### Key Orchestration Patterns

**Pattern 1: Sequential Workflow**

```python
# Pseudocode for contract drafting agent
def draft_contract(input):
    # Step 1: Retrieve template
    template = retriever.search(input.contract_type)

    # Step 2: Draft outline
    outline = llm.generate(f"Create outline for {input.contract_type} based on {template}")

    # Step 3: Fill each section
    sections = []
    for section in outline:
        content = llm.generate(f"Write {section} with {input.details}")
        sections.append(content)

    # Step 4: Review and format
    draft = "\n\n".join(sections)
    reviewed = llm.generate(f"Review this contract for errors: {draft}")

    return reviewed
```

**When to use**: Linear workflows with clear steps (document generation, data extraction, categorization)

**Pattern 2: Planning + Execution**

```python
# Pseudocode for legal research agent
def legal_research(query):
    # Step 1: Plan research approach
    plan = llm.generate(f"Create research plan for: {query}")

    # Step 2: Execute plan steps
    results = []
    for step in plan.steps:
        if step.type == "search":
            docs = retriever.search(step.query)
            results.append(docs)
        elif step.type == "analyze":
            analysis = llm.generate(f"Analyze {docs} for {step.question}")
            results.append(analysis)

    # Step 3: Synthesize findings
    synthesis = llm.generate(f"Synthesize these findings: {results}")

    return synthesis
```

**When to use**: Research tasks, complex analysis, when approach varies by input

**Pattern 3: Tool-Augmented Agents**

```python
# Pseudocode for financial analysis agent
def financial_analysis(company):
    # Define tools
    tools = [
        search_financial_statements,
        calculate_ratios,
        compare_to_peers,
        generate_chart
    ]

    # Agent loop
    task = f"Analyze financial health of {company}"
    while not task.complete:
        # Agent decides which tool to use
        action = llm.generate(f"What to do next for: {task}? Available tools: {tools}")

        # Execute tool
        result = execute_tool(action.tool, action.params)

        # Update task state
        task.update(result)

    return task.result
```

**When to use**: Tasks requiring external actions (API calls, database queries, calculations)

**Pattern 4: Multi-Agent Collaboration**

```python
# Pseudocode for multi-agent contract review
def review_contract(contract):
    # Specialist agents
    legal_agent = Agent(role="legal", expertise=["liability", "compliance"])
    financial_agent = Agent(role="finance", expertise=["payment_terms", "penalties"])

    # Each agent reviews their domain
    legal_review = legal_agent.review(contract)
    financial_review = financial_agent.review(contract)

    # Manager agent synthesizes
    manager = Agent(role="manager")
    final_review = manager.synthesize([legal_review, financial_review])

    return final_review
```

**When to use**: Complex domains requiring specialized expertise, quality > speed

### Orchestration Challenges

**Challenge 1: Error Handling**

Agents fail frequently (LLM errors, API timeouts, tool failures). Production orchestration requires:

- **Retries with exponential backoff**: 3-5 attempts before giving up
- **Fallback strategies**: Switch to simpler approach if complex one fails
- **Human escalation**: Clear triggers for when to involve humans
- **Logging and observability**: Track every step for debugging

**Example: Intercom Fin's error handling**

Fin has four fallback levels:
1. **Primary**: GPT-4o with full RAG
2. **Fallback 1**: GPT-4o-mini with limited context (if timeout)
3. **Fallback 2**: Template-based response (if GPT-4o-mini fails)
4. **Escalation**: Human agent (if all fails or confidence < 70%)

**Result**: 99.5% query resolution (72% autonomous + 27.5% fallback/escalation + 0.5% failure)

**Challenge 2: Context Window Management**

Most valuable workflows require more context than fits in context windows (128K tokens ≈ 300 pages).

**Solutions:**
- **Hierarchical summarization**: Summarize long documents before injecting
- **Relevance filtering**: Only include most relevant context
- **Multi-turn strategies**: Break tasks into smaller prompts
- **External memory**: Store intermediate results in database

**Challenge 3: Cost Control**

Complex agents can make 10-50 LLM calls per task. At $0.01-0.10 per call, costs scale quickly.

**Solutions:**
- **Caching**: Cache repeated prompts (LLM providers now offer this)
- **Smaller models**: Use GPT-4o-mini for simple steps
- **Batch processing**: Group multiple tasks into single LLM call
- **Prompt optimization**: Reduce unnecessary context

**Target**: Keep LLM costs under 10% of revenue. If higher, pricing or architecture needs adjustment.

## Layer 4: Domain Expertise (Your Competitive Advantage)

This is where you build defensibility. Domain expertise includes:
- Business logic specific to your vertical
- Quality standards and validation rules
- Proprietary data and training examples
- Workflow understanding

### What Domain Expertise Looks Like

**Example: Harvey AI (Legal)**

Domain expertise includes:
- **Jurisdiction-specific rules**: Delaware corporate law differs from California
- **Document type taxonomies**: 37 types of contracts, each with specific requirements
- **Quality checks**: Every contract must have consideration, parties, terms, signatures
- **Citation formats**: Legal citations follow Bluebook style
- **Risk scoring**: Flag high-risk clauses (unlimited liability, auto-renewal, IP assignment)

**This took 2 years to build**, requires ex-lawyers on the team, and can't be easily replicated.

**Example: Pilot.com (Accounting)**

Domain expertise includes:
- **Tax rules**: Federal, state, local tax regulations by entity type
- **Accounting standards**: GAAP vs. cash basis, when to use each
- **Industry-specific categorization**: SaaS company expenses differ from manufacturing
- **Audit requirements**: What documentation is needed for audit compliance
- **Financial close process**: 15-step checklist for monthly close

**This took 3 years to build**, required 50+ accountants' input, and is core IP.

### Building Domain Expertise

**Step 1: Hire domain experts**

**Required roles:**
- **Product**: 1-2 domain experts (ex-lawyers for legal SaS, ex-accountants for finance SaS)
- **Engineering**: Doesn't need domain expertise, but must learn enough to build correctly
- **Customer Success**: All domain experts (they're replacing professionals, must speak the language)

**Mistake**: Hiring consultants instead of full-time experts. Domain expertise must be internal.

**Step 2: Codify workflows**

Document every step of the professional service:
1. What inputs are required?
2. What steps are performed?
3. What outputs are produced?
4. What quality checks are performed?
5. What edge cases exist?

**Example: Harvey AI's contract review checklist**

For M&A purchase agreements:
- 127 clauses to check
- 43 risk factors to score
- 15 compliance requirements
- 8 financial term validations
- 200+ edge cases documented

**This becomes your test suite.**

**Step 3: Build validation layers**

Professional services have zero tolerance for errors. Build validation at three levels:

**Level 1: Schema validation**
- Are required fields present?
- Are data types correct?
- Are values in acceptable ranges?

**Level 2: Business rule validation**
- Does the output follow domain-specific rules?
- Are there logical inconsistencies?
- Do calculations check out?

**Level 3: Quality scoring**
- How confident is the AI in this output?
- Does it match historical patterns?
- Are there red flags that require human review?

**Example: Pilot.com's validation layers**

For expense categorization:
- **Level 1**: Amount > 0, vendor name present, date valid
- **Level 2**: Category matches typical vendor patterns, amount reasonable for category
- **Level 3**: Confidence score (0-1) based on similarity to training data, flag if < 0.85

**Step 4: Create proprietary datasets**

Your competitive moat comes from data:
- Customer data (with permission)
- Human corrections to AI outputs
- Domain-specific training examples
- Quality rubrics and evaluation sets

**Privacy considerations**: Anonymize customer data, get explicit consent, comply with GDPR/CCPA.

**Timeline**: Building defensible domain expertise takes 18-36 months. No shortcuts.

## Layer 5: Business Layer (Customer Interface)

The business layer is everything customers interact with:
- User interface (web app, mobile app, API)
- Pricing and billing systems
- Authentication and access control
- Integrations with customer tools
- Customer support and success

### Key Components

**1. User Interface**

**Options:**
- **Web app**: Next.js, React, Vue.js
- **Mobile app**: React Native (cross-platform) or native (iOS/Android)
- **API-first**: Expose AI capabilities via API for integration
- **Embedded**: Widget embedded in customer's existing tools

**Most SaS companies start with web app + API**, add mobile/embedded later.

**Design principles:**
- **Show the work**: Display AI's reasoning, not just outputs
- **Make trust visible**: Confidence scores, citation links, human review status
- **Enable iteration**: Easy to refine, regenerate, or override AI outputs
- **Minimize friction**: 2-3 clicks from input to result

**Example: Jasper's UI evolution**

**V1 (2021)**: Simple text box → Generate button → Output
- Fast to build, but users didn't trust outputs

**V2 (2022)**: Templates (blog post, email, ad copy) → Guided inputs → Generate → Edit
- Better, but felt like "AI mad libs"

**V3 (2023)**: Chat interface → Conversational refinement → Show reasoning → Generate
- Users trust more, iterate more, get better results

**Lesson**: UI that makes AI reasoning visible drives higher adoption.

**2. Pricing and Billing**

Covered in depth in Chapter 9. Key decision: subscription vs. usage-based vs. hybrid.

**Technical requirements:**
- Usage tracking (for usage-based pricing)
- Subscription management (Stripe, Chargebee)
- Invoicing and payments
- Tax calculation (for global customers)

**Recommendation**: Start with Stripe for simplicity, consider Chargebee at scale (better for complex pricing).

**3. Authentication and Access Control**

**B2B SaS requirements:**
- SSO (SAML, OIDC) for enterprise customers
- Role-based access control (admin, user, viewer)
- Team/workspace management (multi-tenant)
- API keys for programmatic access

**Auth providers:**
- **Auth0**: Comprehensive, enterprise-ready, expensive
- **Clerk**: Modern, developer-friendly, good for startups
- **WorkOS**: Enterprise features (SSO, SCIM), startup-friendly pricing
- **Supabase Auth**: Open source, simple, integrates with Postgres

**Recommendation**: Start with Clerk or Supabase Auth, migrate to WorkOS when enterprise SSO becomes a dealbreaker.

**4. Integrations**

Professional services don't exist in isolation. SaS products must integrate with:
- **Communication**: Slack, email, Microsoft Teams
- **Productivity**: Google Workspace, Microsoft 365
- **Domain tools**: Salesforce (for sales SaS), QuickBooks (for accounting SaS), GitHub (for dev SaS)
- **Workflow**: Zapier, Make (for citizen integrations)

**Integration strategy:**
- **Phase 1 (MVP)**: Manual import/export (CSV, API)
- **Phase 2 (PMF)**: Top 3 integrations for your market (e.g., Slack, Salesforce, Google Drive)
- **Phase 3 (Scale)**: Comprehensive integration ecosystem (Zapier, public API)

**Example: Intercom Fin's integration priorities**

1. **Native integrations** (built by Intercom): Salesforce, Zendesk, Jira
2. **Partner integrations** (built by partners): HubSpot, Shopify
3. **Zapier**: 1,000+ app integrations via Zapier

**Lesson**: Build the 3-5 integrations that 80% of customers need. Zapier handles the long tail.

## How The Layers Work Together

Let's walk through a complete example: **Harvey AI drafting a Series A term sheet**.

### User Request
"Draft a Series A term sheet for $15M raise at $75M post-money valuation, standard terms, investor-friendly."

### Layer 1: Foundation Model (GPT-4o)
**Input**: User request + context
**Output**: High-level structure for term sheet

```
Sections needed:
1. Investment amount and valuation
2. Liquidation preference (1x participating)
3. Board composition (investor seats)
4. Protective provisions
5. Anti-dilution (broad-based weighted average)
...
```

### Layer 2: Knowledge System (RAG)
**Query**: "Series A term sheet standard clauses"
**Retrieved**:
- 15 similar term sheets from Harvey's database
- Y Combinator's SAFE and term sheet templates
- Industry-standard clause library

**Injected into context**: Top 5 most relevant clauses for each section

### Layer 3: Agent Orchestration

**Step 1**: Plan term sheet structure (5 sections)
**Step 2**: Draft each section using template + user specifics
**Step 3**: Validate against Harvey's legal rules:
- Valuation math checks out?
- All required clauses present?
- No conflicting terms?

**Step 4**: Flag high-risk clauses for review
**Step 5**: Format in standard legal document style

### Layer 4: Domain Expertise

**Applied rules:**
- Board composition must total odd number (deadlock prevention)
- Liquidation preference can't exceed 2x (investor-friendly ≠ predatory)
- Anti-dilution must specify weighted average method
- Protective provisions must align with NVCA standards

**Quality checks:**
- All financial math validated (valuations, ownership percentages)
- Capitalization table updated with new investment
- Red flags highlighted (e.g., "This valuation implies 5x growth required for Series B—ambitious")

### Layer 5: Business Layer

**Delivered to user:**
- Formatted term sheet (PDF + Word)
- Confidence score: 92%
- Highlighted sections requiring attorney review (3 clauses)
- Comparison to market standards (e.g., "Liquidation preference is standard")
- Next steps checklist (e.g., "Have attorney review before sending")

**Estimated time:** 4 minutes (vs. 3 hours for attorney to draft from scratch)
**Estimated cost:** $25 (vs. $1,200 attorney time)

### Why All Five Layers Matter

**Missing Layer 1 (Foundation Model)**: Can't generate coherent, professional-quality text
**Missing Layer 2 (Knowledge)**: Outputs are generic, don't reflect market norms
**Missing Layer 3 (Orchestration)**: Can't handle multi-step workflow, inconsistent quality
**Missing Layer 4 (Domain Expertise)**: Outputs may be plausible but incorrect, miss edge cases
**Missing Layer 5 (Business Layer)**: Can't deliver value to customers, no pricing/billing

All five layers are necessary. **Your differentiation is in how well they work together.**

## Build vs. Buy at Each Layer: Quick Reference

Detailed in Chapter 5, but here's the summary:

**Layer 1 (Foundation Models): Always Buy**
- Use OpenAI, Anthropic, or open source models
- Exception: You're an AI lab with $100M+ to invest

**Layer 2 (Knowledge Systems): Usually Buy**
- Start with pgvector or Pinecone
- Self-host (Weaviate, Qdrant) at scale if cost-sensitive
- Build custom retrieval logic, not the vector database

**Layer 3 (Agent Orchestration): Customize**
- Start with LangChain or LlamaIndex
- Heavily customize for your workflows
- Most companies build custom orchestration by Series A

**Layer 4 (Domain Expertise): Always Build**
- This is your moat—can't be purchased
- Requires domain experts on team
- 18-36 months to reach defensible position

**Layer 5 (Business Layer): Build for Differentiation**
- Use templates/frameworks for MVP (Next.js, Stripe)
- Build custom UI once you understand user needs
- Integrations: Build top 3, use Zapier for long tail

**Rule of thumb**: Spend 10% of engineering time on Layers 1-2, 20% on Layer 3, 70% on Layers 4-5.

## Stack Evolution: Staying Current

The SaS stack is evolving rapidly. What's true today may be obsolete in 12 months.

### Current Trends (2024-2025)

**1. Longer context windows**
- 128K → 1M+ tokens
- **Impact**: Less need for complex RAG, can inject more context
- **What changes**: Simpler architectures, but higher costs

**2. Multimodal models**
- GPT-4o, Gemini 1.5 Pro, Claude 3.5 can process images + text
- **Impact**: Easier to handle documents with charts, diagrams, tables
- **What changes**: Less preprocessing, more powerful analysis

**3. Tool use / Function calling**
- Models can decide when to call external tools
- **Impact**: Easier to build agents, less orchestration code
- **What changes**: LangChain becomes less necessary, simpler to use native APIs

**4. Model specialization**
- Cheaper models for specific tasks (summarization, classification)
- **Impact**: Cost reductions by using right-sized models
- **What changes**: More complex routing logic, but 60-80% cost savings

**5. Agentic frameworks maturing**
- LangGraph, CrewAI improving reliability
- **Impact**: Multi-agent systems becoming production-ready
- **What changes**: More sophisticated workflows possible

### How to Stay Current

**Strategy 1: Build for replaceability**

Architecture principle: **Any layer should be swappable with minimal code changes.**

**Example:**
```python
# Bad: Tightly coupled to OpenAI
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}]
)

# Good: Abstracted LLM interface
llm = LLMProvider.get("gpt-4")  # Can swap to Claude, Llama, etc.
response = llm.complete(prompt)
```

**Strategy 2: Monitor competitive landscape**

Track:
- New model releases (subscribe to OpenAI, Anthropic, Google blogs)
- Benchmark leaderboards (Chatbot Arena, MMLU, HumanEval)
- Cost changes (models typically drop 50-90% in price over 18 months)

**Cadence**: Review quarterly, switch models 1-2x per year.

**Strategy 3: A/B test everything**

Before migrating to new model or architecture:
- A/B test on 5-10% of traffic
- Measure quality (accuracy, user satisfaction)
- Measure cost (inference costs, latency)
- Roll out gradually (10% → 50% → 100% over 2-4 weeks)

**Strategy 4: Invest in evaluation infrastructure**

Build automated testing:
- Golden dataset: 500-1,000 human-validated examples
- Quality metrics: Accuracy, precision, recall, F1
- Regression tests: Ensure new models don't break existing functionality
- Cost tracking: Monitor inference costs per request

**Goal**: Detect quality regressions before customers do.

## Common Mistakes and How to Avoid Them

### Mistake 1: Building Too Much Infrastructure

**Symptom**: 12+ months of development before first customer

**Why it happens**: Engineers want to build the "right" system from day one.

**Fix**:
- Use off-the-shelf for Layers 1-3
- Focus engineering on Layers 4-5 (domain expertise, UI)
- Ship MVP in 3-6 months, iterate from there

### Mistake 2: Treating Foundation Model as the Product

**Symptom**: Product is just a thin wrapper around GPT-4 API

**Why it happens**: Founders underestimate importance of domain expertise, orchestration, quality assurance.

**Fix**:
- Build domain-specific validation rules
- Invest in proprietary data and evaluation
- Create multi-step workflows, not single prompts

### Mistake 3: Not Planning for Model Migration

**Symptom**: Hard-coded prompts, model-specific features, can't switch providers

**Why it happens**: Optimizing for current model without thinking about future.

**Fix**:
- Abstract model provider behind interface
- Make prompts configurable, not hard-coded
- Test with multiple models during development

### Mistake 4: Ignoring Cost Management

**Symptom**: Inference costs are 30-50% of revenue

**Why it happens**: Using expensive models (GPT-4) for everything, not optimizing context.

**Fix**:
- Use cheaper models for simple tasks
- Implement caching for repeated queries
- Limit context to what's actually needed
- Set cost budgets and monitor in real-time

### Mistake 5: Skipping Evaluation Infrastructure

**Symptom**: No systematic way to measure quality, regressions discovered by customers

**Why it happens**: Focused on feature development, not quality assurance.

**Fix**:
- Build golden dataset from day one
- Run automated tests on every deployment
- Track quality metrics (accuracy, user satisfaction) weekly
- Review failures monthly and add to test suite

## Key Takeaways

**1. The five-layer stack is essential**
- Foundation Models (buy)
- Knowledge Systems (buy)
- Agent Orchestration (customize)
- Domain Expertise (build)
- Business Layer (build for differentiation)

**2. Competitive advantage lives in Layers 4-5**
- Foundation models are commoditizing
- Everyone has access to same RAG tools
- Domain expertise and business logic are defensible

**3. Start with off-the-shelf infrastructure**
- Don't build foundation models, vector databases, or orchestration from scratch
- Focus engineering resources on domain expertise
- Ship MVP in 3-6 months, not 18 months

**4. Build for replaceability**
- Models will change 3-5x over your company's lifetime
- Abstract providers behind interfaces
- A/B test everything before migrating

**5. Invest in quality infrastructure**
- Golden datasets for testing
- Automated regression tests
- Cost and quality monitoring
- Monthly failure reviews

**6. Cost management is critical**
- Target <10% of revenue for inference costs
- Use right-sized models for each task
- Implement caching and batch processing
- Monitor costs in real-time

**7. The stack is evolving rapidly**
- What's true today may be obsolete in 12 months
- Stay current through monitoring, testing, and gradual migration
- Don't chase every new release—wait for stability

---

You've now learned the five-layer Services-as-Software stack and what to build vs. buy at each layer.

**Next**: Chapter 5 dives deeper into build vs. buy decisions with decision frameworks, cost models, and real-world examples from successful SaS companies.
