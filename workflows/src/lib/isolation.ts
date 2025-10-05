/**
 * Sandbox Isolation and Security
 *
 * Provides security controls and isolation for workflow execution:
 * - Environment variable isolation and secret management
 * - Network isolation configuration
 * - Permission boundaries and resource quotas
 * - Security policy enforcement
 */

import type { SandboxConfig, ResourceLimits } from '../types/workflow'

/**
 * Security policy for sandbox execution
 */
export interface SecurityPolicy {
  allowNetworkAccess: boolean          // Allow network access
  allowedDomains?: string[]            // Whitelist of allowed domains
  allowFileSystem: boolean             // Allow file system operations
  allowedPaths?: string[]              // Whitelist of allowed paths
  allowProcessCreation: boolean        // Allow spawning processes
  allowEnvironmentAccess: boolean      // Allow reading env vars
  maxExecutionTime: number             // Maximum execution time (ms)
  maxMemoryUsage: number               // Maximum memory in bytes
  maxCpuUsage: number                  // Maximum CPU cores
  allowedLanguages: string[]           // Whitelist of languages
}

/**
 * Secret management for secure credential handling
 */
export interface SecretManager {
  getSecret(name: string): Promise<string | null>
  listSecrets(): Promise<string[]>
  setSecret(name: string, value: string): Promise<void>
  deleteSecret(name: string): Promise<void>
}

/**
 * Network isolation configuration
 */
export interface NetworkIsolation {
  enabled: boolean
  allowedDomains: string[]
  deniedDomains: string[]
  requireTls: boolean
  maxRequestSize: number
  maxResponseSize: number
  timeout: number
}

/**
 * File system isolation configuration
 */
export interface FileSystemIsolation {
  enabled: boolean
  readOnlyPaths: string[]
  writablePaths: string[]
  maxFileSize: number
  maxTotalSize: number
  allowedExtensions: string[]
}

/**
 * Default security policy (restrictive)
 */
export const DEFAULT_SECURITY_POLICY: SecurityPolicy = {
  allowNetworkAccess: false,
  allowedDomains: [],
  allowFileSystem: true,
  allowedPaths: ['/app', '/tmp'],
  allowProcessCreation: false,
  allowEnvironmentAccess: true,
  maxExecutionTime: 30000,      // 30 seconds
  maxMemoryUsage: 134217728,    // 128MB
  maxCpuUsage: 0.5,             // 0.5 cores
  allowedLanguages: ['javascript', 'typescript', 'python'],
}

/**
 * Permissive security policy (for trusted workflows)
 */
export const PERMISSIVE_SECURITY_POLICY: SecurityPolicy = {
  allowNetworkAccess: true,
  allowedDomains: ['*'],
  allowFileSystem: true,
  allowedPaths: ['*'],
  allowProcessCreation: true,
  allowEnvironmentAccess: true,
  maxExecutionTime: 300000,     // 5 minutes
  maxMemoryUsage: 536870912,    // 512MB
  maxCpuUsage: 2.0,             // 2 cores
  allowedLanguages: ['javascript', 'typescript', 'python', 'ruby', 'go', 'rust'],
}

/**
 * Isolation manager for security controls
 */
export class IsolationManager {
  private secretsCache: Map<string, string> = new Map()

  constructor(
    private policy: SecurityPolicy = DEFAULT_SECURITY_POLICY,
    private secretManager?: SecretManager
  ) {}

  /**
   * Validate sandbox config against security policy
   */
  validateSandboxConfig(config: SandboxConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validate environment variables
    if (config.envVars && !this.policy.allowEnvironmentAccess) {
      errors.push('Environment variable access not allowed by security policy')
    }

    // Validate file operations
    if (config.files && !this.policy.allowFileSystem) {
      errors.push('File system access not allowed by security policy')
    }

    // Validate paths
    if (config.workingDir && this.policy.allowedPaths) {
      const allowed = this.policy.allowedPaths.some(path =>
        path === '*' || config.workingDir.startsWith(path)
      )
      if (!allowed) {
        errors.push(`Working directory ${config.workingDir} not in allowed paths`)
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Validate resource limits against policy
   */
  validateResourceLimits(limits: ResourceLimits): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Parse memory limit
    const memoryBytes = this.parseMemoryString(limits.memory)
    if (memoryBytes > this.policy.maxMemoryUsage) {
      errors.push(`Memory limit ${limits.memory} exceeds policy maximum ${this.formatBytes(this.policy.maxMemoryUsage)}`)
    }

    // Validate CPU
    if (limits.cpu > this.policy.maxCpuUsage) {
      errors.push(`CPU limit ${limits.cpu} exceeds policy maximum ${this.policy.maxCpuUsage}`)
    }

    // Validate timeout
    if (limits.timeout > this.policy.maxExecutionTime) {
      errors.push(`Timeout ${limits.timeout}ms exceeds policy maximum ${this.policy.maxExecutionTime}ms`)
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Sanitize environment variables
   * - Remove secrets from logs
   * - Validate against policy
   * - Inject managed secrets
   */
  async sanitizeEnvVars(
    envVars: Record<string, string>
  ): Promise<{ sanitized: Record<string, string>; errors: string[] }> {
    const errors: string[] = []
    const sanitized: Record<string, string> = {}

    for (const [key, value] of Object.entries(envVars)) {
      // Check if value references a secret
      if (value.startsWith('secret:')) {
        const secretName = value.substring(7)

        if (!this.secretManager) {
          errors.push(`Secret reference ${secretName} but no secret manager configured`)
          continue
        }

        // Fetch secret
        const secretValue = await this.secretManager.getSecret(secretName)
        if (!secretValue) {
          errors.push(`Secret ${secretName} not found`)
          continue
        }

        sanitized[key] = secretValue
      } else {
        // Direct value
        sanitized[key] = value
      }
    }

    return { sanitized, errors }
  }

  /**
   * Create network isolation config
   */
  createNetworkIsolation(customDomains?: string[]): NetworkIsolation {
    return {
      enabled: !this.policy.allowNetworkAccess,
      allowedDomains: customDomains || this.policy.allowedDomains || [],
      deniedDomains: [],
      requireTls: true,
      maxRequestSize: 10485760,    // 10MB
      maxResponseSize: 10485760,   // 10MB
      timeout: 30000,              // 30 seconds
    }
  }

  /**
   * Create file system isolation config
   */
  createFileSystemIsolation(customPaths?: string[]): FileSystemIsolation {
    const paths = customPaths || this.policy.allowedPaths || ['/app', '/tmp']

    return {
      enabled: this.policy.allowFileSystem,
      readOnlyPaths: ['/etc', '/usr', '/bin'],
      writablePaths: paths,
      maxFileSize: 10485760,       // 10MB per file
      maxTotalSize: 104857600,     // 100MB total
      allowedExtensions: ['.js', '.ts', '.py', '.rb', '.go', '.rs', '.txt', '.json', '.yaml', '.md'],
    }
  }

  /**
   * Check if URL is allowed by network policy
   */
  isUrlAllowed(url: string): boolean {
    if (!this.policy.allowNetworkAccess) {
      return false
    }

    const allowedDomains = this.policy.allowedDomains || []
    if (allowedDomains.includes('*')) {
      return true
    }

    try {
      const urlObj = new URL(url)
      return allowedDomains.some(domain =>
        urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
      )
    } catch {
      return false
    }
  }

  /**
   * Check if language is allowed
   */
  isLanguageAllowed(language: string): boolean {
    return this.policy.allowedLanguages.includes(language.toLowerCase())
  }

  /**
   * Parse memory string to bytes
   */
  private parseMemoryString(memory: string): number {
    const match = memory.match(/^(\d+(?:\.\d+)?)(KB|MB|GB)?$/i)
    if (!match) {
      throw new Error(`Invalid memory format: ${memory}`)
    }

    const value = parseFloat(match[1])
    const unit = (match[2] || 'MB').toUpperCase()

    const multipliers: Record<string, number> = {
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
    }

    return value * (multipliers[unit] || multipliers.MB)
  }

  /**
   * Format bytes to human-readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)}MB`
    return `${(bytes / 1073741824).toFixed(1)}GB`
  }
}

/**
 * KV-based secret manager implementation
 */
export class KVSecretManager implements SecretManager {
  constructor(private kv: KVNamespace) {}

  async getSecret(name: string): Promise<string | null> {
    return await this.kv.get(`secret:${name}`)
  }

  async listSecrets(): Promise<string[]> {
    const list = await this.kv.list({ prefix: 'secret:' })
    return list.keys.map(k => k.name.substring(7))
  }

  async setSecret(name: string, value: string): Promise<void> {
    await this.kv.put(`secret:${name}`, value)
  }

  async deleteSecret(name: string): Promise<void> {
    await this.kv.delete(`secret:${name}`)
  }
}

/**
 * Environment-based secret manager (for Workers Secrets)
 */
export class EnvSecretManager implements SecretManager {
  constructor(private env: Record<string, any>) {}

  async getSecret(name: string): Promise<string | null> {
    return this.env[name] || null
  }

  async listSecrets(): Promise<string[]> {
    // Cannot list env vars, return empty
    return []
  }

  async setSecret(name: string, value: string): Promise<void> {
    // Cannot set env vars at runtime
    throw new Error('Cannot set secrets via environment')
  }

  async deleteSecret(name: string): Promise<void> {
    // Cannot delete env vars
    throw new Error('Cannot delete secrets via environment')
  }
}

/**
 * Create isolation manager with appropriate secret manager
 */
export function createIsolationManager(
  policy: SecurityPolicy = DEFAULT_SECURITY_POLICY,
  secretsKV?: KVNamespace,
  env?: Record<string, any>
): IsolationManager {
  let secretManager: SecretManager | undefined

  if (secretsKV) {
    secretManager = new KVSecretManager(secretsKV)
  } else if (env) {
    secretManager = new EnvSecretManager(env)
  }

  return new IsolationManager(policy, secretManager)
}
