/**
 * Semantic Content Agency Example
 *
 * Demonstrates Business-as-Code using the semantic English API that integrates:
 * - 4th Grade English Grammar (Subject-Verb-Object)
 * - Schema.org (Things and Actions)
 * - GS1 EPCIS CBV (5 W's + How)
 *
 * Compare with: content-agency.ts (original method-based approach)
 */

import type { Business, OKR } from '../types/business'
import type { Service } from '../types/service'
import type { Agent, Human } from '../types/agent'
import type { Order, Customer } from '../types/order'
import {
  SemanticBusiness,
  type BusinessEvent,
  type Organization,
  type ServiceThing,
  type Person,
  businessToOrganization,
  serviceToSchemaThing
} from '../types/semantic-business'

// ═══════════════════════════════════════════════════════════
// Business Definition (Schema.org compatible)
// ═══════════════════════════════════════════════════════════

/**
 * AI Content Agency as Schema.org Organization
 */
const contentAgencyOrg: Organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://content.agency',
  name: 'AI Content Agency',
  legalName: 'AI Content Agency Inc.',
  foundingDate: '2024-01-01',
  employees: [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'alice',
      name: 'Alice Johnson',
      givenName: 'Alice',
      familyName: 'Johnson',
      email: 'alice@content.agency',
      jobTitle: 'CEO & Founder',
      worksFor: undefined // circular reference resolved at runtime
    } as Person,
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'contentbot-alpha',
      name: 'ContentBot Alpha',
      jobTitle: 'Senior AI Writer',
      worksFor: undefined
    } as Person
  ]
}

/**
 * SEO Blog Post Service (Schema.org Service)
 */
const blogPostService: ServiceThing = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'seo-blog-post',
  name: 'SEO Blog Post',
  description: 'Professional blog post optimized for search engines',
  serviceType: '27-3042.00', // ONET: Technical Writers
  provider: contentAgencyOrg,
  offers: [
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Standard Blog Post',
      price: 299,
      priceCurrency: 'USD',
      availability: 'InStock',
      priceSpecification: {
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: 'Outcome-based pricing',
        price: 299,
        priceCurrency: 'USD',
        valueAddedTaxIncluded: false
      }
    }
  ]
}

// ═══════════════════════════════════════════════════════════
// Traditional Business Definition (for comparison)
// ═══════════════════════════════════════════════════════════

const contentAgency: Business = {
  id: 'content-agency-001',
  name: 'AI Content Agency',
  vision: 'Empower every business with world-class content at software prices',
  mission: 'Deliver exceptional content through AI-powered workflows',

  storyBrand: {
    hero: 'Marketing teams struggling with content production',
    problem: 'Content creation is slow, expensive, and inconsistent',
    internalProblem: 'Feeling overwhelmed and behind competitors',
    externalProblem: 'Can\'t produce enough high-quality content',
    philosophicalProblem: 'Good content shouldn\'t be a luxury for big companies only',
    guide: 'AI Content Agency - Your expert content production partner',
    empathy: 'We understand the pressure to publish quality content consistently',
    authority: 'Powered by state-of-the-art AI trained on millions of articles',
    plan: ['Submit brief', 'Receive draft in 48h', 'Request revisions', 'Approve and publish'],
    solution: 'AI-powered content creation with guaranteed quality and fast turnaround',
    success: 'Marketing team publishes 10x more content, ranks higher in search, generates more leads',
    failure: 'Fall behind competitors, miss opportunities, lose market share',
    transformation: 'From overwhelmed → confident content powerhouse'
  },

  leanCanvas: {
    problem: ['Slow content production', 'High costs', 'Inconsistent quality'],
    customerSegments: ['B2B SaaS companies', 'E-commerce brands', 'Marketing agencies'],
    uniqueValueProposition: 'AI-powered content at 10x speed, 1/10th cost, guaranteed quality',
    solution: ['AI writing agents', 'Quality automation', '48-hour turnaround'],
    channels: ['Content marketing', 'SEO', 'Word of mouth', 'Partnerships'],
    revenueStreams: ['Subscription', 'Per-article pricing', 'Rush delivery'],
    costStructure: ['AI model costs', 'Human editors', 'Infrastructure', 'Marketing'],
    keyMetrics: ['MRR', 'Customer count', 'Quality score', 'NPS'],
    unfairAdvantage: 'Proprietary AI training on customer feedback'
  },

  okrs: [
    {
      objective: 'Establish market leadership in AI content services',
      keyResults: [
        {
          metric: 'MRR',
          current: 50_000,
          target: 250_000,
          unit: 'USD',
          progress: 0.20,
          confidence: 0.75,
          status: 'on-track'
        },
        {
          metric: 'Customer Count',
          current: 45,
          target: 200,
          unit: 'customers',
          progress: 0.225,
          confidence: 0.70,
          status: 'on-track'
        },
        {
          metric: 'NPS',
          current: 62,
          target: 80,
          unit: 'score',
          progress: 0.775,
          confidence: 0.85,
          status: 'on-track'
        },
        {
          metric: 'Quality Score',
          current: 8.3,
          target: 9.0,
          unit: 'score',
          progress: 0.92,
          confidence: 0.90,
          status: 'on-track'
        }
      ],
      owner: undefined, // Set below
      timeframe: {
        start: new Date('2025-10-01'),
        end: new Date('2025-12-31'),
        period: 'Q4 2025'
      },
      level: 'company',
      status: 'active',
      progress: 0.51, // Average of key results
      confidence: 0.80,
      health: 'green'
    }
  ],

  ceo: {
    type: 'human',
    id: 'alice',
    name: 'Alice Johnson',
    email: 'alice@content.agency',
    role: 'CEO & Founder',
    department: undefined,
    team: undefined,
    reports: [],
    status: 'active'
  },

  org: [],
  agents: [
    {
      type: 'agent',
      id: 'contentbot-alpha',
      name: 'ContentBot Alpha',
      role: 'Senior AI Writer',
      occupation: '27-3042.00',
      capabilities: ['writing', 'seo', 'research', 'editing'],
      model: 'gpt-4o',
      provider: 'openai',
      performance: {
        tasksCompleted: 847,
        averageQuality: 8.6,
        successRate: 0.96,
        onTimeDelivery: 0.98,
        costPerTask: 2.5,
        gdpvalScore: 0.82,
        improvementRate: 0.15
      },
      gdpvalScore: 0.82,
      capacity: {
        maxConcurrent: 10,
        maxPerDay: 50,
        maxPerWeek: 300
      },
      currentLoad: 3,
      status: 'active'
    }
  ],

  services: [],
  workflows: [],

  metrics: {
    revenue: {
      mrr: 50_000,
      arr: 600_000,
      growth: 0.25
    },
    customers: {
      total: 45,
      active: 42,
      churn: 0.02,
      nps: 62
    },
    quality: {
      averageScore: 8.3,
      passRate: 0.96,
      revisionRate: 0.15
    },
    efficiency: {
      avgTurnaround: 36,
      utilizationRate: 0.75,
      costPerDeliverable: 125
    }
  },

  performance: {
    health: 'green',
    okrProgress: 0.51,
    runway: 18,
    burnRate: 21_000
  },

  forecast: {
    revenue: [
      { period: 'Q1 2026', value: 100_000, confidence: 0.80 },
      { period: 'Q2 2026', value: 150_000, confidence: 0.70 },
      { period: 'Q3 2026', value: 200_000, confidence: 0.60 },
      { period: 'Q4 2026', value: 250_000, confidence: 0.50 }
    ],
    customers: [
      { period: 'Q1 2026', value: 75, confidence: 0.80 },
      { period: 'Q2 2026', value: 120, confidence: 0.70 },
      { period: 'Q3 2026', value: 165, confidence: 0.60 },
      { period: 'Q4 2026', value: 200, confidence: 0.50 }
    ]
  }
}

// ═══════════════════════════════════════════════════════════
// Semantic Business API Usage
// ═══════════════════════════════════════════════════════════

/**
 * Initialize semantic business API
 */
function initSemanticBusiness() {
  const events: BusinessEvent[] = []

  // Event handler that captures all business events
  const handleEvent = async (event: BusinessEvent) => {
    events.push(event)

    // Log event in natural language
    const who = typeof event.agent === 'string' ? event.agent : event.agent.name || event.agent.id
    const what = event['@type'].replace('Action', '')
    const objectType = event.object ? typeof event.object === 'string' ? event.object : event.object.type : 'something'

    console.log(`📝 Event: ${who} ${what}s ${objectType}`)

    if (event.epcis) {
      console.log(`   EPCIS: ${event.epcis.bizStep} → ${event.epcis.disposition}`)
    }

    // In production, this would:
    // - Store event in database
    // - Update metrics and OKRs
    // - Trigger downstream workflows
    // - Send notifications
  }

  const business = new SemanticBusiness(contentAgency, handleEvent)

  return { business, events }
}

// ═══════════════════════════════════════════════════════════
// Example 1: Order Fulfillment (Natural Language)
// ═══════════════════════════════════════════════════════════

async function exampleOrderFulfillment() {
  console.log('\n═══ Example 1: Order Fulfillment ═══\n')

  const { business, events } = initSemanticBusiness()

  // Customer creates order
  // Reads like: "Customer Bob creates order #123 at this time for business blog via the dashboard"
  await business
    .customer('bob@example.com')
    .creates.order('#123')
    .at(new Date())
    .for('business blog content')
    .via('dashboard')
    .step('commissioning') // EPCIS: Creating new order
    .state('active') // EPCIS: Order is active

  // Agent accepts work
  // Reads like: "Agent ContentBot Alpha receives order #123 at this time in production queue because of capacity availability"
  await business
    .agent('contentbot-alpha')
    .receives.work('#123')
    .at(new Date())
    .in('production-queue')
    .because('capacity-available')
    .step('accepting')
    .state('in_progress')

  // Agent completes work
  await business
    .agent('contentbot-alpha')
    .delivers.deliverable('#123-draft')
    .at(new Date())
    .to('bob@example.com')
    .step('delivering')
    .state('completed')

  // Customer receives deliverable
  await business
    .customer('bob@example.com')
    .receives.deliverable('#123-draft')
    .at(new Date())
    .via('email')
    .step('receiving')

  console.log(`\n✅ Captured ${events.length} business events`)
}

// ═══════════════════════════════════════════════════════════
// Example 2: Passive Voice (Thing-Centric View)
// ═══════════════════════════════════════════════════════════

async function examplePassiveVoice() {
  console.log('\n═══ Example 2: Passive Voice ═══\n')

  const { business, events } = initSemanticBusiness()

  // Order is created by customer
  // Passive voice: Focus on the order, not the customer
  await business
    .order('#456')
    .is.created
    .by('customer-carol')
    .at(new Date())
    .in('e-commerce-checkout')
    .step('commissioning')

  // Order is assigned to agent
  await business
    .order('#456')
    .is.assigned
    .by('system')
    .to('contentbot-alpha')
    .at(new Date())
    .because('best-match')
    .step('accepting')

  // Work is completed by agent
  await business
    .deliverable('#456-draft')
    .is.created
    .by('contentbot-alpha')
    .at(new Date())
    .in('production-environment')
    .step('delivering')
    .state('completed')

  console.log(`\n✅ Captured ${events.length} passive voice events`)
}

// ═══════════════════════════════════════════════════════════
// Example 3: Compound Sentences (Workflow)
// ═══════════════════════════════════════════════════════════

async function exampleCompoundSentences() {
  console.log('\n═══ Example 3: Compound Sentences ═══\n')

  const { business, events } = initSemanticBusiness()

  // Agent creates deliverable AND sends notification
  // Uses conjunction 'and' to chain actions
  await business
    .agent('contentbot-alpha')
    .creates.deliverable('#789-draft')
    .at(new Date())
    .and.sends.notification()
    .to('customer@example.com')
    .via('email')
    .with('draft-ready-template')
    .because('customer-expects-notification')

  // Customer receives deliverable BUT requests revision
  // Uses conjunction 'but' to show contrast
  await business
    .customer('customer@example.com')
    .receives.deliverable('#789-draft')
    .at(new Date())
    .but.sends.notification()
    .to('contentbot-alpha')
    .with('revision-request')
    .because('quality-below-threshold')

  console.log(`\n✅ Captured ${events.length} compound sentence events`)
}

// ═══════════════════════════════════════════════════════════
// Example 4: Questions and Queries
// ═══════════════════════════════════════════════════════════

async function exampleQuestions() {
  console.log('\n═══ Example 4: Questions and Queries ═══\n')

  const { business } = initSemanticBusiness()

  // Boolean queries
  console.log('Checking agent capacity...')
  const hasCapacity = await business.agent('contentbot-alpha').has.capacity.for('new-order')
  console.log(`  Has capacity: ${hasCapacity}`)

  // State checks
  console.log('\nChecking order status...')
  const isCompleted = await business.order('#123').is.completed
  console.log(`  Order completed: ${isCompleted}`)

  const isPending = await business.order('#123').is.pending
  console.log(`  Order pending: ${isPending}`)
}

// ═══════════════════════════════════════════════════════════
// Example 5: Full Business Scenario
// ═══════════════════════════════════════════════════════════

async function exampleFullScenario() {
  console.log('\n═══ Example 5: Full Business Scenario ═══\n')

  const { business, events } = initSemanticBusiness()

  console.log('📋 Scenario: Customer orders blog post, agent writes it, customer approves\n')

  // 1. Customer creates order
  console.log('Step 1: Customer creates order')
  await business
    .customer('dave@startup.com')
    .creates.order('#2025-001')
    .at(new Date())
    .for('AI trends blog post')
    .via('web-app')
    .with({ topic: 'AI Trends 2026', words: 1500, tone: 'professional' })
    .step('commissioning')
    .state('active')

  // 2. System assigns to best agent
  console.log('Step 2: System assigns to agent')
  await business
    .system
    .assigns.work('#2025-001')
    .to('contentbot-alpha')
    .at(new Date())
    .because('highest-quality-score')
    .step('accepting')

  // 3. Agent accepts work
  console.log('Step 3: Agent accepts work')
  await business
    .agent('contentbot-alpha')
    .receives.work('#2025-001')
    .at(new Date())
    .in('production-queue')
    .step('picking')
    .state('in_progress')

  // 4. Agent creates deliverable
  console.log('Step 4: Agent creates deliverable')
  await business
    .agent('contentbot-alpha')
    .creates.deliverable('#2025-001-draft')
    .at(new Date())
    .in('production-environment')
    .using('gpt-4o-model')
    .step('delivering')

  // 5. System checks quality
  console.log('Step 5: System checks quality')
  await business
    .system
    .checks.quality('#2025-001-draft')
    .at(new Date())
    .via('quality-automation')
    .step('inspecting')

  // 6. Agent delivers to customer
  console.log('Step 6: Agent delivers to customer')
  await business
    .agent('contentbot-alpha')
    .delivers.deliverable('#2025-001-draft')
    .at(new Date())
    .to('dave@startup.com')
    .via('email')
    .with('delivery-notification')
    .step('delivering')
    .state('completed')

  // 7. Customer receives and approves
  console.log('Step 7: Customer approves')
  await business
    .customer('dave@startup.com')
    .receives.deliverable('#2025-001-draft')
    .at(new Date())
    .and.sends.notification()
    .to('contentbot-alpha')
    .with('approval')
    .because('quality-exceeds-expectations')
    .step('retail_selling') // Final delivery
    .state('sold')

  console.log(`\n✅ Full scenario completed with ${events.length} events`)
  console.log('\nAll events follow Schema.org + EPCIS standards')
  console.log('Ready for semantic search, knowledge graphs, and analytics')
}

// ═══════════════════════════════════════════════════════════
// Comparison: Before vs After
// ═══════════════════════════════════════════════════════════

function showComparison() {
  console.log('\n═══ API Evolution Comparison ═══\n')

  console.log('━━━ BEFORE (Traditional) ━━━')
  console.log(`
business.addEventListener('order.created', async (event, ctx) => {
  const order = event.order
  const agent = findBestAgent(agents, order.requirements)
  await ctx.db.update('order', order.id, { assignedTo: agent.id })
  await ctx.email.send(order.customer.email, 'Order Confirmed', ...)
})
`)

  console.log('━━━ MIDDLE (Method-Based) ━━━')
  console.log(`
business.on.order.created(async (event, ctx) => {
  const agent = findBestAgent(agents, event.order.requirements)
  await ctx.db.update('order', event.order.id, { assignedTo: agent.id })
  await ctx.email.send(event.order.customer.email, 'Order Confirmed', ...)
})
`)

  console.log('━━━ AFTER (Semantic English) ━━━')
  console.log(`
// Natural language business operations
await business
  .customer('bob@example.com')
  .creates.order('#123')
  .at(new Date())
  .for('business blog content')
  .via('dashboard')

// Schema.org + EPCIS compatible
// Ready for semantic web, knowledge graphs
// Self-documenting and type-safe
`)

  console.log('\n✨ Benefits:')
  console.log('  - Reads like natural English')
  console.log('  - Schema.org vocabulary (standard semantics)')
  console.log('  - EPCIS context (Who, What, When, Where, Why, How)')
  console.log('  - Type-safe (TypeScript validates grammar)')
  console.log('  - 40-60% fewer tokens')
  console.log('  - Self-documenting code')
  console.log('  - Semantic web compatible')
}

// ═══════════════════════════════════════════════════════════
// Run Examples
// ═══════════════════════════════════════════════════════════

async function main() {
  console.log('🎯 Semantic Business-as-Code Examples\n')
  console.log('Integrating:')
  console.log('  - English Grammar (Subject-Verb-Object)')
  console.log('  - Schema.org (Things and Actions)')
  console.log('  - GS1 EPCIS CBV (5 W\'s + How)')
  console.log()

  await exampleOrderFulfillment()
  await examplePassiveVoice()
  await exampleCompoundSentences()
  await exampleQuestions()
  await exampleFullScenario()

  showComparison()

  console.log('\n✅ All examples completed successfully\n')
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

// ═══════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════

export {
  contentAgency,
  contentAgencyOrg,
  blogPostService,
  initSemanticBusiness,
  exampleOrderFulfillment,
  examplePassiveVoice,
  exampleCompoundSentences,
  exampleQuestions,
  exampleFullScenario,
  showComparison
}
