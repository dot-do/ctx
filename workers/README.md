# Workers

Cloudflare Workers definitions in MDX format.

## Overview

This directory contains **28 Cloudflare Workers** defined as MDX files with YAML frontmatter for configuration and TypeScript code blocks for implementation.

**MDX Format** enables single-file worker definitions with:
- YAML frontmatter for wrangler configuration
- Markdown documentation
- TypeScript implementation in code blocks

## Structure

```
workers/
├── gateway.mdx          # API Gateway (routing, auth, rate limiting)
├── db.mdx              # Database service (PostgreSQL/Neon + ClickHouse)
├── auth.mdx            # Authentication (WorkOS, API keys, RBAC)
├── schedule.mdx        # Cron jobs and scheduled tasks
├── webhooks.mdx        # External webhooks (Stripe, GitHub, etc.)
├── email.mdx           # Transactional emails (Resend)
├── mcp.mdx             # Model Context Protocol server
├── queue.mdx           # Message queue processing
├── ai.mdx              # AI services
├── api.mdx             # Multi-layer API routing
├── app.mdx             # Payload CMS proxy
├── site.mdx            # Runtime MDX compilation
├── voice.mdx           # Multi-provider TTS
├── podcast.mdx         # Multi-speaker podcast generation
├── numerics.mdx        # Real-time KPI metrics
├── blog-stream.mdx     # AI blog generation with streaming
└── ... (13 more workers)
```

## MDX Worker Format

Each worker is defined in a single `.mdx` file:

```mdx
---
# YAML Frontmatter - Wrangler configuration
$type: Worker
$id: my-worker
name: my-worker
main: src/index.ts
compatibility_date: "2025-07-08"

services:
  - binding: DB
    service: db
---

# Markdown Documentation

Comprehensive documentation with examples.

## TypeScript Implementation

\```typescript
import { WorkerEntrypoint } from 'cloudflare:workers'

export class MyService extends WorkerEntrypoint<Env> {
  async myMethod() {
    return 'Hello from RPC'
  }
}
\```
```

## Development

```bash
# Install dependencies
pnpm install

# Build and validate all workers
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm check-types
```

## Workers List

| Worker | Description | Lines |
|--------|-------------|-------|
| **gateway** | API Gateway - routing, auth, rate limiting | 1,349 |
| **db** | Database service (PostgreSQL + ClickHouse) | 1,909 |
| **auth** | Authentication and authorization | 2,669 |
| **schedule** | Cron jobs and scheduled tasks | 1,925 |
| **webhooks** | External webhooks (4 providers) | 2,114 |
| **email** | Transactional emails | TBD |
| **mcp** | Model Context Protocol server | TBD |
| **queue** | Message queue processing | TBD |
| **api** | Multi-layer API routing | 1,519 |
| **app** | Payload CMS proxy | 707 |
| **site** | Runtime MDX compilation | 1,249 |
| **voice** | Multi-provider TTS | 1,476 |
| **podcast** | Multi-speaker podcast generation | 1,600 |
| **numerics** | Real-time KPI metrics | 2,000 |
| **blog-stream** | AI blog generation with streaming | 1,100 |

**Total: 28 workers (~23,500 LOC in MDX format)**

## Schema Validation

Velite validates all worker MDX files against a Zod schema:

**Required fields:**
- `$id` - Unique identifier
- `name` - Worker name

**Optional fields:**
- `description` - Brief description
- `main` - Entry point (default: src/index.ts)
- `compatibility_date` - Cloudflare compatibility date
- `routes`, `services`, `kv_namespaces`, `r2_buckets`, `d1_databases`, `queues`, `vars` - All wrangler.jsonc fields supported
- `metadata` - Namespace and visibility
- `tags` - Categorization tags

## Related Documentation

- **[Root CLAUDE.md](../CLAUDE.md)** - Multi-repo management
- **[workers/CLAUDE.md](../../workers/CLAUDE.md)** - Workers repository docs

---

**Last Updated**: 2025-10-05
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/ctx
