/**
 * Workflow & Event Handling Types
 *
 * Elegant event-driven and scheduled execution patterns for Business-as-Code.
 * Uses method-based API: .on(), .every(), .send(), .forEach()
 */

import type { Agent, Human } from './agent'
import type { Order } from './order'

/**
 * Event-driven workflow system
 *
 * Usage:
 *   business.on('order.created', async (order) => { ... })
 *   business.every('day at 06:00', async () => { ... })
 *   business.forEach('Customer', async (customer) => { ... })
 */

// ═══════════════════════════════════════════════════════════
// Event Handling (.on method) - Proxy-based API
// ═══════════════════════════════════════════════════════════

/**
 * Event handler function
 */
export type EventHandler<TEvent = any> = (
  event: TEvent,
  context: ExecutionContext
) => Promise<void> | void

/**
 * Event category proxy
 * Enables: business.on.order.created(handler)
 */
export interface EventCategoryProxy {
  [event: string]: (handler: EventHandler) => void
}

/**
 * On proxy interface
 * Enables type-safe event subscription:
 *   business.on.order.created(handler)
 *   business.on.payment.received(handler)
 *   business.on.agent.overloaded(handler)
 */
export interface OnProxy {
  // Order events
  order: {
    created: (handler: EventHandler<OrderCreatedEvent>) => void
    assigned: (handler: EventHandler) => void
    started: (handler: EventHandler) => void
    completed: (handler: EventHandler) => void
    delivered: (handler: EventHandler) => void
    cancelled: (handler: EventHandler) => void
    refunded: (handler: EventHandler) => void
  }

  // Work events
  work: {
    started: (handler: EventHandler) => void
    completed: (handler: EventHandler<WorkCompletedEvent>) => void
    failed: (handler: EventHandler) => void
    escalated: (handler: EventHandler) => void
  }

  // Deliverable events
  deliverable: {
    ready: (handler: EventHandler) => void
    approved: (handler: EventHandler) => void
    rejected: (handler: EventHandler) => void
  }

  // Quality events
  quality: {
    checked: (handler: EventHandler<QualityCheckEvent>) => void
    passed: (handler: EventHandler) => void
    failed: (handler: EventHandler) => void
  }

  // Review events
  review: {
    requested: (handler: EventHandler) => void
    completed: (handler: EventHandler) => void
  }

  // Revision events
  revision: {
    requested: (handler: EventHandler) => void
  }

  // Customer events
  customer: {
    created: (handler: EventHandler) => void
    updated: (handler: EventHandler) => void
  }

  // Inquiry/Feedback events
  inquiry: {
    received: (handler: EventHandler) => void
  }
  feedback: {
    received: (handler: EventHandler) => void
  }
  support: {
    requested: (handler: EventHandler) => void
  }

  // Agent events
  agent: {
    idle: (handler: EventHandler) => void
    overloaded: (handler: EventHandler) => void
    error: (handler: EventHandler) => void
  }

  // Team events
  team: {
    capacity: {
      low: (handler: EventHandler) => void
    }
  }
  escalation: {
    needed: (handler: EventHandler) => void
  }

  // OKR events
  okr: {
    'at-risk': (handler: EventHandler) => void
    achieved: (handler: EventHandler) => void
  }

  // Metric events
  metric: {
    threshold: (handler: EventHandler<MetricThresholdEvent>) => void
  }
  sla: {
    breach: (handler: EventHandler) => void
  }
  capacity: {
    exceeded: (handler: EventHandler) => void
  }

  // Payment events
  payment: {
    received: (handler: EventHandler) => void
    failed: (handler: EventHandler) => void
  }
  refund: {
    processed: (handler: EventHandler) => void
  }
  invoice: {
    created: (handler: EventHandler) => void
  }

  // Integration events
  webhook: {
    received: (handler: EventHandler) => void
  }
  sync: {
    completed: (handler: EventHandler) => void
    failed: (handler: EventHandler) => void
  }
  api: {
    error: (handler: EventHandler) => void
  }

  // Catch-all for custom events
  [category: string]: EventCategoryProxy | any
}

/**
 * Legacy event types (for backward compatibility)
 */
export type SystemEvent =
  // ═══ Order Lifecycle ═══
  | 'order.created'
  | 'order.assigned'
  | 'order.started'
  | 'order.completed'
  | 'order.delivered'
  | 'order.cancelled'
  | 'order.refunded'

  // ═══ Work & Delivery ═══
  | 'work.started'
  | 'work.completed'
  | 'work.failed'
  | 'work.escalated'
  | 'deliverable.ready'
  | 'deliverable.approved'
  | 'deliverable.rejected'
  | 'revision.requested'

  // ═══ Quality & Review ═══
  | 'quality.checked'
  | 'quality.passed'
  | 'quality.failed'
  | 'review.requested'
  | 'review.completed'

  // ═══ Customer ═══
  | 'customer.created'
  | 'customer.updated'
  | 'inquiry.received'
  | 'feedback.received'
  | 'support.requested'

  // ═══ Agent & Team ═══
  | 'agent.idle'
  | 'agent.overloaded'
  | 'agent.error'
  | 'team.capacity.low'
  | 'escalation.needed'

  // ═══ Business Metrics ═══
  | 'okr.at-risk'
  | 'okr.achieved'
  | 'metric.threshold'
  | 'sla.breach'
  | 'capacity.exceeded'

  // ═══ Financial ═══
  | 'payment.received'
  | 'payment.failed'
  | 'refund.processed'
  | 'invoice.created'

  // ═══ Integration ═══
  | 'webhook.received'
  | 'sync.completed'
  | 'sync.failed'
  | 'api.error'

  // ═══ Time-Based ═══
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'hour'

  // ═══ Custom ═══
  | string

/**
 * Event data structures
 */
export interface OrderCreatedEvent {
  order: Order
  source: 'api' | 'dashboard' | 'webhook' | 'automation'
  timestamp: Date
}

export interface WorkCompletedEvent {
  orderId: string
  agentId: string
  deliverable: any
  quality Score: number
  duration: number // milliseconds
  timestamp: Date
}

export interface QualityCheckEvent {
  orderId: string
  deliverable: any
  scores: Record<string, number>
  passed: boolean
  feedback?: string
  timestamp: Date
}

export interface MetricThresholdEvent {
  metric: string
  value: number
  threshold: number
  comparison: '>' | '<' | '>=' | '<=' | '=='
  severity: 'info' | 'warning' | 'critical'
  timestamp: Date
}

/**
 * Execution context provided to event handlers
 */
export interface ExecutionContext {
  // ═══ Business Context ═══
  business: {
    id: string
    name: string
    okrs: any[] // OKR[]
  }

  // ═══ Execution Environment ═══
  env: {
    AI: any // Cloudflare Workers AI binding
    DB: any // Database binding
    QUEUE: any // Queue binding
  }

  // ═══ Helpers ═══
  ai: AIHelpers
  db: DatabaseHelpers
  queue: QueueHelpers
  slack: SlackHelpers
  email: EmailHelpers

  // ═══ Logging ═══
  log: (...args: any[]) => void
  error: (...args: any[]) => void
  warn: (...args: any[]) => void
}

// ═══════════════════════════════════════════════════════════
// Scheduled Execution (.every method) - Proxy-based API
// ═══════════════════════════════════════════════════════════

/**
 * Scheduled task handler
 */
export type ScheduledHandler = (
  context: ExecutionContext
) => Promise<void> | void

/**
 * Time specification helper
 */
export type TimeString = `${number}:${number}` // HH:MM format
export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
export type DayOrdinal = 'st' | 'nd' | 'rd' | 'th'

/**
 * Every proxy interface - Semantic triple pattern
 * Enables type-safe scheduling:
 *   business.every.day.at('06:00', handler)
 *   business.every.week.on.Mon.at('08:00', handler)
 *   business.every.month.on['1st'].at('00:00', handler)
 *   business.every.hour(handler)
 */
export interface EveryProxy {
  // Simple intervals
  minute: (handler: ScheduledHandler) => void
  hour: (handler: ScheduledHandler) => void
  day: DayProxy
  week: WeekProxy
  month: MonthProxy
  quarter: (handler: ScheduledHandler) => void
  year: (handler: ScheduledHandler) => void

  // Cron syntax (legacy)
  cron: (pattern: string, handler: ScheduledHandler) => void
}

/**
 * Day scheduling proxy
 * Usage: business.every.day.at('06:00', handler)
 */
export interface DayProxy {
  // Direct call for daily
  (handler: ScheduledHandler): void

  // At specific time
  at: (time: TimeString, handler: ScheduledHandler) => void
}

/**
 * Week scheduling proxy
 * Usage: business.every.week.on.Mon.at('08:00', handler)
 */
export interface WeekProxy {
  // Direct call for weekly
  (handler: ScheduledHandler): void

  // Specific day
  on: {
    Mon: DayOfWeekProxy
    Tue: DayOfWeekProxy
    Wed: DayOfWeekProxy
    Thu: DayOfWeekProxy
    Fri: DayOfWeekProxy
    Sat: DayOfWeekProxy
    Sun: DayOfWeekProxy
  }
}

/**
 * Day of week proxy
 * Usage: .at('08:00', handler)
 */
export interface DayOfWeekProxy {
  (handler: ScheduledHandler): void
  at: (time: TimeString, handler: ScheduledHandler) => void
}

/**
 * Month scheduling proxy
 * Usage: business.every.month.on['1st'].at('00:00', handler)
 */
export interface MonthProxy {
  // Direct call for monthly
  (handler: ScheduledHandler): void

  // Specific day of month
  on: {
    [day: `${number}${'st' | 'nd' | 'rd' | 'th'}`]: DayOfMonthProxy
  }
}

/**
 * Day of month proxy
 */
export interface DayOfMonthProxy {
  (handler: ScheduledHandler): void
  at: (time: TimeString, handler: ScheduledHandler) => void
}

/**
 * Legacy schedule patterns (for backward compatibility)
 */
export type SchedulePattern =
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | `day at ${TimeString}` // e.g., "day at 06:00"
  | `week on ${DayOfWeek} at ${TimeString}` // e.g., "week on Mon at 08:00"
  | `month on ${number}${DayOrdinal} at ${TimeString}` // e.g., "month on 1st at 00:00"
  | `${string}` // Cron syntax: "0 6 * * *"

// ═══════════════════════════════════════════════════════════
// Iteration (.forEach method) - Proxy-based API
// ═══════════════════════════════════════════════════════════

/**
 * Iterator pattern for bulk operations using Proxy-based API
 *
 * Examples:
 *   business.forEachCustomer.active(async (customer, ctx) => { ... })
 *   business.forEachOrder.pending(async (order, ctx) => { ... })
 *   business.forEachAgent.idle(async (agent, ctx) => { ... })
 *
 * Also supports legacy string-based API:
 *   business.forEach('Customer.active', async (customer, ctx) => { ... })
 */

/**
 * Iterator handler
 */
export type IteratorHandler<T = any> = (
  item: T,
  context: ExecutionContext
) => Promise<void> | void

/**
 * Entity filter proxy
 * Provides type-safe property access for entity filtering
 */
export type EntityFilterProxy<T = any> = {
  [filter: string]: (handler: IteratorHandler<T>) => void
}

/**
 * ForEach proxy interface
 * Enables: business.forEachCustomer.active(handler)
 */
export interface ForEachProxy {
  Customer: EntityFilterProxy<any> // Will be typed as Customer in implementation
  Order: EntityFilterProxy<any> // Will be typed as Order in implementation
  Agent: EntityFilterProxy<any> // Will be typed as Agent in implementation
  Human: EntityFilterProxy<any> // Will be typed as Human in implementation
  Service: EntityFilterProxy<any> // Will be typed as Service in implementation
  Team: EntityFilterProxy<any> // Will be typed as Team in implementation
  Department: EntityFilterProxy<any> // Will be typed as Department in implementation

  // Shorthand versions
  [key: `forEach${string}`]: EntityFilterProxy<any>
}

/**
 * Legacy string-based iteration (for backward compatibility)
 */
export type ForEachPattern =
  | EntityType
  | `${EntityType}.${string}` // Entity type + filter
  | `${string}` // Custom query

export type EntityType =
  | 'Customer'
  | 'Order'
  | 'Agent'
  | 'Human'
  | 'Service'
  | 'Deliverable'
  | 'Task'
  | 'Event'
  | 'Team'
  | 'Department'

// ═══════════════════════════════════════════════════════════
// Message Sending (.send method)
// ═══════════════════════════════════════════════════════════

/**
 * Send messages to various channels
 *
 * Examples:
 *   business.send({ to: 'email', recipient: 'ceo@company.com', subject: 'Report', body: '...' })
 *   business.send({ to: 'slack', channel: '#alerts', text: 'Order completed!' })
 *   business.send({ to: 'queue', queue: 'process-order', message: { orderId: '123' } })
 */
export type SendMessage =
  | EmailMessage
  | SlackMessage
  | SMSMessage
  | QueueMessage
  | WebhookMessage
  | PushNotification

export interface EmailMessage {
  to: 'email'
  recipient: string | string[]
  subject: string
  body: string
  from?: string
  cc?: string[]
  bcc?: string[]
  attachments?: Attachment[]
  template?: string
  variables?: Record<string, any>
}

export interface SlackMessage {
  to: 'slack'
  channel: string
  text: string
  blocks?: any[] // Slack block kit
  threadTs?: string
  attachments?: any[]
}

export interface SMSMessage {
  to: 'sms'
  phone: string
  message: string
  from?: string
}

export interface QueueMessage {
  to: 'queue'
  queue: string
  message: any
  delay?: number // milliseconds
  priority?: number
}

export interface WebhookMessage {
  to: 'webhook'
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

export interface PushNotification {
  to: 'push'
  userId: string
  title: string
  body: string
  icon?: string
  badge?: number
  data?: Record<string, any>
}

export interface Attachment {
  filename: string
  content: string | Buffer
  contentType: string
}

// ═══════════════════════════════════════════════════════════
// Helper Interfaces
// ═══════════════════════════════════════════════════════════

export interface AIHelpers {
  /**
   * Generate text with AI
   */
  generate(prompt: string, options?: GenerateOptions): Promise<string>

  /**
   * Generate structured data
   */
  generateJSON<T = any>(prompt: string, schema: any): Promise<T>

  /**
   * Analyze and extract information
   */
  analyze(content: string, question: string): Promise<string>

  /**
   * Create embeddings
   */
  embed(text: string): Promise<number[]>

  /**
   * Search similar content
   */
  search(query: string, limit?: number): Promise<any[]>
}

export interface GenerateOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  systemPrompt?: string
}

export interface DatabaseHelpers {
  /**
   * Get entity by ID
   */
  get(ns: string, id: string): Promise<any>

  /**
   * List entities with filters
   */
  list(ns: string, filters?: Record<string, any>): Promise<any[]>

  /**
   * Create entity
   */
  create(ns: string, data: any): Promise<any>

  /**
   * Update entity
   */
  update(ns: string, id: string, data: any): Promise<any>

  /**
   * Delete entity
   */
  delete(ns: string, id: string): Promise<void>

  /**
   * Query with SQL
   */
  query(sql: string, params?: any[]): Promise<any[]>

  /**
   * Search (full-text, vector, hybrid)
   */
  search(query: string, options?: SearchOptions): Promise<any[]>
}

export interface SearchOptions {
  type?: 'fulltext' | 'vector' | 'hybrid'
  limit?: number
  filters?: Record<string, any>
  alpha?: number // For hybrid search (0-1)
}

export interface QueueHelpers {
  /**
   * Send message to queue
   */
  send(queue: string, message: any, options?: QueueOptions): Promise<void>

  /**
   * Send batch of messages
   */
  sendBatch(queue: string, messages: any[]): Promise<void>

  /**
   * Schedule delayed message
   */
  schedule(queue: string, message: any, delay: number): Promise<void>
}

export interface QueueOptions {
  delay?: number // milliseconds
  priority?: number
  dedupKey?: string
}

export interface SlackHelpers {
  /**
   * Send message to Slack
   */
  send(channel: string, text: string, options?: SlackOptions): Promise<void>

  /**
   * Send blocks (rich formatting)
   */
  sendBlocks(channel: string, blocks: any[]): Promise<void>

  /**
   * Reply in thread
   */
  reply(channel: string, threadTs: string, text: string): Promise<void>
}

export interface SlackOptions {
  username?: string
  iconEmoji?: string
  attachments?: any[]
  blocks?: any[]
}

export interface EmailHelpers {
  /**
   * Send email
   */
  send(to: string | string[], subject: string, body: string, options?: EmailOptions): Promise<void>

  /**
   * Send from template
   */
  sendTemplate(to: string | string[], template: string, variables: Record<string, any>): Promise<void>

  /**
   * Send batch emails
   */
  sendBatch(emails: Array<{ to: string; subject: string; body: string }>): Promise<void>
}

export interface EmailOptions {
  from?: string
  cc?: string[]
  bcc?: string[]
  attachments?: Attachment[]
  html?: boolean
}

// ═══════════════════════════════════════════════════════════
// Workflow Definition (for complex multi-step processes)
// ═══════════════════════════════════════════════════════════

/**
 * Complex workflow with multiple steps
 *
 * For simple event handling, use .on()
 * For complex multi-step processes, use Workflow
 */
export interface Workflow {
  id: string
  name: string
  description?: string
  trigger: WorkflowTrigger
  steps: WorkflowStep[]
  errorHandling: ErrorHandling
  timeout?: number // milliseconds
  status: 'active' | 'paused' | 'archived'
}

export interface WorkflowTrigger {
  type: 'event' | 'schedule' | 'manual' | 'webhook'
  event?: SystemEvent
  schedule?: SchedulePattern
  webhookPath?: string
}

export interface WorkflowStep {
  id: string
  name: string
  type: StepType
  config: any
  dependsOn?: string[] // Step IDs
  timeout?: number
  retryPolicy?: RetryPolicy
  condition?: string // Only execute if condition is true
}

export type StepType =
  | 'ai-generation' // Generate content with AI
  | 'api-call' // Call external API
  | 'database-query' // Query database
  | 'human-review' // Requires human approval
  | 'quality-check' // Automated quality validation
  | 'send-notification' // Send email/slack/etc
  | 'wait' // Wait for duration or event
  | 'fork' // Parallel execution
  | 'conditional' // If/else branching
  | 'loop' // Iterate over collection
  | 'custom' // Custom function

export interface RetryPolicy {
  maxAttempts: number
  backoff: 'linear' | 'exponential' | 'fixed'
  initialDelay: number // milliseconds
  maxDelay?: number
  retryableErrors?: string[] // Error codes/types to retry
}

export interface ErrorHandling {
  onError: 'retry' | 'skip' | 'fail' | 'escalate'
  escalateTo?: string // Human or team ID
  notification?: {
    channel: 'email' | 'slack' | 'pagerduty'
    recipients: string[]
  }
  fallback?: string // Fallback step ID
}

// ═══════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════

/**
 * Integration type for workflow system
 */
export interface Integration {
  id: string
  type: IntegrationType
  name: string
  config: any
  status: 'active' | 'inactive' | 'error'
  credentials?: Record<string, string>
}

export type IntegrationType =
  | 'slack'
  | 'discord'
  | 'email'
  | 'sms'
  | 'stripe'
  | 'hubspot'
  | 'salesforce'
  | 'zapier'
  | 'github'
  | 'figma'
  | 'notion'
  | 'airtable'
  | 'google-workspace'
  | 'aws'
  | 'cloudflare'
  | 'vercel'
  | 'custom'
