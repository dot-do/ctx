/**
 * Business-as-Code TypeScript Interfaces
 *
 * Enables expressing entire businesses as executable specifications that AI agents
 * can autonomously imagine, build, launch, grow, scale, manage, and operate.
 *
 * Integration Points:
 * - ONET: Occupational taxonomy with 1,016 occupations and structured KSA data
 * - GDPval: Economic value measurement across 1,320 real-world tasks
 * - .do Platform: Functions, workflows, agents, and services infrastructure
 */

// ============================================================================
// Core Business Entities
// ============================================================================

/**
 * Company Definition
 *
 * Represents a company or business unit in a holding company structure.
 * Supports nested hierarchies from holding company → operating companies → subsidiaries.
 */
export interface Company {
  /** Unique identifier */
  id: string

  /** Company name */
  name: string

  /** Legal entity name */
  legalName?: string

  /** Company type in organizational hierarchy */
  type: 'holding' | 'operating' | 'subsidiary' | 'division'

  /** Parent company ID (if part of larger organization) */
  parent?: string

  /** Subsidiary company IDs */
  subsidiaries?: string[]

  /** Mission statement */
  mission?: string

  /** Vision statement */
  vision?: string

  /** Core values */
  values?: string[]

  /** Industry classification */
  industry: string

  /** Sub-industry or vertical */
  vertical?: string

  /** Objectives and Key Results at this level */
  objectives: Objective[]

  /** Organizational roles and structure */
  roles: Role[]

  /** Products and services offered */
  offerings: Offering[]

  /** Operational processes and workflows */
  operations: Operation[]

  /** Key performance indicators and metrics */
  metrics: Metric[]

  /** Financial and human resources */
  resources: Resource[]

  /** Governance structure and policies */
  governance: Governance

  /** Entity namespace (for database sync) */
  metadata: {
    ns: 'company'
    visibility: 'public' | 'private' | 'unlisted'
    created: Date
    updated: Date
  }

  /** Tags for categorization */
  tags: string[]
}

/**
 * Objective (OKRs)
 *
 * Cascading objectives from holding company down to individual contributor.
 * Enables programmatic tracking and automated progress reporting.
 */
export interface Objective {
  /** Unique identifier */
  id: string

  /** Organizational level */
  level: 'holding' | 'company' | 'department' | 'team' | 'ic'

  /** Owner role or person ID */
  owner: string

  /** Objective statement (what we want to achieve) */
  objective: string

  /** Measurable key results */
  keyResults: KeyResult[]

  /** Planning timeframe */
  timeframe: {
    start: Date
    end: Date
    quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4'
    year?: number
  }

  /** Parent objective ID (cascading down) */
  parent?: string

  /** Child objective IDs (cascading up) */
  children?: string[]

  /** Current status */
  status: 'draft' | 'active' | 'at-risk' | 'completed' | 'failed' | 'cancelled'

  /** Progress percentage (0-100) */
  progress: number

  /** Related initiatives or projects */
  initiatives?: string[]

  /** Entity namespace */
  metadata: {
    ns: 'objective'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

/**
 * Key Result
 *
 * Measurable outcome that indicates progress toward an objective.
 */
export interface KeyResult {
  /** Unique identifier */
  id: string

  /** Result description */
  result: string

  /** Metric being measured */
  metric: string

  /** Starting value */
  baseline: number

  /** Target value */
  target: number

  /** Current value */
  current: number

  /** Unit of measurement */
  unit: string

  /** Progress percentage (0-100) */
  progress: number

  /** Auto-calculated or manual */
  automated: boolean

  /** Data source for automated tracking */
  dataSource?: {
    type: 'api' | 'database' | 'analytics' | 'manual'
    endpoint?: string
    query?: string
    updateFrequency?: 'realtime' | 'hourly' | 'daily' | 'weekly'
  }

  /** Current status */
  status: 'on-track' | 'at-risk' | 'off-track' | 'completed'
}

/**
 * Role Definition
 *
 * Organizational role with ONET taxonomy mapping.
 * Can be filled by humans, AI agents, or hybrid teams.
 */
export interface Role {
  /** Unique identifier */
  id: string

  /** Role title */
  title: string

  /** ONET-SOC occupation code */
  onetCode?: string

  /** ONET occupation title */
  onetTitle?: string

  /** Reporting structure */
  reportsTo?: string

  /** Direct reports (role IDs) */
  directReports?: string[]

  /** Primary responsibilities */
  responsibilities: string[]

  /** Required knowledge, skills, abilities (from ONET) */
  ksa: {
    knowledge: string[] // Domain knowledge required
    skills: string[] // Technical and soft skills
    abilities: string[] // Cognitive and physical abilities
  }

  /** Assignment type */
  assignedTo: 'human' | 'agent' | 'hybrid'

  /** AI agent ID (if agent or hybrid) */
  agent?: string

  /** Human person ID (if human or hybrid) */
  person?: string

  /** Workload allocation */
  workload?: {
    hoursPerWeek: number
    ftePortion: number // 0-1 (0.5 = 50% FTE)
  }

  /** Compensation (if applicable) */
  compensation?: {
    type: 'salary' | 'hourly' | 'contract' | 'equity' | 'hybrid'
    amount?: number
    currency?: string
    equity?: number // percentage
  }

  /** Performance metrics */
  metrics?: string[] // Metric IDs

  /** Entity namespace */
  metadata: {
    ns: 'role'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

/**
 * Offering (Product or Service)
 *
 * What the company sells - products, services, or hybrid offerings.
 */
export interface Offering {
  /** Unique identifier */
  id: string

  /** Offering name */
  name: string

  /** Description */
  description: string

  /** Offering type */
  type: 'product' | 'service' | 'hybrid' | 'platform'

  /** Category/vertical */
  category: string

  /** GDPval task mappings (economic value) */
  gdpvalTasks?: string[]

  /** Target customer segments */
  segments: string[]

  /** Value proposition */
  valueProposition: string

  /** Pricing model */
  pricing: PricingModel

  /** Delivery mechanisms */
  delivery: DeliveryMechanism[]

  /** Service level agreement */
  sla?: ServiceLevel

  /** Related offerings (upsell/cross-sell) */
  related?: string[]

  /** Revenue metrics */
  revenue?: {
    arr?: number // Annual Recurring Revenue
    mrr?: number // Monthly Recurring Revenue
    ltv?: number // Lifetime Value
    cac?: number // Customer Acquisition Cost
  }

  /** Entity namespace */
  metadata: {
    ns: 'offering'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

/**
 * Pricing Model
 *
 * How an offering is priced and billed.
 */
export interface PricingModel {
  /** Pricing type */
  type: 'fixed' | 'subscription' | 'usage' | 'tiered' | 'freemium' | 'value-based' | 'dynamic'

  /** Base price */
  basePrice?: number

  /** Currency */
  currency: string

  /** Billing frequency */
  billingCycle?: 'one-time' | 'monthly' | 'quarterly' | 'annually'

  /** Tiered pricing levels */
  tiers?: Array<{
    name: string
    price: number
    features: string[]
    limits?: Record<string, number>
  }>

  /** Usage-based pricing */
  usage?: {
    metric: string
    pricePerUnit: number
    includedUnits?: number
  }

  /** Volume discounts */
  volumeDiscounts?: Array<{
    minQuantity: number
    discountPercent: number
  }>
}

/**
 * Delivery Mechanism
 *
 * How an offering is delivered to customers.
 */
export interface DeliveryMechanism {
  /** Primary delivery type */
  type: 'digital' | 'physical' | 'hybrid' | 'managed-service'

  /** Execution model */
  execution: 'automated' | 'manual' | 'hybrid' | 'on-demand'

  /** Technology stack */
  technology?: {
    platform?: string
    apis?: string[]
    integrations?: string[]
  }

  /** Fulfillment time */
  fulfillment?: {
    typical: string // e.g., "instant", "24 hours", "1-2 weeks"
    guaranteed?: string
  }

  /** Capacity limits */
  capacity?: {
    concurrent?: number
    daily?: number
    monthly?: number
  }
}

/**
 * Service Level Agreement
 *
 * Guaranteed service levels and SLAs.
 */
export interface ServiceLevel {
  /** Uptime guarantee (percentage) */
  uptime?: number

  /** Response time guarantees */
  responseTime?: {
    p50?: number // milliseconds
    p95?: number
    p99?: number
  }

  /** Support response times */
  support?: {
    critical?: string // e.g., "15 minutes"
    high?: string
    normal?: string
    low?: string
  }

  /** Quality guarantees */
  quality?: {
    accuracy?: number // percentage
    completeness?: number
    customSatisfaction?: number // minimum rating
  }

  /** Penalties for SLA violations */
  penalties?: Array<{
    violation: string
    remedy: string
  }>
}

/**
 * Operation (Business Process)
 *
 * Operational processes and workflows that run the business.
 */
export interface Operation {
  /** Unique identifier */
  id: string

  /** Operation name */
  name: string

  /** Description */
  description: string

  /** Category */
  category: 'sales' | 'marketing' | 'operations' | 'finance' | 'hr' | 'product' | 'engineering' | 'support' | 'other'

  /** Workflow definition */
  workflow?: string // workflow ID

  /** Trigger conditions */
  triggers?: Array<{
    type: 'event' | 'schedule' | 'manual'
    condition: string
  }>

  /** Process steps */
  steps?: ProcessStep[]

  /** Assigned roles */
  roles: string[]

  /** Required resources */
  resources?: string[]

  /** Performance metrics */
  metrics: string[]

  /** Automation level */
  automation: {
    level: number // 0-1 (0 = fully manual, 1 = fully automated)
    potential: number // 0-1 (automation potential)
  }

  /** Entity namespace */
  metadata: {
    ns: 'operation'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

/**
 * Process Step
 *
 * Individual step in an operational process.
 */
export interface ProcessStep {
  /** Step ID */
  id: string

  /** Step name */
  name: string

  /** Execution type */
  type: 'automated' | 'manual' | 'decision' | 'approval'

  /** Assigned role or agent */
  assignee: string

  /** Function or workflow ID */
  function?: string

  /** Expected duration */
  duration?: {
    min: number
    max: number
    unit: 'seconds' | 'minutes' | 'hours' | 'days'
  }

  /** Dependencies (previous step IDs) */
  dependencies?: string[]

  /** Conditional logic */
  condition?: string
}

/**
 * Metric (KPI)
 *
 * Business metric or key performance indicator.
 */
export interface Metric {
  /** Unique identifier */
  id: string

  /** Metric name */
  name: string

  /** Description */
  description: string

  /** Category */
  category: 'financial' | 'operational' | 'customer' | 'employee' | 'product' | 'growth'

  /** Metric type */
  type: 'counter' | 'gauge' | 'ratio' | 'percentage' | 'currency' | 'duration'

  /** Unit of measurement */
  unit: string

  /** Current value */
  current: number

  /** Target value */
  target?: number

  /** Threshold alerts */
  thresholds?: {
    critical?: number
    warning?: number
    good?: number
  }

  /** Data source */
  source: {
    type: 'api' | 'database' | 'analytics' | 'manual' | 'calculated'
    endpoint?: string
    query?: string
    calculation?: string
  }

  /** Update frequency */
  updateFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly'

  /** Historical data */
  history?: Array<{
    timestamp: Date
    value: number
  }>

  /** Related objectives */
  objectives?: string[]

  /** Entity namespace */
  metadata: {
    ns: 'metric'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

/**
 * Resource Allocation
 *
 * Financial and human resources allocated to the business.
 */
export interface Resource {
  /** Unique identifier */
  id: string

  /** Resource type */
  type: 'budget' | 'headcount' | 'infrastructure' | 'capital'

  /** Financial budget */
  budget?: {
    total: number
    allocated: number
    spent: number
    currency: string
    period: 'monthly' | 'quarterly' | 'annually'
    breakdown?: Array<{
      category: string
      amount: number
      percentage: number
    }>
  }

  /** Headcount planning */
  headcount?: {
    total: number
    filled: number
    open: number
    pipeline: number
    byDepartment?: Record<string, number>
    byRole?: Record<string, number>
  }

  /** Infrastructure resources */
  infrastructure?: {
    compute?: { type: string; quantity: number; cost: number }
    storage?: { type: string; quantity: number; cost: number }
    network?: { type: string; quantity: number; cost: number }
    other?: Array<{ type: string; quantity: number; cost: number }>
  }

  /** Capital allocation */
  capital?: {
    equity: number
    debt: number
    retained: number
    reserves: number
  }

  /** Entity namespace */
  metadata: {
    ns: 'resource'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

/**
 * Governance Structure
 *
 * How decisions are made and policies are enforced.
 */
export interface Governance {
  /** Decision-making authority */
  authority: Array<{
    role: string
    scope: string
    limits?: string[]
  }>

  /** Approval workflows */
  approvals: Array<{
    type: string
    threshold?: number
    approvers: string[]
    escalation?: string
  }>

  /** Policies and compliance */
  policies: Array<{
    id: string
    name: string
    description: string
    category: string
    enforced: boolean
    automated: boolean
  }>

  /** Risk management */
  risk?: {
    assessment: string[]
    mitigation: string[]
    tolerance: 'low' | 'medium' | 'high'
  }

  /** Compliance requirements */
  compliance?: Array<{
    framework: string // e.g., "SOC2", "GDPR", "HIPAA"
    status: 'compliant' | 'in-progress' | 'non-compliant'
    audits?: Array<{
      date: Date
      result: string
    }>
  }>
}

// ============================================================================
// Supporting Types
// ============================================================================

/**
 * ONET Knowledge-Skills-Abilities
 *
 * Structured taxonomy from ONET database.
 */
export interface KSA {
  knowledge: Array<{
    code: string
    name: string
    level?: number // 1-7 scale
  }>
  skills: Array<{
    code: string
    name: string
    level?: number
  }>
  abilities: Array<{
    code: string
    name: string
    level?: number
  }>
}

/**
 * GDPval Task Mapping
 *
 * Economic value task from OpenAI's GDPval framework.
 */
export interface GDPvalTask {
  /** Task ID */
  id: string

  /** Occupation code */
  occupation: string

  /** Industry */
  industry: string

  /** Task description */
  description: string

  /** Economic value (estimated annual value in USD) */
  economicValue?: number

  /** Complexity level */
  complexity: 'low' | 'medium' | 'high'

  /** Automation potential */
  automationPotential: number // 0-1
}
