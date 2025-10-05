# Chapter 21: Advanced Swarm Techniques

Three months after successfully deploying basic swarms, TechVenture's engineering team hit a new class of problems.

Project lead Alex Martinez faced a challenge: their e-commerce platform needed a complete architecture overhaul. The monolith had grown unwieldy, and they needed to extract services incrementally while maintaining 100% uptime and backward compatibility.

This wasn't a simple "build a REST API" problem that basic swarms handled well. It required:
- Understanding the existing codebase deeply
- Designing a coherent microservices architecture
- Orchestrating migration across multiple teams
- Maintaining data consistency during transition
- Coordinating hundreds of dependent changes

Alex's team had mastered basic swarms—single-purpose swarms building well-defined features. But this project demanded something more sophisticated: **hierarchical swarms, meta-orchestration, and adaptive specialization**.

This chapter explores advanced techniques that go beyond basic swarm development.

## Technique 1: Hierarchical Swarms

Instead of one flat swarm, organize swarms in hierarchy with different responsibilities at each level.

```typescript
// hierarchical-swarm.ts

interface SwarmHierarchy {
  strategic: StrategicSwarm      // High-level decisions
  tactical: TacticalSwarm[]      // Mid-level coordination
  operational: OperationalSwarm[] // Implementation
}

class StrategicSwarm {
  /**
   * Makes high-level architectural decisions.
   * Does NOT write code. Produces specifications for tactical swarms.
   */

  async designArchitecture(requirements: Requirements): Promise<ArchitectureSpec> {
    // Analyze current system
    const currentArchitecture = await this.analyzeCurrentSystem()

    // Generate migration strategy
    const strategy = await this.generateMigrationStrategy({
      from: currentArchitecture,
      requirements
    })

    // Decompose into services
    const services = await this.decomposeIntoServices(strategy)

    // Define interfaces
    const interfaces = await this.defineServiceInterfaces(services)

    // Create tactical specifications
    const tacticalSpecs = services.map(service => ({
      service,
      interface: interfaces[service.name],
      dependencies: this.identifyDependencies(service, services),
      constraints: this.deriveConstraints(service, strategy)
    }))

    return {
      strategy,
      services,
      interfaces,
      tacticalSpecs
    }
  }
}

class TacticalSwarm {
  /**
   * Coordinates implementation of a specific service.
   * Breaks service into implementation tasks for operational swarms.
   */

  async implementService(spec: TacticalSpec): Promise<ServiceImplementation> {
    // Decompose service into implementation tasks
    const tasks = await this.decomposeService(spec)

    // Create operational swarms for each task
    const operationalSwarms = tasks.map(task =>
      new OperationalSwarm({
        task,
        context: this.buildContext(task, spec)
      })
    )

    // Run operational swarms in parallel
    const results = await Promise.all(
      operationalSwarms.map(swarm => swarm.execute())
    )

    // Integrate results
    const integration = await this.integrateResults(results)

    // Validate integrated service
    const validation = await this.validateService(integration, spec)

    return {
      implementation: integration,
      validation
    }
  }
}

class OperationalSwarm {
  /**
   * Writes actual code.
   * Focused on specific implementation tasks.
   */

  async execute(): Promise<ImplementationResult> {
    // Standard agent swarm from earlier chapters
    return await this.runAgentSwarm()
  }
}
```

**Example: Monolith to Microservices Migration**

**Strategic Swarm output:**
```yaml
migration_strategy:
  approach: Strangler Fig Pattern
  phases:
    - phase: 1
      extract: ["authentication_service", "user_service"]
      reason: "Isolated domains, minimal dependencies"

    - phase: 2
      extract: ["product_service", "inventory_service"]
      reason: "Depend only on user_service"

    - phase: 3
      extract: ["order_service", "payment_service"]
      reason: "Business-critical, extract after proving pattern"

services:
  authentication_service:
    responsibility: "User authentication and session management"
    interface:
      endpoints:
        - POST /auth/login
        - POST /auth/logout
        - POST /auth/refresh
      data_model:
        - User
        - Session
    dependencies: []
    estimated_complexity: 7

  user_service:
    responsibility: "User profile management"
    interface:
      endpoints:
        - GET /users/:id
        - PUT /users/:id
        - GET /users
      data_model:
        - User
        - UserProfile
    dependencies: ["authentication_service"]
    estimated_complexity: 5

  # ... other services
```

**Tactical Swarm for authentication_service:**
```yaml
implementation_tasks:
  - task: database_schema
    description: "Design and implement user/session tables"
    agents: 3
    estimated_duration: "2 days"

  - task: core_endpoints
    description: "Implement login, logout, refresh endpoints"
    agents: 5
    estimated_duration: "3 days"
    dependencies: ["database_schema"]

  - task: security_hardening
    description: "Rate limiting, token security, session management"
    agents: 3
    estimated_duration: "2 days"
    dependencies: ["core_endpoints"]

  - task: integration_tests
    description: "Comprehensive test suite for all flows"
    agents: 4
    estimated_duration: "2 days"
    dependencies: ["security_hardening"]

  - task: migration_adapter
    description: "Adapter layer for gradual monolith migration"
    agents: 2
    estimated_duration: "1 day"
    dependencies: ["core_endpoints"]
```

**Operational Swarms execute each task as independent agent swarms.**

### Benefits of Hierarchical Swarms

1. **Separation of concerns**: Strategic decisions separate from implementation details
2. **Better architecture**: High-level swarm focuses on design, not distracted by code details
3. **Parallel execution**: Multiple tactical swarms work simultaneously on different services
4. **Scalability**: Add more layers as problems become more complex

## Technique 2: Meta-Orchestration

Use an AI orchestrator to dynamically adjust swarm parameters based on performance.

```typescript
// meta-orchestrator.ts

class MetaOrchestrator {
  /**
   * Monitors swarm performance and dynamically adjusts configuration
   * to optimize for cost, speed, or quality.
   */

  async optimizeSwarm(swarm: Swarm, objective: Objective) {
    // Monitor current performance
    const metrics = await this.measurePerformance(swarm)

    // Identify optimization opportunities
    const opportunities = await this.identifyOptimizations(metrics, objective)

    // Apply optimizations
    for (const opportunity of opportunities) {
      await this.applyOptimization(swarm, opportunity)
    }
  }

  private async identifyOptimizations(
    metrics: SwarmMetrics,
    objective: Objective
  ): Promise<Optimization[]> {
    const optimizations: Optimization[] = []

    // Agent count optimization
    if (metrics.agentUtilization < 0.60 && objective.priority === 'cost') {
      optimizations.push({
        type: 'reduce_agents',
        from: metrics.agentCount,
        to: Math.ceil(metrics.agentCount * 0.75),
        expectedSaving: this.calculateCostSaving(metrics.agentCount * 0.25),
        reason: 'Low agent utilization, reducing count to save cost'
      })
    }

    if (metrics.taskQueueLength > 20 && objective.priority === 'speed') {
      optimizations.push({
        type: 'increase_agents',
        from: metrics.agentCount,
        to: Math.min(metrics.agentCount * 1.5, 100),
        expectedImprovement: '30% faster completion',
        reason: 'Large task queue, adding agents to increase throughput'
      })
    }

    // Model selection optimization
    if (metrics.averageTaskComplexity < 0.4 && objective.priority === 'cost') {
      optimizations.push({
        type: 'switch_model',
        from: 'gpt-4',
        to: 'gpt-4-turbo',
        expectedSaving: '60% cost reduction for simple tasks',
        reason: 'Task complexity low, cheaper model sufficient'
      })
    }

    // Task prioritization optimization
    if (metrics.blockedTasks > 5) {
      optimizations.push({
        type: 'reprioritize_tasks',
        action: 'Prioritize unblocking tasks to unblock downstream work',
        expectedImprovement: 'Reduced task blocking, better parallelism'
      })
    }

    // Context window optimization
    if (metrics.averageContextSize > 100_000) {
      optimizations.push({
        type: 'reduce_context',
        from: metrics.averageContextSize,
        to: 50_000,
        expectedSaving: '40% reduction in input tokens',
        reason: 'Context window too large, apply aggressive pruning'
      })
    }

    return optimizations
  }

  private async applyOptimization(swarm: Swarm, optimization: Optimization) {
    switch (optimization.type) {
      case 'reduce_agents':
        await this.scaleAgents(swarm, optimization.to)
        break

      case 'increase_agents':
        await this.scaleAgents(swarm, optimization.to)
        break

      case 'switch_model':
        await this.switchModel(swarm, optimization.to)
        break

      case 'reprioritize_tasks':
        await this.reprioritizeTasks(swarm)
        break

      case 'reduce_context':
        await this.optimizeContext(swarm, optimization.to)
        break
    }

    // Log optimization for analysis
    await this.logOptimization(swarm, optimization)
  }
}
```

**Example: Auto-scaling based on progress**

```typescript
// Auto-scaling meta-orchestrator

class AutoScalingMetaOrchestrator extends MetaOrchestrator {
  async monitorAndAdjust(swarm: Swarm) {
    setInterval(async () => {
      const progress = await swarm.getProgress()
      const velocity = await swarm.getVelocity()  // Tasks completed per hour

      const estimatedTimeRemaining = (progress.totalTasks - progress.completedTasks) / velocity

      // If behind schedule, scale up
      if (estimatedTimeRemaining > swarm.deadline) {
        const additionalAgents = Math.ceil(
          (estimatedTimeRemaining - swarm.deadline) * velocity / swarm.deadline
        )

        console.log(`Behind schedule. Adding ${additionalAgents} agents.`)
        await this.scaleAgents(swarm, swarm.agentCount + additionalAgents)
      }

      // If ahead of schedule, scale down
      if (estimatedTimeRemaining < swarm.deadline * 0.7) {
        const excessAgents = Math.floor(swarm.agentCount * 0.2)

        console.log(`Ahead of schedule. Removing ${excessAgents} agents.`)
        await this.scaleAgents(swarm, swarm.agentCount - excessAgents)
      }
    }, 300000)  // Check every 5 minutes
  }
}
```

## Technique 3: Adaptive Agent Specialization

Agents learn and improve over time, specializing in areas where they perform well.

```typescript
// adaptive-specialization.ts

class AdaptiveAgent extends Agent {
  private performanceHistory: TaskPerformance[] = []
  private specialization: AgentSpecialization | null = null

  async executeTask(task: Task): Promise<TaskResult> {
    const startTime = Date.now()

    // Execute task
    const result = await super.executeTask(task)

    // Record performance
    const performance: TaskPerformance = {
      task: task.type,
      success: result.success,
      duration: Date.now() - startTime,
      quality: result.validation.score,
      cost: result.cost
    }

    this.performanceHistory.push(performance)

    // Update specialization based on performance
    await this.updateSpecialization()

    return result
  }

  private async updateSpecialization() {
    if (this.performanceHistory.length < 10) {
      // Not enough data yet
      return
    }

    // Analyze performance by task type
    const performanceByType = this.groupByTaskType(this.performanceHistory)

    // Find task types where this agent excels
    const excels = Object.entries(performanceByType)
      .filter(([type, perf]) =>
        perf.averageQuality > 0.85 &&
        perf.successRate > 0.90
      )
      .map(([type]) => type)

    if (excels.length > 0) {
      this.specialization = {
        focus: excels,
        confidence: this.calculateConfidence(performanceByType, excels)
      }

      console.log(`Agent ${this.id} specialized in: ${excels.join(', ')}`)
    }
  }

  canHandle(task: Task): number {
    // Return confidence score for handling this task

    if (!this.specialization) {
      return 0.5  // Default, no specialization yet
    }

    if (this.specialization.focus.includes(task.type)) {
      return this.specialization.confidence  // High confidence for specialized tasks
    }

    return 0.3  // Lower confidence for non-specialized tasks
  }
}

class AdaptiveOrchestrator extends SwarmOrchestrator {
  async assignTask(task: Task): Promise<Agent> {
    // Get all available agents
    const availableAgents = this.agents.filter(a => a.isAvailable())

    // Score each agent for this task
    const scores = await Promise.all(
      availableAgents.map(async agent => ({
        agent,
        score: agent.canHandle(task)
      }))
    )

    // Assign to agent with highest score
    const best = scores.reduce((max, curr) =>
      curr.score > max.score ? curr : max
    )

    return best.agent
  }
}
```

**Example: Adaptive specialization emergence**

```
Initial state (no specialization):
  agent-0: generic (confidence: 0.5)
  agent-1: generic (confidence: 0.5)
  agent-2: generic (confidence: 0.5)
  agent-3: generic (confidence: 0.5)

After 20 tasks:
  agent-0: REST API implementation (confidence: 0.87)
  agent-1: Database schema design (confidence: 0.82)
  agent-2: Test generation (confidence: 0.91)
  agent-3: Security hardening (confidence: 0.79)

After 50 tasks:
  agent-0: REST API implementation (confidence: 0.92)
  agent-1: Database schema design (confidence: 0.89)
  agent-2: Test generation (confidence: 0.95)
  agent-3: Security hardening (confidence: 0.86)

Result: Natural specialization emerges based on performance,
not pre-assigned roles.
```

## Technique 4: Cross-Swarm Learning

Swarms share knowledge with each other to improve collective performance.

```typescript
// cross-swarm-learning.ts

class SwarmKnowledgeBase {
  /**
   * Shared knowledge repository across all swarms.
   * Swarms contribute successful patterns and learn from failures.
   */

  async recordSuccess(pattern: SuccessPattern) {
    await this.db.query(`
      INSERT INTO success_patterns (
        pattern_type, context, implementation, quality_score, usage_count
      ) VALUES ($1, $2, $3, $4, 1)
      ON CONFLICT (pattern_type, context) DO UPDATE SET
        usage_count = success_patterns.usage_count + 1,
        quality_score = (success_patterns.quality_score + $4) / 2
    `, [
      pattern.type,
      JSON.stringify(pattern.context),
      pattern.implementation,
      pattern.qualityScore
    ])
  }

  async recordFailure(pattern: FailurePattern) {
    await this.db.query(`
      INSERT INTO failure_patterns (
        pattern_type, context, implementation, failure_reason, occurrence_count
      ) VALUES ($1, $2, $3, $4, 1)
      ON CONFLICT (pattern_type, context, implementation) DO UPDATE SET
        occurrence_count = failure_patterns.occurrence_count + 1
    `, [
      pattern.type,
      JSON.stringify(pattern.context),
      pattern.implementation,
      pattern.failureReason
    ])
  }

  async getRelevantPatterns(context: TaskContext): Promise<Pattern[]> {
    // Find patterns similar to current context
    const successPatterns = await this.db.query(`
      SELECT * FROM success_patterns
      WHERE pattern_type = $1
      ORDER BY quality_score * usage_count DESC
      LIMIT 5
    `, [context.taskType])

    const failurePatterns = await this.db.query(`
      SELECT * FROM failure_patterns
      WHERE pattern_type = $1
      ORDER BY occurrence_count DESC
      LIMIT 3
    `, [context.taskType])

    return {
      success: successPatterns.rows,
      failures: failurePatterns.rows
    }
  }
}

class LearningAgent extends AdaptiveAgent {
  constructor(
    config: AgentConfig,
    private knowledgeBase: SwarmKnowledgeBase
  ) {
    super(config)
  }

  async executeTask(task: Task): Promise<TaskResult> {
    // Before execution: learn from previous swarms
    const relevantPatterns = await this.knowledgeBase.getRelevantPatterns(task.context)

    // Augment prompt with successful patterns
    const augmentedPrompt = this.buildPromptWithPatterns(task, relevantPatterns)

    // Execute with learned knowledge
    const result = await this.executeWithPrompt(augmentedPrompt)

    // After execution: contribute knowledge
    if (result.success && result.validation.score > 0.85) {
      await this.knowledgeBase.recordSuccess({
        type: task.type,
        context: task.context,
        implementation: result.implementation,
        qualityScore: result.validation.score
      })
    } else if (!result.success) {
      await this.knowledgeBase.recordFailure({
        type: task.type,
        context: task.context,
        implementation: result.implementation,
        failureReason: result.error
      })
    }

    return result
  }

  private buildPromptWithPatterns(task: Task, patterns: Pattern[]): string {
    let prompt = this.basePrompt(task)

    if (patterns.success.length > 0) {
      prompt += "\n\nSuccessful patterns from previous swarms:\n"
      patterns.success.forEach((pattern, i) => {
        prompt += `\n${i + 1}. ${pattern.implementation} (quality: ${pattern.quality_score}, used ${pattern.usage_count} times)\n`
      })
    }

    if (patterns.failures.length > 0) {
      prompt += "\n\nKnown failure patterns to avoid:\n"
      patterns.failures.forEach((pattern, i) => {
        prompt += `\n${i + 1}. ${pattern.implementation} failed because: ${pattern.failure_reason}\n`
      })
    }

    return prompt
  }
}
```

**Example: Cross-swarm learning improves success rate**

```
Week 1 (no shared knowledge):
  Swarm A: 72% first-attempt success rate
  Swarm B: 69% first-attempt success rate
  Swarm C: 75% first-attempt success rate

Week 4 (with cross-swarm learning):
  Swarm D: 84% first-attempt success rate (learns from A, B, C)
  Swarm E: 87% first-attempt success rate (learns from A, B, C, D)
  Swarm F: 89% first-attempt success rate (learns from all previous)

Knowledge base after 6 weeks:
  - 1,247 successful patterns
  - 389 failure patterns
  - Average quality score: 0.87
  - New swarms start with this knowledge, don't repeat mistakes
```

## Technique 5: Human-in-the-Loop Active Learning

Swarms explicitly request human guidance when uncertain.

```typescript
// human-in-the-loop.ts

class UncertaintyAwareAgent extends LearningAgent {
  async executeTask(task: Task): Promise<TaskResult> {
    // Estimate confidence before execution
    const confidence = await this.estimateConfidence(task)

    if (confidence < 0.60) {
      // Low confidence: request human guidance
      const guidance = await this.requestHumanGuidance(task, {
        reason: 'Low confidence in approach',
        confidence,
        proposedApproach: await this.proposeApproach(task)
      })

      // Execute with human-provided guidance
      return await this.executeWithGuidance(task, guidance)
    }

    // High confidence: proceed autonomously
    return await super.executeTask(task)
  }

  private async estimateConfidence(task: Task): Promise<number> {
    // Factors that affect confidence:
    const factors = {
      similarityToKnownPatterns: await this.measureSimilarity(task),
      mySpecializationMatch: this.specialization?.confidence || 0.5,
      taskComplexity: 1 - task.complexityScore,
      historicalSuccessRate: this.getHistoricalSuccessRate(task.type)
    }

    // Weighted average
    return (
      factors.similarityToKnownPatterns * 0.3 +
      factors.mySpecializationMatch * 0.3 +
      factors.taskComplexity * 0.2 +
      factors.historicalSuccessRate * 0.2
    )
  }

  private async requestHumanGuidance(
    task: Task,
    request: GuidanceRequest
  ): Promise<HumanGuidance> {
    // Post to Slack/Teams channel or dashboard
    const notification = await this.notificationService.send({
      channel: '#swarm-assistance',
      message: `
🤖 **Agent ${this.id} requests guidance**

**Task**: ${task.description}
**Confidence**: ${(request.confidence * 100).toFixed(0)}%
**Reason**: ${request.reason}

**Proposed Approach**:
\`\`\`
${request.proposedApproach}
\`\`\`

React with:
✅ to approve proposed approach
❌ to provide alternative approach
💭 to discuss further
      `,
      priority: 'high'
    })

    // Wait for human response (with timeout)
    const response = await this.waitForResponse(notification.id, {
      timeout: 3600000  // 1 hour
    })

    if (!response) {
      // Timeout: proceed with best guess and flag for review
      return {
        approved: true,
        approach: request.proposedApproach,
        flagForReview: true
      }
    }

    return response
  }
}
```

## Key Takeaways

1. **Hierarchical swarms for complex problems.** Strategic swarms make high-level decisions, tactical swarms coordinate, operational swarms implement. Separation of concerns at scale.

2. **Meta-orchestration optimizes performance.** An AI orchestrator dynamically adjusts swarm parameters (agent count, model selection, context size) based on real-time metrics.

3. **Adaptive specialization emerges.** Agents learn from performance history and naturally specialize in tasks where they excel, improving efficiency over time.

4. **Cross-swarm learning accelerates improvement.** Swarms share successful patterns and failure modes through knowledge base, so new swarms benefit from previous experience.

5. **Human-in-the-loop for uncertainty.** Agents estimate confidence and request human guidance when uncertain, combining AI speed with human judgment.

6. **Advanced techniques require infrastructure.** These patterns need sophisticated orchestration, monitoring, and knowledge management beyond basic swarms.

7. **Incremental adoption.** Start with basic swarms, add advanced techniques as you scale. Don't try to implement everything at once.

In the next chapter, we'll explore hybrid workflows where humans and swarms collaborate seamlessly on the same project.
