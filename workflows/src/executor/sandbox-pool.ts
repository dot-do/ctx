/**
 * Sandbox Pool Manager
 *
 * Manages a pool of reusable sandboxes for improved performance:
 * - Pre-warmed sandboxes ready for immediate use
 * - Resource limits and quota enforcement
 * - Timeout management and cleanup
 * - Connection pooling and reuse
 */

import type { SandboxManager } from '../../../poc/2025-10-02-claude-sandbox-mcp/src/sandbox-manager'

export interface PoolConfig {
  minSize: number           // Minimum pool size
  maxSize: number           // Maximum pool size
  maxIdleTime: number       // Max time sandbox can be idle (ms)
  maxLifetime: number       // Max total lifetime of sandbox (ms)
  acquireTimeout: number    // Max time to wait for available sandbox (ms)
  evictionInterval: number  // Interval to check for idle sandboxes (ms)
}

export interface SandboxPoolStats {
  totalCreated: number
  totalAcquired: number
  totalReleased: number
  totalDestroyed: number
  activeCount: number
  idleCount: number
  waitingCount: number
}

interface PooledSandbox {
  id: string
  createdAt: number
  lastUsedAt: number
  inUse: boolean
  acquisitions: number
}

/**
 * Sandbox pool for efficient resource management
 */
export class SandboxPool {
  private pool: Map<string, PooledSandbox> = new Map()
  private waiting: Array<(sandboxId: string) => void> = []
  private evictionTimer?: number

  private stats: SandboxPoolStats = {
    totalCreated: 0,
    totalAcquired: 0,
    totalReleased: 0,
    totalDestroyed: 0,
    activeCount: 0,
    idleCount: 0,
    waitingCount: 0,
  }

  constructor(
    private sandboxManager: SandboxManager,
    private config: PoolConfig = {
      minSize: 2,
      maxSize: 10,
      maxIdleTime: 300000,      // 5 minutes
      maxLifetime: 3600000,     // 1 hour
      acquireTimeout: 30000,    // 30 seconds
      evictionInterval: 60000,  // 1 minute
    }
  ) {
    // Start eviction loop
    this.startEvictionLoop()
  }

  /**
   * Initialize pool with minimum sandboxes
   */
  async initialize(): Promise<void> {
    const promises: Promise<void>[] = []

    for (let i = 0; i < this.config.minSize; i++) {
      promises.push(this.createSandbox())
    }

    await Promise.all(promises)
  }

  /**
   * Acquire sandbox from pool
   */
  async acquire(envVars?: Record<string, string>): Promise<string> {
    // Try to get idle sandbox
    for (const [id, sandbox] of this.pool.entries()) {
      if (!sandbox.inUse && !this.shouldEvict(sandbox)) {
        return this.markAcquired(id)
      }
    }

    // Try to create new sandbox if under limit
    if (this.pool.size < this.config.maxSize) {
      await this.createSandbox(envVars)
      // Return the newly created sandbox
      for (const [id, sandbox] of this.pool.entries()) {
        if (!sandbox.inUse) {
          return this.markAcquired(id)
        }
      }
    }

    // Wait for available sandbox
    return this.waitForAvailable()
  }

  /**
   * Release sandbox back to pool
   */
  async release(sandboxId: string): Promise<void> {
    const sandbox = this.pool.get(sandboxId)
    if (!sandbox) {
      console.warn(`Sandbox ${sandboxId} not found in pool`)
      return
    }

    sandbox.inUse = false
    sandbox.lastUsedAt = Date.now()
    this.stats.totalReleased++
    this.stats.activeCount--
    this.stats.idleCount++

    // Notify waiting acquirers
    const waiter = this.waiting.shift()
    if (waiter) {
      this.stats.waitingCount--
      waiter(sandboxId)
    }

    // Check if should be evicted
    if (this.shouldEvict(sandbox)) {
      await this.destroySandbox(sandboxId)
    }
  }

  /**
   * Destroy specific sandbox
   */
  async destroy(sandboxId: string): Promise<void> {
    await this.destroySandbox(sandboxId)
  }

  /**
   * Shutdown pool and cleanup all sandboxes
   */
  async shutdown(): Promise<void> {
    // Stop eviction loop
    if (this.evictionTimer) {
      clearInterval(this.evictionTimer)
    }

    // Destroy all sandboxes
    const promises = Array.from(this.pool.keys()).map(id =>
      this.destroySandbox(id)
    )

    await Promise.all(promises)
  }

  /**
   * Get pool statistics
   */
  getStats(): SandboxPoolStats {
    return { ...this.stats }
  }

  /**
   * Create new sandbox and add to pool
   */
  private async createSandbox(envVars?: Record<string, string>): Promise<void> {
    const sandboxId = `pool-${Date.now()}-${Math.random().toString(36).substring(7)}`

    try {
      await this.sandboxManager.createSandbox(sandboxId, envVars)

      const pooled: PooledSandbox = {
        id: sandboxId,
        createdAt: Date.now(),
        lastUsedAt: Date.now(),
        inUse: false,
        acquisitions: 0,
      }

      this.pool.set(sandboxId, pooled)
      this.stats.totalCreated++
      this.stats.idleCount++

    } catch (error) {
      console.error('Failed to create pooled sandbox:', error)
      throw error
    }
  }

  /**
   * Mark sandbox as acquired
   */
  private markAcquired(sandboxId: string): string {
    const sandbox = this.pool.get(sandboxId)
    if (!sandbox) {
      throw new Error(`Sandbox ${sandboxId} not found`)
    }

    sandbox.inUse = true
    sandbox.lastUsedAt = Date.now()
    sandbox.acquisitions++
    this.stats.totalAcquired++
    this.stats.activeCount++
    this.stats.idleCount--

    return sandboxId
  }

  /**
   * Wait for available sandbox
   */
  private async waitForAvailable(): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const index = this.waiting.indexOf(resolve)
        if (index > -1) {
          this.waiting.splice(index, 1)
          this.stats.waitingCount--
        }
        reject(new Error('Timeout waiting for available sandbox'))
      }, this.config.acquireTimeout)

      this.waiting.push((sandboxId: string) => {
        clearTimeout(timeout)
        resolve(this.markAcquired(sandboxId))
      })

      this.stats.waitingCount++
    })
  }

  /**
   * Check if sandbox should be evicted
   */
  private shouldEvict(sandbox: PooledSandbox): boolean {
    const now = Date.now()
    const age = now - sandbox.createdAt
    const idle = now - sandbox.lastUsedAt

    // Evict if exceeded lifetime
    if (age > this.config.maxLifetime) {
      return true
    }

    // Evict if idle too long and pool over min size
    if (idle > this.config.maxIdleTime && this.pool.size > this.config.minSize) {
      return true
    }

    return false
  }

  /**
   * Destroy sandbox and remove from pool
   */
  private async destroySandbox(sandboxId: string): Promise<void> {
    try {
      await this.sandboxManager.deleteSandbox(sandboxId)
    } catch (error) {
      console.error(`Failed to destroy sandbox ${sandboxId}:`, error)
    }

    const sandbox = this.pool.get(sandboxId)
    this.pool.delete(sandboxId)
    this.stats.totalDestroyed++

    if (sandbox?.inUse) {
      this.stats.activeCount--
    } else {
      this.stats.idleCount--
    }
  }

  /**
   * Start background eviction loop
   */
  private startEvictionLoop(): void {
    this.evictionTimer = setInterval(async () => {
      for (const [id, sandbox] of this.pool.entries()) {
        if (!sandbox.inUse && this.shouldEvict(sandbox)) {
          await this.destroySandbox(id)
        }
      }
    }, this.config.evictionInterval) as any
  }
}

/**
 * Global sandbox pool instance (singleton pattern)
 */
let globalPool: SandboxPool | null = null

/**
 * Get or create global sandbox pool
 */
export function getSandboxPool(
  sandboxManager: SandboxManager,
  config?: Partial<PoolConfig>
): SandboxPool {
  if (!globalPool) {
    const fullConfig: PoolConfig = {
      minSize: config?.minSize ?? 2,
      maxSize: config?.maxSize ?? 10,
      maxIdleTime: config?.maxIdleTime ?? 300000,
      maxLifetime: config?.maxLifetime ?? 3600000,
      acquireTimeout: config?.acquireTimeout ?? 30000,
      evictionInterval: config?.evictionInterval ?? 60000,
    }
    globalPool = new SandboxPool(sandboxManager, fullConfig)
  }
  return globalPool
}

/**
 * Shutdown global pool
 */
export async function shutdownSandboxPool(): Promise<void> {
  if (globalPool) {
    await globalPool.shutdown()
    globalPool = null
  }
}
