# brands.do - Brand Definitions

Brand identity and metadata in MDX format, synced bidirectionally with PostgreSQL database.

## Overview

The **brands repository** stores brand definitions as MDX files that automatically sync to the database via GitHub webhooks.

## Quick Start

```bash
# Install dependencies
pnpm install

# Build and validate all MDX files
pnpm build

# Watch mode for development
pnpm dev
```

## Creating a Brand

1. Navigate to the `brands/` directory
2. Create a new `.mdx` file with kebab-case name
3. Add frontmatter with required fields:

```mdx
---
title: Example Brand
description: A brief description of the brand
logo: /images/brands/example-logo.svg
website: https://example.com
industry: Technology
founded: "2020"
headquarters: San Francisco, CA
colors:
  primary: "#0066FF"
  secondary: "#FF6600"
  accent: "#00FF66"
metadata:
  ns: brand
  visibility: public
tags:
  - technology
  - saas
  - b2b
---

# Example Brand

Detailed description of the brand, its mission, and values...
```

4. Build to validate: `pnpm build`
5. Commit and push - changes automatically sync to database

## Bidirectional Sync

### GitHub → Database (Automatic)
When you push MDX files, a webhook automatically syncs them to the PostgreSQL `things` table.

### Database → GitHub (PR)
When the database is updated directly, a GitHub App creates a pull request with the changes for review.

## Repository Structure

```
brands/
├── brands/         # Brand MDX files
├── .velite/        # Generated (gitignored)
├── velite.config.ts
├── package.json
└── CLAUDE.md       # Full documentation
```

## License

MIT
