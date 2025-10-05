# Parallel Workstream Plan

**Version:** 1.0
**Date:** 2025-10-02
**Total Workstreams:** 45
**Estimated Duration:** 8-10 weeks
**Max Parallel Agents:** 10-12

---

## Table of Contents

1. [Workstream Overview](#workstream-overview)
2. [Foundation Phase (Week 1-2)](#foundation-phase-week-1-2)
3. [Service Extraction Phase (Week 3-8)](#service-extraction-phase-week-3-8)
4. [Quality Assurance Workstreams](#quality-assurance-workstreams)
5. [Documentation Workstreams](#documentation-workstreams)
6. [Dependency Graph](#dependency-graph)
7. [Agent Assignment Strategy](#agent-assignment-strategy)

---

## Workstream Overview

### Parallel Execution Strategy

```
Week 1-2: Foundation (6 workstreams, 4 parallel)
  ├─ WS-001: @db/ RPC Service (priority)
  ├─ WS-002: @auth/ RPC Service (priority)
  ├─ WS-003: @api/ Gateway (depends on WS-001, WS-002)
  ├─ WS-004: Workers Scaffolding (parallel to all)
  ├─ WS-005: Testing Infrastructure (parallel to all)
  └─ WS-006: CI/CD Setup (parallel to all)

Week 3-4: Core Services (10 workstreams, 8 parallel)
  ├─ WS-101: things/ service
  ├─ WS-102: relationships/ service
  ├─ WS-103: search/ service
  ├─ WS-104: queue/ service
  ├─ WS-105: events/ service
  ├─ WS-106: ai/ service
  ├─ WS-107: embeddings/ service
  ├─ WS-108: batch/ service
  ├─ WS-109: code-exec/ service
  └─ WS-110: claude-code/ service

Week 5-6: Integration Services (10 workstreams, 10 parallel)
  ├─ WS-201: vapi/ service
  ├─ WS-202: stripe/ service
  ├─ WS-203: workos/ service
  ├─ WS-204: github/ service
  ├─ WS-205: slack/ service
  ├─ WS-206: webhooks/ service
  ├─ WS-207: docs/ service
  ├─ WS-208: markdown/ service
  ├─ WS-209: sdk/ service
  └─ WS-210: playground/ service

Week 7-8: Domain Services (15 workstreams, 12 parallel)
  ├─ WS-301: agents/ service
  ├─ WS-302: workflows/ service
  ├─ WS-303: functions/ service
  ├─ WS-304: ideas/ service
  ├─ WS-305: marketplace/ service
  ├─ WS-306: experiments/ service
  ├─ WS-307: landing/ service
  ├─ WS-308: pricing/ service
  ├─ WS-309: billing/ service
  ├─ WS-310: epcis/ service
  ├─ WS-311: graphs/ service
  ├─ WS-312: crawl/ service
  ├─ WS-313: containers/ service
  ├─ WS-314: sandboxes/ service
  └─ WS-315: recursion/ service

Continuous: Quality & Docs (4 workstreams, always parallel)
  ├─ WS-QA01: Unit Testing
  ├─ WS-QA02: Integration Testing
  ├─ WS-DOC01: Service Documentation
  └─ WS-DOC02: API Documentation
```

---

## Foundation Phase (Week 1-2)

### WS-001: @db/ RPC Service Implementation

**Priority:** P0 - Critical Path
**Duration:** 3-5 days
**Agent Type:** Backend Engineer
**Parallelizable:** No (foundation for everything)

**Dependencies:**
- None (start immediately)

**Deliverables:**
1. `@db/src/index.ts` - DatabaseService WorkerEntrypoint
2. `@db/src/queries/` - Query modules for all tables
   - things.ts
   - relationships.ts
   - users.ts
   - generations.ts
   - search.ts
3. `@db/src/transactions.ts` - Transaction helpers
4. `@db/wrangler.jsonc` - Cloudflare Workers config
5. `@db/tests/` - Unit tests (80%+ coverage)

**Success Criteria:**
- ✅ All 14 database tables accessible via RPC
- ✅ CRUD operations for things and relationships
- ✅ Full-text, vector, and hybrid search working
- ✅ Transaction support implemented
- ✅ Deployed to staging as `db-service`
- ✅ RPC calls return in <10ms (p95)
- ✅ All tests passing

**Code Skeleton:**
```typescript
// @db/src/index.ts
export class DatabaseService extends WorkerEntrypoint<Env> {
  async getThing(ns: string, id: string) { /* ... */ }
  async createThing(data: NewThing) { /* ... */ }
  async updateThing(ns: string, id: string, data: Partial<NewThing>) { /* ... */ }
  async deleteThing(ns: string, id: string) { /* ... */ }
  async getRelationships(fromNs: string, fromId: string) { /* ... */ }
  async fullTextSearch(query: string, options?: SearchOptions) { /* ... */ }
  async vectorSearch(embedding: number[], options?: SearchOptions) { /* ... */ }
  async hybridSearch(query: string, embedding: number[], options?: HybridSearchOptions) { /* ... */ }
  async transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T> { /* ... */ }
}
```

---

### WS-002: @auth/ RPC Service Implementation

**Priority:** P0 - Critical Path
**Duration:** 3-5 days
**Agent Type:** Backend Engineer
**Parallelizable:** Partial (can start after WS-001 schema work)

**Dependencies:**
- WS-001 (needs database for users, sessions, api_keys tables)

**Deliverables:**
1. `@auth/src/index.ts` - AuthService WorkerEntrypoint
2. `@auth/src/better-auth.ts` - better-auth integration
3. `@auth/src/apikey.ts` - API key validation
4. `@auth/src/jwt.ts` - JWT generation and validation
5. `@auth/wrangler.jsonc` - Cloudflare Workers config
6. `@auth/tests/` - Unit tests (80%+ coverage)

**Success Criteria:**
- ✅ GitHub OAuth working
- ✅ JWT token generation and validation
- ✅ API key authentication
- ✅ User session management
- ✅ Deployed to staging as `auth-service`
- ✅ Token validation in <5ms (p95)
- ✅ All tests passing

**Code Skeleton:**
```typescript
// @auth/src/index.ts
export class AuthService extends WorkerEntrypoint<Env> {
  async validateToken(token: string): Promise<User | null> { /* ... */ }
  async createApiKey(userId: string, name: string): Promise<ApiKey> { /* ... */ }
  async validateApiKey(key: string): Promise<User | null> { /* ... */ }
  async getUserById(id: string): Promise<User | null> { /* ... */ }
  async createSession(userId: string): Promise<Session> { /* ... */ }
  async getSession(sessionId: string): Promise<Session | null> { /* ... */ }
  async deleteSession(sessionId: string): Promise<void> { /* ... */ }
}
```

---

### WS-003: @api/ Gateway Implementation

**Priority:** P0 - Critical Path
**Duration:** 3-5 days
**Agent Type:** Backend Engineer
**Parallelizable:** No (depends on WS-001 and WS-002)

**Dependencies:**
- WS-001 (needs @db/ deployed)
- WS-002 (needs @auth/ deployed)

**Deliverables:**
1. `@api/src/index.ts` - Main gateway entry point
2. `@api/src/routes/` - Domain and path routing logic
3. `@api/src/middleware/` - Auth, rate limiting, CORS
4. `@api/wrangler.jsonc` - Service bindings config
5. `@api/tests/` - Integration tests

**Success Criteria:**
- ✅ Routes requests to @db/ and @auth/
- ✅ Domain-based routing working (agents.do, mcp.do, etc.)
- ✅ Path-based routing working (api.services/agents, etc.)
- ✅ Authentication middleware working
- ✅ Rate limiting implemented
- ✅ Deployed to staging
- ✅ Routing overhead <1ms (p95)
- ✅ All tests passing

**Code Skeleton:**
```typescript
// @api/src/index.ts
const app = new Hono<{ Bindings: Env }>()

app.use('*', corsMiddleware)
app.use('*', rateLimitMiddleware)
app.use('*', authMiddleware({ optional: true }))

app.all('*', async (c) => {
  const url = new URL(c.req.url)
  const serviceBinding = getDomainService(url.hostname) || getPathService(url.pathname)

  if (!serviceBinding) return c.notFound()

  const service = c.env[serviceBinding]
  const response = await service.fetch(c.req.raw)
  return response
})
```

---

### WS-004: Workers Repository Scaffolding

**Priority:** P1
**Duration:** 2-3 days
**Agent Type:** DevOps/Backend Engineer
**Parallelizable:** Yes (can run parallel to WS-001, WS-002, WS-003)

**Dependencies:**
- None

**Deliverables:**
1. Service template generator CLI
2. Pre-configured service templates for each type
3. Shared types package (`workers/types/`)
4. Shared utils package (`workers/utils/`)
5. Root package.json with workspace config
6. Documentation for creating new services

**Success Criteria:**
- ✅ CLI can generate new service in <30 seconds
- ✅ Generated services have 100% boilerplate
- ✅ Shared packages published
- ✅ Documentation complete

**CLI Command:**
```bash
pnpm create-service --name agents --type domain
# Creates workers/agents/ with full template
```

---

### WS-005: Testing Infrastructure

**Priority:** P1
**Duration:** 2-3 days
**Agent Type:** QA Engineer
**Parallelizable:** Yes (can run parallel to all foundation work)

**Dependencies:**
- None

**Deliverables:**
1. Vitest configuration for all services
2. Integration test framework
3. E2E test framework (Playwright)
4. Mock service factories
5. Test data generators
6. CI/CD test pipeline

**Success Criteria:**
- ✅ All services can run unit tests
- ✅ Integration tests can test service-to-service RPC
- ✅ E2E tests can test full user flows
- ✅ CI runs all tests on PR
- ✅ Test coverage reports generated

---

### WS-006: CI/CD Setup

**Priority:** P1
**Duration:** 2-3 days
**Agent Type:** DevOps Engineer
**Parallelizable:** Yes (can run parallel to all foundation work)

**Dependencies:**
- WS-005 (needs testing infrastructure)

**Deliverables:**
1. GitHub Actions workflows for each service
2. Staging deployment pipeline
3. Production deployment pipeline (with canary)
4. Rollback automation
5. Monitoring and alerting setup

**Success Criteria:**
- ✅ PR triggers tests and deploy to staging
- ✅ Merge to main triggers production deployment
- ✅ Canary deployment works (10% traffic)
- ✅ Auto-rollback on errors
- ✅ Alerts fire on failures

---

## Service Extraction Phase (Week 3-8)

### Core Services (Week 3-4) - 10 Workstreams

#### WS-101: things/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)
- WS-003 (@api/ deployed)

**Deliverables:**
1. `workers/things/src/index.ts` - ThingsService
2. RPC interface (getThing, createThing, updateThing, deleteThing, listThings)
3. HTTP interface (REST API)
4. MCP tools (get_thing, create_thing, etc.)
5. Queue handler for async operations
6. Tests (unit + integration)

**Success Criteria:**
- ✅ All CRUD operations working via RPC
- ✅ HTTP endpoints return correct responses
- ✅ MCP tools callable from LLMs
- ✅ Gateway routes /things/* to service
- ✅ All tests passing
- ✅ Deployed to staging

---

#### WS-102: relationships/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)
- WS-003 (@api/ deployed)

**Deliverables:**
1. `workers/relationships/src/index.ts` - RelationshipsService
2. RPC interface (getRelationships, createRelationship, deleteRelationship)
3. HTTP interface (REST API)
4. MCP tools
5. Tests

**Success Criteria:**
- ✅ All relationship operations working
- ✅ Graph traversal queries supported
- ✅ Deployed to staging

---

#### WS-103: search/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)
- WS-003 (@api/ deployed)

**Deliverables:**
1. `workers/search/src/index.ts` - SearchService
2. Full-text search implementation
3. Vector search implementation
4. Hybrid search with RRF
5. Search aggregation across namespaces
6. HTTP and MCP interfaces
7. Tests

**Success Criteria:**
- ✅ Full-text search working
- ✅ Vector search working
- ✅ Hybrid search working with alpha tuning
- ✅ Deployed to staging

---

#### WS-104: queue/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Deliverables:**
1. `workers/queue/src/index.ts` - QueueService
2. Queue consumer implementation
3. Retry logic with exponential backoff
4. Dead letter queue handling
5. Queue monitoring endpoints
6. Tests

**Success Criteria:**
- ✅ Messages processed correctly
- ✅ Retries work with backoff
- ✅ DLQ captures failed messages
- ✅ Monitoring shows queue stats

---

#### WS-105: events/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Deliverables:**
1. `workers/events/src/index.ts` - EventsService
2. Event handler implementation
3. Cron job handlers
4. Email routing
5. Tests

**Success Criteria:**
- ✅ Events dispatched correctly
- ✅ Cron jobs execute on schedule
- ✅ Email routing works

---

#### WS-106: ai/ Service

**Duration:** 3-4 days
**Agent Type:** AI Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Deliverables:**
1. `workers/ai/src/index.ts` - AIService
2. OpenAI text generation
3. Workers AI integration
4. Multiple model support
5. Token tracking
6. HTTP and MCP interfaces
7. Tests

**Success Criteria:**
- ✅ Text generation working
- ✅ Multiple models supported
- ✅ Token usage tracked
- ✅ Cost estimation accurate

---

#### WS-107: embeddings/ Service

**Duration:** 2-3 days
**Agent Type:** AI Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Deliverables:**
1. `workers/embeddings/src/index.ts` - EmbeddingsService
2. OpenAI embeddings API
3. Workers AI embeddings
4. Batch embedding generation
5. Tests

**Success Criteria:**
- ✅ Embeddings generated correctly
- ✅ Batch processing works
- ✅ Results stored in database

---

#### WS-108: batch/ Service

**Duration:** 3-4 days
**Agent Type:** AI Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)
- WS-106 (ai/ service)

**Deliverables:**
1. `workers/batch/src/index.ts` - BatchService
2. OpenAI Batch API integration
3. Job creation and monitoring
4. Result processing
5. Tests

**Success Criteria:**
- ✅ Batch jobs created correctly
- ✅ Job status polling works
- ✅ Results processed and saved

---

#### WS-109: code-exec/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Deliverables:**
1. `workers/code-exec/src/index.ts` - CodeExecService
2. Sandboxed code execution
3. TypeScript execution
4. Timeout handling
5. Resource limits
6. Tests

**Success Criteria:**
- ✅ Code executes in sandbox
- ✅ Timeouts work correctly
- ✅ Resource limits enforced

---

#### WS-110: claude-code/ Service

**Duration:** 3-4 days
**Agent Type:** AI Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Deliverables:**
1. `workers/claude-code/src/index.ts` - ClaudeCodeService
2. Claude Code session management
3. Code generation and execution
4. Session persistence
5. HTTP and MCP interfaces
6. Tests

**Success Criteria:**
- ✅ Sessions created and managed
- ✅ Code generated correctly
- ✅ Execution works

---

### Integration Services (Week 5-6) - 10 Workstreams

#### WS-201: vapi/ Service

**Duration:** 2-3 days
**Agent Type:** Integration Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/vapi.ts` (10.6KB)

**Deliverables:**
1. `workers/vapi/src/index.ts` - VAPIService
2. Webhook handling (call.started, call.ended, transcript, function.called)
3. Event processing and storage
4. Tests

**Success Criteria:**
- ✅ Webhooks processed correctly
- ✅ Events stored in database
- ✅ Function calls executed

---

#### WS-202: stripe/ Service

**Duration:** 2-3 days
**Agent Type:** Integration Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/marketplace.ts` (Stripe webhooks section)

**Deliverables:**
1. `workers/stripe/src/index.ts` - StripeService
2. Webhook signature verification
3. Payment event processing
4. Subscription management
5. Tests

**Success Criteria:**
- ✅ Webhooks verified and processed
- ✅ Payments recorded correctly
- ✅ Subscriptions updated

---

#### WS-203: workos/ Service

**Duration:** 2-3 days
**Agent Type:** Integration Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-002 (@auth/ deployed)

**Extract from:** `api.services/api/routes/workos.ts`, `workos-sso.ts`, `workos-scim.ts`

**Deliverables:**
1. `workers/workos/src/index.ts` - WorkOSService
2. SSO integration
3. SCIM provisioning
4. Organization management
5. Tests

**Success Criteria:**
- ✅ SSO login working
- ✅ SCIM sync working
- ✅ Org management functional

---

#### WS-204: github/ Service

**Duration:** 2-3 days
**Agent Type:** Integration Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/webhooks.ts` (GitHub section)

**Deliverables:**
1. `workers/github/src/index.ts` - GitHubService
2. Webhook handling (push, PR, issues)
3. Repository sync
4. Tests

**Success Criteria:**
- ✅ Webhooks processed
- ✅ Repository data synced

---

#### WS-205: slack/ Service

**Duration:** 2 days
**Agent Type:** Integration Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Deliverables:**
1. `workers/slack/src/index.ts` - SlackService
2. Slash commands
3. Interactive components
4. OAuth flow
5. Tests

**Success Criteria:**
- ✅ Slash commands work
- ✅ Interactive components work

---

#### WS-206: webhooks/ Service

**Duration:** 2-3 days
**Agent Type:** Integration Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/webhooks.ts` (15.1KB)

**Deliverables:**
1. `workers/webhooks/src/index.ts` - WebhooksService
2. Generic webhook handler
3. Signature verification
4. Event routing
5. Tests

**Success Criteria:**
- ✅ Webhooks routed correctly
- ✅ Signatures verified

---

#### WS-207: docs/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/docs.ts` (7.9KB)

**Deliverables:**
1. `workers/docs/src/index.ts` - DocsService
2. Documentation rendering
3. Markdown to HTML
4. Search integration
5. Tests

**Success Criteria:**
- ✅ Docs render correctly
- ✅ Search works

---

#### WS-208: markdown/ Service

**Duration:** 2 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/markdown.ts` (1.2KB)

**Deliverables:**
1. `workers/markdown/src/index.ts` - MarkdownService
2. Markdown to HTML conversion
3. MDX support
4. YAML frontmatter parsing
5. Tests

**Success Criteria:**
- ✅ Markdown renders correctly
- ✅ MDX components work

---

#### WS-209: sdk/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/sdk.ts` (5.2KB)

**Deliverables:**
1. `workers/sdk/src/index.ts` - SDKService
2. SDK generation from schemas
3. TypeScript type generation
4. Tests

**Success Criteria:**
- ✅ SDKs generated correctly
- ✅ Types are accurate

---

#### WS-210: playground/ Service

**Duration:** 3-4 days
**Agent Type:** Frontend + Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/playground.ts` (25.5KB)

**Deliverables:**
1. `workers/playground/src/index.ts` - PlaygroundService
2. API playground UI
3. Request builder
4. Response viewer
5. Tests

**Success Criteria:**
- ✅ Playground loads and works
- ✅ API requests execute correctly

---

### Domain Services (Week 7-8) - 15 Workstreams

#### WS-301: agents/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)
- WS-106 (ai/ service)

**Extract from:** `api.services/api/routes/agents.ts` (7.6KB)

**Deliverables:**
1. `workers/agents/src/index.ts` - AgentsService
2. Agent execution engine
3. Agent configuration
4. HTTP and MCP interfaces
5. Tests

**Success Criteria:**
- ✅ Agents execute correctly
- ✅ Configuration persists
- ✅ MCP tools work

---

#### WS-302: workflows/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/workflows.ts` (11.2KB)

**Deliverables:**
1. `workers/workflows/src/index.ts` - WorkflowsService
2. Workflow execution engine
3. Step orchestration
4. Error handling
5. Tests

**Success Criteria:**
- ✅ Workflows execute correctly
- ✅ Steps run in order
- ✅ Errors handled

---

#### WS-303: functions/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/functions.ts` (9.9KB)

**Deliverables:**
1. `workers/functions/src/index.ts` - FunctionsService
2. Function registry
3. Function invocation
4. HTTP and MCP interfaces
5. Tests

**Success Criteria:**
- ✅ Functions registered
- ✅ Invocation works

---

#### WS-304: ideas/ Service

**Duration:** 2 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/ideas.ts` (12.8KB)

**Deliverables:**
1. `workers/ideas/src/index.ts` - IdeasService
2. Idea CRUD operations
3. Scoring and ranking
4. Tests

**Success Criteria:**
- ✅ Ideas created and managed
- ✅ Scoring works

---

#### WS-305: marketplace/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)
- WS-202 (stripe/ service)

**Extract from:** `api.services/api/routes/marketplace.ts` (18.7KB)

**Deliverables:**
1. `workers/marketplace/src/index.ts` - MarketplaceService
2. Service listings
3. Order management
4. Seller payouts
5. Tests

**Success Criteria:**
- ✅ Listings created
- ✅ Orders processed
- ✅ Payouts work

---

#### WS-306: experiments/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/experiments.ts` (17.8KB)

**Deliverables:**
1. `workers/experiments/src/index.ts` - ExperimentsService
2. A/B test creation
3. Variant allocation
4. Results tracking
5. Statistical analysis
6. Tests

**Success Criteria:**
- ✅ Experiments created
- ✅ Variants allocated correctly
- ✅ Results calculated

---

#### WS-307: landing/ Service

**Duration:** 2-3 days
**Agent Type:** Frontend + Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-306 (experiments/ service)

**Extract from:** `api.services/api/routes/landing.ts` (7.9KB)

**Deliverables:**
1. `workers/landing/src/index.ts` - LandingService
2. Landing page variants
3. Conversion tracking
4. Tests

**Success Criteria:**
- ✅ Pages render correctly
- ✅ Conversions tracked

---

#### WS-308: pricing/ Service

**Duration:** 2 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/pricing.ts` (10KB)

**Deliverables:**
1. `workers/pricing/src/index.ts` - PricingService
2. Dynamic pricing calculation
3. Discount logic
4. Tests

**Success Criteria:**
- ✅ Prices calculated correctly
- ✅ Discounts applied

---

#### WS-309: billing/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)
- WS-202 (stripe/ service)

**Deliverables:**
1. `workers/billing/src/index.ts` - BillingService
2. Invoice generation
3. Payment processing
4. Tests

**Success Criteria:**
- ✅ Invoices generated
- ✅ Payments processed

---

#### WS-310: epcis/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/epcis-capture.ts` (10.2KB), `epcis-query.ts` (13.1KB)

**Deliverables:**
1. `workers/epcis/src/index.ts` - EPCISService
2. Event capture API
3. Query API
4. Tests

**Success Criteria:**
- ✅ Events captured
- ✅ Queries work

---

#### WS-311: graphs/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/graphs.ts` (15.3KB)

**Deliverables:**
1. `workers/graphs/src/index.ts` - GraphsService
2. Graph visualization data
3. Mermaid diagram generation
4. Tests

**Success Criteria:**
- ✅ Graph data generated
- ✅ Diagrams render

---

#### WS-312: crawl/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/crawl-jobs.ts` (11.5KB)

**Deliverables:**
1. `workers/crawl/src/index.ts` - CrawlService
2. Crawl job management
3. Crawlee integration
4. Result storage
5. Tests

**Success Criteria:**
- ✅ Crawl jobs created
- ✅ Results stored

---

#### WS-313: containers/ Service

**Duration:** 3-4 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/containers.ts` (11.9KB)

**Deliverables:**
1. `workers/containers/src/index.ts` - ContainersService
2. Container lifecycle management
3. Deployment orchestration
4. Tests

**Success Criteria:**
- ✅ Containers created
- ✅ Deployments work

---

#### WS-314: sandboxes/ Service

**Duration:** 2-3 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/sandboxes.ts` (10.3KB)

**Deliverables:**
1. `workers/sandboxes/src/index.ts` - SandboxesService
2. Sandbox creation
3. Code execution
4. Resource limits
5. Tests

**Success Criteria:**
- ✅ Sandboxes created
- ✅ Code executes safely

---

#### WS-315: recursion/ Service

**Duration:** 2 days
**Agent Type:** Backend Engineer
**Parallelizable:** Yes

**Dependencies:**
- WS-001 (@db/ deployed)

**Extract from:** `api.services/api/routes/recursion.ts` (5.9KB)

**Deliverables:**
1. `workers/recursion/src/index.ts` - RecursionService
2. forEach pattern implementation
3. Conditional execution
4. Tests

**Success Criteria:**
- ✅ forEach works
- ✅ Conditions evaluated correctly

---

## Quality Assurance Workstreams

### WS-QA01: Unit Testing

**Duration:** Continuous (Week 1-8)
**Agent Type:** QA Engineer
**Parallelizable:** Yes (runs alongside all service work)

**Dependencies:**
- WS-005 (testing infrastructure)

**Responsibilities:**
- Write unit tests for each service as it's developed
- Maintain 80%+ code coverage
- Review test quality in PRs
- Generate coverage reports

**Success Criteria:**
- ✅ Every service has 80%+ unit test coverage
- ✅ All critical paths tested
- ✅ Edge cases covered
- ✅ Mock dependencies properly

---

### WS-QA02: Integration Testing

**Duration:** Continuous (Week 3-8)
**Agent Type:** QA Engineer
**Parallelizable:** Yes (runs after services deployed)

**Dependencies:**
- WS-005 (testing infrastructure)
- Services deployed to staging

**Responsibilities:**
- Write integration tests for service-to-service communication
- Test RPC calls between services
- Test HTTP endpoints
- Test queue message processing
- Validate data flows

**Success Criteria:**
- ✅ All RPC calls tested
- ✅ All HTTP endpoints tested
- ✅ Queue processing tested
- ✅ Data integrity verified

---

### WS-QA03: Performance Testing

**Duration:** Week 7-8
**Agent Type:** QA Engineer
**Parallelizable:** Yes

**Dependencies:**
- All services deployed to staging

**Responsibilities:**
- Load testing each service
- Measure p50, p95, p99 latencies
- Test concurrent request handling
- Identify bottlenecks
- Optimize slow paths

**Success Criteria:**
- ✅ p95 latency < 100ms for all services
- ✅ RPC calls < 10ms
- ✅ Gateway routing < 1ms
- ✅ No memory leaks
- ✅ Handles 1000 req/s per service

---

### WS-QA04: E2E Testing

**Duration:** Week 7-8
**Agent Type:** QA Engineer
**Parallelizable:** Yes

**Dependencies:**
- All services deployed to staging
- WS-005 (E2E test framework)

**Responsibilities:**
- Write end-to-end user flow tests
- Test critical business processes
- Validate multi-service workflows
- Test error scenarios

**Success Criteria:**
- ✅ All critical flows tested
- ✅ Error handling validated
- ✅ User journeys complete successfully

---

## Documentation Workstreams

### WS-DOC01: Service Documentation

**Duration:** Continuous (Week 1-8)
**Agent Type:** Technical Writer
**Parallelizable:** Yes (runs alongside all service work)

**Dependencies:**
- Services being developed

**Responsibilities:**
- Write README.md for each service
- Document RPC interfaces
- Document HTTP endpoints
- Document MCP tools
- Create usage examples
- Add troubleshooting guides

**Success Criteria:**
- ✅ Every service has comprehensive README
- ✅ All RPC methods documented
- ✅ All HTTP endpoints documented
- ✅ Examples provided
- ✅ Troubleshooting guide complete

---

### WS-DOC02: API Documentation

**Duration:** Week 6-8
**Agent Type:** Technical Writer
**Parallelizable:** Yes

**Dependencies:**
- Services deployed

**Responsibilities:**
- Create OpenAPI specs for all HTTP endpoints
- Generate interactive API docs
- Write integration guides
- Create SDK documentation
- Add code examples for all languages

**Success Criteria:**
- ✅ OpenAPI specs complete
- ✅ Interactive docs live
- ✅ Integration guides written
- ✅ SDK docs published

---

### WS-DOC03: Architecture Documentation

**Duration:** Week 1-2
**Agent Type:** Technical Writer
**Parallelizable:** Yes

**Dependencies:**
- None (can start immediately)

**Responsibilities:**
- Document overall architecture
- Create system diagrams
- Write migration guides
- Document design decisions
- Create operational runbooks

**Success Criteria:**
- ✅ Architecture docs complete
- ✅ Diagrams created
- ✅ Migration guide written
- ✅ Runbooks created

---

### WS-DOC04: Developer Onboarding

**Duration:** Week 7-8
**Agent Type:** Technical Writer
**Parallelizable:** Yes

**Dependencies:**
- Services deployed
- Documentation complete

**Responsibilities:**
- Create onboarding guide
- Write "Getting Started" tutorial
- Create video walkthroughs
- Document common patterns
- Add FAQ

**Success Criteria:**
- ✅ Onboarding guide complete
- ✅ Tutorial works end-to-end
- ✅ Videos recorded
- ✅ FAQ comprehensive

---

## Dependency Graph

### Visual Dependency Map

```
Week 1-2: Foundation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[START]
  │
  ├─→ WS-001: @db/ (P0) ────────┐
  │                             │
  ├─→ WS-004: Scaffolding ──────┤
  │                             │
  ├─→ WS-005: Testing ──────────┤
  │                             ▼
  └─→ WS-002: @auth/ (P0) ──→ WS-003: @api/ (P0)
                                │
                                ▼
                           [FOUNDATION COMPLETE]

Week 3-4: Core Services (10 parallel)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                           [FOUNDATION]
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
    WS-101: things         WS-104: queue          WS-106: ai
    WS-102: relationships  WS-105: events         WS-107: embeddings
    WS-103: search                                WS-108: batch
                                                  WS-109: code-exec
                                                  WS-110: claude-code
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                ▼
                        [CORE SERVICES COMPLETE]

Week 5-6: Integration Services (10 parallel)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        [CORE SERVICES]
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
        ▼                                               ▼
    WS-201: vapi                                   WS-207: docs
    WS-202: stripe                                 WS-208: markdown
    WS-203: workos                                 WS-209: sdk
    WS-204: github                                 WS-210: playground
    WS-205: slack
    WS-206: webhooks
        │                                               │
        └───────────────────────┬───────────────────────┘
                                ▼
                    [INTEGRATION SERVICES COMPLETE]

Week 7-8: Domain Services (15 parallel)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    [INTEGRATION SERVICES]
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
        ▼                                               ▼
    WS-301: agents                                 WS-308: pricing
    WS-302: workflows                              WS-309: billing
    WS-303: functions                              WS-310: epcis
    WS-304: ideas                                  WS-311: graphs
    WS-305: marketplace                            WS-312: crawl
    WS-306: experiments                            WS-313: containers
    WS-307: landing                                WS-314: sandboxes
                                                   WS-315: recursion
        │                                               │
        └───────────────────────┬───────────────────────┘
                                ▼
                        [ALL SERVICES COMPLETE]

Continuous: Quality & Docs (4 parallel, always running)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    WS-QA01: Unit Testing ──────────────────────────────┐
    WS-QA02: Integration Testing ──────────────────────┤
    WS-DOC01: Service Documentation ────────────────────┤
    WS-DOC02: API Documentation ────────────────────────┤
                                                        ▼
                                                [ALL COMPLETE]
```

### Critical Path

The critical path (longest dependency chain) is:

```
WS-001 (3-5 days)
  → WS-002 (3-5 days)
    → WS-003 (3-5 days)
      → WS-101-110 (2-4 days each, parallel)
        → WS-201-210 (2-3 days each, parallel)
          → WS-301-315 (2-4 days each, parallel)

Total Critical Path: ~6-10 weeks (depends on parallelization)
```

---

## Agent Assignment Strategy

### Agent Specializations

**Backend Engineers (6 agents)**
- 2 on foundation (WS-001, WS-002, WS-003)
- 4 on service extraction (rotating through WS-101-315)

**AI Engineers (2 agents)**
- Focus on AI services: WS-106, WS-107, WS-108, WS-110

**Integration Engineers (2 agents)**
- Focus on integration services: WS-201-206

**Frontend Engineers (1 agent)**
- Focus on UI services: WS-210, WS-307

**QA Engineers (2 agents)**
- 1 on unit testing (WS-QA01)
- 1 on integration/E2E testing (WS-QA02, WS-QA04)

**DevOps Engineer (1 agent)**
- Focus on infrastructure: WS-004, WS-005, WS-006

**Technical Writers (2 agents)**
- 1 on service docs (WS-DOC01)
- 1 on architecture/API docs (WS-DOC02, WS-DOC03, WS-DOC04)

### Workload Distribution

**Week 1-2: 6-8 agents**
- 2 Backend (WS-001, WS-002)
- 1 Backend (WS-003, depends on 001/002)
- 1 DevOps (WS-004, WS-005, WS-006)
- 1 QA (WS-005 support)
- 1 Tech Writer (WS-DOC03)

**Week 3-4: 10-12 agents**
- 4 Backend (WS-101, WS-102, WS-103, WS-104, WS-105)
- 2 AI Engineers (WS-106, WS-107, WS-108, WS-109, WS-110)
- 2 QA (WS-QA01, WS-QA02)
- 2 Tech Writers (WS-DOC01)

**Week 5-6: 10-12 agents**
- 4 Backend (WS-207, WS-208, WS-209, WS-210)
- 2 Integration (WS-201, WS-202, WS-203, WS-204, WS-205, WS-206)
- 1 Frontend (WS-210)
- 2 QA (WS-QA01, WS-QA02)
- 2 Tech Writers (WS-DOC01, WS-DOC02)

**Week 7-8: 10-12 agents**
- 6 Backend (WS-301-315, distributed)
- 2 QA (WS-QA02, WS-QA03, WS-QA04)
- 2 Tech Writers (WS-DOC02, WS-DOC04)

### Parallel Execution Examples

**Maximum Parallelization (Week 3-4):**
```
Agent 1 (Backend): WS-101 (things)
Agent 2 (Backend): WS-102 (relationships)
Agent 3 (Backend): WS-103 (search)
Agent 4 (Backend): WS-104 (queue)
Agent 5 (Backend): WS-105 (events)
Agent 6 (AI):      WS-106 (ai)
Agent 7 (AI):      WS-107 (embeddings)
Agent 8 (AI):      WS-108 (batch)
Agent 9 (Backend): WS-109 (code-exec)
Agent 10 (AI):     WS-110 (claude-code)
Agent 11 (QA):     WS-QA01 (unit tests)
Agent 12 (QA):     WS-QA02 (integration tests)
```

**Result:** 10 services delivered in 2-4 days (parallel execution)

---

## Success Metrics

### Overall Project Success

**Velocity:**
- ✅ 10 services/week delivered (average)
- ✅ 35+ services completed in 8 weeks
- ✅ Zero production downtime during migration

**Quality:**
- ✅ 80%+ test coverage on all services
- ✅ Zero critical bugs in production
- ✅ p95 latency < 100ms maintained

**Team:**
- ✅ 10-12 agents working efficiently
- ✅ Minimal blockers and dependencies
- ✅ Clear ownership and accountability

### Per-Workstream Success

Each workstream must achieve:
- ✅ All deliverables completed
- ✅ All tests passing
- ✅ Deployed to staging successfully
- ✅ Gateway routing updated
- ✅ Documentation complete
- ✅ Zero regressions in functionality

---

## Risk Mitigation

### High-Risk Workstreams

**WS-001: @db/ RPC Service**
- **Risk:** Foundation for everything, any issues cascade
- **Mitigation:** Assign most experienced backend engineer, extra testing, deploy first

**WS-003: @api/ Gateway**
- **Risk:** Routes all traffic, critical for zero downtime
- **Mitigation:** Canary deployment, extensive testing, rollback plan ready

**WS-106: ai/ Service**
- **Risk:** Complex AI integrations, token management
- **Mitigation:** Assign AI specialist, comprehensive error handling, cost monitoring

### Dependency Management

**Strategy:**
- Start foundation work immediately (WS-001, WS-002)
- Don't start dependent work until dependencies deployed
- Have backup agents ready if critical path blocked
- Daily standups to identify and resolve blockers

### Quality Gates

Each service must pass:
1. ✅ Unit tests (80%+ coverage)
2. ✅ Integration tests (all RPC calls)
3. ✅ Performance tests (latency targets)
4. ✅ Security review (if handling sensitive data)
5. ✅ Documentation review
6. ✅ Staging deployment successful
7. ✅ Gateway routing verified

---

## Timeline Summary

**Week 1-2: Foundation (6 workstreams)**
- WS-001, WS-002, WS-003, WS-004, WS-005, WS-006
- 4-6 agents
- **Deliverable:** Foundation deployed to staging

**Week 3-4: Core Services (10 workstreams)**
- WS-101 through WS-110
- 10-12 agents (maximum parallelization)
- **Deliverable:** Core services deployed

**Week 5-6: Integration Services (10 workstreams)**
- WS-201 through WS-210
- 10-12 agents
- **Deliverable:** Integration services deployed

**Week 7-8: Domain Services (15 workstreams)**
- WS-301 through WS-315
- 10-12 agents
- **Deliverable:** All 35+ services deployed

**Week 9-10: Cleanup & Optimization**
- Performance tuning
- Documentation finalization
- Team training
- Archive api.services
- **Deliverable:** Production ready

---

**Document Status:** Ready for Agent Assignment
**Estimated Completion:** 8-10 weeks
**Maximum Parallelization:** 10-12 concurrent agents
**Total Workstreams:** 45
**Maintained By:** Claude Code (AI Project Manager)
**Last Updated:** 2025-10-02
