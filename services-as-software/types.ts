/**
 * Services-as-Software TypeScript Interfaces
 *
 * Enables AI agents to deliver services that traditionally required human labor.
 * Maps services to ONET occupations (what skills are needed) and GDPval tasks
 * (economic value delivered).
 *
 * Integration Points:
 * - ONET: 1,016 occupations, 19,000+ tasks, structured KSA taxonomy
 * - GDPval: 1,320 real-world tasks across 44 occupations, economic value measurement
 * - .do Platform: Functions (code/generative/human/agentic execution)
 * - Services.Delivery: Marketplace for economically valuable services
 */

// ============================================================================
// Core Service Entities
// ============================================================================

/**
 * Service Definition
 *
 * A service that can be delivered programmatically by AI agents, code,
 * or human-agent hybrid teams. Formerly required human labor.
 */
export interface Service {
  /** Unique identifier */
  id: string

  /** Service name */
  name: string

  /** Detailed description */
  description: string

  /** Short tagline */
  tagline?: string

  /** Category (from do.industries taxonomy) */
  category: string

  /** Sub-category or specialization */
  specialty?: string

  /** ONET occupation mapping */
  onet?: {
    code: string // e.g., "13-2082.00" (Tax Preparers)
    title: string
    alternativeOccupations?: string[] // Related ONET codes
  }

  /** GDPval task mapping */
  gdpval?: {
    taskId: string
    industry: string
    economicValue?: number // Annual value in USD
    complexity: 'low' | 'medium' | 'high'
  }

  /** Task decomposition */
  tasks: Task[]

  /** Expected deliverables */
  deliverables: Deliverable[]

  /** Quality standards and validation */
  quality: QualityStandard[]

  /** Pricing model */
  pricing: ServicePricing

  /** Delivery mechanism */
  delivery: ServiceDelivery

  /** Service level agreements */
  sla: ServiceSLA

  /** Required inputs from customer */
  inputs: ServiceInput[]

  /** Expected outcomes */
  outcomes: ServiceOutcome[]

  /** Economic value delivered */
  value: {
    estimatedValue: number // Per transaction
    timeToDeliver: string // e.g., "24 hours", "instant"
    costToDeliver: number
    marginPercent: number
  }

  /** Target customers */
  customers?: {
    segments: string[]
    industries?: string[]
    companySize?: string[]
  }

  /** Competitive positioning */
  positioning?: {
    alternatives: string[] // Traditional alternatives
    differentiation: string[] // How we're different
    advantages: string[]
  }

  /** Entity namespace */
  metadata: {
    ns: 'service'
    visibility: 'public' | 'private' | 'unlisted'
    featured?: boolean
    status: 'draft' | 'active' | 'paused' | 'archived'
  }

  /** Tags for discovery */
  tags: string[]
}

/**
 * Task
 *
 * Individual task within a service, aligned with ONET task taxonomy.
 * Can be executed by code, AI models, humans, or agents.
 */
export interface Task {
  /** Task identifier */
  id: string

  /** Task name */
  name: string

  /** Task description */
  description: string

  /** ONET task ID (if mapped) */
  onetTaskId?: string

  /** ONET work activity */
  onetActivity?: {
    detailed: string // One of 2,000+ detailed activities
    intermediate: string // One of 325 intermediate activities
    generalized: string // One of 41 generalized activities
  }

  /** Execution type */
  type: 'code' | 'generative' | 'human' | 'agentic' | 'hybrid'

  /** Task inputs */
  inputs: TaskInput[]

  /** Task outputs */
  outputs: TaskOutput[]

  /** Knowledge, skills, abilities required */
  ksa: TaskKSA

  /** Automation readiness score */
  automationReadiness: number // 0-1 (0 = requires human, 1 = fully automated)

  /** Current automation status */
  automationStatus: 'manual' | 'assisted' | 'automated' | 'autonomous'

  /** Assigned executor */
  executor?: {
    type: 'code' | 'generative' | 'human' | 'agentic'
    id?: string // function, agent, or role ID
    fallback?: string // Fallback executor if primary fails
  }

  /** Estimated effort */
  effort?: {
    typical: number // in minutes
    min: number
    max: number
  }

  /** Dependencies */
  dependencies?: string[] // Task IDs that must complete first

  /** Success criteria */
  successCriteria: string[]

  /** Failure modes and handling */
  failureHandling?: {
    retryable: boolean
    maxRetries?: number
    fallbackTask?: string
    escalation?: string
  }
}

/**
 * Task KSA (Knowledge, Skills, Abilities)
 *
 * Required knowledge, skills, and abilities for a task (from ONET taxonomy).
 */
export interface TaskKSA {
  /** Required knowledge domains */
  knowledge: Array<{
    domain: string
    level: 'basic' | 'intermediate' | 'advanced' | 'expert'
    onetCode?: string
  }>

  /** Required skills */
  skills: Array<{
    skill: string
    level: 'basic' | 'intermediate' | 'advanced' | 'expert'
    onetCode?: string
  }>

  /** Required abilities */
  abilities: Array<{
    ability: string
    level: 'basic' | 'intermediate' | 'advanced' | 'expert'
    onetCode?: string
  }>
}

/**
 * Task Input
 *
 * Data or information required to execute a task.
 */
export interface TaskInput {
  /** Input name */
  name: string

  /** Data type */
  type: string

  /** Description */
  description: string

  /** Required or optional */
  required: boolean

  /** Validation rules */
  validation?: {
    format?: string // e.g., "email", "url", "date"
    pattern?: string // regex
    min?: number
    max?: number
    enum?: string[]
  }

  /** Default value */
  default?: any

  /** Example value */
  example?: any
}

/**
 * Task Output
 *
 * Data or artifact produced by executing a task.
 */
export interface TaskOutput {
  /** Output name */
  name: string

  /** Data type */
  type: string

  /** Description */
  description: string

  /** Output format */
  format?: string // e.g., "json", "pdf", "csv"

  /** Example output */
  example?: any

  /** Schema or structure */
  schema?: any
}

/**
 * Deliverable
 *
 * Final output delivered to the customer upon service completion.
 */
export interface Deliverable {
  /** Deliverable identifier */
  id: string

  /** Deliverable name */
  name: string

  /** Description */
  description: string

  /** Deliverable type */
  type: 'document' | 'data' | 'code' | 'report' | 'analysis' | 'design' | 'other'

  /** File format */
  format?: string // e.g., "pdf", "xlsx", "zip", "json"

  /** Delivery method */
  delivery: 'download' | 'email' | 'api' | 'portal' | 'integration'

  /** Quality criteria */
  quality: string[]

  /** Associated tasks */
  tasks: string[] // Task IDs that produce this deliverable

  /** Template or example */
  template?: string

  /** Validation requirements */
  validation?: {
    automated: boolean
    checks: string[]
    approver?: string // role or agent
  }
}

/**
 * Quality Standard
 *
 * Quality criteria and validation for service delivery.
 */
export interface QualityStandard {
  /** Standard name */
  name: string

  /** Category */
  category: 'accuracy' | 'completeness' | 'timeliness' | 'compliance' | 'satisfaction' | 'other'

  /** Metric */
  metric: string

  /** Target value */
  target: number

  /** Minimum acceptable value */
  minimum: number

  /** Unit */
  unit: string

  /** Measurement method */
  measurement: {
    type: 'automated' | 'manual' | 'hybrid'
    method: string
    frequency: 'per-transaction' | 'sample' | 'periodic'
  }

  /** Validation criteria */
  validation: string[]

  /** Remediation process */
  remediation?: {
    threshold: number // Value that triggers remediation
    actions: string[]
    owner: string // role or agent
  }
}

/**
 * Service Pricing
 *
 * How the service is priced and billed.
 */
export interface ServicePricing {
  /** Pricing model */
  model: 'fixed' | 'hourly' | 'per-unit' | 'subscription' | 'value-based' | 'tiered' | 'custom'

  /** Base price */
  basePrice?: number

  /** Currency */
  currency: string

  /** Pricing tiers */
  tiers?: Array<{
    name: string
    min?: number // Minimum quantity
    max?: number
    price: number
    features?: string[]
  }>

  /** Unit pricing */
  perUnit?: {
    unit: string
    price: number
    includedUnits?: number
  }

  /** Subscription pricing */
  subscription?: {
    frequency: 'monthly' | 'quarterly' | 'annually'
    price: number
    includedUsage?: Record<string, number>
  }

  /** Value-based pricing */
  valueBased?: {
    metric: string // What drives value (e.g., "revenue generated", "cost saved")
    percentage: number // % of value captured
    cap?: number // Maximum price
    floor?: number // Minimum price
  }

  /** Discounts */
  discounts?: Array<{
    type: 'volume' | 'commitment' | 'promotional'
    threshold?: number
    percentage?: number
    amount?: number
  }>

  /** Payment terms */
  terms?: {
    dueDate: string // e.g., "net-30", "upon-delivery"
    methods: string[] // e.g., ["credit-card", "ach", "wire"]
    lateFee?: number
  }
}

/**
 * Service Delivery
 *
 * How the service is delivered and executed.
 */
export interface ServiceDelivery {
  /** Primary delivery mechanism */
  mechanism: 'automated' | 'agent-driven' | 'human-assisted' | 'fully-managed'

  /** Execution model */
  execution: ExecutionModel

  /** Typical turnaround time */
  turnaround: {
    typical: string // e.g., "instant", "24 hours", "3-5 days"
    min: string
    max: string
    guaranteed?: string
  }

  /** Delivery channels */
  channels: Array<{
    type: 'api' | 'web-app' | 'mobile-app' | 'email' | 'portal'
    primary: boolean
    url?: string
  }>

  /** Capacity and scaling */
  capacity?: {
    concurrent: number
    daily?: number
    monthly?: number
    scaling: 'manual' | 'automatic'
  }

  /** Availability */
  availability: {
    schedule: '24/7' | 'business-hours' | 'scheduled' | 'custom'
    timezone?: string
    maintenance?: string // e.g., "Sundays 2-4am UTC"
  }

  /** Integration requirements */
  integrations?: Array<{
    name: string
    required: boolean
    provider?: string
  }>
}

/**
 * Execution Model
 *
 * Detailed execution model showing how work is distributed.
 */
export interface ExecutionModel {
  /** Execution type */
  type: 'code' | 'generative' | 'human' | 'agentic' | 'hybrid'

  /** Code execution */
  code?: {
    functionId: string
    runtime: string
    deployment: string // e.g., "cloudflare-workers", "aws-lambda"
  }

  /** Generative AI execution */
  generative?: {
    model: string
    provider: string
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
  }

  /** Human execution */
  human?: {
    role: string
    platform: string // e.g., "internal", "upwork", "mechanical-turk"
    averageTime: number // minutes
    skillLevel: 'entry' | 'intermediate' | 'expert'
  }

  /** Agentic execution */
  agentic?: {
    agentId: string
    autonomy: number // 0-1 (0 = fully supervised, 1 = fully autonomous)
    tools: string[]
    model?: string
  }

  /** Hybrid workflow */
  hybrid?: {
    orchestration: 'sequential' | 'parallel' | 'conditional'
    steps: Array<{
      name: string
      type: 'code' | 'generative' | 'human' | 'agentic'
      config: any
    }>
  }

  /** Fallback strategy */
  fallback?: {
    trigger: string // Condition that triggers fallback
    mechanism: ExecutionModel
  }

  /** Quality assurance */
  qa?: {
    automated: boolean
    humanReview: boolean
    reviewerRole?: string
    sampling?: number // % of outputs to review
  }
}

/**
 * Service SLA
 *
 * Service level agreement and guarantees.
 */
export interface ServiceSLA {
  /** Uptime commitment */
  uptime?: {
    target: number // e.g., 99.9
    measurement: 'monthly' | 'quarterly' | 'annually'
    excludes?: string[] // Scheduled maintenance, etc.
  }

  /** Performance commitments */
  performance?: {
    responseTime?: {
      p50: number
      p95: number
      p99: number
      unit: 'ms' | 'seconds' | 'minutes'
    }
    throughput?: {
      min: number
      unit: string
    }
  }

  /** Quality commitments */
  quality?: {
    accuracy?: number // %
    completeness?: number
    errorRate?: number // max %
  }

  /** Support commitments */
  support?: {
    channels: string[]
    hours: string
    responseTime: {
      critical?: string
      high?: string
      normal?: string
      low?: string
    }
  }

  /** Remedies for violations */
  remedies?: Array<{
    violation: string
    remedy: 'refund' | 'credit' | 'discount' | 'penalty'
    value: number | string
  }>

  /** Exceptions and force majeure */
  exceptions?: string[]
}

/**
 * Service Input
 *
 * Information required from customer to deliver service.
 */
export interface ServiceInput {
  /** Input name */
  name: string

  /** Category */
  category: 'document' | 'data' | 'credentials' | 'preferences' | 'specifications' | 'other'

  /** Description */
  description: string

  /** Data type */
  type: string

  /** Required or optional */
  required: boolean

  /** Accepted formats */
  formats?: string[]

  /** Validation rules */
  validation?: {
    rules: string[]
    automated: boolean
  }

  /** Collection method */
  collection: 'form' | 'upload' | 'api' | 'integration' | 'manual'

  /** Examples */
  examples?: any[]
}

/**
 * Service Outcome
 *
 * Expected outcomes and benefits for the customer.
 */
export interface ServiceOutcome {
  /** Outcome description */
  outcome: string

  /** Category */
  category: 'efficiency' | 'quality' | 'cost-savings' | 'revenue' | 'compliance' | 'risk-reduction' | 'other'

  /** Measurable benefit */
  benefit?: {
    metric: string
    value: number | string
    unit: string
    timeframe?: string
  }

  /** Success indicators */
  indicators: string[]

  /** Measurement approach */
  measurement?: {
    method: string
    baseline: string
    target: string
  }
}

// ============================================================================
// Supporting Types
// ============================================================================

/**
 * ONET Occupation
 *
 * Structured occupation data from ONET database.
 */
export interface OnetOccupation {
  /** ONET-SOC code */
  code: string

  /** Occupation title */
  title: string

  /** Description */
  description: string

  /** Work activities */
  activities: {
    generalized: string[]
    intermediate: string[]
    detailed: string[]
  }

  /** Tasks */
  tasks: string[]

  /** Knowledge domains */
  knowledge: Array<{
    code: string
    name: string
    level: number // 1-7 scale
  }>

  /** Skills */
  skills: Array<{
    code: string
    name: string
    level: number
  }>

  /** Abilities */
  abilities: Array<{
    code: string
    name: string
    level: number
  }>

  /** Education and training */
  education?: {
    level: string
    programs?: string[]
  }

  /** Experience requirements */
  experience?: {
    years: number
    type: string[]
  }

  /** Employment outlook */
  outlook?: {
    growth: string
    openings: number
    median_wage: number
  }
}

/**
 * GDPval Task
 *
 * Economically valuable task from OpenAI's GDPval framework.
 */
export interface GDPvalTask {
  /** Task ID */
  id: string

  /** Occupation */
  occupation: {
    code: string
    title: string
  }

  /** Industry */
  industry: string

  /** Task description */
  description: string

  /** Task complexity */
  complexity: 'low' | 'medium' | 'high'

  /** Estimated economic value (annual) */
  economicValue?: number

  /** Contribution to GDP */
  gdpContribution?: number

  /** Automation potential */
  automationPotential: number // 0-1

  /** Required skills */
  skills: string[]

  /** Typical deliverables */
  deliverables: string[]

  /** Quality benchmarks */
  benchmarks?: {
    accuracy: number
    completeness: number
    timeliness: string
  }
}

/**
 * Service Marketplace Listing
 *
 * Service as listed on Services.Delivery marketplace.
 */
export interface MarketplaceListing {
  /** Service ID */
  serviceId: string

  /** Provider */
  provider: {
    id: string
    name: string
    verified: boolean
    rating: number
    reviewCount: number
  }

  /** Listing details */
  listing: {
    featured: boolean
    badge?: string
    promoted: boolean
  }

  /** Performance metrics */
  performance: {
    ordersCompleted: number
    averageRating: number
    onTimeDelivery: number // %
    responseTime: string
  }

  /** Competitive positioning */
  competition?: {
    rank: number
    totalProviders: number
    pricePercentile: number
  }
}
