/**
 * Generative API for Mass Business Creation
 *
 * Enables recursive, parallelized AI generation of thousands of business ideas
 * by systematically exploring the O*NET × NAICS × GDPval space.
 *
 * Key Concepts:
 * 1. **Recursive Iteration**: forEach can nest infinitely
 * 2. **Conditional Generation**: Only generate if AI can deliver (GDPval)
 * 3. **Parallelization**: Spawn thousands of AI agents concurrently
 * 4. **Multivariate Testing**: Test models × prompts × settings
 * 5. **Combinatorial Explosion**: Generate massive result sets
 *
 * Example:
 * ```typescript
 * await generator
 *   .forEachOccupation
 *   .task
 *   .ifAICanDeliver
 *   .generateService()
 *   .withModels(['gpt-4o', 'claude-3.7', 'gemini-2.0'])
 *   .withPrompts(['creative', 'analytical', 'persuasive'])
 *   .inParallel(1000) // 1000 concurrent agents
 * // → Generates 270,000+ service variations in seconds
 * ```
 */

import type { ONETOccupation, ONETTask, NAICSCode } from './onet-naics'
import type { Service } from './service'
import type { Business } from './business'
import type { Agent, AIModel } from './agent'

// ═══════════════════════════════════════════════════════════
// Generative Iterator Types
// ═══════════════════════════════════════════════════════════

/**
 * Generative context for AI creation
 */
export interface GenerativeContext {
  // What we're iterating
  occupation?: ONETOccupation
  task?: ONETTask
  industry?: NAICSCode

  // AI generation settings
  model?: AIModel
  prompt?: PromptVariant
  temperature?: number
  maxTokens?: number

  // Multivariate test settings
  pricingModel?: PricingVariant
  qualityTier?: QualityVariant
  turnaroundTier?: TurnaroundVariant

  // Parallelization
  batchSize?: number
  maxConcurrent?: number

  // Filtering
  minGDPvalScore?: number
  maxComplexity?: number
}

export type PromptVariant = 'creative' | 'analytical' | 'persuasive' | 'technical' | 'empathetic'
export type PricingVariant = 'value-based' | 'cost-based' | 'competitor-based' | 'dynamic' | 'tiered'
export type QualityVariant = 'basic' | 'standard' | 'premium' | 'luxury'
export type TurnaroundVariant = 'rush' | 'standard' | 'extended' | 'flexible'

/**
 * Generated result with metadata
 */
export interface GeneratedResult<T> {
  item: T
  metadata: {
    occupation?: string
    task?: string
    model: string
    prompt: string
    generatedAt: Date
    tokensUsed: number
    timeTaken: number // ms
    confidence: number // 0-1
  }
  variations?: GeneratedResult<T>[] // Alternative generations
}

// ═══════════════════════════════════════════════════════════
// Recursive Iterator Proxies
// ═══════════════════════════════════════════════════════════

/**
 * ForEachOccupation - Iterate all occupations
 *
 * Usage:
 * ```typescript
 * generator.forEachOccupation
 *   .task
 *   .ifAICanDeliver
 *   .generateService()
 * ```
 */
export interface ForEachOccupationProxy {
  // Nested iteration
  task: ForEachTaskProxy
  industry: ForEachIndustryProxy

  // Direct generation
  generateBusiness: () => GenerationChain<Business>
  generateServices: () => GenerationChain<Service[]>

  // Filtering
  where: (filter: (occ: ONETOccupation) => boolean) => ForEachOccupationProxy
  withGDPvalMin: (score: number) => ForEachOccupationProxy
  inIndustry: (naics: NAICSCode) => ForEachOccupationProxy
}

/**
 * ForEachTask - Iterate tasks within occupation
 */
export interface ForEachTaskProxy {
  // Conditional generation
  ifAICanDeliver: IfAICanDeliverProxy
  ifHumanRequired: IfHumanRequiredProxy

  // Direct generation
  generateService: () => GenerationChain<Service>

  // Filtering
  where: (filter: (task: ONETTask) => boolean) => ForEachTaskProxy
  withImportanceMin: (score: number) => ForEachTaskProxy
  withFrequencyMin: (score: number) => ForEachTaskProxy
}

/**
 * ForEachIndustry - Iterate NAICS industries
 */
export interface ForEachIndustryProxy {
  occupation: ForEachOccupationProxy
  generateBusinesses: () => GenerationChain<Business[]>

  where: (filter: (naics: NAICSCode) => boolean) => ForEachIndustryProxy
}

/**
 * IfAICanDeliver - Conditional branch for AI-suitable tasks
 */
export interface IfAICanDeliverProxy {
  generateService: () => GenerationChain<Service>
  generateBusiness: () => GenerationChain<Business>
  estimatePricing: () => GenerationChain<number>
  calculateROI: () => GenerationChain<number>

  // Further filtering
  withMinScore: (score: number) => IfAICanDeliverProxy
}

/**
 * IfHumanRequired - Conditional branch for human-led tasks
 */
export interface IfHumanRequiredProxy {
  generateHybridService: () => GenerationChain<Service>
  estimateHumanCost: () => GenerationChain<number>
}

// ═══════════════════════════════════════════════════════════
// Generation Chain (Builder Pattern)
// ═══════════════════════════════════════════════════════════

/**
 * Fluent API for configuring AI generation
 *
 * Enables multivariate testing:
 * ```typescript
 * await chain
 *   .withModels(['gpt-4o', 'claude-3.7', 'gemini-2.0'])
 *   .withPrompts(['creative', 'analytical'])
 *   .withPricing(['value-based', 'cost-based'])
 *   .inParallel(1000)
 *   .execute()
 * ```
 */
export interface GenerationChain<T> {
  // AI model variants
  withModel: (model: AIModel) => this
  withModels: (models: AIModel[]) => this

  // Prompt variants
  withPrompt: (variant: PromptVariant) => this
  withPrompts: (variants: PromptVariant[]) => this

  // Pricing variants
  withPricing: (variant: PricingVariant) => this
  withPricingModels: (variants: PricingVariant[]) => this

  // Quality variants
  withQuality: (tier: QualityVariant) => this
  withQualityTiers: (tiers: QualityVariant[]) => this

  // Turnaround variants
  withTurnaround: (tier: TurnaroundVariant) => this
  withTurnaroundTiers: (tiers: TurnaroundVariant[]) => this

  // AI settings
  withTemperature: (temp: number) => this
  withMaxTokens: (tokens: number) => this

  // Parallelization
  inParallel: (maxConcurrent: number) => this
  inBatches: (batchSize: number) => this

  // Filtering/Sorting
  top: (n: number) => this
  where: (filter: (item: T) => boolean) => this
  sortBy: (key: keyof T | ((item: T) => number)) => this

  // Execution
  execute: () => Promise<GeneratedResult<T>[]>
  executeOne: () => Promise<GeneratedResult<T>>

  // Streaming (for real-time feedback)
  stream: () => AsyncGenerator<GeneratedResult<T>>
}

// ═══════════════════════════════════════════════════════════
// Generation Strategy
// ═══════════════════════════════════════════════════════════

/**
 * How to distribute work across AI agents
 */
export type GenerationStrategy =
  | 'sequential' // One at a time (slow, but ordered)
  | 'parallel' // All at once (fast, but resource-intensive)
  | 'batched' // Groups of N (balanced)
  | 'stream' // One-by-one with streaming (real-time feedback)
  | 'adaptive' // Adjust concurrency based on performance

export interface GenerationConfig {
  strategy: GenerationStrategy
  maxConcurrent: number // Max parallel agents
  batchSize: number // Items per batch
  retryPolicy: {
    maxRetries: number
    backoffMs: number
  }
  timeout: number // Max time per generation (ms)
  cachingEnabled: boolean
}

// ═══════════════════════════════════════════════════════════
// Combinatorial Explosion Calculator
// ═══════════════════════════════════════════════════════════

/**
 * Calculate total permutations
 */
export interface PermutationSpace {
  occupations: number // ~1,000 O*NET occupations
  tasksPerOccupation: number // ~30 average
  models: number // e.g., 3 models
  prompts: number // e.g., 5 prompt variants
  pricingModels: number // e.g., 5 pricing models
  qualityTiers: number // e.g., 3 quality levels
  turnaroundTiers: number // e.g., 3 turnaround options

  // Filtering
  minGDPvalScore?: number // Only AI-suitable (reduces by ~70%)

  // Calculated
  totalPermutations: number
  aiSuitablePermutations: number // After GDPval filter
  estimatedTimeSeconds: number // At N per second
  estimatedCostUSD: number // At $X per generation
}

export function calculatePermutations(config: Partial<PermutationSpace>): PermutationSpace {
  const {
    occupations = 1000,
    tasksPerOccupation = 30,
    models = 1,
    prompts = 1,
    pricingModels = 1,
    qualityTiers = 1,
    turnaroundTiers = 1,
    minGDPvalScore = 0.0
  } = config

  const totalTasks = occupations * tasksPerOccupation
  const totalPermutations =
    totalTasks * models * prompts * pricingModels * qualityTiers * turnaroundTiers

  // Estimate AI suitability filter (GDPval > threshold)
  // At 0.7: ~30% of tasks are AI-suitable
  // At 0.8: ~20% of tasks are AI-suitable
  const aiSuitableRatio = minGDPvalScore >= 0.8 ? 0.2 : minGDPvalScore >= 0.7 ? 0.3 : 1.0
  const aiSuitablePermutations = Math.floor(totalPermutations * aiSuitableRatio)

  // Estimate time (assuming 2 seconds per generation)
  const generationsPerSecond = 100 // With parallelization
  const estimatedTimeSeconds = Math.ceil(aiSuitablePermutations / generationsPerSecond)

  // Estimate cost (assuming $0.001 per generation)
  const costPerGeneration = 0.001
  const estimatedCostUSD = aiSuitablePermutations * costPerGeneration

  return {
    occupations,
    tasksPerOccupation,
    models,
    prompts,
    pricingModels,
    qualityTiers,
    turnaroundTiers,
    minGDPvalScore,
    totalPermutations,
    aiSuitablePermutations,
    estimatedTimeSeconds,
    estimatedCostUSD
  }
}

// ═══════════════════════════════════════════════════════════
// AI Generation Functions
// ═══════════════════════════════════════════════════════════

/**
 * Generate service from O*NET task using AI
 */
export async function generateServiceFromTask(
  occupation: ONETOccupation,
  task: ONETTask,
  context: GenerativeContext
): Promise<GeneratedResult<Service>> {
  const startTime = Date.now()

  // Build prompt based on variant
  const prompt = buildServicePrompt(occupation, task, context)

  // Call AI model
  const response = await callAI(context.model || 'gpt-4o', prompt, {
    temperature: context.temperature || 0.7,
    maxTokens: context.maxTokens || 2000
  })

  // Parse response into Service type
  const service = parseServiceResponse(response, occupation, task, context)

  return {
    item: service,
    metadata: {
      occupation: occupation.code,
      task: task.id,
      model: context.model || 'gpt-4o',
      prompt: context.prompt || 'standard',
      generatedAt: new Date(),
      tokensUsed: response.tokensUsed,
      timeTaken: Date.now() - startTime,
      confidence: response.confidence || 0.8
    }
  }
}

/**
 * Generate business from occupation using AI
 */
export async function generateBusinessFromOccupation(
  occupation: ONETOccupation,
  context: GenerativeContext
): Promise<GeneratedResult<Business>> {
  const startTime = Date.now()

  const prompt = buildBusinessPrompt(occupation, context)
  const response = await callAI(context.model || 'gpt-4o', prompt, {
    temperature: context.temperature || 0.7,
    maxTokens: context.maxTokens || 5000
  })

  const business = parseBusinessResponse(response, occupation, context)

  return {
    item: business,
    metadata: {
      occupation: occupation.code,
      model: context.model || 'gpt-4o',
      prompt: context.prompt || 'standard',
      generatedAt: new Date(),
      tokensUsed: response.tokensUsed,
      timeTaken: Date.now() - startTime,
      confidence: response.confidence || 0.8
    }
  }
}

// ═══════════════════════════════════════════════════════════
// Prompt Engineering
// ═══════════════════════════════════════════════════════════

function buildServicePrompt(
  occupation: ONETOccupation,
  task: ONETTask,
  context: GenerativeContext
): string {
  const variant = context.prompt || 'standard'

  const basePrompt = `
You are a business strategist designing AI-powered services.

Occupation: ${occupation.title} (${occupation.code})
Task: ${task.description}
GDPval Score: ${task.gdpvalScore || 'unknown'}

Design a service that an AI agent can deliver for this task.
Include:
- Service name and description
- Deliverable specifications
- Quality criteria
- Pricing model
- SLA guarantees

Output valid JSON matching the Service type.
`

  const variantPrompts = {
    creative: basePrompt + '\nBe creative and innovative. Think outside the box.',
    analytical: basePrompt + '\nBe data-driven and precise. Focus on metrics.',
    persuasive: basePrompt + '\nBe compelling and customer-focused. Emphasize value.',
    technical: basePrompt + '\nBe detailed and technical. Include specifications.',
    empathetic: basePrompt + '\nBe human-centered. Focus on customer pain points.'
  }

  return variantPrompts[variant] || basePrompt
}

function buildBusinessPrompt(occupation: ONETOccupation, context: GenerativeContext): string {
  const variant = context.prompt || 'standard'

  return `
You are a business strategist designing AI-native businesses.

Occupation: ${occupation.title} (${occupation.code})
Description: ${occupation.description}
GDPval Score: ${occupation.gdpvalScore || 'unknown'}

Design a complete business that employs AI agents in this occupation.
Include:
- Business name, vision, mission
- StoryBrand framework
- Service catalog (3-5 services)
- AI agent workforce
- OKRs and metrics
- Revenue model

Output valid JSON matching the Business type.

Prompt variant: ${variant}
`
}

// ═══════════════════════════════════════════════════════════
// AI Model Interface (Placeholder)
// ═══════════════════════════════════════════════════════════

interface AIResponse {
  text: string
  tokensUsed: number
  confidence?: number
}

async function callAI(
  model: string,
  prompt: string,
  options: { temperature: number; maxTokens: number }
): Promise<AIResponse> {
  // In production, this would call actual AI APIs
  // For now, placeholder
  return {
    text: '{}',
    tokensUsed: 1000,
    confidence: 0.8
  }
}

function parseServiceResponse(
  response: AIResponse,
  occupation: ONETOccupation,
  task: ONETTask,
  context: GenerativeContext
): Service {
  // In production, parse JSON response
  // For now, placeholder
  return {
    id: `service-${Date.now()}`,
    name: `${task.description} Service`,
    occupation: occupation.code,
    tasks: [task.id],
    deliverable: {
      type: 'document',
      format: 'pdf',
      specifications: []
    },
    turnaroundTime: { value: 48, unit: 'hours' },
    quality: {
      criteria: [],
      minScore: 8.0,
      evaluator: 'ai'
    },
    pricing: {
      type: 'outcome-based',
      basePrice: 299
    },
    sla: {
      uptime: 0.99,
      responseTime: { value: 24, unit: 'hours' },
      resolutionTime: { value: 48, unit: 'hours' },
      qualityGuarantee: 8.0
    },
    guarantees: [],
    status: 'active'
  } as Service
}

function parseBusinessResponse(
  response: AIResponse,
  occupation: ONETOccupation,
  context: GenerativeContext
): Business {
  // Placeholder
  return {
    id: `business-${Date.now()}`,
    name: `AI ${occupation.title} Agency`,
    vision: 'Placeholder vision',
    mission: 'Placeholder mission',
    okrs: [],
    ceo: undefined as any,
    org: [],
    agents: [],
    services: [],
    workflows: [],
    metrics: {
      revenue: { mrr: 0, arr: 0, growth: 0 },
      customers: { total: 0, active: 0, churn: 0, nps: 0 },
      quality: { averageScore: 0, passRate: 0, revisionRate: 0 },
      efficiency: { avgTurnaround: 0, utilizationRate: 0, costPerDeliverable: 0 }
    },
    performance: { health: 'green', okrProgress: 0, runway: 12, burnRate: 0 }
  } as Business
}

// ═══════════════════════════════════════════════════════════
// Export Helpers
// ═══════════════════════════════════════════════════════════

export const EXAMPLE_PERMUTATIONS = {
  // Conservative: 3 models, 2 prompts, AI-suitable only
  CONSERVATIVE: calculatePermutations({
    occupations: 100,
    tasksPerOccupation: 20,
    models: 3,
    prompts: 2,
    minGDPvalScore: 0.8
  }),

  // Moderate: 5 models, 5 prompts, 3 pricing, AI-suitable
  MODERATE: calculatePermutations({
    occupations: 500,
    tasksPerOccupation: 25,
    models: 5,
    prompts: 5,
    pricingModels: 3,
    minGDPvalScore: 0.7
  }),

  // Aggressive: All occupations, full multivariate testing
  AGGRESSIVE: calculatePermutations({
    occupations: 1000,
    tasksPerOccupation: 30,
    models: 5,
    prompts: 5,
    pricingModels: 5,
    qualityTiers: 3,
    turnaroundTiers: 3,
    minGDPvalScore: 0.7
  }),

  // MAXIMUM: Everything, no filter
  MAXIMUM: calculatePermutations({
    occupations: 1000,
    tasksPerOccupation: 30,
    models: 10,
    prompts: 10,
    pricingModels: 10,
    qualityTiers: 5,
    turnaroundTiers: 5,
    minGDPvalScore: 0.0 // No filtering
  })
}
