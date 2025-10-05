# CLAUDE.md - services Repository

## Project Overview

The **services repository** stores **service definitions and APIs** as MDX files with Zod schema validation via Velite, enabling bidirectional synchronization with the PostgreSQL database.

**Purpose**: Define and manage service entities as version-controlled MDX files that sync automatically to the database.

**Position**: 📝 **Content Layer** - Content source that syncs to db layer

## Schema

The Velite schema for services includes:

### Required Fields
- **title** (string): Service name
- **description** (string): What the service does

### Optional Fields
- **category** (string): Service category
- **provider** (string): Service provider
- **endpoint** (URL): API endpoint
- **protocol** (string): Protocol (REST, GraphQL, gRPC, etc.)
- **authentication** (string): Auth method
- **rateLimit** (object): Rate limiting
- **pricing** (object): Pricing information
- **sla** (object): Service level agreement
- **metadata**: Namespace and visibility
- **tags** (array): Categorization tags

## MDX File Example

```mdx
---
title: User Authentication Service
description: Provides user authentication and authorization
category: identity
provider: WorkOS
endpoint: https://api.workos.com/
protocol: REST
authentication: API Key
rateLimit:
  requests: 100
  period: minute
metadata:
  ns: services
  visibility: public
tags:
  - auth
  - identity
  - workos
---

# User Authentication Service

OAuth 2.0 and SSO authentication service powered by WorkOS.

## Features

- OAuth 2.0 support (GitHub, Google, etc.)
- SSO (SAML, OIDC)
- Directory Sync
- Audit Logs
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Build and validate all MDX files
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm check-types
```

## Related Documentation

- **Parent**: [Root CLAUDE.md](../CLAUDE.md) - Multi-repo management
- **Database**: [db/CLAUDE.md](../db/CLAUDE.md) - Database schema and sync
- **API**: [api/CLAUDE.md](../api/CLAUDE.md) - Webhook handler
- **Workers**: [workers/CLAUDE.md](../workers/CLAUDE.md) - Service implementations

---

**Last Updated**: 2025-10-03
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/services
