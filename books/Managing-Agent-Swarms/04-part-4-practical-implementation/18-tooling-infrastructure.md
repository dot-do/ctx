# Chapter 18: Tooling and Infrastructure

Six months after deploying their first experimental swarm, TechCorp's engineering team faced a new problem: success.

Their first swarm had worked beautifully—a 12-agent system that built their customer analytics dashboard in 9 days instead of the projected 4 weeks. Emboldened, they launched more swarms. Within three months, they were running 8 swarms concurrently, totaling 150+ agents across different projects.

Then the infrastructure started falling apart.

The PostgreSQL database that tracked swarm state hit connection limits. The Redis queue couldn't keep up with task throughput. Agent logs filled disk space faster than they could be rotated. Cost tracking was manual and error-prone. Monitoring required constant babysitting.

Their CTO, Jennifer Kim, called an emergency meeting. "We built a prototype that works for one swarm," she said. "We need production infrastructure that scales to dozens of swarms. We need the enterprise version."

This is the reality of swarm development at scale: The simple architecture that works for your first experimental swarm breaks down when you run multiple swarms concurrently across teams. You need production-grade tooling and infrastructure.

This chapter covers what that infrastructure looks like.

## The Production Swarm Stack

A production swarm platform has six layers:

1. **Orchestration Layer**: Manages agent lifecycle, task distribution, and coordination
2. **Execution Layer**: Runs agents, executes code, manages compute resources
3. **State Layer**: Stores swarm state, tasks, code, and artifacts
4. **Observability Layer**: Monitoring, logging, metrics, and tracing
5. **Security Layer**: Authentication, authorization, secrets management
6. **Cost Management Layer**: Budget tracking, cost optimization, billing

Let's build each layer.

## Layer 1: Orchestration at Scale

Your Chapter 17 orchestrator was single-swarm. Production needs multi-swarm orchestration.

```typescript
// production-orchestrator.ts

interface SwarmCluster {
  swarms: Map<string, SwarmInstance>
  resourcePool: ResourcePool
  scheduler: SwarmScheduler
}

class ProductionOrchestrator {
  private cluster: SwarmCluster

  constructor(config: ClusterConfig) {
    this.cluster = {
      swarms: new Map(),
      resourcePool: new ResourcePool(config.maxAgents, config.maxConcurrentSwarms),
      scheduler: new SwarmScheduler()
    }
  }

  async createSwarm(request: SwarmRequest): Promise<SwarmInstance> {
    // Validate request
    await this.validateRequest(request)

    // Check resource availability
    const resourcesAvailable = await this.cluster.resourcePool.checkAvailability({
      agents: request.numAgents,
      estimatedDuration: request.estimatedDuration,
      priority: request.priority
    })

    if (!resourcesAvailable) {
      // Queue swarm for later
      return await this.queueSwarm(request)
    }

    // Allocate resources
    const resources = await this.cluster.resourcePool.allocate({
      agents: request.numAgents,
      memory: request.memoryPerAgent,
      cpu: request.cpuPerAgent
    })

    // Create swarm instance
    const swarm = new SwarmInstance({
      id: generateSwarmId(),
      config: request,
      resources,
      orchestrator: this
    })

    this.cluster.swarms.set(swarm.id, swarm)

    // Schedule swarm execution
    await this.cluster.scheduler.schedule(swarm)

    return swarm
  }

  async terminateSwarm(swarmId: string, reason: string) {
    const swarm = this.cluster.swarms.get(swarmId)

    if (!swarm) {
      throw new Error(`Swarm ${swarmId} not found`)
    }

    // Graceful shutdown
    await swarm.stop(reason)

    // Release resources
    await this.cluster.resourcePool.release(swarm.resources)

    // Archive swarm data
    await this.archiveSwarm(swarm)

    // Remove from active swarms
    this.cluster.swarms.delete(swarmId)
  }

  async getSwarmStatus(swarmId: string): Promise<SwarmStatus> {
    const swarm = this.cluster.swarms.get(swarmId)

    if (!swarm) {
      // Check archived swarms
      return await this.getArchivedSwarmStatus(swarmId)
    }

    return {
      id: swarm.id,
      status: swarm.status,
      progress: swarm.getProgress(),
      agents: swarm.agents.map(a => a.getStatus()),
      tasks: swarm.getTasks(),
      metrics: swarm.getMetrics(),
      cost: swarm.getCost()
    }
  }
}

class ResourcePool {
  private available: {
    agents: number
    memory: number  // GB
    cpu: number     // cores
  }

  private allocated: Map<string, ResourceAllocation> = new Map()

  constructor(
    private maxAgents: number,
    private maxMemory: number,
    private maxCpu: number
  ) {
    this.available = {
      agents: maxAgents,
      memory: maxMemory,
      cpu: maxCpu
    }
  }

  async checkAvailability(request: ResourceRequest): Promise<boolean> {
    const totalAgents = request.agents
    const totalMemory = request.agents * (request.memoryPerAgent || 2)  // Default 2GB per agent
    const totalCpu = request.agents * (request.cpuPerAgent || 0.5)       // Default 0.5 cores per agent

    return (
      this.available.agents >= totalAgents &&
      this.available.memory >= totalMemory &&
      this.available.cpu >= totalCpu
    )
  }

  async allocate(request: ResourceAllocation): Promise<ResourceAllocation> {
    // Reserve resources
    this.available.agents -= request.agents
    this.available.memory -= request.memory
    this.available.cpu -= request.cpu

    // Track allocation
    this.allocated.set(request.swarmId, request)

    return request
  }

  async release(allocation: ResourceAllocation) {
    // Return resources to pool
    this.available.agents += allocation.agents
    this.available.memory += allocation.memory
    this.available.cpu += allocation.cpu

    // Remove allocation
    this.allocated.delete(allocation.swarmId)
  }

  getUtilization(): ResourceUtilization {
    return {
      agents: {
        used: this.maxAgents - this.available.agents,
        total: this.maxAgents,
        percentage: ((this.maxAgents - this.available.agents) / this.maxAgents) * 100
      },
      memory: {
        used: this.maxMemory - this.available.memory,
        total: this.maxMemory,
        percentage: ((this.maxMemory - this.available.memory) / this.maxMemory) * 100
      },
      cpu: {
        used: this.maxCpu - this.available.cpu,
        total: this.maxCpu,
        percentage: ((this.maxCpu - this.available.cpu) / this.maxCpu) * 100
      }
    }
  }
}
```

## Layer 2: Distributed Execution

Production swarms run on cloud infrastructure, not your laptop.

```yaml
# infrastructure/swarm-cluster.yaml

# Kubernetes-based swarm cluster

apiVersion: v1
kind: Namespace
metadata:
  name: swarm-platform

---
# Orchestrator Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: swarm-orchestrator
  namespace: swarm-platform
spec:
  replicas: 3  # High availability
  selector:
    matchLabels:
      app: swarm-orchestrator
  template:
    metadata:
      labels:
        app: swarm-orchestrator
    spec:
      containers:
      - name: orchestrator
        image: company.io/swarm-orchestrator:latest
        resources:
          requests:
            memory: "4Gi"
            cpu: "2"
          limits:
            memory: "8Gi"
            cpu: "4"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: swarm-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: swarm-secrets
              key: redis-url
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: swarm-secrets
              key: openai-api-key

---
# Agent Worker Pool
apiVersion: apps/v1
kind: Deployment
metadata:
  name: swarm-agents
  namespace: swarm-platform
spec:
  replicas: 50  # Scale based on demand
  selector:
    matchLabels:
      app: swarm-agent
  template:
    metadata:
      labels:
        app: swarm-agent
    spec:
      containers:
      - name: agent
        image: company.io/swarm-agent:latest
        resources:
          requests:
            memory: "2Gi"
            cpu: "1"
          limits:
            memory: "4Gi"
            cpu: "2"
        env:
        - name: ORCHESTRATOR_URL
          value: "http://swarm-orchestrator:8080"
        - name: AGENT_ID
          valueFrom:
            fieldRef:
              fieldPath: metadata.name

---
# Horizontal Pod Autoscaler for agents
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: swarm-agents-hpa
  namespace: swarm-platform
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: swarm-agents
  minReplicas: 10
  maxReplicas: 200
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## Layer 3: Distributed State Management

Production state layer needs to scale to hundreds of concurrent swarms.

```typescript
// state-management.ts

interface SwarmState {
  id: string
  config: SwarmConfig
  status: SwarmStatus
  agents: AgentState[]
  tasks: Task[]
  metrics: SwarmMetrics
  artifacts: Artifact[]
}

class DistributedStateManager {
  private postgres: PostgreSQLPool
  private redis: RedisCluster
  private s3: S3Client

  constructor(config: StateConfig) {
    // PostgreSQL for structured data (swarm metadata, tasks, agents)
    this.postgres = new PostgreSQLPool({
      connectionString: config.postgresUrl,
      max: 100,  // Connection pool
      idleTimeoutMillis: 30000
    })

    // Redis for fast access to active swarm state
    this.redis = new RedisCluster({
      nodes: config.redisNodes,
      options: {
        enableReadyCheck: true,
        maxRetriesPerRequest: 3
      }
    })

    // S3 for large artifacts (code, logs, build outputs)
    this.s3 = new S3Client({
      region: config.s3Region,
      credentials: config.awsCredentials
    })
  }

  async saveSwarmState(swarmId: string, state: SwarmState) {
    // Write to PostgreSQL (durable storage)
    await this.postgres.query(`
      INSERT INTO swarm_states (id, config, status, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET
        status = $3,
        updated_at = NOW()
    `, [swarmId, state.config, state.status])

    // Cache in Redis (fast access)
    await this.redis.setex(
      `swarm:${swarmId}:state`,
      3600,  // 1 hour TTL
      JSON.stringify(state)
    )

    // Save large artifacts to S3
    for (const artifact of state.artifacts) {
      if (artifact.size > 1024 * 1024) {  // > 1MB
        await this.saveArtifact(swarmId, artifact)
      }
    }
  }

  async getSwarmState(swarmId: string): Promise<SwarmState | null> {
    // Try Redis first (fast)
    const cached = await this.redis.get(`swarm:${swarmId}:state`)

    if (cached) {
      return JSON.parse(cached)
    }

    // Fall back to PostgreSQL (slower but always available)
    const result = await this.postgres.query(`
      SELECT * FROM swarm_states WHERE id = $1
    `, [swarmId])

    if (result.rows.length === 0) {
      return null
    }

    const state = this.deserializeState(result.rows[0])

    // Repopulate cache
    await this.redis.setex(
      `swarm:${swarmId}:state`,
      3600,
      JSON.stringify(state)
    )

    return state
  }

  async saveArtifact(swarmId: string, artifact: Artifact) {
    const key = `swarms/${swarmId}/artifacts/${artifact.id}`

    await this.s3.putObject({
      Bucket: 'swarm-artifacts',
      Key: key,
      Body: artifact.content,
      ContentType: artifact.mimeType,
      Metadata: {
        swarmId,
        artifactType: artifact.type,
        timestamp: new Date().toISOString()
      }
    })

    // Store reference in PostgreSQL
    await this.postgres.query(`
      INSERT INTO artifacts (swarm_id, artifact_id, s3_key, size, mime_type, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
    `, [swarmId, artifact.id, key, artifact.size, artifact.mimeType])
  }

  async getArtifact(swarmId: string, artifactId: string): Promise<Artifact | null> {
    // Get S3 key from PostgreSQL
    const result = await this.postgres.query(`
      SELECT s3_key, size, mime_type FROM artifacts
      WHERE swarm_id = $1 AND artifact_id = $2
    `, [swarmId, artifactId])

    if (result.rows.length === 0) {
      return null
    }

    const { s3_key, size, mime_type } = result.rows[0]

    // Fetch from S3
    const object = await this.s3.getObject({
      Bucket: 'swarm-artifacts',
      Key: s3_key
    })

    return {
      id: artifactId,
      content: await object.Body.transformToString(),
      size,
      mimeType: mime_type
    }
  }
}

// Database schema
/*
CREATE TABLE swarm_states (
  id TEXT PRIMARY KEY,
  config JSONB NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_swarm_status ON swarm_states(status);
CREATE INDEX idx_swarm_updated ON swarm_states(updated_at);

CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  swarm_id TEXT REFERENCES swarm_states(id),
  status TEXT NOT NULL,
  specialization TEXT,
  current_task_id TEXT,
  metrics JSONB,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_agent_swarm ON agents(swarm_id);
CREATE INDEX idx_agent_status ON agents(status);

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  swarm_id TEXT REFERENCES swarm_states(id),
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  assigned_agent_id TEXT REFERENCES agents(id),
  context JSONB,
  result JSONB,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP
);

CREATE INDEX idx_task_swarm ON tasks(swarm_id);
CREATE INDEX idx_task_status ON tasks(status);
CREATE INDEX idx_task_agent ON tasks(assigned_agent_id);

CREATE TABLE artifacts (
  id SERIAL PRIMARY KEY,
  swarm_id TEXT REFERENCES swarm_states(id),
  artifact_id TEXT NOT NULL,
  s3_key TEXT NOT NULL,
  size BIGINT NOT NULL,
  mime_type TEXT,
  created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_artifact_swarm ON artifacts(swarm_id);
*/
```

## Layer 4: Comprehensive Observability

You need visibility into what's happening across all swarms.

```typescript
// observability.ts

import { createLogger, format, transports } from 'winston'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { MeterProvider } from '@opentelemetry/metrics'

class SwarmObservability {
  private logger: Logger
  private metrics: MetricsCollector
  private tracer: DistributedTracer

  constructor(config: ObservabilityConfig) {
    // Structured logging
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'swarm-error.log', level: 'error' }),
        new transports.File({ filename: 'swarm-combined.log' })
      ]
    })

    // Metrics collection (Prometheus)
    const exporter = new PrometheusExporter({ port: 9464 })
    const meterProvider = new MeterProvider({ exporter })
    this.metrics = new MetricsCollector(meterProvider.getMeter('swarm'))

    // Distributed tracing (Jaeger/Zipkin)
    this.tracer = new DistributedTracer(config.tracingEndpoint)
  }

  logSwarmEvent(event: SwarmEvent) {
    this.logger.info('swarm_event', {
      swarmId: event.swarmId,
      eventType: event.type,
      agentId: event.agentId,
      taskId: event.taskId,
      details: event.details,
      timestamp: new Date().toISOString()
    })

    // Increment metric counters
    this.metrics.recordEvent(event)
  }

  logAgentAction(action: AgentAction) {
    this.logger.debug('agent_action', {
      agentId: action.agentId,
      swarmId: action.swarmId,
      action: action.type,
      taskId: action.taskId,
      duration: action.duration,
      success: action.success,
      cost: action.cost
    })

    this.metrics.recordAgentAction(action)
  }

  startTrace(operation: string, context: TraceContext): Span {
    return this.tracer.startSpan(operation, context)
  }
}

class MetricsCollector {
  private swarmCount: Counter
  private taskCount: Counter
  private agentUtilization: Gauge
  private taskDuration: Histogram
  private llmCost: Counter

  constructor(private meter: Meter) {
    this.swarmCount = meter.createCounter('swarm_total', {
      description: 'Total number of swarms created'
    })

    this.taskCount = meter.createCounter('task_total', {
      description: 'Total number of tasks completed'
    })

    this.agentUtilization = meter.createGauge('agent_utilization', {
      description: 'Current agent utilization percentage'
    })

    this.taskDuration = meter.createHistogram('task_duration_seconds', {
      description: 'Task completion duration'
    })

    this.llmCost = meter.createCounter('llm_cost_dollars', {
      description: 'Total LLM API cost in dollars'
    })
  }

  recordEvent(event: SwarmEvent) {
    switch (event.type) {
      case 'swarm_created':
        this.swarmCount.add(1, { status: 'created' })
        break
      case 'swarm_completed':
        this.swarmCount.add(1, { status: 'completed' })
        break
      case 'task_completed':
        this.taskCount.add(1, { status: 'completed' })
        break
      case 'task_failed':
        this.taskCount.add(1, { status: 'failed' })
        break
    }
  }

  recordAgentAction(action: AgentAction) {
    if (action.duration) {
      this.taskDuration.record(action.duration / 1000, {
        agent: action.agentId,
        task_type: action.type
      })
    }

    if (action.cost) {
      this.llmCost.add(action.cost, {
        model: action.model,
        agent: action.agentId
      })
    }
  }

  updateAgentUtilization(swarmId: string, utilization: number) {
    this.agentUtilization.set(utilization, { swarm: swarmId })
  }
}

// Grafana dashboard configuration
/*
{
  "dashboard": {
    "title": "Swarm Platform Overview",
    "panels": [
      {
        "title": "Active Swarms",
        "targets": [{
          "expr": "sum(swarm_total{status=\"active\"})"
        }]
      },
      {
        "title": "Agent Utilization",
        "targets": [{
          "expr": "avg(agent_utilization)"
        }]
      },
      {
        "title": "Task Completion Rate",
        "targets": [{
          "expr": "rate(task_total{status=\"completed\"}[5m])"
        }]
      },
      {
        "title": "LLM Cost per Hour",
        "targets": [{
          "expr": "rate(llm_cost_dollars[1h])"
        }]
      },
      {
        "title": "Task Duration (p95)",
        "targets": [{
          "expr": "histogram_quantile(0.95, task_duration_seconds)"
        }]
      }
    ]
  }
}
*/
```

## Layer 5: Security and Access Control

Production swarms handle sensitive code and data. Security is critical.

```typescript
// security.ts

class SwarmSecurity {
  private authProvider: AuthenticationProvider
  private rbac: RoleBasedAccessControl
  private secretsManager: SecretsManager

  async authenticateRequest(request: Request): Promise<User | null> {
    const token = this.extractToken(request)

    if (!token) {
      return null
    }

    return await this.authProvider.validateToken(token)
  }

  async authorizeSwarmAccess(
    user: User,
    swarmId: string,
    action: SwarmAction
  ): Promise<boolean> {
    // Check if user has permission for this action on this swarm
    const permissions = await this.rbac.getUserPermissions(user.id, swarmId)

    return permissions.includes(action)
  }

  async getSecret(key: string, context: SecretContext): Promise<string | null> {
    // Retrieve secrets from secure vault (AWS Secrets Manager, HashiCorp Vault, etc.)
    return await this.secretsManager.get(key, context)
  }

  async auditLog(event: SecurityEvent) {
    // Log all security-relevant events for compliance
    await this.postgres.query(`
      INSERT INTO security_audit_log (
        user_id, action, resource, timestamp, ip_address, success, details
      ) VALUES ($1, $2, $3, NOW(), $4, $5, $6)
    `, [
      event.userId,
      event.action,
      event.resource,
      event.ipAddress,
      event.success,
      event.details
    ])
  }
}

// Role-based access control
class RoleBasedAccessControl {
  private roles = {
    'admin': [
      'swarm:create',
      'swarm:read',
      'swarm:update',
      'swarm:delete',
      'swarm:terminate',
      'user:manage'
    ],
    'developer': [
      'swarm:create',
      'swarm:read',
      'swarm:update'
    ],
    'viewer': [
      'swarm:read'
    ]
  }

  async getUserPermissions(userId: string, swarmId: string): Promise<string[]> {
    // Get user's role for this swarm
    const userRole = await this.getUserRole(userId, swarmId)

    // Return permissions for that role
    return this.roles[userRole] || []
  }
}
```

## Layer 6: Cost Management at Scale

Track and optimize costs across all swarms.

```typescript
// cost-management.ts

class CostManagementPlatform {
  async trackSwarmCost(swarmId: string, cost: CostBreakdown) {
    await this.postgres.query(`
      INSERT INTO swarm_costs (
        swarm_id, llm_cost, infrastructure_cost, storage_cost,
        total_cost, timestamp
      ) VALUES ($1, $2, $3, $4, $5, NOW())
    `, [
      swarmId,
      cost.llm,
      cost.infrastructure,
      cost.storage,
      cost.total
    ])

    // Check if swarm is approaching budget limit
    const budget = await this.getSwarmBudget(swarmId)
    const spent = await this.getTotalSpent(swarmId)

    if (spent > budget * 0.90) {
      await this.alertBudgetWarning(swarmId, spent, budget)
    }

    if (spent > budget) {
      await this.enforceHardLimit(swarmId)
    }
  }

  async generateCostReport(timeframe: Timeframe): Promise<CostReport> {
    const costs = await this.postgres.query(`
      SELECT
        DATE(timestamp) as date,
        SUM(total_cost) as daily_cost,
        SUM(llm_cost) as llm_cost,
        SUM(infrastructure_cost) as infrastructure_cost,
        COUNT(DISTINCT swarm_id) as active_swarms
      FROM swarm_costs
      WHERE timestamp >= $1 AND timestamp < $2
      GROUP BY DATE(timestamp)
      ORDER BY date
    `, [timeframe.start, timeframe.end])

    return {
      totalCost: costs.rows.reduce((sum, row) => sum + row.daily_cost, 0),
      breakdown: costs.rows,
      costPerSwarm: this.calculateCostPerSwarm(costs.rows),
      trend: this.calculateTrend(costs.rows)
    }
  }

  async optimizeCosts(): Promise<CostOptimization[]> {
    const optimizations: CostOptimization[] = []

    // Check for idle agents
    const idleAgents = await this.findIdleAgents()
    if (idleAgents.length > 0) {
      optimizations.push({
        type: 'scale_down_agents',
        potential_savings: this.calculateIdleCost(idleAgents),
        recommendation: `Scale down ${idleAgents.length} idle agents`
      })
    }

    // Check for expensive model usage
    const expensiveModels = await this.findExpensiveModelUsage()
    if (expensiveModels.length > 0) {
      optimizations.push({
        type: 'model_optimization',
        potential_savings: this.calculateModelSavings(expensiveModels),
        recommendation: 'Switch simpler tasks to cheaper models'
      })
    }

    return optimizations
  }
}
```

## Key Takeaways

1. **Production infrastructure is fundamentally different from prototype infrastructure.** Your Chapter 17 setup won't scale. Plan for distributed execution, state management, and observability from the start.

2. **Six essential layers:** Orchestration, execution, state, observability, security, and cost management. Missing any layer will cause problems in production.

3. **Use managed services where possible.** Kubernetes for compute, PostgreSQL for state, Redis for caching, S3 for artifacts, Prometheus/Grafana for metrics. Don't build these from scratch.

4. **Resource limits and quotas are mandatory.** Without limits, runaway swarms can consume infinite resources and rack up huge bills.

5. **Comprehensive logging and metrics are non-negotiable.** You must be able to debug failures, track costs, and optimize performance. Instrumentation is not optional.

6. **Security is a first-class concern.** Authentication, authorization, secrets management, and audit logging must be built in from day one.

In the next chapter, we'll address the human side of swarm adoption—organizational change management and how to get your team on board.
