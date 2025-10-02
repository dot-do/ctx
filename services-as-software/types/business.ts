/**
 * Business-as-Code Core Types
 *
 * TypeScript interfaces for expressing entire businesses as executable code.
 * Enables AI agents to imagine, build, launch, grow, scale, manage, and operate businesses.
 */

import type { Agent, Human, Team, Department } from './agent'
import type { Service } from './service'
import type { Workflow, EventHandler, Schedule } from './workflow'
import type { Integration } from './integration'

/**
 * Complete business definition
 *
 * Express an entire business from vision to operations as TypeScript
 */
export interface Business {
  // ═══ Identity ═══
  id: string
  name: string
  description: string
  domain?: string
  industry: string // NAICS code or industry name

  // ═══ Strategic Vision ═══
  vision: string // Long-term aspirational goal
  mission: string // How you achieve the vision
  values?: string[] // Core principles

  // ═══ Marketing Framework ═══
  storyBrand?: StoryBrand
  leanCanvas?: LeanCanvas
  positioning?: Positioning

  // ═══ Objectives & Key Results ═══
  okrs: OKR[]
  currentQuarter: Quarter
  currentYear: number

  // ═══ Organization ═══
  ceo: Human | Agent
  founders?: (Human | Agent)[]
  board?: (Human | Agent)[]
  org: Department[]
  agents: Agent[]
  humans: Human[]

  // ═══ Business Model ═══
  services: Service[]
  revenue: RevenueModel
  costs: CostStructure
  unit Economics: UnitEconomics

  // ═══ Operations ═══
  workflows: Workflow[]
  events: EventHandler[]
  schedules: Schedule[]

  // ═══ Infrastructure & Integrations ═══
  integrations: Integration[]
  infrastructure?: Infrastructure

  // ═══ Metrics & Performance ═══
  metrics: Metrics
  performance: Performance
  forecast: Forecast

  // ═══ Governance ═══
  policies?: Policy[]
  compliance?: ComplianceRequirement[]

  // ═══ Metadata ═══
  createdAt: Date
  launchedAt?: Date
  status: BusinessStatus
  version: string
}

/**
 * Business lifecycle status
 */
export type BusinessStatus =
  | 'ideation' // Concept stage
  | 'planning' // Creating business plan
  | 'building' // Infrastructure being built
  | 'testing' // Testing systems
  | 'launching' // Go-to-market
  | 'operating' // Running operations
  | 'scaling' // Growing rapidly
  | 'stable' // Mature steady state
  | 'pivoting' // Strategic change
  | 'sunsetting' // Winding down
  | 'archived' // No longer active

/**
 * StoryBrand Framework
 *
 * Donald Miller's proven messaging framework
 * Clarifies marketing message and positions business as guide
 */
export interface StoryBrand {
  hero: string // The customer (not your brand)
  problem: string // What the hero struggles with
  guide: string // Your brand as the wise guide
  solution: string // The plan you provide
  callToAction: string // Clear next step
  success: string // Happy ending
  failure: string // What's at stake
  transformation: string // How hero changes
}

/**
 * Lean Canvas
 *
 * One-page business model adapted from Business Model Canvas
 * Focus on problems, solutions, key metrics
 */
export interface LeanCanvas {
  problem: string[] // Top 1-3 problems
  customerSegments: string[] // Target customer groups
  uniqueValueProposition: string // Clear, compelling message
  solution: string[] // Top 3 features
  channels: string[] // Path to customers
  revenueStreams: string[] // How you make money
  costStructure: string[] // Key costs
  keyMetrics: string[] // Numbers that matter
  unfairAdvantage: string // Can't be easily copied
}

/**
 * Market positioning
 */
export interface Positioning {
  category: string // Market category
  differentiation: string // What makes you different
  targetCustomer: string // Who you serve
  alternatives: string[] // What they use now
  advantages: string[] // Why you're better
}

/**
 * Objectives & Key Results
 *
 * Google's goal-setting framework
 * Cascades from company → department → team → individual
 */
export interface OKR {
  // ═══ Definition ═══
  objective: string // Qualitative, inspirational
  keyResults: KeyResult[] // Quantitative, measurable

  // ═══ Ownership ═══
  owner: Agent | Human | Team | Department
  contributors?: (Agent | Human)[]

  // ═══ Timeline ═══
  timeframe: Timeframe
  startDate: Date
  endDate: Date

  // ═══ Hierarchy ═══
  parent?: OKR
  children?: OKR[]
  level: OKRLevel

  // ═══ Status ═══
  status: OKRStatus
  progress: number // 0-100%
  confidence: number // 0-1 (likelihood of achieving)
  health: HealthStatus

  // ═══ Tracking ═══
  history: KRSnapshot[]
  lastUpdated: Date
}

export type Timeframe = 'week' | 'month' | 'quarter' | 'year'

export type OKRLevel =
  | 'company' // Top-level business objectives
  | 'business-unit' // Division objectives
  | 'department' // Functional objectives
  | 'team' // Team objectives
  | 'individual' // Personal objectives

export type OKRStatus =
  | 'draft' // Being defined
  | 'active' // In progress
  | 'at-risk' // Behind schedule
  | 'on-track' // Progressing well
  | 'exceeded' // Surpassing targets
  | 'completed' // Achieved
  | 'missed' // Not achieved
  | 'cancelled' // Abandoned

export type HealthStatus =
  | 'green' // On track
  | 'yellow' // At risk
  | 'red' // Behind

/**
 * Key Result
 *
 * Measurable metric with current value and target
 */
export interface KeyResult {
  metric: string // What you're measuring
  current: number // Current value
  target: number // Target value
  unit: string // Unit of measurement
  progress: number // 0-100%
  trend: Trend
  confidence: number // 0-1
  formula?: string // How to calculate (e.g., "ARR / 12")
  source?: string // Where data comes from
}

export type Trend =
  | 'up' // Improving
  | 'down' // Declining
  | 'flat' // Stable
  | 'volatile' // Fluctuating

/**
 * Key Result historical snapshot
 */
export interface KRSnapshot {
  date: Date
  keyResults: {
    metric: string
    value: number
    delta: number // Change from previous
    forecast: number // Predicted end value
  }[]
  commentary?: string
  adjustments?: string[]
}

/**
 * Quarter definition
 */
export interface Quarter {
  year: number
  quarter: 1 | 2 | 3 | 4
  startDate: Date
  endDate: Date
  theme?: string
}

/**
 * Revenue model
 */
export interface RevenueModel {
  streams: RevenueStream[]
  totalARR?: number // Annual Recurring Revenue
  totalMRR?: number // Monthly Recurring Revenue
  growth: GrowthMetrics
}

export interface RevenueStream {
  name: string
  type: 'subscription' | 'transaction' | 'service' | 'license' | 'advertising' | 'other'
  amount: number
  percentage: number // % of total revenue
  growth: number // YoY growth rate
}

export interface GrowthMetrics {
  mrr: number // Monthly Recurring Revenue
  arr: number // Annual Recurring Revenue
  mrrGrowth: number // Month-over-month %
  arrGrowth: number // Year-over-year %
  churnRate: number // % customers lost
  expansionRevenue: number // Upsell/cross-sell
  netRevenueRetention: number // (1 - churn + expansion)
}

/**
 * Cost structure
 */
export interface CostStructure {
  fixed: FixedCost[]
  variable: VariableCost[]
  totalMonthly: number
  totalAnnual: number
  breakdown: {
    engineering: number
    sales: number
    marketing: number
    operations: number
    infrastructure: number
    other: number
  }
}

export interface FixedCost {
  name: string
  category: string
  amount: number
  frequency: 'monthly' | 'quarterly' | 'yearly'
}

export interface VariableCost {
  name: string
  category: string
  costPerUnit: number
  units: number
  total: number
}

/**
 * Unit economics
 */
export interface UnitEconomics {
  cac: number // Customer Acquisition Cost
  ltv: number // Lifetime Value
  cacLtvRatio: number // LTV / CAC (should be 3+ )
  paybackPeriod: number // Months to recover CAC
  grossMargin: number // (Revenue - COGS) / Revenue
  netMargin: number // (Revenue - All Costs) / Revenue
}

/**
 * Infrastructure definition
 */
export interface Infrastructure {
  provider: 'cloudflare' | 'aws' | 'gcp' | 'azure' | 'vercel' | 'netlify'
  regions: string[]
  compute: ComputeConfig
  database: DatabaseConfig
  storage: StorageConfig
  cdn: CDNConfig
  monitoring: MonitoringConfig
  estimated Cost: number // Monthly cost estimate
}

export interface ComputeConfig {
  type: 'serverless' | 'containers' | 'vms'
  service: string // e.g., "Workers", "Lambda", "Cloud Run"
  instances?: number
  memory?: number
  cpu?: number
}

export interface DatabaseConfig {
  type: 'postgresql' | 'mysql' | 'mongodb' | 'dynamodb' | 'firestore'
  provider: string // e.g., "Neon", "PlanetScale", "Atlas"
  size: string
  backups: boolean
  replication?: string
}

export interface StorageConfig {
  type: 's3' | 'r2' | 'gcs' | 'azure-blob'
  provider: string
  size: string
}

export interface CDNConfig {
  provider: string
  caching: boolean
  compression: boolean
}

export interface MonitoringConfig {
  logging: string // e.g., "Datadog", "LogFlare"
  metrics: string
  alerts: string
  uptime: string
}

/**
 * Key business metrics
 */
export interface Metrics {
  // ═══ Growth ═══
  users: number
  activeUsers: number
  newUsers: number
  churnedUsers: number

  // ═══ Revenue ═══
  mrr: number
  arr: number
  revenue: number

  // ═══ Sales ═══
  leads: number
  opportunities: number
  deals: number
  pipeline: number

  // ═══ Product ═══
  engagement: number
  retention: number
  nps: number

  // ═══ Operations ═══
  uptime: number
  errorRate: number
  latency: number

  // ═══ Financial ═══
  burnRate: number
  runway: number
  cashBalance: number

  // ═══ Team ═══
  teamSize: number
  agentCount: number
  humanCount: number

  // ═══ Timestamps ═══
  period: 'day' | 'week' | 'month' | 'quarter' | 'year'
  date: Date
}

/**
 * Performance indicators
 */
export interface Performance {
  // ═══ Overall Health ═══
  health: HealthStatus
  score: number // 0-100

  // ═══ OKR Progress ═══
  okrProgress: number // Average progress across all OKRs
  okrsOnTrack: number
  okrsAtRisk: number
  okrsMissed: number

  // ═══ Efficiency ═══
  agentUtilization: number // % of agent capacity used
  humanUtilization: number // % of human capacity used
  costPerOrder: number
  revenuePerAgent: number

  // ═══ Quality ═══
  customerSatisfaction: number // CSAT score
  nps: number // Net Promoter Score
  qualityScore: number // Deliverable quality

  // ═══ Speed ═══
  avgResponseTime: number
  avgFulfillmentTime: number
  onTimeDelivery: number // %
}

/**
 * Business forecast
 */
export interface Forecast {
  timeframe: Timeframe
  periods: number
  predictions: {
    revenue: number[]
    costs: number[]
    profit: number[]
    users: number[]
    churn: number[]
  }
  confidence: number // 0-1
  assumptions: string[]
  risks: string[]
}

/**
 * Business policy
 */
export interface Policy {
  id: string
  name: string
  category: 'hr' | 'finance' | 'legal' | 'security' | 'operations'
  description: string
  rules: Rule[]
  enforcement: 'automated' | 'manual' | 'hybrid'
  updatedAt: Date
}

export interface Rule {
  condition: string
  action: string
  owner: string
  exceptions?: string[]
}

/**
 * Compliance requirement
 */
export interface ComplianceRequirement {
  standard: string // e.g., "SOC 2", "GDPR", "HIPAA"
  status: 'compliant' | 'in-progress' | 'non-compliant'
  controls: Control[]
  certifications?: Certification[]
  audits?: Audit[]
}

export interface Control {
  id: string
  description: string
  implemented: boolean
  evidence?: string[]
}

export interface Certification {
  name: string
  issuer: string
  validFrom: Date
  validUntil: Date
  document?: string
}

export interface Audit {
  type: string
  auditor: string
  date: Date
  findings: Finding[]
  passed: boolean
}

export interface Finding {
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  remediation: string
  status: 'open' | 'resolved'
}

/**
 * Type guards and utilities
 */

export function isAgent(owner: Agent | Human | Team | Department): owner is Agent {
  return (owner as Agent).type === 'agent'
}

export function isHuman(owner: Agent | Human | Team | Department): owner is Human {
  return (owner as Human).type === 'human'
}

export function isTeam(owner: Agent | Human | Team | Department): owner is Team {
  return 'members' in owner && Array.isArray((owner as Team).members)
}

export function isDepartment(owner: Agent | Human | Team | Department): owner is Department {
  return 'function' in owner && 'teams' in owner
}
