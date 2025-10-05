# SEMANTICS.md - Semantic Triple Network Architecture

**Date:** 2025-10-04
**Status:** 🚧 Implementation In Progress
**Version:** 1.0.0

## Overview

The `.do` ecosystem implements a **sophisticated semantic triple network** that unifies business entities, actions, and agents into a queryable knowledge graph. This architecture enables natural language patterns like `[Object].[do].ing.as.[Subject]` to represent semantic relationships in a machine-readable format.

**Key Capabilities:**
- ✅ RDF-inspired triple store with SPARQL-like queries
- ✅ GraphDL integration with tense-based inference
- ✅ Schema.org.ai vocabulary extensions for AI entities
- ✅ GS1 Core Business Vocabulary for supply chain operations
- ✅ Natural language URL patterns for semantic triples
- ✅ Role-based access control with capability matrices

## Conceptual Model

### The Semantic Triple

A **semantic triple** is the atomic unit of knowledge, expressed as:

```
(Subject, Predicate, Object)
```

**In Natural Language:**
```
[Subject] [Predicate] [Object]
   Who       What       Target

Examples:
- (Accountant, Invoicing, Invoice)
- (Developer, Coding, Application)
- (Doctor, Treating, Patient)
- (Lawyer, Reviewing, Contract)
```

**In URL Format:**
```
[Object].[do].ing.as.[Subject]

Examples:
- invoice.do.ing.as.accountant
- code.do.ing.as.developer
- patient.do.ing.as.doctor
- contract.do.ing.as.lawyer
```

### The 5W1H Context Model

Every triple exists within a **context** that answers the fundamental questions:

| Dimension | Question | Example |
|-----------|----------|---------|
| **Subject** | Who? | accountant, developer, doctor |
| **Predicate** | What? | invoicing, coding, treating |
| **Object** | Target? | invoice, code, patient |
| **Temporal** | When? | 2025-10-04T10:30:00Z |
| **Spatial** | Where? | office, hospital, courtroom |
| **Causal** | Why? | client request, diagnosis, litigation |
| **Relational** | With whom? | team, supervisor, client |
| **Instrumental** | How? | software, procedure, process |

**Storage Format:**
```json
{
  "id": "triple_123",
  "subject": "accountant",
  "predicate": "invoicing",
  "object": "invoice_456",
  "context": {
    "temporal": { "start": "2025-10-04T10:00:00Z", "end": "2025-10-04T11:00:00Z" },
    "spatial": { "location": "office", "coordinates": [37.7749, -122.4194] },
    "causal": { "reason": "client_request", "goal": "payment_processing" },
    "relational": { "team": ["manager_789", "assistant_012"], "client": "client_345" },
    "instrumental": { "tools": ["quickbooks", "scanner"], "process": "ap_workflow" }
  },
  "metadata": {
    "created_at": "2025-10-04T10:00:00Z",
    "created_by": "user_678",
    "confidence": 0.95
  }
}
```

### Semantic Layers

The architecture operates across **four semantic layers**:

#### 1. Syntactic Layer (String Representation)

**Raw text and URL patterns:**
```
invoice.do.ing.as.accountant
code.do.ing.as.developer
patient.do.ing.as.doctor
```

**Purpose:** Human-readable, SEO-friendly, memorable URLs

#### 2. Semantic Layer (Type & Schema Validation)

**Typed entities with schema validation:**
```typescript
interface SemanticTriple {
  subject: Subject     // Schema.org Person, Organization, Agent
  predicate: Verb      // GS1 BizStep, O*NET Task, Custom Action
  object: Thing        // Schema.org Thing, Product, Document
  context: Context     // 5W1H metadata
}
```

**Purpose:** Type safety, validation, IDE autocomplete

#### 3. Pragmatic Layer (Context & Intent)

**Contextual understanding:**
- Why is this action being performed?
- What is the expected outcome?
- What are the preconditions and postconditions?
- How does this relate to other triples?

**Purpose:** Reasoning, inference, intent recognition

#### 4. Social Layer (Authority & Trust)

**Trust and authorization:**
- Who has permission to create this triple?
- What is the authority level of the subject?
- Is this triple verified or inferred?
- What is the provenance chain?

**Purpose:** Security, RBAC, audit trails, reputation

## GraphDL Integration

### Tense-Based Semantic Inference

GraphDL provides **automatic tense inference** from naming patterns:

| Pattern | Tense | Semantic Meaning | Example |
|---------|-------|------------------|---------|
| **Plural noun** | collection | Set of entities | `invoices`, `developers` |
| **Singular noun** | item | Specific entity | `invoice`, `developer` |
| **will + verb** | action | Future intent | `willInvoice`, `willDevelop` |
| **verb + -ing** | activity | Ongoing process | `invoicing`, `developing` |
| **verb + -ed** | event | Completed action | `invoiced`, `developed` |

**Type System:**
```typescript
// From graphdl package
type Tense = 'collection' | 'item' | 'action' | 'activity' | 'event'

interface PathSegment {
  name: string
  tense: Tense
}

// Runtime inference
runtime.db.invoices      // -> { name: 'invoices', tense: 'collection' }
runtime.db.invoice       // -> { name: 'invoice', tense: 'item' }
runtime.db.invoicing     // -> { name: 'invoicing', tense: 'activity' }
runtime.db.invoiced      // -> { name: 'invoiced', tense: 'event' }
runtime.db.willInvoice   // -> { name: 'willInvoice', tense: 'action' }
```

### Business Entity Types

**From do.industries (1,016 occupations, 18,797 tasks):**
```typescript
interface Occupation {
  code: string              // O*NET-SOC code
  title: string            // Occupation title
  tasks: Task[]            // Associated tasks
  skills: Skill[]          // Required skills
  technologies: Technology[] // Tools and technologies
  tools: Tool[]            // Physical/software tools
}

interface Task {
  id: string
  description: string
  occupation: string       // O*NET-SOC code
  category: string
}
```

**From schema.org.ai (38 AI entity types):**
```typescript
interface Agent extends AIEntity {
  '@type': 'Agent' | 'AgentTeam'
  role: string
  capabilities: string[]
  tools: Tool[]
  model: Model
  autonomyLevel: 'supervised' | 'semi-autonomous' | 'fully-autonomous'
}

interface Tool extends AIEntity {
  '@type': 'Tool'
  toolType: 'api' | 'function' | 'code' | 'search' | 'database'
  parameters: Record<string, any>
  dangerLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical'
}
```

**From gs1.org.ai (37 verbs, 31 dispositions, 5 event types):**
```typescript
interface GS1BizStep {
  id: string               // e.g., 'Accepting'
  name: string
  description: string
  category: 'supply-chain'
  cbvType: 'bizStep'
  url: string              // https://ref.gs1.org/cbv/BizStep-Accepting
}

// 37 GS1 Business Steps (Verbs):
// Accepting, Arriving, Assembling, Collecting, Commissioning,
// Consigning, Creating_Class_Instance, Cycle_Counting,
// Decommissioning, Departing, Destroying, Disassembling,
// Dispensing, Encoding, Entering_Exiting, Holding, Inspecting,
// Installing, Killing, Packing, Picking, Receiving, Removing,
// Repackaging, Repairing, Replacing, Reserving, Retail_Selling,
// Sampling, Sensor_Reporting, Shipping, Staging_Outbound,
// Stock_Taking, Stocking, Storing, Transporting, Unloading,
// Unpacking, Void_Shipping
```

### Vocabulary Extensions

**soc.org.ai (Social Ontology) - Planned:**
```typescript
interface SocialRelation {
  '@type': 'SocialRelation'
  relationType: 'colleague' | 'supervisor' | 'subordinate' | 'peer' | 'mentor'
  source: Person
  target: Person
  context: 'professional' | 'academic' | 'personal'
  strength: number  // 0-1 relationship strength
}

interface SocialNetwork {
  '@type': 'SocialNetwork'
  members: Person[]
  relations: SocialRelation[]
  topology: 'hierarchical' | 'flat' | 'matrix'
}
```

## The `ing` Worker Architecture

### Purpose & Responsibilities

The **`ing` worker** is the **semantic triple coordinator** that:

1. **Stores and indexes semantic triples** in PostgreSQL + ClickHouse
2. **Resolves verbs** from gerund forms to GS1/O*NET/custom definitions
3. **Validates role capabilities** via RBAC integration with auth service
4. **Executes graph queries** with SPARQL-like syntax
5. **Provides RPC/HTTP/MCP/Queue interfaces** for all operations

### Service Interfaces

#### 1. RPC Interface (Service-to-Service)

```typescript
import { WorkerEntrypoint } from 'cloudflare:workers'

export class IngService extends WorkerEntrypoint<Env> {
  // === Triple Operations ===

  async createTriple(params: {
    subject: string
    predicate: string
    object: string
    context?: Context
  }): Promise<Triple> {
    // Validate inputs
    // Store in PostgreSQL
    // Index in ClickHouse for analytics
    // Return created triple
  }

  async getTriple(id: string): Promise<Triple | null> {
    // Fetch by ID
  }

  async queryTriples(pattern: {
    subject?: string
    predicate?: string
    object?: string
    limit?: number
    offset?: number
  }): Promise<Triple[]> {
    // Pattern-based search
    // Supports wildcards
    // Pagination
  }

  async deleteTriple(id: string): Promise<boolean> {
    // Soft delete with audit trail
  }

  // === Verb Operations ===

  async resolveVerb(gerund: string): Promise<VerbDefinition> {
    // Convert gerund to verb definition
    // Check GS1 registry
    // Check O*NET tasks
    // Check custom verbs
    // Return comprehensive definition
  }

  async listVerbs(category?: string): Promise<VerbDefinition[]> {
    // List all available verbs
    // Filter by category if provided
  }

  async registerVerb(definition: VerbDefinition): Promise<VerbDefinition> {
    // Add custom verb to registry
  }

  // === Role Operations ===

  async resolveRole(subject: string): Promise<RoleDefinition> {
    // Map subject to role
    // Fetch capabilities
    // Check O*NET occupation data
  }

  async checkCapability(
    role: string,
    verb: string
  ): Promise<{ allowed: boolean; reason?: string }> {
    // Validate role can perform verb
    // Check RBAC policies
    // Return authorization result
  }

  // === Graph Operations ===

  async traverse(params: {
    start: string
    depth: number
    direction: 'forward' | 'backward' | 'both'
    filter?: TripleFilter
  }): Promise<GraphResult> {
    // Graph traversal from starting node
    // Support configurable depth
    // Directional navigation
  }

  async findPaths(
    from: string,
    to: string,
    maxDepth?: number
  ): Promise<Path[]> {
    // Find all paths between two nodes
    // Shortest path algorithm
    // Return ranked paths
  }

  async getNeighbors(
    node: string,
    relationship?: string
  ): Promise<string[]> {
    // Get all connected nodes
    // Filter by relationship type
  }
}
```

#### 2. HTTP API (REST)

```typescript
import { Hono } from 'hono'

const app = new Hono<{ Bindings: Env }>()

// Triple CRUD
app.post('/triples', createTripleHandler)
app.get('/triples/:id', getTripleHandler)
app.get('/triples', queryTriplesHandler)
app.delete('/triples/:id', deleteTripleHandler)

// Verb operations
app.get('/verbs/:gerund', resolveVerbHandler)
app.get('/verbs', listVerbsHandler)
app.post('/verbs', registerVerbHandler)

// Role operations
app.get('/roles/:subject', resolveRoleHandler)
app.get('/roles/:role/capabilities', checkCapabilitiesHandler)

// Graph operations
app.post('/graph/traverse', traverseGraphHandler)
app.post('/graph/paths', findPathsHandler)
app.get('/graph/:node/neighbors', getNeighborsHandler)

// Query endpoint (SPARQL-like)
app.post('/query', executeQueryHandler)
```

#### 3. MCP Server (AI Tool Integration)

```typescript
const mcpTools: McpTool[] = [
  {
    name: 'ing_create_triple',
    description: 'Create a semantic triple relating subject, predicate, and object',
    inputSchema: {
      type: 'object',
      properties: {
        subject: { type: 'string', description: 'The agent/role performing the action' },
        predicate: { type: 'string', description: 'The action/verb in gerund form' },
        object: { type: 'string', description: 'The target entity' },
        context: { type: 'object', description: '5W1H metadata' }
      },
      required: ['subject', 'predicate', 'object']
    },
    handler: async (input) => {
      return await service.createTriple(input)
    }
  },

  {
    name: 'ing_query_triples',
    description: 'Search for semantic triples matching a pattern',
    inputSchema: {
      type: 'object',
      properties: {
        subject: { type: 'string' },
        predicate: { type: 'string' },
        object: { type: 'string' },
        limit: { type: 'number', default: 10 }
      }
    },
    handler: async (input) => {
      return await service.queryTriples(input)
    }
  },

  {
    name: 'ing_resolve_verb',
    description: 'Get the full definition of a verb from its gerund form',
    inputSchema: {
      type: 'object',
      properties: {
        gerund: { type: 'string', description: 'Verb in gerund form (e.g., "invoicing")' }
      },
      required: ['gerund']
    },
    handler: async (input) => {
      return await service.resolveVerb(input.gerund)
    }
  },

  {
    name: 'ing_check_capability',
    description: 'Check if a role has permission to perform a verb',
    inputSchema: {
      type: 'object',
      properties: {
        role: { type: 'string' },
        verb: { type: 'string' }
      },
      required: ['role', 'verb']
    },
    handler: async (input) => {
      return await service.checkCapability(input.role, input.verb)
    }
  },

  {
    name: 'ing_traverse_graph',
    description: 'Navigate the semantic graph from a starting node',
    inputSchema: {
      type: 'object',
      properties: {
        start: { type: 'string' },
        depth: { type: 'number', default: 2 },
        direction: { type: 'string', enum: ['forward', 'backward', 'both'], default: 'forward' }
      },
      required: ['start']
    },
    handler: async (input) => {
      return await service.traverse(input)
    }
  }
]
```

#### 4. Queue Consumer (Async Processing)

```typescript
export async function handleQueueMessage(
  batch: MessageBatch,
  env: Env
): Promise<void> {
  const service = new IngService({} as any, env)

  for (const message of batch.messages) {
    try {
      const { type, payload } = message.body

      switch (type) {
        case 'CREATE_TRIPLE':
          await service.createTriple(payload)
          break

        case 'DELETE_TRIPLE':
          await service.deleteTriple(payload.id)
          break

        case 'INFER_TRIPLES':
          // AI-powered triple inference
          await inferTriplesFromText(payload.text, service)
          break

        case 'SYNC_TO_GRAPH':
          // Sync database changes to graph
          await syncEntityToGraph(payload.entity, service)
          break

        default:
          console.warn('Unknown message type:', type)
      }

      message.ack()
    } catch (error) {
      console.error('Error processing message:', error)
      message.retry()
    }
  }
}
```

### Data Model

#### PostgreSQL Schema

```sql
-- Semantic Triples Table
CREATE TABLE semantic_triples (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,

  -- Core triple
  subject TEXT NOT NULL,
  predicate TEXT NOT NULL,
  object TEXT NOT NULL,

  -- Context (5W1H)
  context JSONB,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,

  -- Audit
  version INTEGER DEFAULT 1,
  confidence NUMERIC(3,2) DEFAULT 1.0,

  -- Indexes
  INDEX idx_subject (subject),
  INDEX idx_predicate (predicate),
  INDEX idx_object (object),
  INDEX idx_context USING gin (context),
  INDEX idx_created_at (created_at)
);

-- Verbs Registry
CREATE TABLE verbs (
  id TEXT PRIMARY KEY,
  gerund TEXT NOT NULL UNIQUE,
  base_form TEXT NOT NULL,
  category TEXT,

  -- Source mapping
  gs1_step TEXT,
  onet_task_id TEXT,

  -- Permissions
  required_role TEXT[],
  danger_level TEXT DEFAULT 'safe',
  requires_approval BOOLEAN DEFAULT false,

  -- Metadata
  description TEXT,
  examples JSONB,
  metadata JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Roles Registry
CREATE TABLE roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,

  -- Capabilities
  capabilities TEXT[],
  forbidden_verbs TEXT[],

  -- Hierarchy
  parent_role TEXT REFERENCES roles(id),

  -- O*NET mapping
  onet_code TEXT,

  -- Metadata
  description TEXT,
  metadata JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Triple Index (for fast graph queries)
CREATE TABLE triple_index (
  node TEXT NOT NULL,
  direction TEXT NOT NULL, -- 'subject', 'object', 'predicate'
  triple_id TEXT NOT NULL REFERENCES semantic_triples(id),

  PRIMARY KEY (node, direction, triple_id)
);
```

#### ClickHouse Schema (Analytics)

```sql
CREATE TABLE semantic_triples_analytics (
  id String,
  subject String,
  predicate String,
  object String,

  -- Time series
  timestamp DateTime64(3),

  -- Context
  location String,
  reason String,

  -- Metadata
  created_by String,
  confidence Float32,

  -- Aggregation keys
  subject_type String,
  predicate_type String,
  object_type String,

  INDEX idx_timestamp timestamp TYPE minmax GRANULARITY 1,
  INDEX idx_subject subject TYPE bloom_filter GRANULARITY 1,
  INDEX idx_predicate predicate TYPE bloom_filter GRANULARITY 1
) ENGINE = MergeTree()
ORDER BY (timestamp, subject, predicate)
PARTITION BY toYYYYMM(timestamp);
```

### Query Language

#### Pattern Matching Syntax

**Basic Patterns:**
```
# Get all triples with specific subject
?subject='accountant' ?predicate=* ?object=*

# Get all triples with specific predicate
?subject=* ?predicate='invoicing' ?object=*

# Get specific relationship
?subject='accountant' ?predicate='invoicing' ?object='invoice_123'
```

**Advanced Queries:**
```
# Graph traversal
TRAVERSE FROM 'accountant' DEPTH 3 DIRECTION forward

# Path finding
FIND PATH FROM 'accountant' TO 'invoice_123' MAX_DEPTH 5

# Aggregation
COUNT ?predicate WHERE ?subject='accountant'

# Temporal queries
?subject='accountant' WHERE timestamp > '2025-10-01'

# Spatial queries
?subject=* WHERE location NEAR (37.7749, -122.4194) RADIUS 10km
```

#### SPARQL-Like Queries

```sparql
# Select all accountants and their invoices
SELECT ?subject ?object
WHERE {
  ?subject a :Accountant .
  ?subject :invoicing ?object .
  ?object a :Invoice .
}

# Find all activities in progress
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
  FILTER (tense(?predicate) = 'activity')
}

# Count verbs by category
SELECT ?category COUNT(?predicate)
WHERE {
  ?subject ?predicate ?object .
  ?predicate :category ?category .
}
GROUP BY ?category
```

## Cloudflare Routing Strategy

### Challenge: SSL Per-Subdomain Limitation

Cloudflare requires **separate SSL certificates** for each subdomain. A pattern like `invoice.do.ing.as.accountant` would need:
- Certificate for `invoice.do`
- Certificate for wildcard `*.ing.as`

**Solution:** Use **multiple routing strategies** in parallel

### Strategy 1: Primary Pattern (Wildcard Subdomain)

**Pattern:** `[verb].ing.as/[subject]/[object]`

```
invoicing.ing.as/accountant/invoice_123
coding.ing.as/developer/app_456
treating.ing.as/doctor/patient_789
```

**Cloudflare Configuration:**
```javascript
// workers/ing/wrangler.jsonc
{
  "routes": [
    {
      "pattern": "*.ing.as/*",
      "zone_name": "ing.as"
    }
  ]
}
```

**DNS Setup:**
```
# Wildcard CNAME
*.ing.as CNAME workers.dev
```

**Benefits:**
- ✅ Single SSL certificate for `*.ing.as`
- ✅ Natural gerund-first URL structure
- ✅ SEO-friendly URLs

### Strategy 2: API Endpoints (Path-Based)

**Pattern:** `ing.as/[operation]/[params]`

```
ing.as/query?s=accountant&p=invoicing&o=invoice_123
ing.as/verbs/invoicing
ing.as/roles/accountant
ing.as/graph/traverse?start=accountant&depth=3
```

**Route Handlers:**
```typescript
app.get('/query', queryHandler)
app.get('/verbs/:gerund', verbHandler)
app.get('/roles/:subject', roleHandler)
app.post('/graph/traverse', traverseHandler)
```

**Benefits:**
- ✅ Simple DNS configuration
- ✅ Standard REST API patterns
- ✅ Easy to document and discover

### Strategy 3: Reverse Proxy (Alternative Domain)

**Pattern:** `[object].do` with header `X-Role: [subject]`

```
GET https://invoice.do/123
X-Role: accountant
X-Action: invoicing
```

**Cloudflare Worker Logic:**
```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const object = url.hostname.split('.')[0]
    const role = request.headers.get('X-Role')
    const action = request.headers.get('X-Action')

    if (role && action) {
      // Route to ing service
      return env.ING_SERVICE.handleTripleRequest({
        subject: role,
        predicate: action,
        object: object
      })
    }

    // Normal routing
    return fetch(request)
  }
}
```

**Benefits:**
- ✅ Leverages existing `.do` domain infrastructure
- ✅ Backward compatible with current routing
- ✅ Header-based semantic metadata

### Recommended Hybrid Approach

**Use all three strategies together:**

1. **Public API:** `ing.as/query`, `ing.as/verbs`, `ing.as/roles`
2. **Gerund Routes:** `[verb].ing.as/[subject]/[object]`
3. **Header Metadata:** `X-Role`, `X-Action` on `.do` domains

**Example Flow:**
```typescript
// User visits: invoicing.ing.as/accountant/invoice_123
// Worker extracts:
const verb = 'invoicing'
const subject = 'accountant'
const object = 'invoice_123'

// Worker queries triple:
const triple = await env.ING_SERVICE.queryTriples({
  subject: 'accountant',
  predicate: 'invoicing',
  object: 'invoice_123'
})

// Returns HTML or JSON response
return Response.json(triple)
```

### DNS Configuration

```bash
# 1. Add ing.as domain to Cloudflare
cloudflare zones create ing.as

# 2. Configure wildcard CNAME
cloudflare dns records create ing.as \
  --type CNAME \
  --name "*" \
  --content workers.dev \
  --proxied true

# 3. Deploy ing worker
cd workers/ing
pnpm deploy
```

## Security & Permissions

### RBAC Integration

**Triple-Level Authorization:**
```typescript
interface TriplePermissions {
  create: string[]      // Roles that can create this type of triple
  read: string[]        // Roles that can read
  update: string[]      // Roles that can update
  delete: string[]      // Roles that can delete
}

// Check permissions before operations
async function checkPermission(
  userId: string,
  action: 'create' | 'read' | 'update' | 'delete',
  triple: Triple
): Promise<boolean> {
  // Get user roles from auth service
  const roles = await env.AUTH_SERVICE.getUserRoles(userId)

  // Get triple permissions
  const permissions = await getTriplePermissions(triple)

  // Check if any user role has permission
  return roles.some(role => permissions[action].includes(role))
}
```

### Role-Capability Matrix

**Define capabilities per role:**
```typescript
const roleCapabilities: Record<string, string[]> = {
  'accountant': ['invoicing', 'reconciling', 'reporting'],
  'developer': ['coding', 'reviewing', 'deploying'],
  'doctor': ['diagnosing', 'treating', 'prescribing'],
  'lawyer': ['advising', 'reviewing', 'litigating'],
  'manager': ['approving', 'delegating', 'evaluating']
}

// Check if role can perform verb
function hasCapability(role: string, verb: string): boolean {
  return roleCapabilities[role]?.includes(verb) ?? false
}
```

### Verb Permission Levels

**Classify verbs by danger level:**
```typescript
interface VerbDefinition {
  id: string
  gerund: string
  dangerLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical'
  requiresApproval: boolean
  requiredRole: string[]
}

// Examples
const verbs: VerbDefinition[] = [
  {
    id: 'reading',
    gerund: 'reading',
    dangerLevel: 'safe',
    requiresApproval: false,
    requiredRole: ['*']  // Anyone
  },
  {
    id: 'invoicing',
    gerund: 'invoicing',
    dangerLevel: 'low',
    requiresApproval: false,
    requiredRole: ['accountant', 'finance_manager']
  },
  {
    id: 'deploying',
    gerund: 'deploying',
    dangerLevel: 'high',
    requiresApproval: true,
    requiredRole: ['senior_developer', 'devops_engineer']
  },
  {
    id: 'deleting',
    gerund: 'deleting',
    dangerLevel: 'critical',
    requiresApproval: true,
    requiredRole: ['admin', 'system_architect']
  }
]
```

### Audit Logging

**Track all triple operations:**
```typescript
interface AuditLog {
  id: string
  timestamp: string
  userId: string
  action: 'create' | 'read' | 'update' | 'delete'
  tripleId: string
  triple: Triple
  result: 'success' | 'denied' | 'error'
  reason?: string
}

// Log every operation
async function auditTripleOperation(
  userId: string,
  action: string,
  triple: Triple,
  result: 'success' | 'denied' | 'error',
  reason?: string
): Promise<void> {
  await env.DB_SERVICE.insert('audit_logs', {
    id: generateId(),
    timestamp: new Date().toISOString(),
    userId,
    action,
    tripleId: triple.id,
    triple: JSON.stringify(triple),
    result,
    reason
  })
}
```

## AI Integration

### Natural Language Triple Extraction

**Use AI to extract triples from text:**
```typescript
async function extractTriplesFromText(
  text: string,
  env: Env
): Promise<Triple[]> {
  const prompt = `
Extract semantic triples from the following text.
For each triple, identify:
- Subject (the agent/role)
- Predicate (the action/verb in gerund form)
- Object (the target entity)

Text: ${text}

Return JSON array of triples.
`

  const response = await env.AI_SERVICE.generate({
    prompt,
    model: 'gpt-4',
    responseFormat: 'json'
  })

  const triples = JSON.parse(response.text)

  // Validate and store triples
  const results = []
  for (const triple of triples) {
    const created = await env.ING_SERVICE.createTriple({
      subject: triple.subject,
      predicate: triple.predicate,
      object: triple.object,
      context: { source: 'ai_extraction', confidence: triple.confidence }
    })
    results.push(created)
  }

  return results
}
```

### Semantic Inference

**Infer implicit triples from explicit ones:**
```typescript
async function inferImplicitTriples(
  triple: Triple,
  env: Env
): Promise<Triple[]> {
  // Example: If (Developer, Coding, Application)
  // Infer: (Developer, Using, IDE)
  //        (Application, Requiring, Code)

  const inferred: Triple[] = []

  // Lookup verb definition
  const verb = await env.ING_SERVICE.resolveVerb(triple.predicate)

  // Check for inference rules
  if (verb.impliedActions) {
    for (const action of verb.impliedActions) {
      inferred.push({
        subject: triple.subject,
        predicate: action.verb,
        object: action.object || triple.object,
        context: {
          ...triple.context,
          inferred_from: triple.id,
          confidence: 0.8
        }
      })
    }
  }

  return inferred
}
```

### Relationship Prediction

**Use embeddings to predict likely relationships:**
```typescript
async function predictRelationships(
  node: string,
  env: Env
): Promise<Triple[]> {
  // Get embedding for node
  const embedding = await env.AI_SERVICE.generateEmbedding(node)

  // Find similar nodes via vector search
  const similar = await env.DB_SERVICE.vectorSearch({
    collection: 'semantic_nodes',
    embedding,
    limit: 10
  })

  // Predict likely relationships
  const predictions: Triple[] = []
  for (const candidate of similar) {
    // Use AI to predict relationship
    const prompt = `
Given two entities:
- Entity 1: ${node}
- Entity 2: ${candidate.node}

What is the most likely relationship between them?
Return as semantic triple (subject, predicate, object).
`

    const response = await env.AI_SERVICE.generate({ prompt })
    const triple = parseTriple(response.text)

    if (triple) {
      predictions.push({
        ...triple,
        context: {
          prediction: true,
          confidence: candidate.similarity * 0.9
        }
      })
    }
  }

  return predictions
}
```

### Anomaly Detection

**Detect unusual triples that violate patterns:**
```typescript
async function detectAnomalies(
  triple: Triple,
  env: Env
): Promise<{ isAnomaly: boolean; reason?: string }> {
  // Check historical patterns
  const similarTriples = await env.ING_SERVICE.queryTriples({
    subject: triple.subject,
    predicate: triple.predicate
  })

  // Statistical analysis
  const objectFrequency = similarTriples.reduce((acc, t) => {
    acc[t.object] = (acc[t.object] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalCount = similarTriples.length
  const currentCount = objectFrequency[triple.object] || 0
  const frequency = currentCount / totalCount

  // Flag as anomaly if frequency is very low
  if (frequency < 0.01 && totalCount > 100) {
    return {
      isAnomaly: true,
      reason: `Unusual object for this subject-predicate pair (frequency: ${frequency})`
    }
  }

  // Check role capabilities
  const role = await env.ING_SERVICE.resolveRole(triple.subject)
  const hasCapability = await env.ING_SERVICE.checkCapability(
    role.name,
    triple.predicate
  )

  if (!hasCapability.allowed) {
    return {
      isAnomaly: true,
      reason: `Role ${role.name} typically doesn't perform ${triple.predicate}`
    }
  }

  return { isAnomaly: false }
}
```

## Future Extensions

### GraphDL Vocabulary Expansion

**Current Coverage:**
- ✅ do.industries - 1,016 occupations, 18,797 tasks
- ✅ schema.org.ai - 38 AI entity types
- ✅ gs1.org.ai - 37 verbs, 31 dispositions, 5 event types
- ✅ mdx.org.ai - MDX types for documentation

**Planned:**
- 🔄 soc.org.ai - Social ontology (relationships, networks, influence)
- 🔄 legal.org.ai - Legal entities, proceedings, documents
- 🔄 medical.org.ai - Medical procedures, diagnoses, treatments
- 🔄 finance.org.ai - Financial instruments, transactions, regulations

### Advanced Query Capabilities

**Temporal Queries:**
```sparql
# Find all triples that occurred yesterday
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
  FILTER (date(?timestamp) = '2025-10-03')
}

# Find activities in progress right now
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
  FILTER (
    ?start_time <= NOW() AND
    ?end_time >= NOW() AND
    tense(?predicate) = 'activity'
  )
}
```

**Spatial Queries:**
```sparql
# Find all activities within 10km of coordinates
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object .
  FILTER distance(?location, POINT(37.7749, -122.4194)) < 10000
}
```

**Probabilistic Queries:**
```sparql
# Find likely future triples based on patterns
SELECT ?subject ?predicate ?object ?confidence
WHERE {
  ?subject ?predicate ?object .
  INFER FROM HISTORY
  ORDER BY ?confidence DESC
  LIMIT 10
}
```

### Real-Time Graph Streaming

**WebSocket API for live graph updates:**
```typescript
// Client subscribes to graph changes
const ws = new WebSocket('wss://ing.as/stream')

// Subscribe to specific patterns
ws.send(JSON.stringify({
  type: 'subscribe',
  pattern: {
    subject: 'accountant',
    predicate: '*',
    object: '*'
  }
}))

// Receive real-time updates
ws.onmessage = (event) => {
  const { type, triple } = JSON.parse(event.data)

  if (type === 'TRIPLE_CREATED') {
    console.log('New triple:', triple)
  } else if (type === 'TRIPLE_DELETED') {
    console.log('Triple deleted:', triple)
  }
}
```

### Distributed Graph Consensus

**Multi-region graph synchronization:**
```typescript
// Raft-based consensus for triple creation
interface GraphNode {
  region: string
  replicas: string[]
  state: 'leader' | 'follower' | 'candidate'
}

async function proposeTriple(
  triple: Triple,
  nodes: GraphNode[]
): Promise<boolean> {
  // Send proposal to leader
  const leader = nodes.find(n => n.state === 'leader')
  const response = await fetch(`${leader.region}/propose`, {
    method: 'POST',
    body: JSON.stringify(triple)
  })

  // Wait for quorum (majority of replicas)
  const quorum = Math.floor(nodes.length / 2) + 1

  // Return true if consensus achieved
  return response.ok
}
```

## Implementation Checklist

### Phase 1: Foundation (Week 1)

- [x] Research and document semantic triple architecture
- [ ] Create SEMANTICS.md documentation
- [ ] Create ing worker directory structure
- [ ] Set up TypeScript types for triples, verbs, roles
- [ ] Create database migrations for PostgreSQL tables
- [ ] Implement basic RPC interface

### Phase 2: Core Functionality (Week 2)

- [ ] Implement triple CRUD operations
- [ ] Implement verb registry and resolution
- [ ] Implement role resolution and capability checking
- [ ] Add basic graph query engine
- [ ] Add tests for core functionality

### Phase 3: API & Integration (Week 3)

- [ ] Implement HTTP REST API
- [ ] Implement MCP server tools
- [ ] Implement queue consumer
- [ ] Add Cloudflare routing configuration
- [ ] Configure DNS for ing.as domain

### Phase 4: Advanced Features (Week 4)

- [ ] Add graph traversal algorithms
- [ ] Add SPARQL-like query parser
- [ ] Add AI-powered triple extraction
- [ ] Add semantic inference engine
- [ ] Add anomaly detection

### Phase 5: Production (Week 5)

- [ ] Comprehensive testing (unit, integration, e2e)
- [ ] Performance optimization
- [ ] Documentation and examples
- [ ] Deploy to production namespace
- [ ] Monitor and iterate

## Resources

### Documentation

- **Root CLAUDE.md** - Multi-repo management strategy
- **SDK CLAUDE.md** - 121 SDK packages architecture
- **Workers CLAUDE.md** - 8/8 microservices complete
- **GraphDL README** - Type definitions for Business-as-Code
- **schema.org.ai README** - AI entity vocabulary

### Repositories

- **graphdl** - `sdk/packages/graphdl/`
- **schema.org.ai** - `sdk/packages/schema.org.ai/`
- **do.industries** - `sdk/packages/do.industries/`
- **gs1.org.ai** - `sdk/packages/gs1.org.ai/`
- **ing worker** - `workers/ing/` (to be created)

### External Standards

- **RDF** - https://www.w3.org/RDF/
- **SPARQL** - https://www.w3.org/TR/sparql11-query/
- **Schema.org** - https://schema.org/
- **GS1** - https://ref.gs1.org/cbv/
- **O*NET** - https://www.onetcenter.org/

---

**Last Updated:** 2025-10-04
**Status:** 🚧 Implementation In Progress
**Managed By:** Claude Code (AI Project Manager)
**Contact:** Issues at https://github.com/dot-do/.do/issues
