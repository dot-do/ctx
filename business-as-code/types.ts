/**
 * Business-as-Code TypeScript Interfaces
 *
 * OKRs as Ground Truth for Reinforcement Learning
 *
 * Unlike contrived evals, business KPIs and OKRs represent the ultimate ground truth
 * for AI agent performance. This framework positions OKRs as the central organizing
 * principle, with all operations, roles, and metrics linked to objectives.
 *
 * Key Insight: Real-world business outcomes provide natural reward signals for RL,
 * eliminating the need for synthetic evaluation tasks. Agents optimize for actual
 * business success, not test scores.
 *
 * Integration Points:
 * - ONET: Occupational taxonomy with 1,016 occupations and structured KSA data
 * - GDPval: Economic value measurement across 1,320 real-world tasks
 * - .do Platform: Functions, workflows, agents, and services infrastructure
 */

// ============================================================================
// OKRs: Central Organizing Principle & RL Ground Truth
// ============================================================================

/**
 * Objective (OKR)
 *
 * The central organizing principle of business-as-code. All operations, roles,
 * and resources exist to achieve objectives. OKR progress provides ground truth
 * reward signals for reinforcement learning.
 *
 * Why OKRs > Contrived Evals:
 * - Real business outcomes (revenue, users, quality) vs synthetic tests
 * - Natural reward signals from actual value creation
 * - Aligned with human stakeholders' goals
 * - Measurable economic impact via GDPval
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

  // ═══ RL Ground Truth Integration ═══

  /** Reward signals for RL training */
  rewardSignals: RewardSignal[]

  /** Evaluation framework (vs contrived tests) */
  evaluation: EvaluationFramework

  /** Learning loop from OKR feedback */
  learningLoop: LearningLoop

  /** Agents working toward this objective */
  assignedAgents: string[]

  /** Operations driven by this objective */
  operations: string[] // Operation IDs

  /** Metrics measuring this objective */
  metrics: string[] // Metric IDs

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
 * Each KR update generates a reward signal for RL training.
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

  // ═══ RL Integration ═══

  /** Reward calculation when this KR updates */
  rewardFunction: {
    type: 'linear' | 'exponential' | 'step' | 'custom'
    formula?: string // e.g., "(current - baseline) / (target - baseline)"
    weight: number // Importance weight (0-1)
  }

  /** Historical progress for trend analysis */
  history?: Array<{
    timestamp: Date
    value: number
    delta: number // Change from previous
    reward: number // RL reward signal
  }>
}

/**
 * Reward Signal
 *
 * Ground truth feedback from business outcomes for RL training.
 * Generated when KRs update, milestones hit, or objectives complete.
 */
export interface RewardSignal {
  /** Unique identifier */
  id: string

  /** Timestamp */
  timestamp: Date

  /** Source of reward */
  source: 'kr-update' | 'kr-completion' | 'milestone' | 'okr-completion' | 'okr-exceeded'

  /** Objective ID */
  objective: string

  /** Key Result ID (if applicable) */
  keyResult?: string

  /** Reward magnitude (-1 to 1, negative for setbacks) */
  strength: number

  /** What changed */
  delta: {
    metric: string
    previous: number
    current: number
    target: number
    percentComplete: number
  }

  /** Economic value impact (GDPval) */
  economicValue?: number

  /** Agents receiving this reward */
  agents: string[]

  /** What was learned from this outcome */
  feedback: string

  /** Suggested improvements */
  improvements?: string[]
}

/**
 * Evaluation Framework
 *
 * How agents are evaluated based on OKR achievement (not contrived tests).
 * Ground truth = real business outcomes.
 */
export interface EvaluationFramework {
  /** Evaluation basis */
  basis: 'okr-achievement' // vs 'contrived-evals'

  /** Ground truth source */
  groundTruth: 'business-kpis' | 'real-world-outcomes'

  /** Evaluation metrics (actual KRs) */
  metrics: Array<{
    keyResult: string
    weight: number
    threshold: number // Minimum to pass
  }>

  /** Overall reward function */
  rewardFunction: {
    type: 'weighted-sum' | 'multiplicative' | 'custom'
    formula?: string
    normalization?: 'none' | 'z-score' | 'min-max'
  }

  /** Evaluation frequency */
  frequency: 'realtime' | 'daily' | 'weekly' | 'monthly' | 'quarterly'

  /** Performance thresholds */
  thresholds: {
    excellent: number // e.g., >90% OKR achievement
    good: number // e.g., >70%
    acceptable: number // e.g., >50%
    poor: number // e.g., <50%
  }

  /** Comparison benchmark */
  benchmark?: {
    type: 'historical' | 'peer' | 'target'
    baseline: number
  }
}

/**
 * Learning Loop
 *
 * How feedback from OKR progress improves agent behavior.
 * Continuous learning from real business outcomes.
 */
export interface LearningLoop {
  /** Unique identifier */
  id: string

  /** What triggers learning */
  trigger: 'kr-update' | 'okr-review' | 'milestone' | 'periodic'

  /** Trigger frequency */
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly'

  /** Feedback signals */
  feedback: RewardSignal[]

  /** Insights extracted */
  insights: Array<{
    timestamp: Date
    observation: string
    hypothesis: string
    experiment?: string
  }>

  /** Improvements implemented */
  improvements: Array<{
    timestamp: Date
    change: string
    impact: number // Measured improvement
    status: 'proposed' | 'testing' | 'deployed' | 'validated'
  }>

  /** A/B tests running */
  experiments?: Array<{
    id: string
    hypothesis: string
    variants: string[]
    metrics: string[]
    status: 'running' | 'completed'
    winner?: string
  }>

  /** Learning rate */
  learningRate: number // How quickly to adapt (0-1)

  /** Exploration vs exploitation */
  exploration: number // How much to try new approaches (0-1)
}

// ============================================================================
// Company Definition (OKR-Centric)
// ============================================================================

/**
 * Company Definition
 *
 * Organized around OKRs as the central principle.
 * All roles, operations, and resources exist to achieve objectives.
 */
export interface Company {
  // ═══ Identity ═══
  id: string
  name: string
  legalName?: string
  type: 'holding' | 'operating' | 'subsidiary' | 'division'
  parent?: string
  subsidiaries?: string[]

  // ═══ Strategic Direction ═══
  mission?: string
  vision?: string
  values?: string[]
  industry: string
  vertical?: string

  // ═══ OKRs: PRIMARY ORGANIZING PRINCIPLE ═══
  /** Objectives are the central organizing principle */
  objectives: Objective[]

  /** Current planning period */
  currentPeriod: {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
    year: number
    startDate: Date
    endDate: Date
  }

  /** OKR history and trends */
  okrHistory?: Array<{
    period: string
    objectives: Objective[]
    avgCompletion: number
    totalReward: number
  }>

  // ═══ Roles (Assigned to OKRs) ═══
  /** Organizational roles linked to objectives */
  roles: Role[]

  // ═══ Operations (Driven by OKRs) ═══
  /** Operational processes linked to objectives */
  operations: Operation[]

  // ═══ Offerings (Contribute to OKRs) ═══
  /** Products/services that drive KR achievement */
  offerings: Offering[]

  // ═══ Metrics (Measure OKRs) ═══
  /** KPIs measuring objective progress */
  metrics: Metric[]

  // ═══ Resources (Allocated to OKRs) ═══
  /** Financial and human resources */
  resources: Resource[]

  // ═══ Governance ═══
  governance: Governance

  // ═══ Metadata ═══
  metadata: {
    ns: 'company'
    visibility: 'public' | 'private' | 'unlisted'
    created: Date
    updated: Date
  }

  tags: string[]
}

// ============================================================================
// Roles (Linked to OKRs)
// ============================================================================

/**
 * Role Definition
 *
 * Organizational role linked to specific OKRs.
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

  // ═══ OKR Linkage ═══

  /** Objectives owned by this role */
  objectives: string[] // Objective IDs

  /** Key Results this role is accountable for */
  keyResults: string[] // KeyResult IDs

  /** Performance evaluated by OKR achievement */
  performanceEvaluation: {
    basis: 'okr-achievement'
    objectives: string[]
    targetCompletion: number // e.g., 70%
  }

  // ═══ Assignment ═══

  /** Required knowledge, skills, abilities (from ONET) */
  ksa: {
    knowledge: string[]
    skills: string[]
    abilities: string[]
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
    ftePortion: number // 0-1
  }

  /** Compensation */
  compensation?: {
    type: 'salary' | 'hourly' | 'contract' | 'equity' | 'hybrid'
    amount?: number
    currency?: string
    equity?: number
  }

  /** Entity namespace */
  metadata: {
    ns: 'role'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

// ============================================================================
// Operations (Driven by OKRs)
// ============================================================================

/**
 * Operation (Business Process)
 *
 * Operational processes that drive OKR achievement.
 * Every operation should contribute to one or more objectives.
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

  // ═══ OKR Linkage ═══

  /** Objectives this operation supports */
  objectives: string[] // Objective IDs

  /** Key Results this operation impacts */
  keyResults: string[] // KeyResult IDs

  /** How success is measured (tied to KRs) */
  successMetrics: Array<{
    keyResult: string
    contribution: number // % of KR this operation contributes
  }>

  // ═══ Execution ═══

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

// ============================================================================
// Offerings (Contribute to OKRs)
// ============================================================================

/**
 * Offering (Product or Service)
 *
 * What the company sells. Offerings should map to revenue or user KRs.
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

  // ═══ OKR Linkage ═══

  /** Objectives this offering supports */
  objectives: string[] // Objective IDs

  /** Key Results this offering impacts */
  keyResults: string[] // KeyResult IDs (e.g., revenue, users, GMV)

  /** Target contribution to each KR */
  targets: Array<{
    keyResult: string
    target: number // Target contribution
    current: number // Current contribution
  }>

  // ═══ Market ═══

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
    arr?: number
    mrr?: number
    ltv?: number
    cac?: number
  }

  /** Entity namespace */
  metadata: {
    ns: 'offering'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

/**
 * Pricing Model
 */
export interface PricingModel {
  type: 'fixed' | 'subscription' | 'usage' | 'tiered' | 'freemium' | 'value-based' | 'dynamic'
  basePrice?: number
  currency: string
  billingCycle?: 'one-time' | 'monthly' | 'quarterly' | 'annually'
  tiers?: Array<{
    name: string
    price: number
    features: string[]
    limits?: Record<string, number>
  }>
  usage?: {
    metric: string
    pricePerUnit: number
    includedUnits?: number
  }
  volumeDiscounts?: Array<{
    minQuantity: number
    discountPercent: number
  }>
}

/**
 * Delivery Mechanism
 */
export interface DeliveryMechanism {
  type: 'digital' | 'physical' | 'hybrid' | 'managed-service'
  execution: 'automated' | 'manual' | 'hybrid' | 'on-demand'
  technology?: {
    platform?: string
    apis?: string[]
    integrations?: string[]
  }
  fulfillment?: {
    typical: string
    guaranteed?: string
  }
  capacity?: {
    concurrent?: number
    daily?: number
    monthly?: number
  }
}

/**
 * Service Level Agreement
 */
export interface ServiceLevel {
  uptime?: number
  responseTime?: {
    p50?: number
    p95?: number
    p99?: number
  }
  support?: {
    critical?: string
    high?: string
    normal?: string
    low?: string
  }
  quality?: {
    accuracy?: number
    completeness?: number
    customSatisfaction?: number
  }
  penalties?: Array<{
    violation: string
    remedy: string
  }>
}

// ============================================================================
// Metrics (Measure OKRs)
// ============================================================================

/**
 * Metric (KPI)
 *
 * Business metric measuring OKR progress.
 * Every metric should feed into at least one Key Result.
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

  /** Target value (from linked KRs) */
  target?: number

  // ═══ OKR Linkage ═══

  /** Key Results this metric feeds into */
  keyResults: string[] // KeyResult IDs

  /** How this metric maps to KRs */
  mapping: Array<{
    keyResult: string
    contribution: 'primary' | 'secondary' | 'supporting'
    formula?: string // e.g., "metric * 1.2" if conversion needed
  }>

  // ═══ Data Source ═══

  /** Data source */
  source: {
    type: 'api' | 'database' | 'analytics' | 'manual' | 'calculated'
    endpoint?: string
    query?: string
    calculation?: string
  }

  /** Update frequency */
  updateFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly'

  /** Threshold alerts */
  thresholds?: {
    critical?: number
    warning?: number
    good?: number
  }

  /** Historical data */
  history?: Array<{
    timestamp: Date
    value: number
  }>

  /** Entity namespace */
  metadata: {
    ns: 'metric'
    visibility: 'public' | 'private' | 'unlisted'
  }
}

// ============================================================================
// Resources (Allocated to OKRs)
// ============================================================================

/**
 * Resource Allocation
 *
 * Resources allocated to achieve specific OKRs.
 */
export interface Resource {
  /** Unique identifier */
  id: string

  /** Resource type */
  type: 'budget' | 'headcount' | 'infrastructure' | 'capital'

  // ═══ OKR Linkage ═══

  /** Objectives this resource supports */
  objectives: string[] // Objective IDs

  /** Resource allocation by objective */
  allocation: Array<{
    objective: string
    amount: number
    percentage: number
  }>

  // ═══ Financial Resources ═══

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

// ============================================================================
// Governance
// ============================================================================

/**
 * Governance Structure
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
    framework: string
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
 */
export interface GDPvalTask {
  id: string
  occupation: string
  industry: string
  description: string
  economicValue?: number
  complexity: 'low' | 'medium' | 'high'
  automationPotential: number // 0-1
}
