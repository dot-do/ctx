# Chapter 17: Building Your First Swarm

Maya Chen sat down at her laptop with a clear goal: build her first agent swarm. She'd spent the last two weeks studying swarm principles, watching demos, and reading documentation. Now it was time to actually do it.

Her project was straightforward—a REST API for a task management application with five resources: users, projects, tasks, comments, and labels. Classic CRUD operations plus some relationships between entities.

Perfect first swarm project: decomposable, clear requirements, known patterns, easy validation.

She opened her code editor and stared at the blank screen. Where does she even start?

This is the gap between understanding swarm concepts and actually implementing one. The theory makes sense. The examples look impressive. But when you're staring at an empty repository, the path forward isn't obvious.

This chapter is that path—a step-by-step guide to building your first working swarm from scratch.

## Prerequisites

Before you build a swarm, you need:

**1. LLM API Access**

You'll need access to at least one LLM provider:
- OpenAI (GPT-4, GPT-4 Turbo, GPT-3.5)
- Anthropic (Claude 3 Opus, Sonnet, Haiku)
- Local models (Llama 3, Mistral)

Cost estimate: $50-200 for first swarm experiment (depends on swarm size and duration).

**2. Computing Resources**

Minimal setup:
- Your laptop (8GB+ RAM)
- Database (PostgreSQL or SQLite)
- Message queue (Redis or in-memory)

Production setup:
- Cloud instances (AWS, GCP, Azure)
- Managed database (RDS, Cloud SQL)
- Managed queue (SQS, Cloud Tasks)

**3. Development Tools**

- Git for version control
- Your preferred language (TypeScript/Python examples in this chapter)
- Testing framework
- CI/CD pipeline (optional but recommended)

**4. The Problem**

A well-defined problem that scores 7+ on the swarm suitability framework from Chapter 16.

## Step 1: Define Your Task Specification

Before writing any code, create a detailed specification that agents will work from.

```yaml
# task-management-api-spec.yaml

project_name: Task Management API
description: REST API for managing projects, tasks, and team collaboration

architecture:
  style: REST API
  database: PostgreSQL
  authentication: JWT tokens
  framework: Express.js (Node.js)

resources:
  users:
    endpoints:
      - POST /api/users (create)
      - GET /api/users/:id (read)
      - PUT /api/users/:id (update)
      - DELETE /api/users/:id (delete)
      - GET /api/users (list)
    fields:
      - id: UUID (primary key)
      - email: string (unique, required)
      - name: string (required)
      - password_hash: string (required)
      - created_at: timestamp
      - updated_at: timestamp
    validations:
      - email must be valid format
      - password must be 8+ characters
      - name must be 2-50 characters

  projects:
    endpoints:
      - POST /api/projects (create)
      - GET /api/projects/:id (read)
      - PUT /api/projects/:id (update)
      - DELETE /api/projects/:id (delete)
      - GET /api/projects (list)
    fields:
      - id: UUID (primary key)
      - name: string (required)
      - description: text (optional)
      - owner_id: UUID (foreign key to users)
      - created_at: timestamp
      - updated_at: timestamp
    relationships:
      - belongs_to: user (owner)
      - has_many: tasks

  # ... similar for tasks, comments, labels

performance_requirements:
  - API response time: p95 < 100ms
  - Database query time: p95 < 50ms
  - Support 1,000 concurrent requests

quality_requirements:
  - Test coverage: 80%+
  - All endpoints have integration tests
  - Input validation on all endpoints
  - Error handling with proper HTTP status codes

security_requirements:
  - All passwords bcrypt-hashed
  - JWT tokens expire after 24 hours
  - Rate limiting: 100 requests/minute per IP
  - SQL injection prevention (parameterized queries)
  - XSS prevention (input sanitization)
```

This specification is detailed enough that agents know exactly what to build, but flexible enough that they can choose implementation details.

## Step 2: Set Up the Swarm Orchestration Framework

You need infrastructure to coordinate agents. Here's a minimal TypeScript implementation:

```typescript
// swarm-orchestrator.ts

import OpenAI from 'openai'
import { PostgreSQLDriver } from './drivers/postgresql'
import { RedisQueue } from './drivers/redis'

interface SwarmConfig {
  numAgents: number
  model: string
  projectSpec: ProjectSpecification
  repository: GitRepository
  database: Database
  queue: MessageQueue
}

interface Task {
  id: string
  type: 'implement_endpoint' | 'write_tests' | 'fix_bug' | 'refactor'
  description: string
  context: TaskContext
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  assignedAgent?: string
}

class SwarmOrchestrator {
  private agents: Agent[] = []
  private taskQueue: Task[] = []
  private completedTasks: Task[] = []

  constructor(private config: SwarmConfig) {
    this.initializeAgents()
    this.decomposeProject()
  }

  private initializeAgents() {
    for (let i = 0; i < this.config.numAgents; i++) {
      this.agents.push(new Agent({
        id: `agent-${i}`,
        model: this.config.model,
        swarm: this,
        specialization: this.assignSpecialization(i)
      }))
    }
  }

  private assignSpecialization(agentIndex: number): AgentSpecialization {
    // Assign specializations to balance workload
    const specializations = [
      'api_implementation',
      'database_schema',
      'testing',
      'documentation'
    ]

    return specializations[agentIndex % specializations.length]
  }

  private decomposeProject() {
    const spec = this.config.projectSpec

    // Generate tasks from specification
    for (const resource of spec.resources) {
      // Database schema task
      this.addTask({
        type: 'implement_database',
        description: `Create database schema for ${resource.name}`,
        context: { resource }
      })

      // API endpoint tasks
      for (const endpoint of resource.endpoints) {
        this.addTask({
          type: 'implement_endpoint',
          description: `Implement ${endpoint.method} ${endpoint.path}`,
          context: { resource, endpoint }
        })

        this.addTask({
          type: 'write_tests',
          description: `Write tests for ${endpoint.method} ${endpoint.path}`,
          context: { resource, endpoint }
        })
      }
    }

    console.log(`Decomposed project into ${this.taskQueue.length} tasks`)
  }

  private addTask(taskPartial: Omit<Task, 'id' | 'status'>) {
    const task: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      ...taskPartial
    }

    this.taskQueue.push(task)
    this.config.queue.enqueue(task)
  }

  async run() {
    console.log(`Starting swarm with ${this.agents.length} agents`)
    console.log(`Task queue: ${this.taskQueue.length} tasks`)

    // Start all agents
    const agentPromises = this.agents.map(agent => agent.start())

    // Wait for all agents to complete
    await Promise.all(agentPromises)

    console.log(`Swarm complete. Completed ${this.completedTasks.length} tasks.`)
  }

  async getNextTask(agent: Agent): Promise<Task | null> {
    // Find best task for this agent based on specialization
    const compatibleTasks = this.taskQueue.filter(task =>
      task.status === 'pending' &&
      this.isCompatibleWithAgent(task, agent)
    )

    if (compatibleTasks.length === 0) {
      return null
    }

    // Prioritize tasks that unblock other tasks
    const prioritizedTask = this.prioritizeTasks(compatibleTasks)[0]

    prioritizedTask.status = 'in_progress'
    prioritizedTask.assignedAgent = agent.id

    return prioritizedTask
  }

  async completeTask(task: Task, result: TaskResult) {
    task.status = result.success ? 'completed' : 'failed'

    if (result.success) {
      this.completedTasks.push(task)

      // Commit changes to repository
      await this.config.repository.commit({
        message: `${task.type}: ${task.description}`,
        author: task.assignedAgent!,
        files: result.modifiedFiles
      })

      // Run tests
      const testResult = await this.runTests()

      if (!testResult.passed) {
        // Tests failed, create bug fix task
        this.addTask({
          type: 'fix_bug',
          description: `Fix failing tests in ${task.description}`,
          context: {
            originalTask: task,
            testFailures: testResult.failures
          }
        })
      }
    } else {
      // Task failed, re-queue it
      task.status = 'pending'
      task.assignedAgent = undefined
    }
  }

  private isCompatibleWithAgent(task: Task, agent: Agent): boolean {
    // Match task type with agent specialization
    const compatibility = {
      'implement_endpoint': ['api_implementation'],
      'implement_database': ['database_schema'],
      'write_tests': ['testing'],
      'fix_bug': ['api_implementation', 'testing'],
      'refactor': ['api_implementation']
    }

    return compatibility[task.type]?.includes(agent.specialization) ?? true
  }

  private prioritizeTasks(tasks: Task[]): Task[] {
    // Simple priority: database schema first, then endpoints, then tests
    const priority = {
      'implement_database': 1,
      'implement_endpoint': 2,
      'write_tests': 3,
      'fix_bug': 4,
      'refactor': 5
    }

    return tasks.sort((a, b) => priority[a.type] - priority[b.type])
  }

  private async runTests(): Promise<TestResult> {
    // Run test suite
    const result = await this.config.repository.runCommand('npm test')
    return {
      passed: result.exitCode === 0,
      failures: this.parseTestFailures(result.output)
    }
  }
}
```

## Step 3: Implement the Agent

Each agent is responsible for executing tasks autonomously.

```typescript
// agent.ts

class Agent {
  private llm: OpenAI
  private conversationHistory: Message[] = []

  constructor(private config: AgentConfig) {
    this.llm = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }

  async start() {
    console.log(`Agent ${this.id} starting (${this.specialization})`)

    while (true) {
      // Get next task from orchestrator
      const task = await this.config.swarm.getNextTask(this)

      if (!task) {
        // No more tasks available
        await this.sleep(5000)  // Wait 5 seconds
        const queueStatus = await this.config.swarm.checkQueueStatus()

        if (queueStatus.empty && queueStatus.allAgentsIdle) {
          console.log(`Agent ${this.id} shutting down - no more work`)
          break
        }

        continue
      }

      // Execute task
      console.log(`Agent ${this.id} executing: ${task.description}`)

      try {
        const result = await this.executeTask(task)
        await this.config.swarm.completeTask(task, result)
        console.log(`Agent ${this.id} completed: ${task.description}`)
      } catch (error) {
        console.error(`Agent ${this.id} failed: ${task.description}`, error)
        await this.config.swarm.completeTask(task, {
          success: false,
          error: error.message
        })
      }
    }
  }

  private async executeTask(task: Task): Promise<TaskResult> {
    // Build context for LLM
    const context = await this.buildContext(task)

    // Generate implementation
    const prompt = this.constructPrompt(task, context)

    const completion = await this.llm.chat.completions.create({
      model: this.config.model,
      messages: [
        {
          role: 'system',
          content: this.getSystemPrompt()
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,  // Lower temperature for more consistent code
      max_tokens: 4000
    })

    const response = completion.choices[0].message.content

    // Parse response to extract code and files
    const implementation = this.parseImplementation(response)

    // Write files to repository
    const modifiedFiles = await this.writeFiles(implementation)

    // Validate implementation
    const validation = await this.validateImplementation(task, implementation)

    return {
      success: validation.passed,
      modifiedFiles,
      output: response,
      validation
    }
  }

  private getSystemPrompt(): string {
    return `You are an expert software engineer specialized in ${this.specialization}.

You are part of a swarm building a Task Management API. Your role is to implement specific components following the project specification exactly.

When implementing:
1. Follow the spec precisely - don't add or remove required features
2. Write clean, maintainable code
3. Include proper error handling
4. Add input validation
5. Write clear comments explaining complex logic
6. Follow REST best practices
7. Use TypeScript with strict typing

When writing tests:
1. Test all success cases
2. Test all error cases (validation failures, not found, etc.)
3. Test edge cases
4. Use descriptive test names
5. Aim for 80%+ coverage

Output your code in the following format:

\`\`\`typescript:path/to/file.ts
// Your code here
\`\`\`

You may output multiple files in one response.`
  }

  private constructPrompt(task: Task, context: TaskContext): string {
    switch (task.type) {
      case 'implement_endpoint':
        return this.constructEndpointPrompt(task, context)
      case 'write_tests':
        return this.constructTestPrompt(task, context)
      case 'implement_database':
        return this.constructDatabasePrompt(task, context)
      default:
        return this.constructGenericPrompt(task, context)
    }
  }

  private constructEndpointPrompt(task: Task, context: TaskContext): string {
    const { resource, endpoint } = task.context

    return `Implement the following REST API endpoint:

**Endpoint**: ${endpoint.method} ${endpoint.path}
**Resource**: ${resource.name}

**Resource Schema**:
${JSON.stringify(resource.fields, null, 2)}

**Validations**:
${resource.validations.map(v => `- ${v}`).join('\n')}

**Requirements**:
- Implement in Express.js with TypeScript
- Use PostgreSQL with parameterized queries (prevent SQL injection)
- Return proper HTTP status codes (200, 201, 400, 404, 500)
- Validate all inputs
- Handle errors gracefully
- Follow RESTful conventions

**Existing Code Context**:
${context.existingFiles.map(f => `${f.path}:\n${f.content}`).join('\n\n')}

Generate the implementation for this endpoint.`
  }

  private async buildContext(task: Task): Promise<TaskContext> {
    // Gather relevant context from repository
    const relevantFiles = await this.findRelevantFiles(task)

    return {
      task,
      projectSpec: this.config.swarm.config.projectSpec,
      existingFiles: relevantFiles,
      recentChanges: await this.getRecentChanges(10)
    }
  }

  private async findRelevantFiles(task: Task): Promise<File[]> {
    // Use simple heuristics to find relevant files
    const patterns = {
      'implement_endpoint': ['src/routes/*.ts', 'src/models/*.ts', 'src/db/*.ts'],
      'write_tests': ['src/**/*.ts', 'tests/**/*.test.ts'],
      'implement_database': ['src/db/**/*.ts', 'migrations/*.ts']
    }

    const filePatterns = patterns[task.type] || ['src/**/*.ts']

    const files = await this.config.repository.findFiles(filePatterns)

    // Limit context size
    return files.slice(0, 5)
  }

  private parseImplementation(response: string): Implementation {
    // Extract code blocks from markdown-formatted response
    const codeBlockRegex = /```(\w+):(.+?)\n([\s\S]+?)```/g
    const files: FileContent[] = []

    let match
    while ((match = codeBlockRegex.exec(response)) !== null) {
      const [, language, filepath, content] = match

      files.push({
        path: filepath.trim(),
        content: content.trim(),
        language
      })
    }

    return { files }
  }

  private async writeFiles(implementation: Implementation): Promise<string[]> {
    const modifiedFiles: string[] = []

    for (const file of implementation.files) {
      await this.config.repository.writeFile(file.path, file.content)
      modifiedFiles.push(file.path)
    }

    return modifiedFiles
  }

  private async validateImplementation(
    task: Task,
    implementation: Implementation
  ): Promise<ValidationResult> {
    const checks: ValidationCheck[] = []

    // 1. Syntax check (TypeScript compilation)
    checks.push(await this.checkSyntax(implementation))

    // 2. Lint check
    checks.push(await this.checkLint(implementation))

    // 3. Type check
    checks.push(await this.checkTypes(implementation))

    // 4. Run tests (if applicable)
    if (task.type !== 'write_tests') {
      checks.push(await this.checkTests())
    }

    const passed = checks.every(check => check.passed)

    return {
      passed,
      checks,
      errors: checks.filter(c => !c.passed).map(c => c.error)
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
```

## Step 4: Launch Your First Swarm

Now you're ready to actually run the swarm:

```typescript
// main.ts

import { SwarmOrchestrator } from './swarm-orchestrator'
import { loadProjectSpec } from './spec-loader'
import { GitRepository } from './repository'
import { PostgreSQLDriver } from './drivers/postgresql'
import { RedisQueue } from './drivers/redis'

async function main() {
  // Load project specification
  const projectSpec = await loadProjectSpec('./task-management-api-spec.yaml')

  // Initialize repository
  const repository = new GitRepository({
    path: './task-management-api',
    remote: 'git@github.com:yourcompany/task-management-api.git'
  })

  // Initialize database
  const database = new PostgreSQLDriver({
    host: 'localhost',
    port: 5432,
    database: 'task_management_dev',
    user: 'postgres',
    password: 'password'
  })

  // Initialize message queue
  const queue = new RedisQueue({
    host: 'localhost',
    port: 6379
  })

  // Create swarm configuration
  const swarmConfig = {
    numAgents: 12,
    model: 'gpt-4-turbo',
    projectSpec,
    repository,
    database,
    queue
  }

  // Create and start orchestrator
  const orchestrator = new SwarmOrchestrator(swarmConfig)

  console.log('Starting swarm...')
  console.log(`Agents: ${swarmConfig.numAgents}`)
  console.log(`Model: ${swarmConfig.model}`)
  console.log(`Tasks: ${orchestrator.taskQueue.length}`)

  // Run the swarm
  await orchestrator.run()

  console.log('Swarm complete!')

  // Generate summary report
  const report = await orchestrator.generateReport()
  console.log(report)
}

main().catch(console.error)
```

Run it:

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your OpenAI API key, database credentials, etc.

# Initialize database
npm run db:setup

# Start Redis
docker-compose up -d redis

# Run the swarm!
npm run swarm
```

## Step 5: Monitor Progress

While your swarm runs, you'll want to monitor its progress:

```typescript
// monitoring-dashboard.ts

class SwarmMonitor {
  constructor(private orchestrator: SwarmOrchestrator) {
    this.startDashboard()
  }

  private startDashboard() {
    // Update dashboard every 5 seconds
    setInterval(() => {
      this.printDashboard()
    }, 5000)
  }

  private printDashboard() {
    const stats = this.orchestrator.getStatistics()

    console.clear()
    console.log('=== SWARM DASHBOARD ===\n')

    console.log(`Tasks: ${stats.completed}/${stats.total} completed (${stats.percentage}%)`)
    console.log(`  Pending: ${stats.pending}`)
    console.log(`  In Progress: ${stats.inProgress}`)
    console.log(`  Failed: ${stats.failed}\n`)

    console.log(`Agents: ${stats.activeAgents}/${stats.totalAgents} active`)
    console.log(`  Idle: ${stats.idleAgents}`)
    console.log(`  Working: ${stats.workingAgents}\n`)

    console.log(`Tests: ${stats.testsPassed}/${stats.testsTotal} passing`)
    console.log(`Coverage: ${stats.testCoverage}%\n`)

    console.log(`Estimated completion: ${stats.estimatedTimeRemaining}\n`)

    // Show recent activity
    console.log('Recent Activity:')
    stats.recentActivity.slice(0, 5).forEach(activity => {
      const icon = activity.type === 'completed' ? '✅' : '🔄'
      console.log(`  ${icon} ${activity.agent}: ${activity.task}`)
    })

    // Show current agent status
    console.log('\nAgent Status:')
    stats.agents.forEach(agent => {
      const statusIcon = agent.status === 'working' ? '🔄' : agent.status === 'idle' ? '💤' : '✅'
      const task = agent.currentTask || 'idle'
      console.log(`  ${statusIcon} ${agent.id}: ${task}`)
    })
  }
}

// Add to main.ts
const monitor = new SwarmMonitor(orchestrator)
```

**Example output:**

```
=== SWARM DASHBOARD ===

Tasks: 23/47 completed (49%)
  Pending: 18
  In Progress: 6
  Failed: 0

Agents: 12/12 active
  Idle: 3
  Working: 9

Tests: 45/52 passing
Coverage: 82%

Estimated completion: 2h 15m

Recent Activity:
  ✅ agent-3: Implement GET /api/projects/:id
  ✅ agent-7: Write tests for POST /api/users
  🔄 agent-1: Implement POST /api/tasks
  🔄 agent-5: Write tests for GET /api/projects
  ✅ agent-9: Implement database schema for labels

Agent Status:
  🔄 agent-0: Implement GET /api/users
  💤 agent-1: idle
  🔄 agent-2: Write tests for PUT /api/projects/:id
  ✅ agent-3: completed task
  🔄 agent-4: Implement DELETE /api/tasks/:id
  ...
```

## Step 6: Handle Common Issues

Your first swarm run will likely encounter problems. Here's how to handle them:

### Issue 1: Tests Fail After Implementation

**Problem:** Agent implements endpoint but tests fail.

**Solution:** Create bug-fix task automatically:

```typescript
if (!testResult.passed) {
  this.addTask({
    type: 'fix_bug',
    description: `Fix failing tests: ${testResult.failures.join(', ')}`,
    context: {
      originalTask: task,
      failures: testResult.failures,
      implementation: result.modifiedFiles
    },
    priority: 'high'
  })
}
```

### Issue 2: Agents Make Conflicting Changes

**Problem:** Two agents modify the same file, creating merge conflicts.

**Solution:** Lock files during modification:

```typescript
class FileLock {
  private locks = new Map<string, string>()  // filepath -> agentId

  async acquireLock(filepath: string, agentId: string): Promise<boolean> {
    if (this.locks.has(filepath)) {
      return false  // Already locked
    }

    this.locks.set(filepath, agentId)
    return true
  }

  releaseLock(filepath: string, agentId: string) {
    if (this.locks.get(filepath) === agentId) {
      this.locks.delete(filepath)
    }
  }
}
```

### Issue 3: Agent Gets Stuck in Loop

**Problem:** Agent repeatedly fails the same task.

**Solution:** Track failure count and escalate:

```typescript
class Task {
  failureCount = 0
  maxAttempts = 3

  async handleFailure(error: Error) {
    this.failureCount++

    if (this.failureCount >= this.maxAttempts) {
      // Escalate to human
      await this.notifyHuman({
        task: this,
        error,
        message: `Task failed ${this.failureCount} times. Manual intervention required.`
      })

      this.status = 'blocked'
    } else {
      // Re-queue with additional context
      this.context.previousErrors = this.context.previousErrors || []
      this.context.previousErrors.push(error.message)

      this.status = 'pending'
    }
  }
}
```

### Issue 4: Swarm Runs Out of Budget

**Problem:** Swarm exceeds cost budget before completion.

**Solution:** Implement cost tracking and limits (from Chapter 15):

```typescript
class BudgetEnforcer {
  async checkBeforeAction(agent: Agent, task: Task): Promise<boolean> {
    const estimatedCost = this.estimateTaskCost(task)

    if (this.spent + estimatedCost > this.budget) {
      console.warn(`Budget limit reached. Pausing agent ${agent.id}`)
      return false
    }

    return true
  }
}
```

## Step 7: Review and Iterate

After your swarm completes (or reaches a milestone), review the output:

```bash
# Run full test suite
npm test

# Check test coverage
npm run coverage

# Run linter
npm run lint

# Type check
npm run typecheck

# Security audit
npm audit

# Generate report
npm run swarm:report
```

**Example report:**

```
=== SWARM EXECUTION REPORT ===

Duration: 3h 24m
Tasks Completed: 47/47 (100%)
Tests Written: 52
Test Coverage: 87%

Agent Performance:
  agent-0: 5 tasks, 98% success rate
  agent-1: 4 tasks, 100% success rate
  agent-2: 6 tasks, 83% success rate (1 failure)
  ...

Cost Analysis:
  Total API Calls: 1,247
  Total Tokens: 3,456,789
  Total Cost: $127.43

Code Quality:
  Lines of Code: 2,847
  Maintainability Index: 76/100
  Cyclomatic Complexity: 4.2 (average)
  Technical Debt: 2h 15m

Issues Found:
  - 3 endpoints missing error handling (fixed)
  - 1 test suite incomplete (fixed)
  - 2 code style violations (fixed)

Human Interventions: 0

Status: ✅ SUCCESS
```

## Key Takeaways

1. **Start with a clear specification.** The more detailed your spec, the better your swarm will perform. Include schemas, validations, requirements, and examples.

2. **Build infrastructure first.** Orchestrator, agent framework, task queue, and monitoring are prerequisites. Don't skip these to save time.

3. **Start small.** Your first swarm should have 5-15 agents working on a well-defined problem. Don't attempt 50 agents on a complex project.

4. **Monitor actively.** Watch the dashboard, check logs, and intervene when agents get stuck. Early intervention prevents wasted compute.

5. **Expect failures.** Tests will fail. Code will have bugs. Agents will make mistakes. Build error handling and retry logic into your orchestrator.

6. **Iterate and improve.** Your first swarm won't be perfect. Learn from failures, adjust prompts, tune parameters, and run again.

7. **Measure everything.** Track costs, time, success rates, and quality metrics. Use data to improve future swarms.

In the next chapter, we'll explore the tooling and infrastructure you need for production-grade swarm development at scale.
