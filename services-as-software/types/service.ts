/**
 * Service Definition Types
 *
 * TypeScript interfaces for defining AI-delivered services based on ONET occupational data.
 * Services are work previously performed by humans, now deliverable by AI agents.
 */

import type { Agent, Human } from './agent'
import type { Workflow } from './workflow'
import type { PricingModel } from './pricing'

/**
 * Service definition
 *
 * A service is a deliverable outcome (previously requiring human work)
 * now delivered by AI agents with guaranteed quality and turnaround.
 */
export interface Service {
  // ═══ Identity ═══
  id: string
  name: string
  description: string
  category: ServiceCategory

  // ═══ ONET Mapping ═══
  occupation: string // ONET SOC code (e.g., '15-1252.00')
  occupationTitle?: string
  tasks: string[] // ONET task IDs
  skills?: string[] // ONET skill names
  knowledge?: string[] // ONET knowledge areas
  tools?: string[] // ONET tools/technologies

  // ═══ AI Capability ═══
  gdpvalScore?: number // 0-1 (AI performance on real-world tasks)
  aiReady: boolean // Can AI deliver this reliably?
  humanBackup: boolean // Humans available for escalation?

  // ═══ Deliverable ═══
  deliverable: Deliverable
  examples?: string[] // URLs to example deliverables

  // ═══ Timeline ═══
  turnaroundTime: Duration
  minimumTime?: Duration
  rushAvailable: boolean

  // ═══ Quality ═══
  quality: QualitySpec
  guarantees: Guarantee[]
  sla: SLA

  // ═══ Pricing ═══
  pricing: PricingModel
  discounts?: Discount[]

  // ═══ Fulfillment ═══
  fulfillmentWorkflow: Workflow
  assignedAgents: Agent[]
  backupHumans?: Human[]
  capacity: ServiceCapacity

  // ═══ Requirements ═══
  brief Template: object // Schema for customer brief
  requiredFiles?: FileRequirement[]
  restrictions?: string[] // What's not allowed

  // ═══ Add-ons ═══
  addOns?: AddOn[]
  bundledWith?: string[] // Service IDs

  // ═══ Status ═══
  status: ServiceStatus
  createdAt: Date
  updatedAt: Date
}

export type ServiceCategory =
  | 'content' // Writing, editing, translation
  | 'design' // Graphics, UI/UX, branding
  | 'code' // Software development, debugging
  | 'data' // Analysis, visualization, reports
  | 'marketing' // Campaigns, SEO, ads
  | 'legal' // Document review, contracts
  | 'accounting' // Bookkeeping, taxes, reports
  | 'consulting' // Strategy, advice, planning
  | 'support' // Customer service, help desk
  | 'research' // Market research, competitive analysis
  | 'custom' // Other

export type ServiceStatus =
  | 'draft' // Being defined
  | 'active' // Available for orders
  | 'paused' // Temporarily unavailable
  | 'deprecated' // Being phased out
  | 'archived' // No longer offered

/**
 * Deliverable specification
 *
 * What the customer receives
 */
export interface Deliverable {
  type: DeliverableType
  format: string // File format or delivery method
  schema?: object // JSON schema for validation
  size?: DeliverableSize
  specifications: Specification[]
}

export type DeliverableType =
  | 'document' // Text document (article, report, etc.)
  | 'code' // Source code (scripts, apps, etc.)
  | 'design' // Visual design (logo, mockup, etc.)
  | 'data' // Dataset or analysis
  | 'media' // Audio, video, images
  | 'website' // Complete website
  | 'application' // Software application
  | 'strategy' // Strategic plan or playbook
  | 'custom' // Other

export interface DeliverableSize {
  min: number
  max: number
  unit: string // e.g., "words", "pages", "files", "MB"
}

export interface Specification {
  name: string
  description: string
  required: boolean
  default?: any
  validation?: string // Regex or JSON schema
}

/**
 * Duration
 */
export interface Duration {
  value: number
  unit: 'minutes' | 'hours' | 'days' | 'weeks' | 'months'
}

/**
 * Quality specification
 */
export interface QualitySpec {
  criteria: QualityCriterion[]
  minimumScore: number // 0-10
  reviewProcess: ReviewProcess
  acceptanceThreshold: number // % of criteria that must pass
}

export interface QualityCriterion {
  id: string
  name: string
  description: string
  weight: number // 0-1 (must sum to 1.0)
  evaluator: Evaluator
  tool?: string // Tool used for evaluation
  passingScore: number // Minimum score to pass (0-10)
}

export type Evaluator =
  | 'ai' // AI-powered evaluation
  | 'human' // Human reviewer
  | 'automated-test' // Automated testing tool
  | 'customer' // Customer approval
  | 'peer-review' // Other agents/humans review

export type ReviewProcess =
  | 'automated' // Fully automated quality checks
  | 'human' // Manual human review
  | 'hybrid' // Automated + human sampling
  | 'customer-only' // Customer decides

/**
 * Service Level Agreement
 */
export interface SLA {
  // ═══ Response Times ═══
  firstResponseTime: Duration // How quickly we acknowledge
  resolutionTime: Duration // How quickly we complete

  // ═══ Availability ═══
  uptime: number // 0-1 (e.g., 0.99 = 99%)
  supportHours: SupportHours

  // ═══ Quality ═══
  qualityGuarantee: number // Minimum quality score (0-10)
  revisionLimit: number // Number of free revisions
  revisionTurnaround: Duration

  // ═══ Remedies ═══
  refundPolicy: RefundPolicy
  penalties?: SLAPenalty[]

  // ═══ Monitoring ═══
  reportingFrequency: 'realtime' | 'daily' | 'weekly' | 'monthly'
}

export interface SupportHours {
  timezone: string
  schedule: {
    monday: TimeRange[]
    tuesday: TimeRange[]
    wednesday: TimeRange[]
    thursday: TimeRange[]
    friday: TimeRange[]
    saturday: TimeRange[]
    sunday: TimeRange[]
  }
  holidays?: Date[]
}

export interface TimeRange {
  start: string // HH:MM format
  end: string // HH:MM format
}

export interface RefundPolicy {
  conditions: RefundCondition[]
  process: string // How to request refund
  turnaround: Duration // How long to process
}

export interface RefundCondition {
  condition: string // What triggers refund
  refundAmount: 'full' | 'partial' | 'credit'
  partialPercentage?: number // If partial
}

export interface SLAPenalty {
  threshold: string // e.g., "uptime < 99%"
  penalty: string // e.g., "10% credit"
}

/**
 * Guarantee
 */
export interface Guarantee {
  type: GuaranteeType
  description: string
  remedy: string // What customer gets if not met
  limitations?: string[] // Exclusions
}

export type GuaranteeType =
  | 'satisfaction' // Money-back if not satisfied
  | 'outcome' // Specific outcome guaranteed
  | 'timeline' // Delivery by date guaranteed
  | 'quality' // Quality score guaranteed
  | 'accuracy' // Factual accuracy guaranteed
  | 'originality' // No plagiarism guaranteed
  | 'compliance' // Legal/regulatory compliance
  | 'security' // Data security/privacy

/**
 * Service capacity
 */
export interface ServiceCapacity {
  maxConcurrentOrders: number
  maxOrdersPerDay: number
  maxOrdersPerMonth: number
  currentLoad: number // 0-1 (0% to 100%)
  availableSlots: number
  estimatedWaitTime?: Duration
}

/**
 * File requirement
 */
export interface FileRequirement {
  type: string // e.g., "logo", "dataset", "reference"
  formats: string[] // Accepted file formats
  maxSize: number // In MB
  required: boolean
  description: string
}

/**
 * Add-on service
 */
export interface AddOn {
  id: string
  name: string
  description: string
  price: number
  turnaroundImpact?: Duration // How much longer it takes
  requiredFor?: string[] // Service IDs that require this
}

/**
 * Discount
 */
export interface Discount {
  id: string
  code?: string // Promo code
  type: DiscountType
  amount: number
  conditions: DiscountCondition[]
  validFrom?: Date
  validUntil?: Date
  maxUses?: number
  currentUses: number
}

export type DiscountType =
  | 'percentage' // % off
  | 'fixed' // Fixed amount off
  | 'bulk' // Quantity discount
  | 'subscription' // Recurring discount

export interface DiscountCondition {
  field: string // e.g., "quantity", "totalValue", "customerType"
  operator: '>' | '>=' | '<' | '<=' | '==' | '!='
  value: any
}

/**
 * Service templates for common types
 */

export const BlogPostService: Partial<Service> = {
  category: 'content',
  occupation: '27-3042.00', // Technical Writers
  deliverable: {
    type: 'document',
    format: 'markdown',
    size: { min: 1500, max: 2500, unit: 'words' },
    specifications: [
      { name: 'Title', description: 'Engaging title', required: true },
      { name: 'Keywords', description: 'SEO keywords', required: true },
      { name: 'Meta Description', description: 'Search snippet', required: true },
      { name: 'Images', description: 'Featured image + inline images', required: false }
    ]
  },
  turnaroundTime: { value: 3, unit: 'days' },
  quality: {
    criteria: [
      {
        id: 'seo',
        name: 'SEO Score',
        description: 'Yoast/Surfer SEO score',
        weight: 0.3,
        evaluator: 'automated-test',
        tool: 'Yoast SEO',
        passingScore: 8.0
      },
      {
        id: 'readability',
        name: 'Readability',
        description: 'Flesch Reading Ease',
        weight: 0.2,
        evaluator: 'automated-test',
        tool: 'Hemingway',
        passingScore: 6.0
      },
      {
        id: 'originality',
        name: 'Originality',
        description: 'Passes plagiarism check',
        weight: 0.3,
        evaluator: 'automated-test',
        tool: 'Copyscape',
        passingScore: 9.5
      },
      {
        id: 'relevance',
        name: 'Relevance',
        description: 'Matches brief and keywords',
        weight: 0.2,
        evaluator: 'ai',
        passingScore: 8.0
      }
    ],
    minimumScore: 8.0,
    reviewProcess: 'automated',
    acceptanceThreshold: 0.75
  }
}

export const LogoDesignService: Partial<Service> = {
  category: 'design',
  occupation: '27-1024.00', // Graphic Designers
  deliverable: {
    type: 'design',
    format: 'svg + png',
    specifications: [
      { name: 'Concepts', description: '3 initial concepts', required: true, default: 3 },
      { name: 'Revisions', description: 'Refinement rounds', required: true, default: 2 },
      { name: 'File Formats', description: 'SVG, PNG (various sizes), PDF', required: true },
      { name: 'Brand Guide', description: 'Color codes, usage rules', required: false }
    ]
  },
  turnaroundTime: { value: 5, unit: 'days' },
  quality: {
    criteria: [
      {
        id: 'visual',
        name: 'Visual Appeal',
        description: 'Aesthetic quality',
        weight: 0.4,
        evaluator: 'human',
        passingScore: 8.0
      },
      {
        id: 'versatility',
        name: 'Versatility',
        description: 'Works at all sizes and contexts',
        weight: 0.3,
        evaluator: 'human',
        passingScore: 8.0
      },
      {
        id: 'uniqueness',
        name: 'Uniqueness',
        description: 'Original and distinctive',
        weight: 0.3,
        evaluator: 'human',
        passingScore: 8.0
      }
    ],
    minimumScore: 8.0,
    reviewProcess: 'hybrid',
    acceptanceThreshold: 1.0
  }
}

export const CodeReviewService: Partial<Service> = {
  category: 'code',
  occupation: '15-1252.00', // Software Developers
  deliverable: {
    type: 'document',
    format: 'markdown',
    specifications: [
      { name: 'Issues Found', description: 'List of issues with severity', required: true },
      { name: 'Recommendations', description: 'Suggested improvements', required: true },
      { name: 'Code Examples', description: 'Example fixes', required: false },
      { name: 'Overall Score', description: 'Code quality score 0-10', required: true }
    ]
  },
  turnaroundTime: { value: 1, unit: 'days' },
  quality: {
    criteria: [
      {
        id: 'coverage',
        name: 'Coverage',
        description: 'All code reviewed',
        weight: 0.3,
        evaluator: 'automated-test',
        passingScore: 9.0
      },
      {
        id: 'accuracy',
        name: 'Accuracy',
        description: 'Issues are valid',
        weight: 0.4,
        evaluator: 'automated-test',
        tool: 'ESLint',
        passingScore: 9.0
      },
      {
        id: 'actionability',
        name: 'Actionability',
        description: 'Recommendations are clear',
        weight: 0.3,
        evaluator: 'ai',
        passingScore: 8.0
      }
    ],
    minimumScore: 8.5,
    reviewProcess: 'automated',
    acceptanceThreshold: 0.8
  }
}
