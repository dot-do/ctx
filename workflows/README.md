# Workflows Repository

**Workflow Orchestration Patterns as Code** - MDX files with Zod validation, synced to PostgreSQL

## Overview

This repository contains **29 production workflow definitions** organized into six categories:

```
workflows/
├── customer/       # 6 workflows - Customer lifecycle and engagement
├── development/    # 5 workflows - Software development lifecycle
├── ecommerce/      # 5 workflows - Online commerce operations
├── finance/        # 3 workflows - Financial processes
├── healthcare/     # 2 workflows - Healthcare operations
├── marketing/      # 5 workflows - Marketing automation
└── professional/   # 4 workflows - Professional services
```

**Technology Stack:**
- **MDX** - Markdown + JSX for workflow definitions
- **Velite** - Build-time validation with Zod schemas
- **Zod** - Type-safe schema validation
- **PostgreSQL** - Persistent storage via [repo.do](https://repo.do) GitHub App

## Repository Structure

### Customer Workflows (`customer/`)

Customer lifecycle and engagement automation:

| Workflow | Description | Trigger | Steps |
|----------|-------------|---------|-------|
| **domainOnboarding** | Onboard new domain to platform | domain.created | Verify ownership, configure DNS, setup SSL |
| **leadEnrichment** | Enrich lead data from multiple sources | lead.created | Apollo.io lookup, company data, scoring |
| **onboardCustomer** | Complete customer onboarding flow | customer.signed_up | Welcome email, create workspace, schedule training |
| **referralRewardDistribution** | Distribute rewards for successful referrals | referral.completed | Calculate reward, create credit, notify users |
| **userOnboarding** | Onboard new user to application | user.created | Send welcome, setup profile, assign tutorials |
| **waitlistInvitation** | Send invitations to waitlist users | manual/scheduled | Select batch, send invites, track responses |

### Development Workflows (`development/`)

Software development lifecycle automation:

| Workflow | Description | Trigger | Steps |
|----------|-------------|---------|-------|
| **deployApplication** | Deploy application to production | deployment.requested | Run tests, build, deploy, verify health |
| **fixBug** | Fix bug from issue to deployment | bug.reported | Triage, assign, fix, test, deploy, close |
| **releaseVersion** | Release new version with changelog | release.scheduled | Generate changelog, create tag, deploy, announce |
| **reviewPullRequest** | Code review and merge process | pr.opened | Assign reviewers, run checks, merge, cleanup |
| **runTests** | Execute test suite with reporting | commit.pushed | Unit tests, integration tests, report results |

### E-commerce Workflows (`ecommerce/`)

Online commerce operations:

| Workflow | Description | Trigger | Steps |
|----------|-------------|---------|-------|
| **handleReturn** | Process product return and refund | return.requested | Verify eligibility, approve, refund, update inventory |
| **manageInventory** | Automated inventory management | scheduled/low_stock | Check levels, create PO, update suppliers, track shipment |
| **processOrder** | Process customer order end-to-end | order.created | Validate, charge, fulfill, ship, track |
| **processPayment** | Secure payment processing with retries | payment.initiated | Validate, process, handle failure, confirm |
| **trackShipment** | Track shipment and update customer | shipment.created | Monitor carrier, send updates, handle delivery |

### Finance Workflows (`finance/`)

Financial processes and analysis:

| Workflow | Description | Trigger | Steps |
|----------|-------------|---------|-------|
| **analyzeInvestment** | Analyze investment opportunities | investment.proposed | Gather data, assess risk, calculate ROI, recommend |
| **generateTaxReturn** | Generate tax return documents | tax_season/manual | Collect data, calculate, generate forms, file |
| **processLoan** | Process loan application | loan.submitted | Verify income, credit check, underwrite, approve/deny |

### Healthcare Workflows (`healthcare/`)

Healthcare operations:

| Workflow | Description | Trigger | Steps |
|----------|-------------|---------|-------|
| **assessPatient** | Triage and assess patient | patient.arrived | Collect vitals, assess symptoms, prioritize, route |
| **dispenseMedication** | Dispense medication safely | prescription.received | Verify, check interactions, dispense, counsel, log |

### Marketing Workflows (`marketing/`)

Marketing automation and campaigns:

| Workflow | Description | Trigger | Steps |
|----------|-------------|---------|-------|
| **campaignCreation** | Create and launch marketing campaign | manual/scheduled | Define audience, create content, schedule, launch |
| **contentPipeline** | Content creation and publishing pipeline | content.requested | Brief, draft, review, approve, publish, promote |
| **deliverabilityMonitoring** | Monitor email deliverability metrics | scheduled/hourly | Check bounces, spam complaints, reputation, alert |
| **emailWarming** | Warm up new email domain/IP | domain.added | Gradual volume increase, monitor metrics, adjust |
| **socialContentPublishing** | Publish content to social platforms | content.approved | Schedule, publish, monitor engagement, report |

### Professional Workflows (`professional/`)

Professional services automation:

| Workflow | Description | Trigger | Steps |
|----------|-------------|---------|-------|
| **conductAudit** | Conduct compliance audit | audit.scheduled | Plan, gather evidence, analyze, report, follow-up |
| **investigateBreach** | Investigate security breach | breach.detected | Contain, analyze, remediate, report, improve |
| **prepareAudit** | Prepare for external audit | audit.announced | Gather docs, review compliance, brief team, schedule |
| **reviewContract** | Review and approve contracts | contract.submitted | Legal review, risk assessment, negotiate, approve/reject |

## Workflow Schema

All workflow MDX files follow this structure:

```mdx
---
title: Workflow Name
description: What the workflow does
trigger: event.name
steps:
  - action: step-action
    inputs:
      param: value
    conditions:
      - if: condition
        then: action
  - action: next-step
    delay: 1h
    retry: 3
errorHandling:
  strategy: retry
  maxRetries: 3
  fallback: notify-admin
timeout: 300000
schedule: "0 9 * * *"
metadata:
  ns: workflow
  visibility: public
tags:
  - category
  - function
---

# Workflow Name

Workflow documentation and implementation details...

## Trigger

When this workflow is triggered and by what event.

## Steps

1. Step 1: Description
2. Step 2: Description
3. Step 3: Description

## Error Handling

How errors are handled and retried.
```

### Required Fields
- `title` - Workflow display name
- `description` - Brief description of workflow purpose

### Optional Fields
- `trigger` - Event that triggers workflow (e.g., "user.created", "scheduled")
- `steps` - Array of workflow steps with actions, inputs, conditions
- `errorHandling` - Error handling strategy (retry, fallback, alert)
- `timeout` - Max execution time in milliseconds
- `schedule` - Cron expression for scheduled workflows
- `conditions` - Conditional logic for workflow paths
- `retries` - Number of retry attempts
- `metadata` - Namespace and visibility settings
- `tags` - Categorization tags

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build and validate all workflow MDX files
pnpm build

# Watch mode for development
pnpm dev

# Type checking
pnpm check-types
```

### Creating New Workflows

1. **Choose category:** customer, development, ecommerce, finance, healthcare, marketing, professional
2. **Create MDX file:**
   ```bash
   # Workflow file
   touch customer/newWorkflow.mdx
   ```

3. **Add workflow definition** with required frontmatter and steps

4. **Build and validate:**
   ```bash
   pnpm build
   ```

5. **Commit and push** - Triggers automatic sync to database via repo.do webhook

### Naming Conventions

- **Workflows:** `camelCase.mdx` (e.g., `processOrder.mdx`, `onboardCustomer.mdx`)

## Workflow Categories

**Customer** - Customer lifecycle, onboarding, engagement
**Development** - SDLC, CI/CD, code review, testing
**E-commerce** - Order processing, payments, inventory, shipping
**Finance** - Investments, loans, tax preparation
**Healthcare** - Patient care, medication dispensing
**Marketing** - Campaigns, content, email, social media
**Professional** - Audits, contracts, compliance, security

## Database Synchronization

Workflow MDX files automatically sync to PostgreSQL via the **repo.do** GitHub App webhook:

**Workflow:**
1. Commit and push MDX file changes
2. GitHub webhook triggers repo.do
3. Velite validates MDX against Zod schema
4. Valid workflows inserted/updated in `things` table
5. Invalid workflows logged as errors

**Database Schema:**
```sql
CREATE TABLE things (
  ulid TEXT PRIMARY KEY,
  ns TEXT NOT NULL,           -- 'workflow'
  id TEXT NOT NULL,           -- workflow filename (without .mdx)
  type TEXT NOT NULL,         -- 'Workflow'
  data JSONB NOT NULL,        -- full workflow metadata
  content TEXT,               -- MDX content
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  UNIQUE(ns, id)
);
```

**Query workflows:**
```sql
-- All workflows
SELECT * FROM things WHERE ns = 'workflow' AND type = 'Workflow';

-- By category (using tags)
SELECT * FROM things WHERE ns = 'workflow'
  AND data->'tags' ? 'ecommerce';

-- By trigger
SELECT * FROM things WHERE ns = 'workflow'
  AND data->>'trigger' = 'order.created';
```

## Related Repositories

- **[examples/](../examples/)** - Business-as-Code examples using workflows
- **[agents/](../agents/)** - AI agents that can invoke workflows
- **[functions/](../functions/)** - Functions used in workflow steps
- **[workers/](../workers/)** - Workflow runtime and execution services
- **[db/](../db/)** - Database schema and migrations

## Integration with Agents and Functions

Workflows orchestrate multiple functions and can be triggered by agents:

```typescript
// Agent triggers workflow
const agent = await agents.load('sales-agent')
const result = await agent.executeWorkflow('processOrder', {
  orderId: '12345',
  customerId: 'cust_789'
})

// Workflow calls functions
workflow.step('validate-order', async () => {
  const validation = await functions.call('validateOrder', { orderId })
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '))
  }
})

workflow.step('process-payment', async () => {
  const payment = await functions.call('processPayment', {
    amount: order.total,
    customerId: order.customerId
  })
  return payment
})
```

## Testing

```bash
# Run all tests
pnpm test

# Test specific workflow
pnpm test customer/processOrder.mdx

# Integration tests
pnpm test:integration
```

## Contributing

1. Create feature branch: `git checkout -b feature/add-new-workflow`
2. Add/modify workflow MDX files
3. Run `pnpm build` to validate
4. Commit changes: `git commit -m "feat: Add new workflow"`
5. Push and create PR: `git push origin feature/add-new-workflow`

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Developer guidelines and architecture
- **[Root CLAUDE.md](../CLAUDE.md)** - Multi-repo project management
- **[examples/workflows/README.md](../examples/workflows/README.md)** - Usage examples

---

**Total Workflows:** 29 workflows across 6 categories
**Last Updated:** 2025-10-04
**Repository:** https://github.com/dot-do/workflows
