# CLAUDE.md - ctx Repository

## Project Overview

The **ctx repository** (ctx.do) is a **parent repository** organizing all MDX content and database records for the dot-do ecosystem. It consolidates entity definitions as **nested git submodules**, enabling independent version control while maintaining organizational structure.

**Purpose**: Organize and manage all content repositories (agents, apps, brands, business, db, functions, integrations, notes, research, schemas, services, sources, workflows) as submodules under a single parent repository.

**Position**: 📝 **Content Organization Layer** - Parent repository for all MDX content repos

**Architecture**: Each content type is an independent git repository, but organized under ctx/ for easier discovery and management.

## Architecture

### Parent Repository with Nested Submodules

The ctx repository contains **13 content repositories as git submodules**:

1. **agents/** - AI agent definitions (submodule)
2. **apps/** - Application definitions (submodule)
3. **brands/** - Brand identity (submodule)
4. **business/** - Business entities (submodule)
5. **db/** - Database records and migrations (submodule)
6. **functions/** - Function definitions (submodule)
7. **integrations/** - Integration configs (submodule)
8. **notes/** - Documentation and notes (submodule)
9. **research/** - Research materials (submodule)
10. **schemas/** - Schema definitions (submodule)
11. **services/** - Service definitions (submodule)
12. **sources/** - Data source definitions (submodule)
13. **workflows/** - Workflow patterns (submodule)

**Plus local directories:**
- **business-as-code/** - Business entity framework (not a submodule)
- **services-as-software/** - Service definitions framework (not a submodule)
- **ideas/**, **nouns/**, **verbs/**, **standards/**, **templates/**, **reports/** - Local entity types

### Bidirectional Sync

```
GitHub (MDX in submodules) ←→ Database (PostgreSQL)

Commit to content repo → Webhook → Parse MDX → Validate → Upsert to DB
Database change → Queue job → Generate MDX → Create PR → Review → Merge
```

Each content repository (submodule) syncs independently with the database via repo.do GitHub webhooks.

## Directory Structure

```
ctx/
├── .gitmodules              # Submodule configuration
├── agents/                  # (submodule) AI agent definitions
├── apps/                    # (submodule) Application definitions
├── brands/                  # (submodule) Brand identity
├── business/                # (submodule) Business entities
├── db/                      # (submodule) Database records and migrations
├── functions/               # (submodule) Function definitions
├── integrations/            # (submodule) Integration configs
├── notes/                   # (submodule) Documentation and notes
├── research/                # (submodule) Research materials
├── schemas/                 # (submodule) Schema definitions
├── services/                # (submodule) Service definitions
├── sources/                 # (submodule) Data source definitions
├── workflows/               # (submodule) Workflow patterns
│
├── business-as-code/        # Business-as-Code framework (local)
│   ├── companies/           # Company definitions
│   ├── objectives/          # OKRs and key results
│   ├── roles/              # Organizational roles
│   ├── offerings/          # Products and services
│   ├── operations/         # Business processes
│   ├── metrics/            # KPIs and tracking
│   ├── resources/          # Budget and allocation
│   ├── governance/         # Policies and authority
│   ├── types.ts            # TypeScript interfaces
│   └── README.md           # Documentation
│
├── services-as-software/    # Services framework (local)
│   ├── services/           # Service definitions
│   ├── tasks/              # Task decomposition
│   ├── deliverables/       # Output specs
│   ├── quality/            # Standards and SLAs
│   ├── pricing/            # Pricing models
│   ├── delivery/           # Execution mechanisms
│   ├── types.ts            # TypeScript interfaces
│   └── README.md           # Documentation
│
├── ideas/                   # Local entity types (local)
├── nouns/                   # Entity/type definitions (local)
├── verbs/                   # Action definitions (local)
├── standards/               # Standards and conventions (local)
├── templates/               # Template files (local)
├── reports/                 # Generated reports (local)
│
├── ABSTRACTIONS.md          # Business-as-Code system design
├── ARCHITECTURE.md          # Platform architecture overview
├── IDEAS.md                 # Future ideas and concepts
├── ROADMAP.md              # Development roadmap
├── SEMANTICS.md            # Semantic triple network design
├── WORKSTREAMS.md          # Active workstream tracking
│
├── .velite/                 # Generated (gitignored)
├── velite.config.ts         # Velite configuration
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── CLAUDE.md               # This file
```

### Working with Submodules

```bash
# Clone ctx with all submodules
git clone --recurse-submodules https://github.com/dot-do/ctx.git

# Update all submodules to latest
cd ctx
git submodule update --remote --merge

# Work on a specific content repo
cd agents
git checkout -b new-feature
# make changes
git add . && git commit -m "Add new agent"
git push origin new-feature

# Update parent ctx repo to track new commit
cd ..
git add agents
git commit -m "Update agents submodule"
git push
```

## Development Commands

### Prerequisites

```bash
# Install dependencies
pnpm install
```

### Build & Validate

```bash
# Build and validate all MDX files
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm check-types
```

### Working with MDX Files

#### Create New Entity

1. Choose the appropriate directory (`brands/`, `functions/`, etc.)
2. Create a new `.mdx` file with kebab-case name
3. Add frontmatter with required fields
4. Write content in Markdown
5. Build to validate: `pnpm build`
6. Commit and push to trigger database sync

#### Example: Create New Function

```bash
# Create file
touch functions/calculate-tax.mdx
```

```mdx
---
title: Calculate Tax
description: Calculate sales tax based on location and amount
type: code
inputs:
  - name: amount
    type: number
    description: Purchase amount in cents
    required: true
  - name: zipCode
    type: string
    description: Zip code for tax jurisdiction
    required: true
outputs:
  - name: taxAmount
    type: number
    description: Tax amount in cents
  - name: totalAmount
    type: number
    description: Total including tax
metadata:
  ns: function
  visibility: public
tags:
  - tax
  - calculation
  - e-commerce
---

# Calculate Tax

Calculates applicable sales tax based on purchase amount and location.

## Implementation

\`\`\`typescript
export async function calculateTax({ amount, zipCode }: CalculateTaxInput) {
  const taxRate = await getTaxRateForZip(zipCode)
  const taxAmount = Math.round(amount * taxRate)
  const totalAmount = amount + taxAmount

  return { taxAmount, totalAmount }
}
\`\`\`
```

Build and validate:
```bash
pnpm build
```

Commit:
```bash
git add content/functions/calculate-tax.mdx
git commit -m "Add calculate-tax function"
git push
```

The webhook will automatically sync this to the database.

## Schema Validation

Each entity type has a Zod schema defined in `velite.config.ts`. Velite validates all MDX files against these schemas during build.

### Common Frontmatter Fields

All entities include:
- **title** (required): Display name
- **description** (required): Brief description
- **slug** (auto-generated): URL-friendly identifier
- **metadata**: Namespace and visibility settings
- **tags**: Array of tags for categorization

### Entity-Specific Fields

#### Brands
- `logo`, `website`, `industry`, `founded`

#### Functions
- `type` (code|generative|human|agentic)
- `inputs[]`, `outputs[]`

#### Nouns
- `schemaType` (Schema.org type)
- `properties[]`

#### Verbs
- `subject`, `object`, `parameters[]`

#### Workflows
- `trigger`, `steps[]`

#### Agents
- `role`, `capabilities[]`, `tools[]`, `model`, `systemPrompt`

#### Ideas
- `status` (concept|proposed|approved|in-progress|completed|rejected)
- `priority`, `category`, `relatedTo[]`

## Database Sync Process

### MDX → Database (Automatic)

When you commit an MDX file:

1. **GitHub Webhook** fires on push event
2. **API Webhook Handler** receives event (`/api/webhooks/github`)
3. **Signature Validation** verifies HMAC-SHA256 signature
4. **Parse MDX** extracts frontmatter and content
5. **Validate** checks against Zod schema
6. **Upsert** to `things` table in database:
   ```typescript
   {
     ns: metadata.ns,        // e.g., 'function'
     id: slug,               // e.g., 'send-email'
     type: entityType,       // e.g., 'Function'
     content: mdxContent,    // Markdown content
     data: frontmatter,      // Full frontmatter as JSON
     visibility: metadata.visibility
   }
   ```
7. **Generate Embedding** for semantic search
8. **Log** sync status and errors

### Database → MDX (Pull Request)

When database is updated directly:

1. **Database Trigger** detects change
2. **Queue Job** for sync processing
3. **Generate MDX** from database record
4. **Create Branch** in ctx repo (`sync/[ns]/[id]/[timestamp]`)
5. **Commit File** to new branch
6. **Create PR** with details and diff
7. **Human Review** and merge

### Conflict Resolution

When both GitHub and database are modified:

- **Timestamp-based**: Most recent update wins
- **Manual Review**: If timestamps are too close (<5 min), create PR for review
- **Merge Strategy**: Prefer GitHub (source of truth) over database

## File Naming Conventions

- **Kebab-case**: `user-onboarding.mdx`, `send-email.mdx`
- **Descriptive**: Name should indicate purpose
- **Unique**: Each file name must be unique within its directory
- **No Spaces**: Use hyphens instead

## Code Standards

### MDX Files

```mdx
---
# Frontmatter: YAML format
title: Entity Title
description: Brief description
# ... type-specific fields
metadata:
  ns: entity-type
  visibility: public
tags:
  - tag1
  - tag2
---

# Entity Title

Detailed description in Markdown.

## Sections

Content organized with headers.

### Subsections

Use proper heading hierarchy.

## Code Examples

\`\`\`typescript
// TypeScript code examples
export function example() {
  return 'formatted code'
}
\`\`\`

## Lists

- Item 1
- Item 2
- Item 3

## Links

[Internal link](/path/to/page)
[External link](https://example.com)
```

### TypeScript Configuration

- Strict mode enabled
- ES2022 target
- ESNext modules
- Types checked during build

## Testing

### Validation

```bash
# Build validates all MDX files
pnpm build

# Should output:
# ✓ Built 7 entities successfully
```

### Manual Testing

1. Create or modify an MDX file
2. Run `pnpm build` to validate
3. Fix any schema errors
4. Commit and push
5. Verify database update (check logs or query DB)

### Integration Testing

Test the full sync flow:

```bash
# 1. Create test MDX file
echo '---
title: Test Function
description: Test function for sync
type: code
metadata:
  ns: function
  visibility: public
---
# Test Function
Test content
' > content/functions/test-sync.mdx

# 2. Build and commit
pnpm build
git add content/functions/test-sync.mdx
git commit -m "Test: sync validation"
git push

# 3. Check database
# Query: SELECT * FROM things WHERE ns = 'function' AND id = 'test-sync'

# 4. Clean up
git rm content/functions/test-sync.mdx
git commit -m "Test: cleanup"
git push
```

## Common Tasks

### Add New Entity Type

1. Update `velite.config.ts`:
   ```typescript
   const newType = defineCollection({
     name: 'NewType',
     pattern: 'new-type/**/*.mdx',
     schema: s.object({
       // Define schema
     })
   })
   ```

2. Add to collections:
   ```typescript
   collections: { ..., newType }
   ```

3. Create directory:
   ```bash
   mkdir new-type
   ```

4. Create example file

5. Update this CLAUDE.md

### Migrate Existing Data

To import existing data from database into MDX:

```typescript
// Run in api project
import { db } from 'db.do'
import { generateMDX } from './utils'

const entities = await db.things.findAll({ ns: 'function' })

for (const entity of entities) {
  const mdx = generateMDX(entity)
  await fs.writeFile(
    `../ctx/functions/${entity.id}.mdx`,
    mdx
  )
}
```

### Bulk Updates

For bulk updates across multiple files:

```bash
# Example: Add tag to all functions
find functions -name "*.mdx" -exec sed -i '' 's/tags:/tags:\n  - new-tag/' {} \;

# Build to validate
pnpm build

# Review changes
git diff

# Commit
git add functions
git commit -m "Add new-tag to all functions"
git push
```

## Webhook Configuration

### GitHub App Setup

The GitHub App is configured to send webhooks to:

**Webhook URL**: `https://apis.do/webhooks/github`

**Events**:
- Push events (when commits are pushed)
- Pull request events (when PRs are opened/updated)

**Secret**: Set via environment variable `GITHUB_WEBHOOK_SECRET`

### Webhook Handler

Located in `api` project at `src/routes/webhooks/github.ts`.

Processes:
1. Signature validation
2. Event filtering (only ctx repo)
3. MDX parsing
4. Database sync
5. Error handling and logging

## Troubleshooting

### Build Errors

**Schema validation failed**:
- Check frontmatter matches required fields
- Ensure all required fields have values
- Verify enum values are allowed
- Check data types (string vs number)

**File not found**:
- Ensure file is in correct directory
- Check file extension is `.mdx`
- Verify path in error message

### Sync Issues

**Webhook not triggering**:
- Check GitHub App installation
- Verify webhook secret is configured
- Check API webhook endpoint is accessible
- Review GitHub webhook delivery logs

**Database not updating**:
- Check API logs for errors
- Verify database connection
- Ensure entity validates against schema
- Check for duplicate keys

### Permission Issues

**Cannot push to repository**:
- Verify GitHub permissions
- Check Git remote is correct
- Ensure SSH keys or tokens are configured

## Related Documentation

- **Parent**: [Root CLAUDE.md](../CLAUDE.md) - Multi-repo management
- **Database**: [db/CLAUDE.md](../db/CLAUDE.md) - Database schema and sync
- **API**: [api/CLAUDE.md](../api/CLAUDE.md) - Webhook handler
- **MDX Runtime**: [mdx/CLAUDE.md](../mdx/CLAUDE.md) - MDX execution

## External Resources

- **Velite**: https://velite.js.org
- **Zod**: https://zod.dev
- **MDX**: https://mdxjs.com
- **Schema.org**: https://schema.org

---

**Last Updated**: 2025-10-03
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/ctx
