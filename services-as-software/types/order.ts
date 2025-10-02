/**
 * Order & Customer Types
 *
 * TypeScript interfaces for order management, customer relationships, and payment processing
 * in Services-as-Software businesses.
 */

import type { Service } from './service'
import type { Agent, Human } from './agent'

/**
 * Order lifecycle
 *
 * Represents a customer order for a service from brief submission through delivery
 */
export interface Order {
  // ═══ Identity ═══
  id: string
  serviceId: string
  service: Service
  customer: Customer

  // ═══ Brief & Requirements ═══
  brief: object // Validated against service.briefTemplate schema
  files?: OrderFile[]
  requirements?: string[]
  addOns?: string[] // AddOn IDs

  // ═══ Assignment ═══
  assignedTo?: Agent | Human
  team?: string[] // Agent/Human IDs
  assignedAt?: Date

  // ═══ Timeline ═══
  createdAt: Date
  deadline: Date
  startedAt?: Date
  completedAt?: Date
  deliveredAt?: Date

  // ═══ Deliverable ═══
  deliverable?: any
  deliveryFormat?: string
  deliveryUrl?: string
  qualityScore?: number

  // ═══ Status ═══
  status: OrderStatus
  statusHistory: StatusChange[]
  priority: OrderPriority

  // ═══ Pricing & Payment ═══
  price: number
  originalPrice?: number // Before discounts
  discount?: number
  total: number
  payment: Payment

  // ═══ Quality & Review ═══
  qualityChecks?: QualityCheck[]
  revisions: Revision[]
  customerFeedback?: Feedback

  // ═══ Communication ═══
  messages: Message[]
  notifications: Notification[]

  // ═══ SLA Tracking ═══
  slaStatus: SLAStatus
  breaches?: SLABreach[]

  // ═══ Metadata ═══
  source: OrderSource
  referrer?: string
  tags?: string[]
  internalNotes?: string
}

export type OrderStatus =
  | 'draft' // Customer creating order
  | 'submitted' // Awaiting payment
  | 'paid' // Payment received
  | 'queued' // In fulfillment queue
  | 'assigned' // Assigned to agent/human
  | 'in-progress' // Being worked on
  | 'review' // Quality review
  | 'revision' // Customer requested changes
  | 'completed' // Work finished
  | 'delivered' // Sent to customer
  | 'approved' // Customer approved
  | 'rejected' // Customer rejected
  | 'cancelled' // Order cancelled
  | 'refunded' // Refund issued

export type OrderPriority =
  | 'low'
  | 'normal'
  | 'high'
  | 'urgent'
  | 'rush' // Expedited processing

export type OrderSource =
  | 'api' // API integration
  | 'dashboard' // Self-service portal
  | 'webhook' // External platform
  | 'automation' // Automated order
  | 'manual' // Created by staff

/**
 * Customer
 *
 * Individual or business purchasing services
 */
export interface Customer {
  // ═══ Identity ═══
  id: string
  type: 'individual' | 'business'
  name: string
  email: string
  phone?: string
  company?: string

  // ═══ Business Details ═══
  companySize?: string
  industry?: string
  website?: string
  taxId?: string

  // ═══ Contact ═══
  address?: Address
  timezone?: string
  preferredLanguage?: string

  // ═══ Account Status ═══
  status: CustomerStatus
  tier: CustomerTier
  createdAt: Date
  lastActiveAt?: Date

  // ═══ History ═══
  orders: Order[]
  totalOrders: number
  totalSpend: number
  averageOrderValue: number

  // ═══ Relationships ═══
  accountManager?: string // Human or Agent ID
  team?: string[] // Dedicated team IDs
  referredBy?: string // Customer ID

  // ═══ Metrics ═══
  satisfactionScore?: number // CSAT
  nps?: number // Net Promoter Score
  churnRisk?: number // 0-1
  lifetime Value: number // LTV

  // ═══ Preferences ═══
  preferences: CustomerPreferences
  tags?: string[]
  customFields?: Record<string, any>

  // ═══ Billing ═══
  billingEmail?: string
  paymentMethods: PaymentMethod[]
  defaultPaymentMethod?: string
  creditBalance: number
  invoices: Invoice[]
}

export type CustomerStatus =
  | 'lead' // Potential customer
  | 'active' // Paying customer
  | 'inactive' // No recent orders
  | 'churned' // Left
  | 'blocked' // Access revoked

export type CustomerTier =
  | 'free' // Trial or free tier
  | 'starter' // Entry level
  | 'professional' // Mid tier
  | 'enterprise' // High tier
  | 'vip' // Special treatment

export interface CustomerPreferences {
  notifications: {
    email: boolean
    sms: boolean
    slack: boolean
  }
  communication: {
    frequency: 'realtime' | 'daily' | 'weekly'
    channel: 'email' | 'slack' | 'phone'
  }
  delivery: {
    format: string[]
    destination: 'email' | 'url' | 'api'
  }
}

export interface Address {
  line1: string
  line2?: string
  city: string
  state?: string
  postalCode: string
  country: string
}

/**
 * Payment
 *
 * Payment processing and tracking
 */
export interface Payment {
  id: string
  orderId: string
  customerId: string

  // ═══ Amount ═══
  amount: number
  currency: string
  fee?: number // Processing fee

  // ═══ Method ═══
  method: PaymentMethod
  provider: PaymentProvider

  // ═══ Status ═══
  status: PaymentStatus
  statusHistory: PaymentStatusChange[]

  // ═══ Transaction ═══
  transactionId?: string
  receiptUrl?: string
  refundId?: string

  // ═══ Timing ═══
  createdAt: Date
  paidAt?: Date
  refundedAt?: Date
  failedAt?: Date

  // ═══ Metadata ═══
  metadata?: Record<string, any>
  errorMessage?: string
}

export type PaymentMethod =
  | 'card' // Credit/debit card
  | 'bank' // Bank transfer
  | 'paypal' // PayPal
  | 'stripe' // Stripe
  | 'crypto' // Cryptocurrency
  | 'credit' // Account credit
  | 'invoice' // Invoice (pay later)

export type PaymentProvider =
  | 'stripe'
  | 'paypal'
  | 'square'
  | 'braintree'
  | 'coinbase'
  | 'manual'

export type PaymentStatus =
  | 'pending' // Awaiting payment
  | 'processing' // Payment processing
  | 'succeeded' // Payment successful
  | 'failed' // Payment failed
  | 'refunded' // Fully refunded
  | 'partially-refunded' // Partial refund
  | 'disputed' // Chargeback/dispute

export interface PaymentStatusChange {
  from: PaymentStatus
  to: PaymentStatus
  timestamp: Date
  reason?: string
}

/**
 * Invoice
 */
export interface Invoice {
  id: string
  customerId: string
  number: string // Invoice number
  date: Date
  dueDate: Date
  status: InvoiceStatus
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  paidAmount: number
  balance: number
  pdfUrl?: string
}

export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'paid'
  | 'overdue'
  | 'cancelled'

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
  orderId?: string
}

/**
 * Quality & Review
 */
export interface QualityCheck {
  id: string
  orderId: string
  timestamp: Date
  type: 'automated' | 'human' | 'ai'
  checker: string // Agent/Human ID
  criteria: {
    name: string
    score: number // 0-10
    passed: boolean
    feedback?: string
  }[]
  overallScore: number
  passed: boolean
  notes?: string
}

export interface Revision {
  id: string
  orderId: string
  requestedAt: Date
  requestedBy: 'customer' | 'qa' | 'manager'
  description: string
  changes: string[]
  completedAt?: Date
  status: 'pending' | 'in-progress' | 'completed' | 'rejected'
}

export interface Feedback {
  id: string
  orderId: string
  customerId: string
  rating: number // 0-10
  categories: {
    quality: number
    speed: number
    communication: number
    value: number
  }
  comments?: string
  wouldRecommend: boolean
  timestamp: Date
}

/**
 * Communication
 */
export interface Message {
  id: string
  orderId: string
  from: string // Customer, Agent, or Human ID
  to: string[] // Recipient IDs
  subject?: string
  body: string
  attachments?: OrderFile[]
  timestamp: Date
  read: boolean
}

export interface Notification {
  id: string
  orderId: string
  recipientId: string
  type: NotificationType
  channel: 'email' | 'sms' | 'slack' | 'push'
  title: string
  body: string
  actionUrl?: string
  sentAt: Date
  readAt?: Date
}

export type NotificationType =
  | 'order.created'
  | 'order.assigned'
  | 'order.started'
  | 'order.completed'
  | 'order.delivered'
  | 'order.approved'
  | 'payment.received'
  | 'payment.failed'
  | 'revision.requested'
  | 'message.received'
  | 'deadline.approaching'
  | 'sla.breach'

/**
 * Files
 */
export interface OrderFile {
  id: string
  name: string
  type: string // MIME type
  size: number // bytes
  url: string
  uploadedBy: string // Customer, Agent, or Human ID
  uploadedAt: Date
  purpose: 'brief' | 'reference' | 'deliverable' | 'revision' | 'other'
}

/**
 * SLA Tracking
 */
export interface SLAStatus {
  onTrack: boolean
  breachRisk: 'low' | 'medium' | 'high'
  timeToDeadline: number // milliseconds
  timeElapsed: number // milliseconds
  expectedCompletion: Date
}

export interface SLABreach {
  metric: string // e.g., "response time", "completion time"
  threshold: number
  actual: number
  severity: 'minor' | 'major' | 'critical'
  timestamp: Date
  remediation?: string
}

/**
 * Status Change History
 */
export interface StatusChange {
  from: OrderStatus
  to: OrderStatus
  timestamp: Date
  changedBy: string // Agent/Human ID
  reason?: string
}

// ═══════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════

/**
 * Calculate order health score
 */
export function calculateOrderHealth(order: Order): number {
  let score = 100

  // Penalize for being overdue
  if (new Date() > order.deadline && order.status !== 'delivered') {
    const daysOverdue = Math.floor((Date.now() - order.deadline.getTime()) / (1000 * 60 * 60 * 24))
    score -= daysOverdue * 10
  }

  // Penalize for revisions
  score -= order.revisions.length * 5

  // Penalize for SLA breaches
  score -= (order.breaches?.length || 0) * 15

  // Bonus for high quality
  if (order.qualityScore && order.qualityScore >= 9) {
    score += 10
  }

  // Bonus for positive feedback
  if (order.customerFeedback && order.customerFeedback.rating >= 9) {
    score += 10
  }

  return Math.max(0, Math.min(100, score))
}

/**
 * Calculate customer lifetime value
 */
export function calculateLTV(customer: Customer): number {
  if (customer.totalOrders === 0) return 0

  const avgOrderValue = customer.totalSpend / customer.totalOrders
  const orderFrequency = customer.totalOrders / Math.max(1, monthsSinceFirstOrder(customer))
  const estimatedLifetimeMonths = 24 // Assume 2 year lifetime

  return avgOrderValue * orderFrequency * estimatedLifetimeMonths
}

/**
 * Calculate months since first order
 */
function monthsSinceFirstOrder(customer: Customer): number {
  if (customer.orders.length === 0) return 1

  const firstOrder = customer.orders.reduce((earliest, order) =>
    order.createdAt < earliest.createdAt ? order : earliest
  )

  const months = (Date.now() - firstOrder.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30)
  return Math.max(1, months)
}

/**
 * Determine if order is at risk
 */
export function isOrderAtRisk(order: Order): boolean {
  // Already past deadline
  if (new Date() > order.deadline && order.status !== 'delivered') {
    return true
  }

  // Multiple revisions
  if (order.revisions.length >= 3) {
    return true
  }

  // SLA breaches
  if (order.breaches && order.breaches.length > 0) {
    return true
  }

  // Low quality score
  if (order.qualityScore && order.qualityScore < 6) {
    return true
  }

  // Approaching deadline with high breach risk
  if (order.slaStatus.breachRisk === 'high') {
    return true
  }

  return false
}

/**
 * Get order next action
 */
export function getNextAction(order: Order): string {
  switch (order.status) {
    case 'draft':
      return 'Customer needs to complete and submit order'
    case 'submitted':
      return 'Awaiting payment'
    case 'paid':
      return 'Assign to agent/team'
    case 'queued':
      return 'Wait for agent availability'
    case 'assigned':
      return 'Agent should start work'
    case 'in-progress':
      return 'Continue work on deliverable'
    case 'review':
      return 'Conduct quality review'
    case 'revision':
      return 'Complete requested revisions'
    case 'completed':
      return 'Deliver to customer'
    case 'delivered':
      return 'Await customer approval'
    case 'approved':
      return 'Order complete'
    case 'rejected':
      return 'Address rejection reasons'
    case 'cancelled':
      return 'Process cancellation'
    case 'refunded':
      return 'Refund processed'
    default:
      return 'Review order status'
  }
}

/**
 * Calculate customer churn risk
 */
export function calculateChurnRisk(customer: Customer): number {
  let risk = 0

  // No recent orders
  const daysSinceLastOrder = customer.lastActiveAt
    ? (Date.now() - customer.lastActiveAt.getTime()) / (1000 * 60 * 60 * 24)
    : 999

  if (daysSinceLastOrder > 90) risk += 0.3
  else if (daysSinceLastOrder > 60) risk += 0.2
  else if (daysSinceLastOrder > 30) risk += 0.1

  // Low satisfaction
  if (customer.satisfactionScore && customer.satisfactionScore < 6) {
    risk += 0.3
  }

  // Low NPS
  if (customer.nps !== undefined && customer.nps < 0) {
    risk += 0.2
  }

  // Decreasing order frequency
  const recentOrders = customer.orders.filter(
    o => o.createdAt.getTime() > Date.now() - 90 * 24 * 60 * 60 * 1000
  ).length
  const olderOrders = customer.orders.filter(
    o =>
      o.createdAt.getTime() <= Date.now() - 90 * 24 * 60 * 60 * 1000 &&
      o.createdAt.getTime() > Date.now() - 180 * 24 * 60 * 60 * 1000
  ).length

  if (recentOrders < olderOrders * 0.5) {
    risk += 0.2
  }

  return Math.min(1.0, risk)
}
