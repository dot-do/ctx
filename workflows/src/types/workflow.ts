/**
 * Enhanced Workflow Types with Sandbox Support
 *
 * Extends existing workflow types to support:
 * - Multi-language execution (Python, JavaScript, TypeScript, etc.)
 * - Sandbox configuration and resource limits
 * - Execution context and streaming output
 */

import { z } from 'zod'

/**
 * Supported execution languages
 */
export const ExecutionLanguage = z.enum(['javascript', 'typescript', 'python', 'ruby', 'go', 'rust'])
export type ExecutionLanguage = z.infer<typeof ExecutionLanguage>

/**
 * Sandbox resource limits
 */
export const ResourceLimitsSchema = z.object({
  memory: z.string().default('128MB').describe('Memory limit (e.g., 128MB, 512MB, 1GB)'),
  cpu: z.number().min(0.1).max(4).default(0.5).describe('CPU cores (fractional allowed)'),
  timeout: z.number().min(1000).max(600000).default(30000).describe('Execution timeout in milliseconds'),
  maxOutputSize: z.number().min(1024).max(10485760).default(1048576).describe('Max output size in bytes (1MB default)'),
})

export type ResourceLimits = z.infer<typeof ResourceLimitsSchema>

/**
 * Sandbox configuration for step execution
 */
export const SandboxConfigSchema = z.object({
  envVars: z.record(z.string()).optional().describe('Environment variables for sandbox'),
  packages: z.array(z.string()).optional().describe('Packages to install (e.g., ["numpy", "pandas"] for Python)'),
  files: z.record(z.string()).optional().describe('Files to create in sandbox (path → content)'),
  workingDir: z.string().default('/app').describe('Working directory in sandbox'),
  streaming: z.boolean().default(false).describe('Enable streaming output'),
})

export type SandboxConfig = z.infer<typeof SandboxConfigSchema>

/**
 * Enhanced function step config with language support
 */
export const FunctionStepConfigSchema = z.object({
  functionId: z.string().describe('Function ID to execute'),
  language: ExecutionLanguage.optional().describe('Execution language (auto-detected if not specified)'),
  code: z.string().optional().describe('Inline code to execute (alternative to functionId)'),
  parameters: z.record(z.any()).default({}).describe('Parameters to pass to function'),
  retryPolicy: z
    .object({
      maxRetries: z.number().min(0).max(10).default(3),
      backoff: z.enum(['linear', 'exponential']).default('exponential'),
      initialDelay: z.number().min(100).max(60000).default(1000),
    })
    .optional()
    .describe('Retry policy for step'),
  resources: ResourceLimitsSchema.optional().describe('Resource limits for execution'),
  sandbox: SandboxConfigSchema.optional().describe('Sandbox configuration'),
})

export type FunctionStepConfig = z.infer<typeof FunctionStepConfigSchema>

/**
 * Parallel step configuration
 */
export const ParallelStepConfigSchema = z.object({
  steps: z.array(z.lazy(() => WorkflowStepSchema)).describe('Steps to execute in parallel'),
  waitForAll: z.boolean().default(true).describe('Wait for all steps to complete'),
  maxConcurrency: z.number().min(1).max(100).optional().describe('Maximum concurrent steps'),
})

export type ParallelStepConfig = z.infer<typeof ParallelStepConfigSchema>

/**
 * Condition step configuration
 */
export const ConditionStepConfigSchema = z.object({
  condition: z.string().describe('JavaScript expression to evaluate'),
  then: z.array(z.lazy(() => WorkflowStepSchema)).describe('Steps if condition is true'),
  else: z.array(z.lazy(() => WorkflowStepSchema)).optional().describe('Steps if condition is false'),
})

export type ConditionStepConfig = z.infer<typeof ConditionStepConfigSchema>

/**
 * Loop step configuration
 */
export const LoopStepConfigSchema = z.object({
  items: z.union([z.array(z.any()), z.string()]).describe('Array or expression that returns array'),
  steps: z.array(z.lazy(() => WorkflowStepSchema)).describe('Steps to execute for each item'),
  maxIterations: z.number().min(1).max(1000).optional().describe('Maximum iterations'),
  parallel: z.boolean().default(false).describe('Execute iterations in parallel'),
})

export type LoopStepConfig = z.infer<typeof LoopStepConfigSchema>

/**
 * Sleep step configuration
 */
export const SleepStepConfigSchema = z.object({
  duration: z.number().min(100).max(86400000).describe('Sleep duration in milliseconds'),
})

export type SleepStepConfig = z.infer<typeof SleepStepConfigSchema>

/**
 * Webhook step configuration
 */
export const WebhookStepConfigSchema = z.object({
  url: z.string().url().describe('Webhook URL to call'),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('POST').describe('HTTP method'),
  headers: z.record(z.string()).optional().describe('HTTP headers'),
  body: z.any().optional().describe('Request body'),
  timeout: z.number().min(1000).max(30000).default(10000).describe('Request timeout in milliseconds'),
})

export type WebhookStepConfig = z.infer<typeof WebhookStepConfigSchema>

/**
 * Human approval step configuration
 */
export const HumanStepConfigSchema = z.object({
  slackChannel: z.string().describe('Slack channel ID for approval request'),
  messageTemplate: z.string().describe('Message template with {{variable}} placeholders'),
  approvers: z.array(z.string()).optional().describe('List of Slack user IDs who can approve'),
  timeout: z.number().min(60000).max(86400000).default(3600000).describe('Timeout for approval in milliseconds'),
  requiredApprovals: z.number().min(1).default(1).describe('Number of approvals required'),
  onTimeout: z.enum(['fail', 'approve', 'reject']).default('fail').describe('Action if timeout occurs'),
})

export type HumanStepConfig = z.infer<typeof HumanStepConfigSchema>

/**
 * Workflow step types
 */
export const WorkflowStepType = z.enum([
  'function', // Execute a function
  'parallel', // Execute steps in parallel
  'condition', // Conditional branching
  'loop', // Loop over items
  'sleep', // Sleep for duration
  'webhook', // Call external webhook
  'human', // Wait for human approval
])

export type WorkflowStepType = z.infer<typeof WorkflowStepType>

/**
 * Workflow step schema with enhanced config
 */
export const WorkflowStepSchema: z.ZodType = z.object({
  id: z.string().optional().describe('Step ID (auto-generated if not provided)'),
  name: z.string().describe('Step name'),
  description: z.string().optional().describe('Step description'),
  type: WorkflowStepType.describe('Step type'),
  config: z
    .union([
      FunctionStepConfigSchema,
      ParallelStepConfigSchema,
      ConditionStepConfigSchema,
      LoopStepConfigSchema,
      SleepStepConfigSchema,
      WebhookStepConfigSchema,
      HumanStepConfigSchema,
    ])
    .describe('Step configuration based on type'),
  outputVariable: z.string().optional().describe('Variable name to store step output'),
  continueOnError: z.boolean().default(false).describe('Continue workflow if step fails'),
})

export type WorkflowStep = z.infer<typeof WorkflowStepSchema>

/**
 * Workflow trigger types
 */
export const WorkflowTriggerType = z.enum([
  'manual', // Manually triggered
  'schedule', // Cron schedule
  'webhook', // HTTP webhook
  'event', // Event-driven (queue, database change, etc)
])

export type WorkflowTriggerType = z.infer<typeof WorkflowTriggerType>

/**
 * Schedule trigger configuration
 */
export const ScheduleTriggerConfigSchema = z.object({
  cron: z.string().describe('Cron expression (e.g., "0 0 * * *")'),
  timezone: z.string().default('UTC').describe('Timezone for cron schedule'),
})

export type ScheduleTriggerConfig = z.infer<typeof ScheduleTriggerConfigSchema>

/**
 * Webhook trigger configuration
 */
export const WebhookTriggerConfigSchema = z.object({
  path: z.string().describe('Webhook path (e.g., "/webhooks/my-workflow")'),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('POST').describe('HTTP method'),
  authentication: z
    .object({
      type: z.enum(['none', 'apiKey', 'bearer', 'signature']),
      config: z.record(z.any()).optional(),
    })
    .optional()
    .describe('Authentication configuration'),
})

export type WebhookTriggerConfig = z.infer<typeof WebhookTriggerConfigSchema>

/**
 * Event trigger configuration
 */
export const EventTriggerConfigSchema = z.object({
  source: z.enum(['queue', 'database', 'email', 'custom']).describe('Event source'),
  filter: z.record(z.any()).optional().describe('Event filter criteria'),
})

export type EventTriggerConfig = z.infer<typeof EventTriggerConfigSchema>

/**
 * Workflow trigger schema
 */
export const WorkflowTriggerSchema = z.object({
  type: WorkflowTriggerType.describe('Trigger type'),
  config: z
    .union([ScheduleTriggerConfigSchema, WebhookTriggerConfigSchema, EventTriggerConfigSchema, z.object({}).describe('Manual trigger config')])
    .optional()
    .describe('Trigger configuration'),
})

export type WorkflowTrigger = z.infer<typeof WorkflowTriggerSchema>

/**
 * Workflow metadata
 */
export const WorkflowMetadataSchema = z.object({
  name: z.string().describe('Workflow name'),
  description: z.string().describe('Workflow description'),
  version: z.string().default('1.0.0').describe('Workflow version'),
  author: z.string().optional().describe('Workflow author'),
  tags: z.array(z.string()).default([]).describe('Workflow tags for categorization'),
  createdAt: z.string().datetime().optional().describe('Creation timestamp'),
  updatedAt: z.string().datetime().optional().describe('Last update timestamp'),
})

export type WorkflowMetadata = z.infer<typeof WorkflowMetadataSchema>

/**
 * Complete workflow definition
 */
export const WorkflowSchema = z.object({
  id: z.string().optional().describe('Workflow ID (auto-generated if not provided)'),
  ns: z.string().default('services').describe('Namespace for the workflow'),
  metadata: WorkflowMetadataSchema.describe('Workflow metadata'),
  trigger: WorkflowTriggerSchema.optional().describe('Workflow trigger configuration'),
  parameters: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(['string', 'number', 'boolean', 'object', 'array']),
        required: z.boolean().default(true),
        default: z.any().optional(),
      })
    )
    .default([])
    .describe('Workflow parameters'),
  steps: z.array(WorkflowStepSchema).min(1).describe('Workflow steps'),
  timeout: z.number().min(1000).max(3600000).default(300000).describe('Total workflow timeout in milliseconds'),
  retryPolicy: z
    .object({
      maxRetries: z.number().min(0).max(10).default(0),
      backoff: z.enum(['linear', 'exponential']).default('exponential'),
      initialDelay: z.number().min(100).max(60000).default(1000),
    })
    .optional()
    .describe('Workflow-level retry policy'),
  enabled: z.boolean().default(true).describe('Whether workflow is enabled'),
  visibility: z.enum(['public', 'private', 'unlisted']).default('private').describe('Workflow visibility'),
  defaultSandbox: SandboxConfigSchema.optional().describe('Default sandbox config for all steps'),
  defaultResources: ResourceLimitsSchema.optional().describe('Default resource limits for all steps'),
})

export type Workflow = z.infer<typeof WorkflowSchema>

/**
 * Workflow execution request
 */
export const WorkflowExecutionRequestSchema = z.object({
  workflowId: z.string().describe('Workflow ID to execute'),
  parameters: z.record(z.any()).default({}).describe('Workflow parameters'),
  context: z.record(z.any()).optional().describe('Additional execution context'),
  async: z.boolean().default(true).describe('Whether to execute asynchronously'),
  webhookUrl: z.string().url().optional().describe('Webhook URL for status updates'),
})

export type WorkflowExecutionRequest = z.infer<typeof WorkflowExecutionRequestSchema>

/**
 * Workflow execution status
 */
export const WorkflowExecutionStatusSchema = z.enum(['pending', 'running', 'paused', 'completed', 'failed', 'cancelled', 'timeout'])

export type WorkflowExecutionStatus = z.infer<typeof WorkflowExecutionStatusSchema>

/**
 * Workflow step execution result
 */
export const WorkflowStepExecutionSchema = z.object({
  stepId: z.string().describe('Step ID'),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'skipped']).describe('Step status'),
  result: z.any().optional().describe('Step result'),
  error: z.string().optional().describe('Error message if failed'),
  startedAt: z.string().datetime().optional().describe('Step start timestamp'),
  completedAt: z.string().datetime().optional().describe('Step completion timestamp'),
  retries: z.number().default(0).describe('Number of retries attempted'),
})

export type WorkflowStepExecution = z.infer<typeof WorkflowStepExecutionSchema>

/**
 * Workflow execution result
 */
export const WorkflowExecutionResultSchema = z.object({
  executionId: z.string().describe('Execution ID'),
  workflowId: z.string().describe('Workflow ID'),
  status: WorkflowExecutionStatusSchema.describe('Execution status'),
  result: z.any().optional().describe('Final workflow result'),
  error: z.string().optional().describe('Error message if failed'),
  steps: z.array(WorkflowStepExecutionSchema).describe('Step execution results'),
  variables: z.record(z.any()).default({}).describe('Workflow variables'),
  metrics: z
    .object({
      startTime: z.number(),
      endTime: z.number().optional(),
      duration: z.number().optional(),
      stepsCompleted: z.number(),
      stepsFailed: z.number(),
      retriesPerformed: z.number(),
      cost: z.number().optional(),
    })
    .optional()
    .describe('Execution metrics'),
  createdAt: z.string().datetime().describe('Execution start timestamp'),
  completedAt: z.string().datetime().optional().describe('Execution completion timestamp'),
})

export type WorkflowExecutionResult = z.infer<typeof WorkflowExecutionResultSchema>

/**
 * Helper function to validate step type and config match
 */
export function validateStepConfig(stepType: WorkflowStepType, config: unknown): boolean {
  switch (stepType) {
    case 'function':
      return FunctionStepConfigSchema.safeParse(config).success
    case 'parallel':
      return ParallelStepConfigSchema.safeParse(config).success
    case 'condition':
      return ConditionStepConfigSchema.safeParse(config).success
    case 'loop':
      return LoopStepConfigSchema.safeParse(config).success
    case 'sleep':
      return SleepStepConfigSchema.safeParse(config).success
    case 'webhook':
      return WebhookStepConfigSchema.safeParse(config).success
    case 'human':
      return HumanStepConfigSchema.safeParse(config).success
    default:
      return false
  }
}

/**
 * Helper to get config schema for step type
 */
export function getConfigSchemaForStepType(stepType: WorkflowStepType): z.ZodType {
  switch (stepType) {
    case 'function':
      return FunctionStepConfigSchema
    case 'parallel':
      return ParallelStepConfigSchema
    case 'condition':
      return ConditionStepConfigSchema
    case 'loop':
      return LoopStepConfigSchema
    case 'sleep':
      return SleepStepConfigSchema
    case 'webhook':
      return WebhookStepConfigSchema
    case 'human':
      return HumanStepConfigSchema
    default:
      throw new Error(`Unknown step type: ${stepType}`)
  }
}
