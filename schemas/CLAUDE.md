# CLAUDE.md - schemas Repository

## Project Overview

The **schemas repository** stores **schema definitions and data models** as MDX files with Zod schema validation via Velite, enabling bidirectional synchronization with the PostgreSQL database.

**Purpose**: Define and manage schema entities as version-controlled MDX files that sync automatically to the database.

**Position**: 📝 **Content Layer** - Content source that syncs to db layer

## Schema

The Velite schema for schemas includes:

### Required Fields
- **title** (string): Schema name
- **description** (string): What the schema represents

### Optional Fields
- **type** (string): Schema.org type or custom type
- **properties** (array): Schema properties with types
- **required** (array): Required property names
- **extends** (string): Parent schema reference
- **version** (string): Schema version
- **metadata**: Namespace and visibility
- **tags** (array): Categorization tags

## MDX File Example

```mdx
---
title: Person
description: A person (alive, dead, undead, or fictional)
type: schema.org/Person
properties:
  - name: givenName
    type: string
    description: First name
  - name: familyName
    type: string
    description: Last name
  - name: email
    type: string
    format: email
  - name: birthDate
    type: string
    format: date
required:
  - givenName
  - familyName
metadata:
  ns: schemas
  visibility: public
tags:
  - schema-org
  - person
---

# Person Schema

Based on Schema.org Person type. Represents an individual human being.

## Properties

All properties follow Schema.org vocabulary.
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

---

**Last Updated**: 2025-10-03
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/schemas
