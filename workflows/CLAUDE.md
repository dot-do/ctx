# CLAUDE.md - workflows Repository

## Project Overview

The **workflows repository** stores **29 production workflow definitions** as MDX files with Zod schema validation via Velite, enabling bidirectional synchronization with the PostgreSQL database.

**Purpose**: Define and manage workflow entities as version-controlled MDX files that sync automatically to the database.

**Position**: 📝 **Content Layer** - Content source that syncs to db layer

## Repository Structure

```
workflows/
├── customer/       # 6 workflows - Customer lifecycle
│   ├── domainOnboarding.mdx
│   ├── leadEnrichment.mdx
│   ├── onboardCustomer.mdx
│   ├── referralRewardDistribution.mdx
│   ├── userOnboarding.mdx
│   └── waitlistInvitation.mdx
├── development/    # 5 workflows - SDLC automation
│   ├── deployApplication.mdx
│   ├── fixBug.mdx
│   ├── releaseVersion.mdx
│   ├── reviewPullRequest.mdx
│   └── runTests.mdx
├── ecommerce/      # 5 workflows - Commerce operations
│   ├── handleReturn.mdx
│   ├── manageInventory.mdx
│   ├── processOrder.mdx
│   ├── processPayment.mdx
│   └── trackShipment.mdx
├── finance/        # 3 workflows - Financial processes
│   ├── analyzeInvestment.mdx
│   ├── generateTaxReturn.mdx
│   └── processLoan.mdx
├── healthcare/     # 2 workflows - Healthcare operations
│   ├── assessPatient.mdx
│   └── dispenseMedication.mdx
├── marketing/      # 5 workflows - Marketing automation
│   ├── campaignCreation.mdx
│   ├── contentPipeline.mdx
│   ├── deliverabilityMonitoring.mdx
│   ├── emailWarming.mdx
│   └── socialContentPublishing.mdx
└── professional/   # 4 workflows - Professional services
    ├── conductAudit.mdx
    ├── investigateBreach.mdx
    ├── prepareAudit.mdx
    └── reviewContract.mdx
```

**Total:** 29 workflows across 6 categories

## Schema

The Velite schema for workflows includes:

### Required Fields
- **title** (string): Workflow name
- **description** (string): What the workflow does

### Optional Fields
- **trigger** (string): What triggers the workflow
- **steps** (array): Workflow steps with actions
- **conditions** (array): Conditional logic
- **error Handling** (object): Error handling strategy
- **timeout** (number): Max execution time
- **retries** (number): Retry attempts
- **schedule** (string): Cron schedule (if scheduled)
- **metadata**: Namespace and visibility
- **tags** (array): Categorization tags

## MDX File Example

```mdx
---
title: New User Onboarding
description: Automates the onboarding process for new users
trigger: user.created
steps:
  - action: send-welcome-email
    inputs:
      to: "{{user.email}}"
  - action: create-workspace
    inputs:
      userId: "{{user.id}}"
  - action: schedule-followup
    delay: 24h
errorHandling:
  strategy: retry
  maxRetries: 3
timeout: 300000
metadata:
  ns: workflows
  visibility: public
tags:
  - onboarding
  - automation
---

# New User Onboarding Workflow

Automated workflow triggered when a new user signs up.

## Steps

1. Send welcome email
2. Create default workspace
3. Schedule follow-up email (24h later)
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

## Examples

See **[examples/](../examples/)** for working TypeScript + MDX workflow examples:

- **payment-workflow.mdx** - Payment processing with retry logic and error handling
- **onboarding-workflow.mdx** - Complete customer onboarding with conditional steps

These examples demonstrate:
- ✅ Full TypeScript intellisense in MDX files
- ✅ Workflow definitions with steps, conditions, and error handling
- ✅ Integration with agents and functions
- ✅ Real-world business process automation

Run examples: `pnpm --filter examples dev`

## Related Documentation

- **Parent**: [Root CLAUDE.md](../CLAUDE.md) - Multi-repo management
- **Database**: [db/CLAUDE.md](../db/CLAUDE.md) - Database schema and sync
- **API**: [api/CLAUDE.md](../api/CLAUDE.md) - Webhook handler
- **Functions**: [functions/CLAUDE.md](../functions/CLAUDE.md) - Workflow actions
- **Workers**: [workers/CLAUDE.md](../workers/CLAUDE.md) - Workflow execution

---

**Last Updated**: 2025-10-03
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/workflows
