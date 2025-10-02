/**
 * Pricing Model Types
 *
 * TypeScript interfaces for defining service pricing models.
 * Supports multiple strategies: cost-based, activity-based, outcome-based, subscription, usage-based.
 */

/**
 * Pricing model union type
 */
export type PricingModel =
  | CostBasedPricing
  | MarginBasedPricing
  | ActivityBasedPricing
  | OutcomeBasedPricing
  | SubscriptionPricing
  | UsageBasedPricing
  | ValueBasedPricing
  | CompetitorBasedPricing
  | DynamicPricing
  | TieredPricing

/**
 * Cost-Based Pricing
 *
 * Price = (Cost Base × Quantity + Fixed + Variable × Quantity) × (1 + Margin)
 */
export interface CostBasedPricing {
  model: 'cost-based'
  costBase: number // Base cost per unit
  fixedCosts: number // Fixed overhead per order
  variableCosts: number // Variable cost per unit
  margin: number // Profit margin (0-1, e.g., 0.5 = 50%)
  minimumOrder?: number // Minimum order value
}

/**
 * Margin-Based Pricing
 *
 * Price = Cost × (1 + Margin%)
 * Simpler than cost-based, just cost + margin
 */
export interface MarginBasedPricing {
  model: 'margin-based'
  costPerUnit: number
  marginPercentage: number // 0-1 (e.g., 0.3 = 30% margin)
  minimumOrder?: number
}

/**
 * Activity-Based Pricing
 *
 * Price = Σ(Activity Rate × Activity Units)
 * Based on time/effort spent on specific activities
 */
export interface ActivityBasedPricing {
  model: 'activity-based'
  activities: Activity[]
  minimumCharge?: number
}

export interface Activity {
  name: string // e.g., "research", "writing", "editing"
  description?: string
  rate: number // Price per unit of activity
  unit: string // e.g., "hour", "page", "revision"
  estimatedUnits: number // Typical amount needed
  minimumUnits?: number
  maximumUnits?: number
}

/**
 * Outcome-Based Pricing
 *
 * Price = Base + Σ(Bonus for Achieved Outcomes)
 * Customer pays for results, not effort
 */
export interface OutcomeBasedPricing {
  model: 'outcome-based'
  basePrice: number // Minimum price regardless of outcomes
  outcomes: Outcome[]
  capPrice?: number // Maximum total price
}

export interface Outcome {
  metric: string // e.g., "conversion-rate", "engagement", "leads"
  description: string
  targetValue: number
  bonus: number // Bonus if target met
  multiplier?: number // Price scales with over-achievement
  measurement: string // How outcome is measured
}

/**
 * Subscription Pricing
 *
 * Recurring payment for ongoing service delivery
 */
export interface SubscriptionPricing {
  model: 'subscription'
  interval: SubscriptionInterval
  price: number // Base subscription price
  includedUnits: number // e.g., 10 blog posts per month
  unitType: string // What's counted (e.g., "posts", "hours")
  overageRate: number // Price per unit above included
  tiers?: PricingTier[]
  setupFee?: number // One-time setup charge
  commitmentPeriod?: number // Minimum months
  cancellationPolicy?: CancellationPolicy
}

export type SubscriptionInterval = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export interface PricingTier {
  name: string // e.g., "Basic", "Pro", "Enterprise"
  minUnits: number
  maxUnits?: number
  price: number
  features: string[]
  popular?: boolean
}

export interface CancellationPolicy {
  noticePeriod: number // Days notice required
  refundPolicy: 'prorated' | 'none' | 'full'
  earlyTerminationFee?: number
}

/**
 * Usage-Based Pricing
 *
 * Pay-per-use pricing (metered billing)
 */
export interface UsageBasedPricing {
  model: 'usage-based'
  unit: string // e.g., "API call", "word", "image", "GB"
  pricePerUnit: number
  minimumCharge?: number
  maximumCharge?: number
  tiers?: UsageTier[]
  meteringInterval: 'realtime' | 'hourly' | 'daily' | 'monthly'
  roundingRule: 'up' | 'down' | 'nearest'
}

export interface UsageTier {
  minUnits: number
  maxUnits?: number
  pricePerUnit: number
  label?: string // e.g., "First 1000 units"
}

/**
 * Value-Based Pricing
 *
 * Price based on perceived value to customer
 */
export interface ValueBasedPricing {
  model: 'value-based'
  baseValue: number // Estimated value to customer
  valueMultiplier: number // Price as % of value (e.g., 0.1 = 10% of value)
  valueMetrics: ValueMetric[]
  capPrice?: number
  floorPrice?: number
}

export interface ValueMetric {
  metric: string // e.g., "revenue-increase", "cost-savings", "time-saved"
  description: string
  estimatedValue: number
  confidence: number // 0-1
}

/**
 * Competitor-Based Pricing
 *
 * Price relative to competitors
 */
export interface CompetitorBasedPricing {
  model: 'competitor-based'
  competitors: CompetitorPrice[]
  strategy: PricingStrategy
  differentiator?: string // Why price is different
}

export interface CompetitorPrice {
  competitor: string
  price: number
  features?: string[]
  marketShare?: number
}

export type PricingStrategy =
  | 'match' // Price same as competitors
  | 'undercut' // Price below competitors
  | 'premium' // Price above competitors (better quality)
  | 'penetration' // Initially low to gain market share
  | 'skimming' // Initially high, lower over time

/**
 * Dynamic Pricing
 *
 * Price changes based on demand, capacity, time, etc.
 */
export interface DynamicPricing {
  model: 'dynamic'
  basePrice: number
  rules: PricingRule[]
  updateFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly'
  minPrice: number // Floor
  maxPrice: number // Cap
}

export interface PricingRule {
  condition: string // e.g., "capacity > 80%", "dayOfWeek == 'Friday'"
  adjustment: PriceAdjustment
  priority: number // Higher priority rules apply first
}

export interface PriceAdjustment {
  type: 'percentage' | 'fixed'
  value: number // e.g., 1.2 (20% increase) or 10 (add $10)
  reason?: string
}

/**
 * Tiered Pricing
 *
 * Different price points based on volume
 */
export interface TieredPricing {
  model: 'tiered'
  tiers: VolumeTier[]
  billingMethod: 'all-units' | 'per-tier'
}

export interface VolumeTier {
  minQuantity: number
  maxQuantity?: number
  price: number
  discount?: number // % discount from base price
  label?: string
}

/**
 * Price calculation utilities
 */

export function calculatePrice(
  pricing: PricingModel,
  context: PriceContext
): PriceCalculation {
  switch (pricing.model) {
    case 'cost-based':
      return calculateCostBasedPrice(pricing, context)
    case 'margin-based':
      return calculateMarginBasedPrice(pricing, context)
    case 'activity-based':
      return calculateActivityBasedPrice(pricing, context)
    case 'outcome-based':
      return calculateOutcomeBasedPrice(pricing, context)
    case 'subscription':
      return calculateSubscriptionPrice(pricing, context)
    case 'usage-based':
      return calculateUsageBasedPrice(pricing, context)
    case 'value-based':
      return calculateValueBasedPrice(pricing, context)
    case 'competitor-based':
      return calculateCompetitorBasedPrice(pricing, context)
    case 'dynamic':
      return calculateDynamicPrice(pricing, context)
    case 'tiered':
      return calculateTieredPrice(pricing, context)
  }
}

export interface PriceContext {
  quantity?: number
  activities?: Record<string, number>
  outcomes?: Record<string, number>
  usage?: number
  date?: Date
  customer?: {
    type: string
    history: number
    segment: string
  }
  capacity?: number
  demand?: number
}

export interface PriceCalculation {
  total: number
  breakdown: PriceBreakdown[]
  discounts: DiscountApplied[]
  taxes?: number
  finalPrice: number
}

export interface PriceBreakdown {
  item: string
  quantity: number
  unitPrice: number
  total: number
}

export interface DiscountApplied {
  type: string
  amount: number
  percentage?: number
}

// Implementation of calculation functions

export function calculateCostBasedPrice(
  pricing: CostBasedPricing,
  context: PriceContext
): PriceCalculation {
  const quantity = context.quantity || 1
  const totalCost = pricing.costBase * quantity + pricing.fixedCosts + pricing.variableCosts * quantity
  const price = totalCost * (1 + pricing.margin)

  return {
    total: price,
    breakdown: [
      { item: 'Base Cost', quantity, unitPrice: pricing.costBase, total: pricing.costBase * quantity },
      { item: 'Fixed Costs', quantity: 1, unitPrice: pricing.fixedCosts, total: pricing.fixedCosts },
      { item: 'Variable Costs', quantity, unitPrice: pricing.variableCosts, total: pricing.variableCosts * quantity },
      { item: 'Margin', quantity: 1, unitPrice: totalCost * pricing.margin, total: totalCost * pricing.margin }
    ],
    discounts: [],
    finalPrice: Math.max(price, pricing.minimumOrder || 0)
  }
}

export function calculateMarginBasedPrice(
  pricing: MarginBasedPricing,
  context: PriceContext
): PriceCalculation {
  const quantity = context.quantity || 1
  const cost = pricing.costPerUnit * quantity
  const price = cost * (1 + pricing.marginPercentage)

  return {
    total: price,
    breakdown: [
      { item: 'Cost', quantity, unitPrice: pricing.costPerUnit, total: cost },
      { item: 'Margin', quantity: 1, unitPrice: cost * pricing.marginPercentage, total: cost * pricing.marginPercentage }
    ],
    discounts: [],
    finalPrice: Math.max(price, pricing.minimumOrder || 0)
  }
}

export function calculateActivityBasedPrice(
  pricing: ActivityBasedPricing,
  context: PriceContext
): PriceCalculation {
  const breakdown: PriceBreakdown[] = []
  let total = 0

  for (const activity of pricing.activities) {
    const units = context.activities?.[activity.name] || activity.estimatedUnits
    const activityTotal = activity.rate * units

    breakdown.push({
      item: activity.name,
      quantity: units,
      unitPrice: activity.rate,
      total: activityTotal
    })

    total += activityTotal
  }

  const finalPrice = Math.max(total, pricing.minimumCharge || 0)

  return {
    total,
    breakdown,
    discounts: [],
    finalPrice
  }
}

export function calculateOutcomeBasedPrice(
  pricing: OutcomeBasedPricing,
  context: PriceContext
): PriceCalculation {
  let total = pricing.basePrice
  const breakdown: PriceBreakdown[] = [
    { item: 'Base Price', quantity: 1, unitPrice: pricing.basePrice, total: pricing.basePrice }
  ]

  for (const outcome of pricing.outcomes) {
    const actual = context.outcomes?.[outcome.metric] || 0

    if (actual >= outcome.targetValue) {
      let bonus = outcome.bonus

      if (outcome.multiplier) {
        bonus *= actual / outcome.targetValue
      }

      breakdown.push({
        item: `${outcome.metric} Bonus`,
        quantity: 1,
        unitPrice: bonus,
        total: bonus
      })

      total += bonus
    }
  }

  const finalPrice = pricing.capPrice ? Math.min(total, pricing.capPrice) : total

  return {
    total,
    breakdown,
    discounts: [],
    finalPrice
  }
}

export function calculateSubscriptionPrice(
  pricing: SubscriptionPricing,
  context: PriceContext
): PriceCalculation {
  const quantity = context.quantity || pricing.includedUnits
  const overage = Math.max(0, quantity - pricing.includedUnits)
  const overageCharge = overage * pricing.overageRate

  const breakdown: PriceBreakdown[] = [
    { item: 'Subscription', quantity: 1, unitPrice: pricing.price, total: pricing.price }
  ]

  if (overage > 0) {
    breakdown.push({
      item: 'Overage',
      quantity: overage,
      unitPrice: pricing.overageRate,
      total: overageCharge
    })
  }

  const total = pricing.price + overageCharge

  return {
    total,
    breakdown,
    discounts: [],
    finalPrice: total
  }
}

export function calculateUsageBasedPrice(
  pricing: UsageBasedPricing,
  context: PriceContext
): PriceCalculation {
  const usage = context.usage || 0
  let total = 0
  const breakdown: PriceBreakdown[] = []

  if (pricing.tiers) {
    // Tiered pricing
    for (const tier of pricing.tiers) {
      const tierUsage = Math.min(
        Math.max(0, usage - tier.minUnits),
        tier.maxUnits ? tier.maxUnits - tier.minUnits : usage
      )

      if (tierUsage > 0) {
        const tierTotal = tierUsage * tier.pricePerUnit
        breakdown.push({
          item: tier.label || `Units ${tier.minUnits}-${tier.maxUnits || '∞'}`,
          quantity: tierUsage,
          unitPrice: tier.pricePerUnit,
          total: tierTotal
        })
        total += tierTotal
      }
    }
  } else {
    // Flat pricing
    total = usage * pricing.pricePerUnit
    breakdown.push({
      item: 'Usage',
      quantity: usage,
      unitPrice: pricing.pricePerUnit,
      total
    })
  }

  const finalPrice = Math.max(
    Math.min(total, pricing.maximumCharge || Infinity),
    pricing.minimumCharge || 0
  )

  return {
    total,
    breakdown,
    discounts: [],
    finalPrice
  }
}

export function calculateValueBasedPrice(
  pricing: ValueBasedPricing,
  context: PriceContext
): PriceCalculation {
  const price = pricing.baseValue * pricing.valueMultiplier
  const cappedPrice = pricing.capPrice ? Math.min(price, pricing.capPrice) : price
  const finalPrice = pricing.floorPrice ? Math.max(cappedPrice, pricing.floorPrice) : cappedPrice

  return {
    total: finalPrice,
    breakdown: [
      { item: 'Value', quantity: 1, unitPrice: pricing.baseValue, total: pricing.baseValue },
      { item: 'Multiplier', quantity: pricing.valueMultiplier, unitPrice: 1, total: price - pricing.baseValue }
    ],
    discounts: [],
    finalPrice
  }
}

export function calculateCompetitorBasedPrice(
  pricing: CompetitorBasedPricing,
  context: PriceContext
): PriceCalculation {
  const avgCompetitorPrice = pricing.competitors.reduce((sum, c) => sum + c.price, 0) / pricing.competitors.length

  let price: number
  switch (pricing.strategy) {
    case 'match':
      price = avgCompetitorPrice
      break
    case 'undercut':
      price = avgCompetitorPrice * 0.9 // 10% below
      break
    case 'premium':
      price = avgCompetitorPrice * 1.3 // 30% above
      break
    case 'penetration':
      price = avgCompetitorPrice * 0.7 // 30% below
      break
    case 'skimming':
      price = avgCompetitorPrice * 1.5 // 50% above
      break
  }

  return {
    total: price,
    breakdown: [
      { item: 'Base Price', quantity: 1, unitPrice: price, total: price }
    ],
    discounts: [],
    finalPrice: price
  }
}

export function calculateDynamicPrice(
  pricing: DynamicPricing,
  context: PriceContext
): PriceCalculation {
  let price = pricing.basePrice
  const breakdown: PriceBreakdown[] = [
    { item: 'Base Price', quantity: 1, unitPrice: pricing.basePrice, total: pricing.basePrice }
  ]

  // Apply rules in priority order
  const sortedRules = [...pricing.rules].sort((a, b) => b.priority - a.priority)

  for (const rule of sortedRules) {
    // Simplified condition evaluation (in production, use a proper expression evaluator)
    const conditionMet = true // Placeholder

    if (conditionMet) {
      if (rule.adjustment.type === 'percentage') {
        const adjustment = price * (rule.adjustment.value - 1)
        price *= rule.adjustment.value
        breakdown.push({
          item: rule.adjustment.reason || 'Dynamic Adjustment',
          quantity: 1,
          unitPrice: adjustment,
          total: adjustment
        })
      } else {
        price += rule.adjustment.value
        breakdown.push({
          item: rule.adjustment.reason || 'Dynamic Adjustment',
          quantity: 1,
          unitPrice: rule.adjustment.value,
          total: rule.adjustment.value
        })
      }
    }
  }

  const finalPrice = Math.max(Math.min(price, pricing.maxPrice), pricing.minPrice)

  return {
    total: finalPrice,
    breakdown,
    discounts: [],
    finalPrice
  }
}

export function calculateTieredPrice(
  pricing: TieredPricing,
  context: PriceContext
): PriceCalculation {
  const quantity = context.quantity || 1
  let total = 0
  const breakdown: PriceBreakdown[] = []

  if (pricing.billingMethod === 'all-units') {
    // All units billed at the tier rate
    const tier = pricing.tiers.find(
      t => quantity >= t.minQuantity && (!t.maxQuantity || quantity <= t.maxQuantity)
    ) || pricing.tiers[pricing.tiers.length - 1]

    total = quantity * tier.price
    breakdown.push({
      item: tier.label || `Tier ${tier.minQuantity}-${tier.maxQuantity || '∞'}`,
      quantity,
      unitPrice: tier.price,
      total
    })
  } else {
    // Per-tier billing (each tier billed at its own rate)
    let remaining = quantity

    for (const tier of pricing.tiers) {
      const tierQuantity = Math.min(
        remaining,
        tier.maxQuantity ? tier.maxQuantity - tier.minQuantity + 1 : remaining
      )

      if (tierQuantity > 0) {
        const tierTotal = tierQuantity * tier.price
        breakdown.push({
          item: tier.label || `Units ${tier.minQuantity}-${tier.maxQuantity || '∞'}`,
          quantity: tierQuantity,
          unitPrice: tier.price,
          total: tierTotal
        })
        total += tierTotal
        remaining -= tierQuantity
      }

      if (remaining <= 0) break
    }
  }

  return {
    total,
    breakdown,
    discounts: [],
    finalPrice: total
  }
}
