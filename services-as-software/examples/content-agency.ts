/**
 * Complete Services-as-Software Example
 *
 * AI Content Agency - Full implementation showing how all types work together
 *
 * This example demonstrates:
 * - Business definition with StoryBrand and OKRs
 * - Service catalog mapped to ONET occupations
 * - AI agent workforce with performance tracking
 * - Event-driven order fulfillment
 * - Quality assurance and SLA management
 * - Pricing models and payment processing
 * - Customer relationship management
 */

import type { Business, OKR } from '../types/business'
import type { Service } from '../types/service'
import type { Agent, Human, Team } from '../types/agent'
import type { Order, Customer } from '../types/order'
import type { EventHandler, ScheduledHandler } from '../types/workflow'

// ═══════════════════════════════════════════════════════════
// BUSINESS DEFINITION
// ═══════════════════════════════════════════════════════════

export const contentAgency: Business = {
  // ═══ Identity ═══
  id: 'content-agency-ai',
  name: 'AI Content Agency',
  description: 'World-class content creation delivered by AI agents',
  domain: 'content.ai',
  industry: '541810', // NAICS: Advertising Agencies

  // ═══ Strategic Vision ═══
  vision: 'Empower every business with world-class content at software prices',
  mission: 'Deliver exceptional content faster, cheaper, and better than human agencies',
  values: [
    'Quality First - Every piece exceeds expectations',
    'Speed Matters - Deliver in days, not weeks',
    'Transparency - Clear pricing, clear timelines, clear communication',
    'AI-Native - Leverage AI capabilities, human oversight where it matters'
  ],

  // ═══ StoryBrand Framework ═══
  storyBrand: {
    hero: 'Marketing teams and content creators struggling with content production',
    problem: 'Content creation is slow, expensive, and inconsistent',
    guide: 'AI Content Agency - Your expert content production partner',
    solution: 'AI-powered content creation with guaranteed quality and turnaround',
    callToAction: 'Start Your First Project',
    success: 'Consistent high-quality content that drives engagement and growth',
    failure: 'Falling behind competitors due to slow, expensive content production',
    transformation: 'From content bottleneck to content powerhouse'
  },

  // ═══ OKRs (Quarterly) ═══
  okrs: [
    // Company-level OKR
    {
      objective: 'Establish market leadership in AI content services',
      keyResults: [
        {
          metric: 'Monthly Recurring Revenue',
          current: 50_000,
          target: 250_000,
          unit: 'USD',
          progress: 20,
          trend: 'up',
          confidence: 0.7,
          formula: 'SUM(subscriptions.amount)',
          source: 'billing_system'
        },
        {
          metric: 'Customer Count',
          current: 45,
          target: 200,
          unit: 'customers',
          progress: 22.5,
          trend: 'up',
          confidence: 0.75,
          formula: 'COUNT(DISTINCT customers WHERE status = active)',
          source: 'customer_db'
        },
        {
          metric: 'Net Promoter Score',
          current: 62,
          target: 80,
          unit: 'score',
          progress: 77.5,
          trend: 'up',
          confidence: 0.85
        },
        {
          metric: 'Average Quality Score',
          current: 8.3,
          target: 9.0,
          unit: 'score',
          progress: 92,
          trend: 'up',
          confidence: 0.9
        }
      ],
      owner: {} as Human, // CEO
      timeframe: 'quarter',
      startDate: new Date('2025-10-01'),
      endDate: new Date('2025-12-31'),
      level: 'company',
      status: 'active',
      progress: 53,
      confidence: 0.78,
      health: 'green',
      history: [],
      lastUpdated: new Date()
    }
  ],

  currentQuarter: {
    year: 2025,
    quarter: 4,
    startDate: new Date('2025-10-01'),
    endDate: new Date('2025-12-31'),
    theme: 'Scale & Quality'
  },
  currentYear: 2025,

  // ═══ Organization ═══
  ceo: {
    type: 'human',
    id: 'ceo-sarah',
    name: 'Sarah Chen',
    email: 'sarah@content.ai',
    role: 'Chief Executive Officer',
    title: 'CEO & Founder',
    capabilities: ['Strategy', 'Leadership', 'Content Marketing', 'AI Product'],
    seniority: 'executive',
    manages: [], // Department heads
    workload: 0.8,
    availability: {
      status: 'available',
      schedule: {
        timezone: 'America/Los_Angeles',
        workingHours: {
          monday: [{ start: '09:00', end: '18:00' }],
          tuesday: [{ start: '09:00', end: '18:00' }],
          wednesday: [{ start: '09:00', end: '18:00' }],
          thursday: [{ start: '09:00', end: '18:00' }],
          friday: [{ start: '09:00', end: '17:00' }],
          saturday: [],
          sunday: []
        }
      }
    },
    timezone: 'America/Los_Angeles',
    preferredChannel: 'email',
    notifications: {
      email: true,
      slack: true,
      sms: false,
      push: true,
      frequency: 'realtime'
    },
    status: 'active',
    createdAt: new Date('2025-01-01'),
    lastActiveAt: new Date()
  },

  org: [], // Departments
  agents: [], // Defined below
  humans: [], // Human team members

  // ═══ Services ═══
  services: [], // Defined below

  // ═══ Business Model ═══
  revenue: {
    streams: [
      {
        name: 'Subscription Plans',
        type: 'subscription',
        amount: 50_000,
        percentage: 60,
        growth: 0.15
      },
      {
        name: 'One-Time Projects',
        type: 'service',
        amount: 25_000,
        percentage: 30,
        growth: 0.10
      },
      {
        name: 'Rush Delivery',
        type: 'service',
        amount: 8_333,
        percentage: 10,
        growth: 0.20
      }
    ],
    totalMRR: 50_000,
    totalARR: 600_000,
    growth: {
      mrr: 50_000,
      arr: 600_000,
      mrrGrowth: 0.12,
      arrGrowth: 0.15,
      churnRate: 0.03,
      expansionRevenue: 5_000,
      netRevenueRetention: 1.07
    }
  },

  costs: {
    fixed: [
      { name: 'Infrastructure (Cloudflare)', category: 'infrastructure', amount: 500, frequency: 'monthly' },
      { name: 'AI API Costs (OpenAI)', category: 'engineering', amount: 3_000, frequency: 'monthly' },
      { name: 'Database (Neon)', category: 'infrastructure', amount: 100, frequency: 'monthly' },
      { name: 'Team Salaries', category: 'operations', amount: 15_000, frequency: 'monthly' }
    ],
    variable: [
      { name: 'AI Generation', category: 'engineering', costPerUnit: 0.02, units: 100_000, total: 2_000 },
      { name: 'Quality Tools', category: 'operations', costPerUnit: 0.50, units: 1_000, total: 500 }
    ],
    totalMonthly: 21_100,
    totalAnnual: 253_200,
    breakdown: {
      engineering: 5_000,
      sales: 2_000,
      marketing: 3_000,
      operations: 8_600,
      infrastructure: 2_500,
      other: 0
    }
  },

  unitEconomics: {
    cac: 150, // Customer Acquisition Cost
    ltv: 1_200, // Lifetime Value
    cacLtvRatio: 8.0, // Excellent!
    paybackPeriod: 2, // 2 months
    grossMargin: 0.70,
    netMargin: 0.42
  },

  // ═══ Operations ═══
  workflows: [],
  events: [],
  schedules: [],

  // ═══ Integrations ═══
  integrations: [
    {
      id: 'stripe',
      type: 'stripe',
      name: 'Stripe Payments',
      config: { apiVersion: '2024-10-01' },
      status: 'active'
    },
    {
      id: 'slack',
      type: 'slack',
      name: 'Slack Notifications',
      config: { workspace: 'content-ai' },
      status: 'active'
    }
  ],

  // ═══ Metrics ═══
  metrics: {
    // Growth
    users: 45,
    activeUsers: 38,
    newUsers: 12,
    churnedUsers: 2,

    // Revenue
    mrr: 50_000,
    arr: 600_000,
    revenue: 83_333,

    // Sales
    leads: 156,
    opportunities: 42,
    deals: 12,
    pipeline: 125_000,

    // Product
    engagement: 0.84,
    retention: 0.89,
    nps: 62,

    // Operations
    uptime: 0.998,
    errorRate: 0.001,
    latency: 145,

    // Financial
    burnRate: 21_100,
    runway: 18,
    cashBalance: 380_000,

    // Team
    teamSize: 23,
    agentCount: 20,
    humanCount: 3,

    period: 'month',
    date: new Date('2025-10-01')
  },

  performance: {
    health: 'green',
    score: 87,
    okrProgress: 53,
    okrsOnTrack: 3,
    okrsAtRisk: 1,
    okrsMissed: 0,
    agentUtilization: 0.72,
    humanUtilization: 0.85,
    costPerOrder: 45,
    revenuePerAgent: 2_500,
    customerSatisfaction: 8.7,
    nps: 62,
    qualityScore: 8.3,
    avgResponseTime: 120, // 2 minutes
    avgFulfillmentTime: 36 * 60 * 60 * 1000, // 36 hours
    onTimeDelivery: 0.94
  },

  forecast: {
    timeframe: 'quarter',
    periods: 3,
    predictions: {
      revenue: [100_000, 125_000, 156_000],
      costs: [25_000, 28_000, 32_000],
      profit: [75_000, 97_000, 124_000],
      users: [60, 80, 105],
      churn: [0.03, 0.025, 0.02]
    },
    confidence: 0.75,
    assumptions: [
      '15% month-over-month revenue growth',
      'Churn improves to 2% as product matures',
      'Cost growth limited to 12% through automation',
      'Sales team adds 20 new customers per month'
    ],
    risks: [
      'Competition from established agencies',
      'AI cost increases',
      'Quality issues at scale'
    ]
  },

  status: 'operating',
  createdAt: new Date('2025-01-01'),
  launchedAt: new Date('2025-03-15'),
  version: '2.0.0'
}

// ═══════════════════════════════════════════════════════════
// SERVICE CATALOG
// ═══════════════════════════════════════════════════════════

export const blogPostService: Service = {
  // ═══ Identity ═══
  id: 'blog-post-seo',
  name: 'SEO Blog Post',
  description: '1,500-2,500 word SEO-optimized blog post with research, writing, and optimization',
  category: 'content',

  // ═══ ONET Mapping ═══
  occupation: '27-3042.00', // Technical Writers
  occupationTitle: 'Technical Writers',
  tasks: [
    'Organize material and complete writing assignment according to set standards',
    'Develop or maintain content using hypertext markup language',
    'Conduct research to establish technical specifications',
    'Review published materials and recommend revisions'
  ],
  skills: ['Writing', 'Reading Comprehension', 'Active Listening', 'Critical Thinking'],
  knowledge: ['English Language', 'Communications and Media', 'Customer Service'],
  tools: ['Grammarly', 'Hemingway', 'Surfer SEO', 'Copyscape'],

  // ═══ AI Capability ═══
  gdpvalScore: 0.82, // High AI capability for content writing
  aiReady: true,
  humanBackup: true, // Humans available for complex topics

  // ═══ Deliverable ═══
  deliverable: {
    type: 'document',
    format: 'markdown',
    size: { min: 1500, max: 2500, unit: 'words' },
    specifications: [
      { name: 'Title', description: 'Engaging, SEO-optimized title', required: true },
      { name: 'Meta Description', description: '150-160 character search snippet', required: true },
      { name: 'Keywords', description: 'Target keywords (3-5)', required: true },
      { name: 'Headers', description: 'H2/H3 structure with keywords', required: true },
      { name: 'Internal Links', description: '3-5 internal links to related content', required: false },
      { name: 'External Links', description: 'Authoritative sources', required: false },
      { name: 'Images', description: 'Featured image + 2-3 inline images', required: false }
    ]
  },
  examples: [
    'https://content.ai/examples/tech-blog',
    'https://content.ai/examples/saas-blog'
  ],

  // ═══ Timeline ═══
  turnaroundTime: { value: 48, unit: 'hours' },
  minimumTime: { value: 24, unit: 'hours' },
  rushAvailable: true,

  // ═══ Quality ═══
  quality: {
    criteria: [
      {
        id: 'seo',
        name: 'SEO Score',
        description: 'Surfer SEO content score',
        weight: 0.3,
        evaluator: 'automated-test',
        tool: 'Surfer SEO',
        passingScore: 75
      },
      {
        id: 'readability',
        name: 'Readability',
        description: 'Hemingway grade level',
        weight: 0.2,
        evaluator: 'automated-test',
        tool: 'Hemingway',
        passingScore: 8
      },
      {
        id: 'originality',
        name: 'Originality',
        description: 'Copyscape plagiarism check',
        weight: 0.3,
        evaluator: 'automated-test',
        tool: 'Copyscape',
        passingScore: 95
      },
      {
        id: 'relevance',
        name: 'Topic Relevance',
        description: 'AI evaluation of content alignment with brief',
        weight: 0.2,
        evaluator: 'ai',
        passingScore: 8.0
      }
    ],
    minimumScore: 8.0,
    reviewProcess: 'automated',
    acceptanceThreshold: 0.80
  },

  guarantees: [
    {
      type: 'quality',
      description: 'Minimum 8/10 quality score or free revision',
      remedy: 'Free revision or full refund',
      limitations: ['Must request within 7 days of delivery']
    },
    {
      type: 'timeline',
      description: 'Delivery within 48 hours or 20% refund',
      remedy: '20% refund for each 24 hours delayed',
      limitations: ['Rush orders excluded']
    },
    {
      type: 'originality',
      description: '100% original content passing Copyscape',
      remedy: 'Full refund if plagiarism detected',
      limitations: ['Must report within 30 days']
    }
  ],

  sla: {
    firstResponseTime: { value: 2, unit: 'hours' },
    resolutionTime: { value: 48, unit: 'hours' },
    uptime: 0.99,
    supportHours: {
      timezone: 'America/Los_Angeles',
      schedule: {
        monday: [{ start: '06:00', end: '18:00' }],
        tuesday: [{ start: '06:00', end: '18:00' }],
        wednesday: [{ start: '06:00', end: '18:00' }],
        thursday: [{ start: '06:00', end: '18:00' }],
        friday: [{ start: '06:00', end: '18:00' }],
        saturday: [{ start: '10:00', end: '14:00' }],
        sunday: []
      }
    },
    qualityGuarantee: 8.0,
    revisionLimit: 2,
    revisionTurnaround: { value: 24, unit: 'hours' },
    refundPolicy: {
      conditions: [
        { condition: 'Quality score < 6.0', refundAmount: 'full' },
        { condition: 'Delivered > 72 hours late', refundAmount: 'partial', partialPercentage: 50 },
        { condition: 'Plagiarism detected', refundAmount: 'full' }
      ],
      process: 'Email support@content.ai within 7 days',
      turnaround: { value: 3, unit: 'days' }
    },
    reportingFrequency: 'daily'
  },

  // ═══ Pricing ═══
  pricing: {
    type: 'outcome-based',
    basePrice: 299,
    description: 'Per blog post delivered',
    qualityTiers: [
      { minScore: 9.0, multiplier: 1.2, label: 'Premium' },
      { minScore: 8.0, multiplier: 1.0, label: 'Standard' },
      { minScore: 7.0, multiplier: 0.8, label: 'Basic' }
    ]
  },

  discounts: [
    {
      id: 'bulk-10',
      type: 'bulk',
      amount: 0.10,
      conditions: [{ field: 'quantity', operator: '>=', value: 10 }],
      currentUses: 0
    },
    {
      id: 'subscription',
      type: 'subscription',
      amount: 0.15,
      conditions: [{ field: 'customerType', operator: '==', value: 'subscriber' }],
      currentUses: 0
    }
  ],

  // ═══ Fulfillment ═══
  fulfillmentWorkflow: {} as any, // Defined in workflows section
  assignedAgents: [], // Defined below
  capacity: {
    maxConcurrentOrders: 50,
    maxOrdersPerDay: 25,
    maxOrdersPerMonth: 600,
    currentLoad: 0.68,
    availableSlots: 16,
    estimatedWaitTime: { value: 2, unit: 'hours' }
  },

  // ═══ Requirements ═══
  briefTemplate: {
    topic: { type: 'string', required: true },
    keywords: { type: 'array', required: true, minItems: 3, maxItems: 5 },
    targetAudience: { type: 'string', required: true },
    tone: { type: 'enum', values: ['professional', 'casual', 'technical'], required: true },
    references: { type: 'array', required: false }
  },
  requiredFiles: [
    {
      type: 'brand-guide',
      formats: ['pdf', 'docx'],
      maxSize: 10,
      required: false,
      description: 'Brand voice and style guidelines'
    }
  ],

  addOns: [
    {
      id: 'rush-24h',
      name: '24-Hour Rush Delivery',
      description: 'Guaranteed delivery in 24 hours',
      price: 149,
      turnaroundImpact: { value: -24, unit: 'hours' }
    },
    {
      id: 'extra-revision',
      name: 'Extra Revision Round',
      description: 'One additional revision beyond the 2 included',
      price: 49
    }
  ],

  status: 'active',
  createdAt: new Date('2025-01-15'),
  updatedAt: new Date('2025-10-01')
}

// ═══════════════════════════════════════════════════════════
// AI AGENT WORKFORCE
// ═══════════════════════════════════════════════════════════

export const writerAgent: Agent = {
  type: 'agent',
  id: 'writer-gpt4-01',
  name: 'ContentBot Alpha',
  role: 'Senior Content Writer',
  description: 'Expert AI content writer specializing in SEO blog posts',

  // ═══ ONET Mapping ═══
  occupation: '27-3042.00', // Technical Writers
  capabilities: [
    'SEO Content Writing',
    'Research & Analysis',
    'Keyword Optimization',
    'Audience Targeting',
    'Fact Checking',
    'Citation Management'
  ],
  tools: ['GPT-4', 'Web Search', 'Grammarly API', 'Hemingway API'],

  // ═══ AI Configuration ═══
  model: 'gpt-4o',
  provider: 'openai',
  systemPrompt: `You are an expert content writer specializing in SEO-optimized blog posts.

Your responsibilities:
1. Research the topic thoroughly using provided sources
2. Write engaging, informative content that ranks well in search
3. Follow SEO best practices (keyword density, header structure, meta descriptions)
4. Match the client's brand voice and tone
5. Ensure 100% original content
6. Include proper citations and links

Quality standards:
- Surfer SEO score: 75+
- Hemingway grade level: 8 or below
- Copyscape: 95%+ originality
- Topic relevance: 8/10+

Always deliver content that exceeds expectations.`,
  temperature: 0.7,
  maxTokens: 4000,

  // ═══ Performance ═══
  performance: {
    tasksCompleted: 847,
    tasksPerDay: 12,
    averageTaskDuration: 0.75, // hours

    averageQuality: 8.6,
    qualityTrend: 'improving',
    passRate: 0.94,
    revisionRate: 0.12,

    successRate: 0.96,
    errorRate: 0.02,
    uptimePct: 0.998,

    averageSpeed: 1.33, // tasks per hour
    onTimeDelivery: 0.98,

    costPerTask: 2.50,
    costPerHour: 3.33,
    totalCost: 2_118,

    gdpvalScore: 0.82,
    gdpvalHistory: [
      {
        date: new Date('2025-09-01'),
        score: 0.82,
        tasks: [
          { taskId: 'write-blog', taskName: 'Write Blog Post', score: 0.85, humanBaseline: 0.90 },
          { taskId: 'seo-optimize', taskName: 'SEO Optimization', score: 0.88, humanBaseline: 0.85 },
          { taskId: 'fact-check', taskName: 'Fact Checking', score: 0.75, humanBaseline: 0.92 }
        ],
        overall: {
          tasksEvaluated: 3,
          tasksPassed: 3,
          averageScore: 0.83
        }
      }
    ],

    improvementRate: 0.02, // 2% per month
    adaptability: 0.88,

    period: 'month',
    updatedAt: new Date()
  },

  gdpvalScore: 0.82,

  // ═══ Capacity ═══
  capacity: {
    maxConcurrentTasks: 5,
    maxTasksPerDay: 15,
    maxTasksPerMonth: 400,
    currentTasks: 3,
    availableSlots: 2
  },
  currentLoad: 0.60,
  availability: {
    status: 'available'
  },

  // ═══ Learning ═══
  training: {
    enabled: true,
    method: 'few-shot',
    frequency: 'weekly',
    dataSource: 'production',
    minExamples: 10,
    autoUpdate: true
  },
  feedback: [],

  // ═══ Cost ═══
  costPerTask: 2.50,
  costPerHour: 3.33,
  monthlyBudget: 1_000,

  status: 'idle',
  version: '3.2.1',
  createdAt: new Date('2025-03-01'),
  lastActiveAt: new Date()
}

// ═══════════════════════════════════════════════════════════
// EVENT HANDLERS & WORKFLOWS
// ═══════════════════════════════════════════════════════════

/**
 * Order Created Handler
 *
 * Triggered when new order is submitted
 */
export const handleOrderCreated: EventHandler = async (event, context) => {
  const { order } = event

  context.log(`New order received: ${order.id}`)

  // 1. Send confirmation email to customer
  await context.email.send(
    order.customer.email,
    'Order Received - Content Agency',
    `Thank you for your order! We'll deliver your ${order.service.name} within ${order.service.turnaroundTime.value} ${order.service.turnaroundTime.unit}.`
  )

  // 2. Find best available agent
  const agents = await context.db.list('agent', { status: 'idle', occupation: '27-3042.00' })
  const bestAgent = agents.sort((a, b) => b.performance.averageQuality - a.performance.averageQuality)[0]

  // 3. Assign order
  await context.db.update('order', order.id, {
    assignedTo: bestAgent.id,
    status: 'assigned',
    assignedAt: new Date()
  })

  // 4. Notify agent (trigger work start)
  await context.queue.send('process-order', {
    orderId: order.id,
    agentId: bestAgent.id
  })

  // 5. Update capacity
  await context.db.update('agent', bestAgent.id, {
    'capacity.currentTasks': bestAgent.capacity.currentTasks + 1,
    currentLoad: (bestAgent.capacity.currentTasks + 1) / bestAgent.capacity.maxConcurrentTasks
  })

  context.log(`Order ${order.id} assigned to ${bestAgent.name}`)
}

/**
 * Daily OKR Update
 *
 * Updates OKR progress every day at 6 AM
 */
export const updateOKRs: ScheduledHandler = async context => {
  context.log('Running daily OKR update...')

  // 1. Calculate current metrics
  const metrics = {
    mrr: await calculateMRR(context),
    customers: await context.db.query('SELECT COUNT(*) FROM customers WHERE status = ?', ['active']),
    nps: await calculateNPS(context),
    qualityScore: await calculateAvgQuality(context)
  }

  // 2. Update each key result
  const okr = await context.db.get('okr', 'q4-2025-company')

  for (const kr of okr.keyResults) {
    const currentValue = metrics[kr.metric.toLowerCase().replace(/ /g, '_')]
    kr.current = currentValue
    kr.progress = ((currentValue - kr.current) / (kr.target - kr.current)) * 100
    kr.trend = currentValue > kr.current ? 'up' : currentValue < kr.current ? 'down' : 'flat'
  }

  // 3. Calculate overall progress
  okr.progress = okr.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / okr.keyResults.length

  // 4. Determine health
  okr.health = okr.progress >= 70 ? 'green' : okr.progress >= 40 ? 'yellow' : 'red'

  // 5. Save
  await context.db.update('okr', okr.id, okr)

  // 6. Alert if at-risk
  if (okr.health === 'red') {
    await context.slack.send('#leadership', `⚠️ OKR at risk: "${okr.objective}" (${okr.progress.toFixed(1)}%)`)
  }

  context.log(`OKR updated: ${okr.progress.toFixed(1)}% complete`)
}

// Helper functions
async function calculateMRR(context: any): Promise<number> {
  const subscriptions = await context.db.query('SELECT SUM(amount) FROM subscriptions WHERE status = ?', ['active'])
  return subscriptions[0]?.sum || 0
}

async function calculateNPS(context: any): Promise<number> {
  const feedback = await context.db.query('SELECT rating FROM feedback WHERE timestamp > ?', [
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ])

  if (feedback.length === 0) return 0

  const promoters = feedback.filter(f => f.rating >= 9).length
  const detractors = feedback.filter(f => f.rating <= 6).length

  return ((promoters - detractors) / feedback.length) * 100
}

async function calculateAvgQuality(context: any): Promise<number> {
  const orders = await context.db.query('SELECT AVG(qualityScore) FROM orders WHERE completedAt > ?', [
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ])

  return orders[0]?.avg || 0
}

// ═══════════════════════════════════════════════════════════
// USAGE EXAMPLE
// ═══════════════════════════════════════════════════════════

/**
 * Initialize the business
 */
export function initContentAgency() {
  // Set up event handlers
  contentAgency.events = [handleOrderCreated]

  // Set up schedules
  contentAgency.schedules = [
    {
      pattern: 'day at 06:00',
      handler: updateOKRs
    }
  ]

  // Assign services
  contentAgency.services = [blogPostService]

  // Assign agents
  contentAgency.agents = [writerAgent]
  blogPostService.assignedAgents = [writerAgent]

  return contentAgency
}

/**
 * Register event handlers using method-based API
 */
export function registerHandlers(business: Business) {
  // Event-driven
  business.on('order.created', handleOrderCreated)

  // Scheduled
  business.every('day at 06:00', updateOKRs)

  // Send notifications
  business.on('order.completed', async (event, ctx) => {
    await business.send({
      to: 'email',
      recipient: event.order.customer.email,
      subject: 'Your content is ready!',
      body: 'Your order has been completed and is ready for review.'
    })
  })

  // Iterate over entities
  business.forEach('Order.at-risk', async (order, ctx) => {
    await ctx.slack.send('#operations', `⚠️ Order ${order.id} is at risk`)
  })
}

/**
 * Example: Create and process an order
 */
export async function exampleOrderFlow() {
  const business = initContentAgency()

  // 1. Customer submits order
  const order: Partial<Order> = {
    serviceId: 'blog-post-seo',
    customer: {
      id: 'cust-123',
      email: 'customer@example.com'
    } as Customer,
    brief: {
      topic: 'How AI is transforming content marketing',
      keywords: ['AI content', 'content marketing', 'automation'],
      targetAudience: 'Marketing managers at B2B SaaS companies',
      tone: 'professional'
    },
    price: 299,
    total: 299,
    deadline: new Date(Date.now() + 48 * 60 * 60 * 1000)
  }

  // 2. Order created event fires
  // → Assigns to best agent
  // → Sends confirmation email
  // → Queues for processing

  // 3. Agent processes order
  // → Generates content
  // → Runs quality checks
  // → Delivers to customer

  // 4. Customer receives notification
  // → Reviews deliverable
  // → Provides feedback
  // → Approves or requests revision

  // 5. OKR metrics update
  // → Revenue increases
  // → Quality score tracked
  // → NPS calculated
}
