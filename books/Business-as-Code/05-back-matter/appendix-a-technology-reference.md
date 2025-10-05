# Appendix A: Business-as-Code Technology Reference

This appendix provides a technical reference for key technologies, frameworks, and platforms discussed throughout this book. It is designed as a quick-reference guide for developers and technical decision-makers implementing Business-as-Code systems.

## Foundation Models

### OpenAI GPT-4
- **Provider**: OpenAI
- **Context window**: 128K tokens
- **Modalities**: Text, vision
- **Strengths**: Reasoning, code generation, general knowledge
- **API**: REST API with streaming support
- **Pricing**: ~$0.01-0.03 per 1K tokens (varies by model variant)
- **Best for**: General-purpose business logic, customer-facing applications

### Anthropic Claude 3.5 Sonnet
- **Provider**: Anthropic
- **Context window**: 200K tokens
- **Modalities**: Text, vision
- **Strengths**: Long-form analysis, code generation, safety
- **API**: REST API with streaming support
- **Pricing**: ~$0.003-0.015 per 1K tokens
- **Best for**: Complex analysis, document processing, internal tools

### Google Gemini 1.5 Pro
- **Provider**: Google
- **Context window**: 1M tokens (largest available)
- **Modalities**: Text, vision, audio
- **Strengths**: Massive context, multimodal, tight Google Cloud integration
- **API**: REST API via Google Cloud
- **Pricing**: ~$0.00125-0.005 per 1K tokens
- **Best for**: Processing large documents, multimodal applications

### Open Source Alternatives
- **Llama 3** (Meta): Self-hosted, commercial-friendly license
- **Mixtral** (Mistral AI): Mixture-of-experts architecture, efficient
- **Phi-3** (Microsoft): Smaller, efficient models

## Vector Databases

### Pinecone
- **Type**: Managed vector database
- **Features**: Fully managed, high performance, hybrid search
- **Pricing**: Free tier + usage-based ($0.096/million queries)
- **Best for**: Production applications requiring minimal ops overhead

### Weaviate
- **Type**: Open source vector database
- **Features**: GraphQL API, hybrid search, multi-tenancy
- **Deployment**: Self-hosted or cloud
- **Best for**: Flexible deployment requirements, GraphQL preference

### Chroma
- **Type**: Open source embedding database
- **Features**: Lightweight, Python-native, easy setup
- **Deployment**: Local or self-hosted
- **Best for**: Prototyping, small-scale applications

### Qdrant
- **Type**: Open source vector database
- **Features**: Rust-based (fast), rich filtering, hybrid search
- **Deployment**: Self-hosted or cloud
- **Best for**: Performance-critical applications

### pgvector (PostgreSQL Extension)
- **Type**: PostgreSQL extension
- **Features**: Native PostgreSQL, joins with structured data
- **Deployment**: Any PostgreSQL instance
- **Best for**: Existing PostgreSQL infrastructure

## Agent Frameworks

### LangChain
- **Language**: Python, TypeScript
- **Features**: Chains, agents, memory, integrations
- **Strengths**: Comprehensive, large ecosystem
- **Weaknesses**: Complex API, can be verbose
- **Best for**: Complex multi-step workflows, rapid prototyping

```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.tools import Tool
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o")
tools = [Tool(name="calculator", func=calculator, description="...")]
agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)
result = executor.invoke({"input": "What is 25 * 67?"})
```

### LlamaIndex
- **Language**: Python, TypeScript
- **Features**: Data ingestion, indexing, querying
- **Strengths**: RAG-focused, excellent docs
- **Best for**: Document Q&A, knowledge retrieval

```python
from llama_index import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader('data').load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("What are the key findings?")
```

### AutoGPT
- **Language**: Python
- **Features**: Autonomous agents, memory, web browsing
- **Strengths**: Goal-oriented, autonomous
- **Best for**: Long-running autonomous tasks

### CrewAI
- **Language**: Python
- **Features**: Multi-agent collaboration, role-based agents
- **Strengths**: Simplified multi-agent orchestration
- **Best for**: Teams of specialized agents

```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role='Researcher',
    goal='Find relevant information',
    backstory='Expert researcher...'
)

analyst = Agent(
    role='Analyst',
    goal='Analyze findings',
    backstory='Data analyst...'
)

crew = Crew(agents=[researcher, analyst], tasks=[...])
result = crew.kickoff()
```

### Semantic Kernel (Microsoft)
- **Language**: C#, Python
- **Features**: Plugin system, planners, memory
- **Strengths**: Enterprise-ready, Microsoft ecosystem
- **Best for**: .NET applications, Microsoft stack

## Embedding Models

### OpenAI text-embedding-3-large
- **Dimensions**: 3072 (configurable)
- **Pricing**: $0.13 per million tokens
- **Performance**: Best general-purpose

### OpenAI text-embedding-3-small
- **Dimensions**: 1536
- **Pricing**: $0.02 per million tokens
- **Performance**: Good quality, 5x cheaper

### Open Source: sentence-transformers
- **Models**: all-MiniLM-L6-v2, all-mpnet-base-v2
- **Deployment**: Self-hosted
- **Best for**: Cost optimization, data privacy

## Workflow Orchestration

### Temporal
- **Type**: Workflow orchestration platform
- **Features**: Durable execution, long-running workflows
- **Language**: Go, Java, TypeScript, Python
- **Best for**: Mission-critical workflows, complex state management

```typescript
import { proxyActivities } from '@temporalio/workflow';

const activities = proxyActivities<typeof import('./activities')>({
    startToCloseTimeout: '1 minute'
});

export async function processOrder(orderId: string): Promise<void> {
    await activities.validateOrder(orderId);
    await activities.processPayment(orderId);
    await activities.fulfillOrder(orderId);
}
```

### Airflow
- **Type**: Workflow scheduler
- **Features**: DAG-based, extensive integrations
- **Language**: Python
- **Best for**: Batch processing, ETL workflows

### Prefect
- **Type**: Modern workflow orchestration
- **Features**: Python-native, dynamic DAGs, excellent observability
- **Best for**: Data pipelines, Python-centric workflows

### n8n
- **Type**: No-code workflow automation
- **Features**: Visual workflow builder, 300+ integrations
- **Best for**: Non-technical users, rapid prototyping

## Monitoring and Observability

### LangSmith (LangChain)
- **Features**: Trace debugging, dataset curation, evaluation
- **Integration**: Native LangChain integration
- **Best for**: LangChain applications

### Weights & Biases
- **Features**: Experiment tracking, model monitoring
- **Best for**: ML model tracking, experimentation

### Helicone
- **Features**: LLM observability, cost tracking, caching
- **Best for**: API usage monitoring, cost optimization

### Custom Logging
```python
import logging
from datetime import datetime

class LLMLogger:
    def log_request(self, prompt, model, metadata=None):
        logging.info({
            "timestamp": datetime.now().isoformat(),
            "type": "llm_request",
            "prompt": prompt,
            "model": model,
            "metadata": metadata
        })

    def log_response(self, response, latency, tokens):
        logging.info({
            "timestamp": datetime.now().isoformat(),
            "type": "llm_response",
            "response": response,
            "latency_ms": latency,
            "tokens": tokens
        })
```

## Development Environments

### Replit
- **Type**: Cloud IDE
- **Features**: AI code generation, instant deployment
- **Best for**: Prototyping, learning, small projects

### Cursor
- **Type**: AI-native code editor
- **Features**: GPT-4 integration, codebase understanding
- **Best for**: Professional development with AI assistance

### GitHub Copilot
- **Type**: AI code completion
- **IDE Support**: VS Code, JetBrains, Neovim
- **Best for**: Code generation within existing workflow

## Deployment Platforms

### Cloudflare Workers
- **Type**: Edge compute platform
- **Features**: Global distribution, low latency, generous free tier
- **Best for**: API endpoints, low-latency services

```typescript
export default {
    async fetch(request: Request): Promise<Response> {
        const { OpenAI } = await import('openai');
        const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Hello!" }]
        });

        return Response.json(completion);
    }
}
```

### Vercel
- **Type**: Frontend platform
- **Features**: Next.js optimization, edge functions
- **Best for**: Full-stack applications, Next.js

### AWS Lambda
- **Type**: Serverless compute
- **Features**: Massive scale, AWS ecosystem integration
- **Best for**: AWS-centric architectures, enterprise scale

### Modal
- **Type**: Cloud compute for ML/AI
- **Features**: GPU support, simple Python API
- **Best for**: ML model serving, batch processing

## Integration Tools

### Zapier
- **Type**: No-code integration platform
- **Apps**: 5,000+ integrations
- **Best for**: Simple automations, non-technical users

### Make (formerly Integromat)
- **Type**: Visual automation platform
- **Apps**: 1,000+ integrations
- **Best for**: Complex workflows, visual design

### n8n
- **Type**: Open source automation
- **Deployment**: Self-hosted or cloud
- **Best for**: Custom integrations, data privacy

## Testing Frameworks

### pytest (Python)
```python
import pytest
from unittest.mock import Mock

def test_ai_customer_service():
    # Mock OpenAI response
    mock_openai = Mock()
    mock_openai.chat.completions.create.return_value = {
        "choices": [{"message": {"content": "Thank you for contacting us..."}}]
    }

    response = handle_support_ticket("I can't log in", mock_openai)
    assert "password reset" in response.lower()
```

### Jest (TypeScript/JavaScript)
```typescript
import { describe, it, expect, vi } from 'vitest';

describe('AI Agent', () => {
    it('should process customer query', async () => {
        const mockLLM = vi.fn().mockResolvedValue({
            content: 'Here is the answer...'
        });

        const result = await agent.query('What is your return policy?');
        expect(result).toContain('30 days');
    });
});
```

## Cost Management

### Token Estimation
```python
import tiktoken

def estimate_cost(text: str, model: str = "gpt-4"):
    encoding = tiktoken.encoding_for_model(model)
    tokens = len(encoding.encode(text))

    pricing = {
        "gpt-4": {"input": 0.03, "output": 0.06},
        "gpt-4o-mini": {"input": 0.00015, "output": 0.0006},
        "claude-3-5-sonnet": {"input": 0.003, "output": 0.015}
    }

    input_cost = tokens * pricing[model]["input"] / 1000
    output_cost = tokens * pricing[model]["output"] / 1000

    return {
        "tokens": tokens,
        "estimated_input_cost": input_cost,
        "estimated_output_cost": output_cost
    }
```

### Caching Strategies
```python
import hashlib
import redis

class LLMCache:
    def __init__(self, redis_client):
        self.redis = redis_client

    def get_cached_response(self, prompt: str, model: str):
        cache_key = f"{model}:{hashlib.md5(prompt.encode()).hexdigest()}"
        return self.redis.get(cache_key)

    def cache_response(self, prompt: str, model: str, response: str, ttl=3600):
        cache_key = f"{model}:{hashlib.md5(prompt.encode()).hexdigest()}"
        self.redis.setex(cache_key, ttl, response)
```

## Security Best Practices

### API Key Management
```python
import os
from cryptography.fernet import Fernet

# Use environment variables
api_key = os.getenv('OPENAI_API_KEY')

# Rotate keys regularly
# Use secret management services (AWS Secrets Manager, HashiCorp Vault)

# Never log API keys
logging.info(f"Using API key: {api_key[:4]}...")  # Only log prefix
```

### Input Validation
```python
def validate_user_input(user_input: str) -> bool:
    # Length limits
    if len(user_input) > 10000:
        return False

    # Prompt injection detection
    dangerous_patterns = [
        "ignore previous instructions",
        "system prompt",
        "you are now"
    ]

    if any(pattern in user_input.lower() for pattern in dangerous_patterns):
        return False

    return True
```

### Output Sanitization
```python
import html

def sanitize_ai_output(output: str) -> str:
    # Escape HTML
    output = html.escape(output)

    # Remove potential script tags
    output = output.replace("<script>", "").replace("</script>", "")

    # Validate JSON if expected
    if is_json_expected:
        try:
            json.loads(output)
        except:
            raise ValueError("Invalid JSON output")

    return output
```

## Performance Optimization

### Prompt Caching
Many providers now support prompt caching for repeated prefixes:

```python
# OpenAI example with cached system prompt
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": long_system_prompt,  # This gets cached
            "cache_control": {"type": "ephemeral"}
        },
        {"role": "user", "content": user_query}  # Only this varies
    ]
)
```

### Parallel Processing
```python
import asyncio
from openai import AsyncOpenAI

async def process_batch(queries: list[str]):
    client = AsyncOpenAI()

    tasks = [
        client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": q}]
        )
        for q in queries
    ]

    results = await asyncio.gather(*tasks)
    return results

# Process 100 queries in parallel
results = asyncio.run(process_batch(queries))
```

### Streaming Responses
```python
from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write a long essay..."}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

## Evaluation Frameworks

### Ragas (RAG Assessment)
```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

results = evaluate(
    dataset=eval_dataset,
    metrics=[faithfulness, answer_relevancy]
)

print(f"Faithfulness: {results['faithfulness']}")
print(f"Answer Relevancy: {results['answer_relevancy']}")
```

### Custom Evaluation
```python
def evaluate_customer_service_agent(test_cases):
    results = []

    for case in test_cases:
        response = agent.handle_query(case['query'])

        # Check required elements
        has_greeting = "hello" in response.lower() or "hi" in response.lower()
        addresses_issue = case['expected_keyword'] in response.lower()
        has_closing = "help" in response.lower() or "assist" in response.lower()

        score = sum([has_greeting, addresses_issue, has_closing]) / 3
        results.append({
            'query': case['query'],
            'response': response,
            'score': score
        })

    return results
```

---

This appendix provides starting points for implementation. Technologies evolve rapidly—always check current documentation and best practices before production deployment.
