# ctx.do - Entity Definitions

Entity definitions in MDX with Velite + Zod validation, synced bidirectionally with PostgreSQL database.

## Overview

The **ctx repository** is the single source of truth for entity definitions in the dot-do ecosystem. It stores structured content as MDX files that automatically sync to the database via GitHub webhooks.

## Entity Types

- **brands/** - Brand identity and metadata
- **functions/** - Code/generative/human/agentic functions
- **nouns/** - Entities and types (Schema.org vocabulary)
- **verbs/** - Actions and operations
- **workflows/** - Orchestration patterns
- **agents/** - Autonomous AI workers
- **ideas/** - Concepts and opportunities

## Quick Start

```bash
# Install dependencies
pnpm install

# Build and validate all MDX files
pnpm build

# Watch mode for development
pnpm dev
```

## Creating an Entity

1. Navigate to the appropriate directory (e.g., `functions/`)
2. Create a new `.mdx` file with kebab-case name
3. Add frontmatter with required fields:

```mdx
---
title: Send Email
description: Send transactional emails
type: code
inputs:
  - name: to
    type: string
    required: true
metadata:
  ns: function
  visibility: public
tags:
  - email
---

# Send Email

Implementation details...
```

4. Build to validate: `pnpm build`
5. Commit and push - changes automatically sync to database

## Bidirectional Sync

### GitHub → Database (Automatic)
When you push MDX files, a webhook automatically syncs them to the PostgreSQL `things` table.

### Database → GitHub (PR)
When the database is updated directly, a GitHub App creates a pull request with the changes for review.

## Development

See [CLAUDE.md](./CLAUDE.md) for complete development guidelines, schema definitions, and sync architecture.

## Repository Structure

```
ctx/
├── brands/          # Brand entities
├── functions/       # Function definitions
├── nouns/          # Noun/entity types
├── verbs/          # Action definitions
├── workflows/      # Workflow orchestrations
├── agents/         # AI agent definitions
├── ideas/          # Concept proposals
├── .velite/        # Generated (gitignored)
├── velite.config.ts
├── package.json
└── CLAUDE.md       # Full documentation
```

## License

MIT
