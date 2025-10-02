/**
 * Agent & Organization Types
 *
 * TypeScript interfaces for AI agents, humans, teams, and organizational structure.
 */

import type { OKR } from './business'

// ═══════════════════════════════════════════════════════════
// Core Actor Types
// ═══════════════════════════════════════════════════════════

/**
 * Union type for any actor in the organization
 */
export type Actor = Agent | Human | Team | Department

/**
 * AI Agent
 *
 * Autonomous agent that performs work based on ONET occupational tasks
 */
export interface Agent {
  type: 'agent'

  // ═══ Identity ═══
  id: string
  name: string
  role: string // Occupation title (e.g., "Content Writer", "Software Developer")
  description?: string

  // ═══ ONET Mapping ═══
  occupation: string // ONET SOC code (e.g., '15-1252.00')
  capabilities: string[] // ONET skills, tasks, or knowledge areas
  tools?: string[] // ONET tools/technologies

  // ═══ AI Configuration ═══
  model: AIModel
  provider: AIProvider
  systemPrompt?: string
  temperature?: number // 0-1
  maxTokens?: number

  // ═══ Performance & Metrics ═══
  okr?: OKR
  performance: AgentPerformance
  gdpvalScore?: number // 0-1 (performance on real-world tasks)

  // ═══ Capacity & Load ═══
  capacity: AgentCapacity
  currentLoad: number // 0-1 (0% to 100%)
  availability: Availability

  // ═══ Learning & Improvement ═══
  training?: TrainingConfig
  feedback: Feedback[]
  version: string

  // ═══ Cost ═══
  costPerTask: number
  costPerHour: number
  monthlyBudget?: number

  // ═══ Status ═══
  status: AgentStatus
  createdAt: Date
  lastActiveAt?: Date
}

export type AIModel =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-3.5-turbo'
  | 'claude-3.7-sonnet'
  | 'claude-3.5-haiku'
  | 'claude-3-opus'
  | 'gemini-2.0-flash-thinking-exp'
  | 'gemini-1.5-pro'
  | 'llama-3.1-8b'
  | 'llama-3.1-70b'
  | 'llama-3.1-405b'
  | 'deepseek-chat'
  | 'custom'

export type AIProvider =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'meta'
  | 'cloudflare'
  | 'groq'
  | 'together'
  | 'custom'

export type AgentStatus =
  | 'idle' // Available for work
  | 'busy' // Currently working
  | 'overloaded' // At capacity
  | 'training' // Being trained/improved
  | 'error' // Experiencing issues
  | 'paused' // Temporarily disabled
  | 'archived' // No longer active

/**
 * Human team member
 *
 * Humans can manage agents, handle escalations, provide oversight
 */
export interface Human {
  type: 'human'

  // ═══ Identity ═══
  id: string
  name: string
  email: string
  phone?: string
  role: string
  title?: string

  // ═══ Skills & Expertise ═══
  capabilities: string[] // Similar to agents, based on ONET
  seniority: Seniority
  specializations?: string[]

  // ═══ Management ═══
  reportsTo?: string // Manager ID
  manages: string[] // Direct report IDs (agents + humans)
  okr?: OKR

  // ═══ Capacity & Availability ═══
  workload: number // 0-1 (0% to 100%)
  availability: Availability
  timezone: string

  // ═══ Performance ═══
  performance?: HumanPerformance

  // ═══ Compensation ═══
  salary?: number
  hourlyRate?: number

  // ═══ Contact Preferences ═══
  preferredChannel: 'email' | 'slack' | 'phone' | 'teams'
  notifications: NotificationPreferences

  // ═══ Status ═══
  status: 'active' | 'away' | 'on-leave' | 'inactive'
  createdAt: Date
  lastActiveAt?: Date
}

export type Seniority =
  | 'intern'
  | 'junior'
  | 'mid'
  | 'senior'
  | 'staff'
  | 'principal'
  | 'executive'

/**
 * Team
 *
 * Group of agents and humans working together
 */
export interface Team {
  type: 'team'

  // ═══ Identity ═══
  id: string
  name: string
  description?: string
  function: TeamFunction

  // ═══ Objectives ═══
  okr: OKR
  mission?: string

  // ═══ Organization ═══
  manager: Human | Agent
  members: (Human | Agent)[]
  parent?: string // Parent team/department ID

  // ═══ Capacity ═══
  capacity: TeamCapacity
  currentLoad: number

  // ═══ Performance ═══
  performance: TeamPerformance

  // ═══ Status ═══
  status: 'active' | 'forming' | 'paused' | 'disbanded'
  createdAt: Date
}

export type TeamFunction =
  | 'sales'
  | 'marketing'
  | 'product'
  | 'engineering'
  | 'design'
  | 'customer-success'
  | 'operations'
  | 'finance'
  | 'hr'
  | 'legal'
  | 'general'

/**
 * Department
 *
 * Larger organizational unit containing multiple teams
 */
export interface Department {
  type: 'department'

  // ═══ Identity ═══
  id: string
  name: string
  description?: string
  function: DepartmentFunction

  // ═══ Objectives ═══
  okr: OKR
  mission: string
  vision?: string

  // ═══ Leadership ═══
  head: Human | Agent
  leadership: (Human | Agent)[]

  // ═══ Organization ═══
  teams: Team[]
  allMembers: (Human | Agent)[]

  // ═══ Budget ═══
  budget?: number
  burn Rate?: number

  // ═══ Performance ═══
  performance: DepartmentPerformance

  // ═══ Status ═══
  status: 'active' | 'restructuring' | 'disbanded'
  createdAt: Date
}

export type DepartmentFunction =
  | 'revenue' // Sales + Marketing
  | 'product' // Product + Engineering + Design
  | 'customer' // Customer Success + Support
  | 'operations' // Ops + IT + Facilities
  | 'finance' // Finance + Accounting
  | 'people' // HR + Recruiting
  | 'legal' // Legal + Compliance
  | 'general' // General & Administrative

// ═══════════════════════════════════════════════════════════
// Performance Metrics
// ═══════════════════════════════════════════════════════════

export interface AgentPerformance {
  // ═══ Productivity ═══
  tasksCompleted: number
  tasksPerDay: number
  averageTaskDuration: number // hours

  // ═══ Quality ═══
  averageQuality: number // 0-10
  qualityTrend: 'improving' | 'stable' | 'declining'
  passRate: number // 0-1 (% passing quality checks)
  revisionRate: number // 0-1 (% requiring revisions)

  // ═══ Reliability ═══
  successRate: number // 0-1 (% tasks completed successfully)
  errorRate: number // 0-1
  uptimePct: number // 0-1

  // ═══ Speed ═══
  averageSpeed: number // tasks per hour
  onTimeDelivery: number // 0-1 (% delivered on time)

  // ═══ Cost Efficiency ═══
  costPerTask: number
  costPerHour: number
  totalCost: number

  // ═══ GDPval Score ═══
  gdpvalScore?: number // 0-1 (AI capability on economically valuable tasks)
  gdpvalHistory?: GDPvalAssessment[]

  // ═══ Learning ═══
  improvementRate: number // How quickly quality improves
  adaptability: number // 0-1 (handles new tasks well)

  // ═══ Period ═══
  period: 'day' | 'week' | 'month' | 'quarter' | 'all-time'
  updatedAt: Date
}

export interface HumanPerformance {
  // ═══ Productivity ═══
  tasksCompleted: number
  tasksPerDay: number
  hoursWorked: number

  // ═══ Quality ═══
  averageQuality: number // 0-10
  customerSatisfaction: number // CSAT score

  // ═══ Leadership ═══
  teamPerformance?: number // Average team member performance
  mentorship?: number // Number of people mentored
  retention?: number // 0-1 (team retention rate)

  // ═══ Reviews ═══
  lastReviewDate?: Date
  lastReviewScore?: number // 0-10
  promotionReadiness?: number // 0-1

  // ═══ Period ═══
  period: 'month' | 'quarter' | 'year'
  updatedAt: Date
}

export interface TeamPerformance {
  // ═══ Collective Metrics ═══
  averageQuality: number
  throughput: number // Tasks completed per day
  velocity: number // Story points or equivalent

  // ═══ Collaboration ═══
  collaborationScore: number // 0-10
  handoffEfficiency: number // 0-1
  communicationQuality: number // 0-10

  // ═══ Health ═══
  morale?: number // 0-10 (for human teams)
  turnover?: number // 0-1 (for human teams)
  utilizationRate: number // 0-1 (capacity used)

  // ═══ OKR Progress ═══
  okrProgress: number // 0-100%
  okrsOnTrack: number

  // ═══ Period ═══
  period: 'week' | 'month' | 'quarter'
  updatedAt: Date
}

export interface DepartmentPerformance {
  // ═══ Business Impact ═══
  revenueContribution?: number
  costEfficiency: number // Output / Cost
  roi?: number // Return on Investment

  // ═══ OKR Progress ═══
  okrProgress: number // 0-100%
  okrsAchieved: number
  okrsMissed: number

  // ═══ Team Health ═══
  averageTeamPerformance: number
  crossTeamCollaboration: number // 0-10

  // ═══ Period ═══
  period: 'quarter' | 'year'
  updatedAt: Date
}

export interface GDPvalAssessment {
  date: Date
  score: number // 0-1
  tasks: {
    taskId: string
    taskName: string
    score: number
    humanBaseline: number
  }[]
  overall: {
    tasksEvaluated: number
    tasksPassed: number
    averageScore: number
  }
}

// ═══════════════════════════════════════════════════════════
// Capacity & Availability
// ═══════════════════════════════════════════════════════════

export interface AgentCapacity {
  maxConcurrentTasks: number
  maxTasksPerDay: number
  maxTasksPerMonth: number
  currentTasks: number
  availableSlots: number
}

export interface TeamCapacity {
  totalHours: number // Total hours available
  allocatedHours: number // Hours assigned to tasks
  utilization: number // allocated / total (0-1)
  availableHours: number
}

export interface Availability {
  status: 'available' | 'busy' | 'away' | 'offline'
  schedule?: Schedule
  nextAvailable?: Date
}

export interface Schedule {
  timezone: string
  workingHours: {
    monday: TimeSlot[]
    tuesday: TimeSlot[]
    wednesday: TimeSlot[]
    thursday: TimeSlot[]
    friday: TimeSlot[]
    saturday: TimeSlot[]
    sunday: TimeSlot[]
  }
  holidays?: Date[]
  timeOff?: TimeOffRequest[]
}

export interface TimeSlot {
  start: string // HH:MM
  end: string // HH:MM
}

export interface TimeOffRequest {
  startDate: Date
  endDate: Date
  type: 'vacation' | 'sick' | 'personal' | 'holiday'
  approved: boolean
}

// ═══════════════════════════════════════════════════════════
// Training & Feedback
// ═══════════════════════════════════════════════════════════

export interface TrainingConfig {
  enabled: boolean
  method: 'fine-tuning' | 'few-shot' | 'rag' | 'prompt-engineering'
  frequency: 'continuous' | 'daily' | 'weekly' | 'monthly'
  dataSource: 'production' | 'curated' | 'synthetic'
  minExamples: number
  autoUpdate: boolean
}

export interface Feedback {
  id: string
  source: 'customer' | 'human' | 'automated' | 'peer'
  taskId: string
  rating: number // 0-10
  comments?: string
  categories?: string[] // What was good/bad
  actionable?: boolean
  appliedToTraining?: boolean
  timestamp: Date
}

export interface NotificationPreferences {
  email: boolean
  slack: boolean
  sms: boolean
  push: boolean
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly'
  quietHours?: {
    start: string // HH:MM
    end: string // HH:MM
  }
}

// ═══════════════════════════════════════════════════════════
// Helper Functions & Type Guards
// ═══════════════════════════════════════════════════════════

export function isAgent(actor: Actor): actor is Agent {
  return actor.type === 'agent'
}

export function isHuman(actor: Actor): actor is Human {
  return actor.type === 'human'
}

export function isTeam(actor: Actor): actor is Team {
  return actor.type === 'team'
}

export function isDepartment(actor: Actor): actor is Department {
  return actor.type === 'department'
}

/**
 * Calculate effective capacity considering current load
 */
export function effectiveCapacity(agent: Agent): number {
  const available = agent.capacity.maxConcurrentTasks - agent.capacity.currentTasks
  return Math.max(0, available)
}

/**
 * Check if agent can handle a task
 */
export function canHandleTask(agent: Agent, requiredCapabilities: string[]): boolean {
  if (agent.status !== 'idle' && agent.currentLoad >= 1.0) {
    return false
  }

  return requiredCapabilities.every(cap =>
    agent.capabilities.includes(cap)
  )
}

/**
 * Get best available agent for task
 */
export function findBestAgent(
  agents: Agent[],
  requiredCapabilities: string[],
  preferenceMetric: 'quality' | 'speed' | 'cost' = 'quality'
): Agent | null {
  const available = agents
    .filter(a => canHandleTask(a, requiredCapabilities))
    .sort((a, b) => {
      switch (preferenceMetric) {
        case 'quality':
          return b.performance.averageQuality - a.performance.averageQuality
        case 'speed':
          return b.performance.averageSpeed - a.performance.averageSpeed
        case 'cost':
          return a.costPerTask - b.costPerTask
      }
    })

  return available[0] || null
}
