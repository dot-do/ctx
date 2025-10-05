# Appendix A: Services-as-Software Technology Stack

This appendix provides a detailed overview of the technology stack powering Services-as-Software companies. It covers the key technologies mentioned throughout the book with practical details for builders and technical decision-makers.

## Foundation Models

### OpenAI GPT-4o / GPT-4o-mini
- **Best for**: Legal research, document drafting, customer support, content generation
- **Context**: 128K tokens
- **Strengths**: Excellent reasoning, instruction following, factual knowledge
- **Cost**: GPT-4o: $2.50/$10 per million tokens (in/out), GPT-4o-mini: $0.15/$0.60 per million tokens
- **API**: REST, Python/TypeScript SDKs
- **Use cases in book**:
  - Harvey AI legal research
  - Contract generation
  - Customer support (Intercom Fin)

### Anthropic Claude 3.5 Sonnet
- **Best for**: Long-form analysis, document processing, complex reasoning
- **Context**: 200K tokens
- **Strengths**: Safety, nuanced analysis, coding
- **Cost**: $3/$15 per million tokens (in/out)
- **API**: REST, Python/TypeScript SDKs
- **Use cases in book**:
  - Financial analysis
  - Consulting research
  - Document review

### Google Gemini 1.5 Pro
- **Best for**: Multimodal applications, large document analysis
- **Context**: 1M+ tokens (largest available)
- **Strengths**: Massive context window, multimodal, Google ecosystem
- **Cost**: $1.25/$5 per million tokens (in/out)
- **API**: Google Cloud Vertex AI
- **Use cases in book**:
  - Processing entire codebases
  - Analyzing massive document sets
  - Multimodal creative content

## Domain-Specific Models

### Harvey AI (Legal)
- **Company**: Harvey AI
- **Focus**: Legal research, contract analysis, document drafting
- **Technology**: Fine-tuned models on legal corpus
- **Pricing**: Enterprise contracts (typically $100-$500/user/month)
- **Key features**:
  - Jurisdiction-aware legal research
  - Contract generation and review
  - Due diligence automation
  - Matter management integration
- **Case study**: Allen & Overy 70% time reduction

### GitHub Copilot (Software Development)
- **Company**: GitHub (Microsoft)
- **Focus**: Code generation and completion
- **Technology**: Codex (GPT-based, trained on code)
- **Pricing**: $10/user/month (individual), $19/user/month (business)
- **Key features**:
  - Real-time code suggestions
  - Natural language to code
  - Test generation
  - Documentation generation
- **Stats**: 55% of code AI-generated, 55% faster task completion

### Pilot.com AI (Accounting)
- **Company**: Pilot.com
- **Focus**: Bookkeeping automation
- **Technology**: Proprietary AI + human oversight
- **Pricing**: Starting at $499/month
- **Key features**:
  - Transaction categorization
  - Reconciliation automation
  - Financial reporting
  - Tax preparation
- **Performance**: 99.2% accuracy, 90% cost reduction

## Vector Databases and RAG

### Pinecone
```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="your-api-key")

# Create index
index = pc.create_index(
    name="legal-knowledge",
    dimension=1536,  # OpenAI embedding size
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)

# Upsert documents
index.upsert(vectors=[
    ("doc1", embedding1, {"text": "...", "source": "case_law"}),
    ("doc2", embedding2, {"text": "...", "source": "statute"})
])

# Query
results = index.query(
    vector=query_embedding,
    top_k=10,
    include_metadata=True,
    filter={"source": "case_law"}
)
```

### Weaviate
```python
import weaviate
from weaviate.classes.init import Auth

client = weaviate.connect_to_wcs(
    cluster_url="https://your-cluster.weaviate.network",
    auth_credentials=Auth.api_key("your-key")
)

# Create schema
client.collections.create(
    name="LegalCase",
    vectorizer_config=weaviate.Configure.Vectorizer.text2vec_openai(),
    properties=[
        weaviate.Property(name="title", data_type=weaviate.DataType.TEXT),
        weaviate.Property(name="citation", data_type=weaviate.DataType.TEXT),
        weaviate.Property(name="jurisdiction", data_type=weaviate.DataType.TEXT),
    ]
)

# Query with hybrid search
response = client.query.hybrid(
    query="breach of fiduciary duty",
    collection="LegalCase",
    filters=weaviate.Filter.by_property("jurisdiction").equal("Delaware")
)
```

## Agent Frameworks

### LangChain for Professional Services
```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langchain.memory import ConversationBufferMemory

# Define tools for legal research
tools = [
    Tool(
        name="CaseSearch",
        func=search_case_law,
        description="Search case law by query and jurisdiction"
    ),
    Tool(
        name="StatuteSearch",
        func=search_statutes,
        description="Search statutes and regulations"
    ),
    Tool(
        name="Precedent",
        func=find_precedents,
        description="Find relevant precedents for a legal issue"
    )
]

# Create agent
llm = ChatOpenAI(model="gpt-4o", temperature=0)
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, memory=memory, verbose=True)

# Execute
result = executor.invoke({
    "input": "What are the requirements for piercing the corporate veil in Delaware?"
})
```

### Custom RAG Pipeline
```python
from openai import OpenAI
import numpy as np

class LegalRAG:
    def __init__(self, vector_db, embedding_model="text-embedding-3-large"):
        self.client = OpenAI()
        self.vector_db = vector_db
        self.embedding_model = embedding_model

    def embed_query(self, query: str):
        response = self.client.embeddings.create(
            model=self.embedding_model,
            input=query
        )
        return response.data[0].embedding

    def retrieve(self, query: str, top_k=5, filters=None):
        """Retrieve relevant documents"""
        query_embedding = self.embed_query(query)
        results = self.vector_db.query(
            vector=query_embedding,
            top_k=top_k,
            filter=filters
        )
        return [r.metadata for r in results]

    def generate_answer(self, query: str, context: list[dict]):
        """Generate answer with retrieved context"""
        context_str = "\n\n".join([
            f"Source: {doc['source']}\n{doc['text']}"
            for doc in context
        ])

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a legal research assistant. Provide accurate analysis based on the provided cases and statutes."
                },
                {
                    "role": "user",
                    "content": f"Question: {query}\n\nRelevant Legal Sources:\n{context_str}\n\nProvide a detailed legal analysis:"
                }
            ]
        )

        return response.choices[0].message.content

    def research(self, query: str, jurisdiction=None):
        """Complete research workflow"""
        filters = {"jurisdiction": jurisdiction} if jurisdiction else None
        context = self.retrieve(query, top_k=10, filters=filters)
        answer = self.generate_answer(query, context)
        return {
            "answer": answer,
            "sources": context
        }

# Usage
rag = LegalRAG(vector_db=pinecone_index)
result = rag.research(
    query="What are the elements of breach of fiduciary duty?",
    jurisdiction="Delaware"
)
```

## Customer Support Stack

### Intercom Platform
```typescript
// Intercom Fin configuration
interface FinConfig {
    knowledgeBase: string[];        // URLs to crawl
    customAnswers: CustomAnswer[];  // Override specific queries
    handoffRules: HandoffRule[];    // When to escalate to human
    tone: 'professional' | 'friendly' | 'casual';
    languages: string[];
}

interface HandoffRule {
    condition: string;              // e.g., "sentiment < -0.5"
    action: 'escalate' | 'tag' | 'notify';
    assignTo?: string;
}

// Example configuration
const finConfig: FinConfig = {
    knowledgeBase: [
        'https://docs.example.com',
        'https://help.example.com'
    ],
    customAnswers: [
        {
            query: 'refund policy',
            answer: 'We offer 30-day money-back guarantee...'
        }
    ],
    handoffRules: [
        {
            condition: 'message.contains("angry") || sentiment < -0.5',
            action: 'escalate',
            assignTo: 'senior-support'
        },
        {
            condition: 'topic === "billing" && amount > 1000',
            action: 'escalate',
            assignTo: 'billing-team'
        }
    ],
    tone: 'friendly',
    languages: ['en', 'es', 'fr']
};
```

### Custom Support Agent
```python
from openai import OpenAI
from typing import Literal

class SupportAgent:
    def __init__(self, knowledge_base, escalation_threshold=0.3):
        self.client = OpenAI()
        self.kb = knowledge_base
        self.escalation_threshold = escalation_threshold

    def classify_intent(self, message: str) -> dict:
        """Classify user intent and sentiment"""
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "system",
                "content": "Classify the intent and sentiment of customer messages."
            }, {
                "role": "user",
                "content": f"Message: {message}\n\nProvide: intent, sentiment (-1 to 1), urgency (low/medium/high)"
            }],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    def retrieve_knowledge(self, query: str) -> list[str]:
        """Retrieve relevant KB articles"""
        # Use RAG pipeline (see above)
        return self.kb.search(query, top_k=3)

    def generate_response(self, message: str, context: list[str]) -> str:
        """Generate customer response"""
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful customer support agent. Be friendly, concise, and accurate."
                },
                {
                    "role": "user",
                    "content": f"Customer: {message}\n\nRelevant KB: {context}\n\nRespond:"
                }
            ]
        )
        return response.choices[0].message.content

    def handle_ticket(self, message: str) -> dict:
        """Main ticket handling flow"""
        # Classify
        classification = self.classify_intent(message)

        # Check for escalation
        if (classification['sentiment'] < -0.5 or
            classification['urgency'] == 'high' or
            'refund' in message.lower()):
            return {
                "action": "escalate",
                "reason": "Complex issue requiring human",
                "classification": classification
            }

        # Retrieve knowledge
        context = self.retrieve_knowledge(message)

        # Generate response
        response = self.generate_response(message, context)

        return {
            "action": "resolve",
            "response": response,
            "classification": classification,
            "sources": context
        }
```

## Code Generation Stack

### GitHub Copilot Integration
```typescript
// VSCode extension settings
{
    "github.copilot.enable": {
        "*": true,
        "yaml": true,
        "plaintext": false
    },
    "github.copilot.editor.enableAutoCompletions": true,
    "github.copilot.advanced": {
        "debug.overrideEngine": "gpt-4",
        "inlineSuggestCount": 3
    }
}

// Using Copilot for test generation
// Comment: "Generate unit tests for the processOrder function"
// Copilot generates:

describe('processOrder', () => {
    it('should process valid order', async () => {
        const order = { id: '123', items: [...], total: 99.99 };
        const result = await processOrder(order);
        expect(result.status).toBe('processed');
    });

    it('should reject invalid order', async () => {
        const order = { id: '123', items: [], total: 0 };
        await expect(processOrder(order)).rejects.toThrow('Invalid order');
    });

    // ... 10+ more tests
});
```

### Replit Agent
```typescript
// Prompt for Replit Agent
"Build a SaaS application for invoice management with the following features:
- User authentication (email/password)
- Dashboard showing invoice list
- Create/edit/delete invoices
- PDF generation
- Send invoices via email
- Payment tracking
- PostgreSQL database
- React frontend with TypeScript
- Express backend"

// Replit Agent generates:
// - Complete file structure
// - Database schema
// - API endpoints
// - React components
// - Deployment configuration
// Time: 15-30 minutes vs. 40-80 hours manual
```

## Financial Services Stack

### Automated Bookkeeping
```python
class AIBookkeeper:
    def __init__(self, llm, rules_engine):
        self.llm = llm
        self.rules = rules_engine
        self.confidence_threshold = 0.95

    async def categorize_transaction(self, transaction: dict) -> dict:
        """Categorize transaction with AI + rules"""

        # Try rules-based first (fast, deterministic)
        rule_match = self.rules.match(transaction)
        if rule_match and rule_match['confidence'] > 0.99:
            return rule_match

        # Fall back to AI for ambiguous cases
        similar = await self.find_similar_transactions(transaction)

        prompt = f"""
        Categorize this transaction:
        Description: {transaction['description']}
        Amount: ${transaction['amount']}
        Merchant: {transaction['merchant']}

        Similar past transactions:
        {json.dumps(similar, indent=2)}

        Provide: category, confidence (0-1), reasoning
        """

        response = await self.llm.complete(prompt)
        result = json.loads(response)

        # Human review if low confidence
        if result['confidence'] < self.confidence_threshold:
            await self.queue_for_review(transaction, result)

        return result

    async def monthly_close(self, month: str, year: int):
        """Automated month-end close"""
        # 1. Fetch transactions
        transactions = await self.get_transactions(month, year)

        # 2. Categorize all
        categorized = await asyncio.gather(*[
            self.categorize_transaction(t) for t in transactions
        ])

        # 3. Reconcile accounts
        reconciliation = await self.reconcile_accounts(categorized)

        # 4. Generate financials
        financials = await self.generate_financials(month, year)

        # 5. AI-generated insights
        insights = await self.generate_insights(financials)

        return {
            "status": "complete",
            "transactions": len(categorized),
            "reconciliation": reconciliation,
            "financials": financials,
            "insights": insights,
            "time_elapsed": "4.5 minutes"  # vs. 8 hours manual
        }
```

## Content Generation Stack

### Jasper AI Integration
```typescript
import Jasper from '@jasper/sdk';

const jasper = new Jasper({ apiKey: process.env.JASPER_API_KEY });

// Blog post generation
const blogPost = await jasper.generate({
    template: 'blog_post_outline',
    inputs: {
        topic: 'How AI is transforming customer support',
        keywords: ['AI', 'customer service', 'automation', 'chatbots'],
        tone: 'professional',
        audience: 'B2B SaaS companies'
    }
});

// Generate full article from outline
const article = await jasper.generate({
    template: 'blog_post_from_outline',
    inputs: {
        outline: blogPost.outline,
        wordCount: 2000,
        includeIntro: true,
        includeConclusion: true
    }
});

// SEO optimization
const optimized = await jasper.optimize({
    content: article.content,
    primaryKeyword: 'AI customer support',
    secondaryKeywords: ['chatbot automation', 'customer service AI']
});
```

## Monitoring and Evaluation

### LangSmith for Services-as-Software
```python
from langsmith import Client
from langsmith.evaluation import evaluate

client = Client()

# Log every LLM call
@traceable
async def handle_support_query(query: str):
    # This gets automatically traced
    classification = await classify_query(query)
    context = await retrieve_knowledge(query)
    response = await generate_response(query, context)
    return response

# Evaluate agent performance
def evaluate_support_agent():
    test_cases = [
        {"query": "How do I reset my password?", "expected": "password_reset"},
        {"query": "I want a refund", "expected": "escalate_to_human"},
        # ... 100+ test cases
    ]

    results = evaluate(
        handle_support_query,
        data=test_cases,
        evaluators=[
            correctness_evaluator,
            tone_evaluator,
            helpfulness_evaluator
        ]
    )

    return results
```

---

This appendix provides the core technologies. Implementation details evolve rapidly—always consult current documentation and best practices before production deployment.
