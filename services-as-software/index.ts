/**
 * Services-as-Software Framework
 *
 * Export all types and utilities for building AI-native service businesses
 *
 * @example
 * ```typescript
 * import { Business, Service, Agent, Order } from '@/services-as-software'
 *
 * const myBusiness = Business({
 *   name: 'AI Design Studio',
 *   services: [logoDesign, websiteDesign],
 *   agents: [designerAgent],
 *   okrs: [q4Objective]
 * })
 *
 * myBusiness.on('order.created', handleOrder)
 * myBusiness.every('day at 06:00', updateMetrics)
 * ```
 */

// ═══════════════════════════════════════════════════════════
// Core Types
// ═══════════════════════════════════════════════════════════

export type {
  // Business
  Business,
  BusinessStatus,
  StoryBrand,
  LeanCanvas,
  Positioning,
  OKR,
  KeyResult,
  OKRLevel,
  OKRStatus,
  HealthStatus,
  Quarter,
  RevenueModel,
  RevenueStream,
  GrowthMetrics,
  CostStructure,
  UnitEconomics,
  Infrastructure,
  Metrics,
  Performance,
  Forecast,
  Policy,
  ComplianceRequirement
} from './types/business'

export type {
  // Service
  Service,
  ServiceCategory,
  ServiceStatus,
  Deliverable,
  DeliverableType,
  DeliverableSize,
  Specification,
  Duration,
  QualitySpec,
  QualityCriterion,
  Evaluator,
  ReviewProcess,
  SLA,
  SupportHours,
  RefundPolicy,
  Guarantee,
  GuaranteeType,
  ServiceCapacity,
  FileRequirement,
  AddOn,
  Discount,
  DiscountType
} from './types/service'

export type {
  // Pricing
  PricingModel,
  CostBasedPricing,
  MarginBasedPricing,
  ActivityBasedPricing,
  OutcomeBasedPricing,
  SubscriptionPricing,
  UsageBasedPricing,
  ValueBasedPricing,
  CompetitorBasedPricing,
  DynamicPricing,
  TieredPricing,
  PriceContext,
  PriceCalculation,
  PriceBreakdown
} from './types/pricing'

export type {
  // Workflow
  EventHandler,
  SystemEvent,
  OrderCreatedEvent,
  WorkCompletedEvent,
  QualityCheckEvent,
  MetricThresholdEvent,
  ExecutionContext,
  SchedulePattern,
  ScheduledHandler,
  ForEachPattern,
  IteratorHandler,
  SendMessage,
  EmailMessage,
  SlackMessage,
  SMSMessage,
  QueueMessage,
  WebhookMessage,
  PushNotification,
  AIHelpers,
  DatabaseHelpers,
  QueueHelpers,
  SlackHelpers,
  EmailHelpers,
  Workflow,
  WorkflowTrigger,
  WorkflowStep,
  StepType,
  RetryPolicy,
  ErrorHandling,
  Integration,
  IntegrationType
} from './types/workflow'

export type {
  // Agent
  Agent,
  Human,
  Team,
  Department,
  Actor,
  AIModel,
  AIProvider,
  AgentStatus,
  Seniority,
  TeamFunction,
  DepartmentFunction,
  AgentPerformance,
  HumanPerformance,
  TeamPerformance,
  DepartmentPerformance,
  GDPvalAssessment,
  AgentCapacity,
  TeamCapacity,
  Availability,
  Schedule,
  TrainingConfig,
  Feedback,
  NotificationPreferences
} from './types/agent'

export type {
  // Order
  Order,
  OrderStatus,
  OrderPriority,
  OrderSource,
  Customer,
  CustomerStatus,
  CustomerTier,
  CustomerPreferences,
  Payment,
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
  Invoice,
  InvoiceStatus,
  QualityCheck,
  Revision,
  Feedback as OrderFeedback,
  Message,
  Notification,
  NotificationType,
  OrderFile,
  SLAStatus,
  SLABreach,
  StatusChange
} from './types/order'

export type {
  // Semantic Business (Schema.org + EPCIS)
  Thing,
  Person,
  Organization,
  Product,
  ServiceThing,
  Offer,
  PriceSpecification,
  Place,
  GeoCoordinates,
  Action,
  ActionStatus,
  CreateAction,
  AssignAction,
  SendAction,
  ReceiveAction,
  UpdateAction,
  DeleteAction,
  CheckAction,
  EPCISEvent,
  QuantityElement,
  Location,
  BusinessStep,
  Disposition,
  BizTransaction,
  Source,
  Destination,
  BusinessEvent,
  SubjectProxy,
  ActorProxy,
  ThingProxy,
  VerbProxy,
  PassiveVerbProxy,
  ContextProxy,
  PropertyProxy,
  QueryProxy,
  StateProxy
} from './types/semantic-business'

export { SemanticBusiness } from './types/semantic-business'

export type {
  // O*NET + NAICS
  NAICSCode,
  NAICSIndustry,
  ONETCode,
  ONETOccupation,
  ONETTask,
  ONETKnowledge,
  ONETSkill,
  ONETAbility,
  ONETWorkActivity,
  ONETWorkContext,
  EducationLevel,
  ExperienceLevel,
  TrainingLevel,
  HollandCode,
  WorkValue,
  Occupation,
  MonetaryAmount,
  OrganizationType
} from './types/onet-naics'

export {
  NAICS_CODES,
  GDPVAL_OCCUPATIONS as GDPVAL_OCCUPATION_DETAILS,
  getNAICSIndustry,
  getONETOccupation,
  isAISuitable,
  getAISuitability,
  onetToSchemaOccupation,
  getDeliverableServices,
  getIndustryServices,
  calculateServicePricing
} from './types/onet-naics'

// ═══════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════

export {
  // Business helpers
  isAgent,
  isHuman,
  isTeam,
  isDepartment
} from './types/business'

export {
  // Agent helpers
  effectiveCapacity,
  canHandleTask,
  findBestAgent
} from './types/agent'

export {
  // Pricing calculations
  calculateCostBasedPrice,
  calculateMarginBasedPrice,
  calculateActivityBasedPrice,
  calculateOutcomeBasedPrice,
  calculateSubscriptionPrice,
  calculateUsageBasedPrice,
  calculateValueBasedPrice,
  calculateCompetitorBasedPrice,
  calculateDynamicPrice,
  calculateTieredPrice
} from './types/pricing'

export {
  // Order helpers
  calculateOrderHealth,
  calculateLTV,
  isOrderAtRisk,
  getNextAction,
  calculateChurnRisk
} from './types/order'

// ═══════════════════════════════════════════════════════════
// Service Templates
// ═══════════════════════════════════════════════════════════

export { BlogPostService, LogoDesignService, CodeReviewService } from './types/service'

// ═══════════════════════════════════════════════════════════
// Examples
// ═══════════════════════════════════════════════════════════

export {
  contentAgency,
  blogPostService,
  writerAgent,
  handleOrderCreated,
  updateOKRs,
  initContentAgency,
  registerHandlers,
  exampleOrderFlow
} from './examples/content-agency'

export {
  contentAgency as semanticContentAgency,
  contentAgencyOrg,
  blogPostService as semanticBlogPostService,
  initSemanticBusiness,
  exampleOrderFulfillment,
  examplePassiveVoice,
  exampleCompoundSentences,
  exampleQuestions,
  exampleFullScenario,
  showComparison
} from './examples/semantic-content-agency'

export {
  contentAgency as onetContentAgency,
  designAgency,
  softwareAgency,
  seoBlogPostService,
  logoDesignService,
  apiDevelopmentService,
  knowledgeGraph,
  findAIServices,
  findServicesByIndustry,
  findServicesByOccupation,
  calculateMarketOpportunity
} from './examples/onet-naics-integration'

// ═══════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════

/**
 * GDPval occupations
 *
 * 44 occupations from top GDP-contributing industries evaluated by GDPval
 */
export const GDPVAL_OCCUPATIONS = [
  '27-3042.00', // Technical Writers
  '15-1252.00', // Software Developers
  '27-1024.00', // Graphic Designers
  '13-2011.00', // Accountants and Auditors
  '23-1011.00', // Lawyers
  '13-1111.00', // Management Analysts
  '11-2021.00', // Marketing Managers
  '41-3099.00' // Sales Representatives
  // ... 36 more
] as const

/**
 * Common ONET task categories
 */
export const ONET_TASK_CATEGORIES = {
  WRITING: 'Writing and documenting',
  ANALYSIS: 'Analyzing information',
  COMMUNICATION: 'Communicating with others',
  PROBLEM_SOLVING: 'Solving complex problems',
  ORGANIZATION: 'Organizing and planning',
  TECHNICAL: 'Using technology',
  COLLABORATION: 'Working with teams',
  DECISION_MAKING: 'Making decisions'
} as const

/**
 * Service quality benchmarks
 */
export const QUALITY_BENCHMARKS = {
  EXCELLENT: 9.0,
  GOOD: 8.0,
  ACCEPTABLE: 7.0,
  NEEDS_IMPROVEMENT: 6.0,
  FAILING: 5.0
} as const

/**
 * Standard SLA tiers
 */
export const SLA_TIERS = {
  PREMIUM: {
    uptime: 0.999,
    responseTime: { value: 15, unit: 'minutes' as const },
    resolutionTime: { value: 4, unit: 'hours' as const }
  },
  STANDARD: {
    uptime: 0.99,
    responseTime: { value: 2, unit: 'hours' as const },
    resolutionTime: { value: 24, unit: 'hours' as const }
  },
  BASIC: {
    uptime: 0.95,
    responseTime: { value: 1, unit: 'days' as const },
    resolutionTime: { value: 3, unit: 'days' as const }
  }
} as const

/**
 * Recommended pricing margins
 */
export const PRICING_MARGINS = {
  CONTENT: 0.70, // 70% margin (low cost, high automation)
  DESIGN: 0.60, // 60% margin (medium cost, some human review)
  CODE: 0.50, // 50% margin (higher cost, human oversight)
  CONSULTING: 0.80, // 80% margin (knowledge-based, low direct cost)
  LEGAL: 0.75 // 75% margin (expertise premium)
} as const

/**
 * Unit economics benchmarks
 */
export const UNIT_ECONOMICS_BENCHMARKS = {
  EXCELLENT: {
    cacLtvRatio: 5.0, // LTV/CAC > 5
    paybackPeriod: 3, // < 3 months
    grossMargin: 0.75, // > 75%
    netMargin: 0.40 // > 40%
  },
  GOOD: {
    cacLtvRatio: 3.0,
    paybackPeriod: 6,
    grossMargin: 0.60,
    netMargin: 0.25
  },
  ACCEPTABLE: {
    cacLtvRatio: 2.0,
    paybackPeriod: 12,
    grossMargin: 0.50,
    netMargin: 0.15
  }
} as const

// ═══════════════════════════════════════════════════════════
// Framework Documentation
// ═══════════════════════════════════════════════════════════

/**
 * # Services-as-Software Framework
 *
 * ## Overview
 *
 * Services-as-Software enables AI agents to deliver services that previously
 * required human workers, with guaranteed quality, turnaround times, and pricing.
 *
 * Built on ONET occupational data and evaluated using GDPval (OpenAI's framework
 * for measuring AI on real-world economically valuable tasks).
 *
 * ## Core Concepts
 *
 * ### 1. Business-as-Code
 *
 * Express entire businesses as TypeScript:
 * - Strategic vision (StoryBrand, Lean Canvas)
 * - OKRs cascading from company → department → team → individual
 * - Revenue model and unit economics
 * - Organization structure (agents + humans)
 * - Operations and workflows
 *
 * ### 2. ONET Occupation Mapping
 *
 * Every service maps to ONET Standard Occupational Classification:
 * - SOC code (e.g., '27-3042.00' for Technical Writers)
 * - Tasks (what the occupation does)
 * - Skills (abilities required)
 * - Knowledge (domains of expertise)
 * - Tools/Technologies (what they use)
 *
 * ### 3. GDPval AI Capability Assessment
 *
 * Services are evaluated using GDPval scoring (0-1):
 * - 0.9+ : AI exceeds human baseline
 * - 0.7-0.9 : AI approaches human capability
 * - 0.5-0.7 : AI competent with oversight
 * - <0.5 : Human-led with AI assistance
 *
 * ### 4. Outcome-Based Pricing
 *
 * Price services based on value delivered, not time spent:
 * - Fixed price per deliverable
 * - Quality tiers (premium/standard/basic)
 * - SLA guarantees (quality, turnaround)
 * - Refund policies for unmet standards
 *
 * ### 5. Event-Driven Execution
 *
 * Elegant method-based API:
 * - `.on(event, handler)` - React to events
 * - `.every(schedule, handler)` - Scheduled tasks
 * - `.send(message)` - Send notifications
 * - `.forEach(entity, handler)` - Bulk operations
 *
 * ## Quick Start
 *
 * ### 1. Define Your Business
 *
 * ```typescript
 * import { Business, Service, Agent } from '@/services-as-software'
 *
 * const myBusiness: Business = {
 *   name: 'AI Design Studio',
 *   vision: 'World-class design at software prices',
 *   storyBrand: {
 *     hero: 'Startups needing professional design',
 *     problem: 'Design is slow and expensive',
 *     guide: 'AI Design Studio',
 *     solution: 'AI-powered design with guaranteed quality',
 *     // ...
 *   },
 *   okrs: [quarterlyOKR],
 *   services: [logoDesign, websiteDesign],
 *   agents: [designAgent]
 * }
 * ```
 *
 * ### 2. Define Services
 *
 * ```typescript
 * const logoDesign: Service = {
 *   name: 'Logo Design',
 *   occupation: '27-1024.00', // Graphic Designers
 *   gdpvalScore: 0.75,
 *   deliverable: {
 *     type: 'design',
 *     format: 'svg + png',
 *     specifications: [...]
 *   },
 *   pricing: {
 *     type: 'outcome-based',
 *     basePrice: 499
 *   },
 *   sla: {
 *     resolutionTime: { value: 5, unit: 'days' },
 *     qualityGuarantee: 8.0
 *   }
 * }
 * ```
 *
 * ### 3. Deploy AI Agents
 *
 * ```typescript
 * const designAgent: Agent = {
 *   name: 'DesignBot Pro',
 *   occupation: '27-1024.00',
 *   model: 'gpt-4o',
 *   capabilities: ['Logo Design', 'Brand Identity', 'Visual Design'],
 *   capacity: {
 *     maxConcurrentTasks: 5,
 *     maxTasksPerDay: 15
 *   }
 * }
 * ```
 *
 * ### 4. Set Up Event Handlers
 *
 * ```typescript
 * business.on('order.created', async (event, ctx) => {
 *   const agent = findBestAgent(agents, event.order.requirements)
 *   await ctx.db.update('order', event.order.id, { assignedTo: agent.id })
 *   await ctx.queue.send('process-order', { orderId: event.order.id })
 * })
 *
 * business.every('day at 06:00', async ctx => {
 *   await updateOKRs(ctx)
 *   await generateDailyReport(ctx)
 * })
 * ```
 *
 * ## Architecture
 *
 * ```
 * Business-as-Code (TypeScript)
 *   ├─ Strategic Vision (StoryBrand, Lean Canvas)
 *   ├─ OKRs (Objectives & Key Results)
 *   ├─ Services
 *   │   ├─ ONET Mapping (occupation, tasks, skills)
 *   │   ├─ GDPval Score (AI capability)
 *   │   ├─ Deliverable Spec
 *   │   ├─ Quality Criteria
 *   │   ├─ Pricing Model
 *   │   └─ SLA Guarantees
 *   ├─ Agents (AI workforce)
 *   │   ├─ Capabilities (ONET skills)
 *   │   ├─ Performance Metrics
 *   │   ├─ Capacity Tracking
 *   │   └─ Cost Efficiency
 *   ├─ Workflows (event-driven)
 *   │   ├─ .on(event, handler)
 *   │   ├─ .every(schedule, handler)
 *   │   ├─ .send(message)
 *   │   └─ .forEach(entity, handler)
 *   └─ Operations
 *       ├─ Order Management
 *       ├─ Quality Assurance
 *       ├─ Customer Relations
 *       └─ Performance Tracking
 * ```
 *
 * ## Best Practices
 *
 * ### 1. Map Services to ONET Accurately
 * - Use official ONET SOC codes
 * - Include relevant tasks and skills
 * - Validate against GDPval benchmarks
 *
 * ### 2. Set Realistic Quality Standards
 * - Automated checks where possible
 * - Human review for subjective quality
 * - Clear acceptance criteria
 *
 * ### 3. Design for AI Capabilities
 * - High automation for gdpvalScore > 0.8
 * - Human oversight for 0.5-0.8
 * - Human-led for < 0.5
 *
 * ### 4. Guarantee Outcomes, Not Effort
 * - Fixed prices per deliverable
 * - Quality guarantees with refund policies
 * - SLA commitments with remedies
 *
 * ### 5. Track Everything
 * - Agent performance and costs
 * - Service quality and customer satisfaction
 * - OKR progress and business metrics
 * - Continuous improvement
 *
 * ## Learn More
 *
 * - [ONET Database](https://www.onetonline.org/)
 * - [GDPval Paper](https://arxiv.org/abs/2403.12447)
 * - [StoryBrand Framework](https://storybrand.com/)
 * - [OKR Guide](https://www.whatmatters.com/get-started)
 *
 * ## Examples
 *
 * See `examples/` directory for complete implementations:
 * - `content-agency.ts` - AI Content Agency
 * - More coming soon...
 */
