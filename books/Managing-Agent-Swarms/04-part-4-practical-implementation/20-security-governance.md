# Chapter 20: Security and Governance

The Slack message arrived at 3:47 AM:

> **Security Alert:** Potential credential leak detected in commit 4f9a2c1

Rachel Kim, CISO at FinanceHub, sat up in bed and opened her laptop. Her team had deployed their first production swarm three days ago—a 20-agent system building an internal reporting tool. Now it had potentially committed AWS credentials to the repository.

She pulled up the commit. Sure enough, there it was:

```typescript
// config.ts
export const AWS_ACCESS_KEY = "AKIA3X7EXAMPLE"
export const AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
```

The credentials were hardcoded directly in the source file, pushed to GitHub, visible to everyone with repository access.

Rachel immediately revoked the credentials, rotated them, and initiated an incident review. The swarm hadn't done anything malicious—it had simply replicated a pattern it had seen in the codebase during training. A human developer had done the same thing six months ago, and the swarm learned from that "example."

This was Rachel's nightmare scenario: an automated system creating security vulnerabilities faster than humans could review them. If one swarm could leak credentials, what else could go wrong? SQL injection? XSS vulnerabilities? Exposed PII? Authentication bypass?

The incident made one thing clear: **Swarms need security and governance guardrails, not just technical capability.**

This chapter explores how to ensure swarms produce secure code and comply with organizational policies, regulatory requirements, and industry standards.

## The Security Challenge

Traditional software development has evolved security practices over decades:
- Developer training on secure coding
- Code review by security-aware engineers
- Static analysis tools
- Dynamic security testing
- Penetration testing
- Security audits

These practices assume human developers who understand context, make judgment calls, and learn from mistakes.

Swarms break these assumptions:
- Agents don't "understand" security—they pattern-match
- Volume of code makes human review impractical
- Agents might replicate vulnerable patterns from training data
- Speed advantage is lost if every line requires security review

We need new security practices designed for AI-generated code.

## Defense Layer 1: Secure-by-Default Templates

Prevent vulnerabilities by providing secure templates that agents build from.

```typescript
// secure-templates/authentication.template.ts

/**
 * Secure authentication template.
 * Agents MUST use this template for any authentication implementation.
 */

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RateLimiter } from './rate-limiter'

interface AuthConfig {
  jwtSecret: string  // MUST be loaded from env, never hardcoded
  bcryptRounds: number  // Minimum 12
  tokenExpiry: string  // e.g., '24h'
  rateLimitAttempts: number  // e.g., 5
  rateLimitWindow: number  // e.g., 900000 (15 minutes)
}

class SecureAuthenticator {
  private rateLimiter: RateLimiter

  constructor(private config: AuthConfig) {
    // Validate configuration at construction time
    this.validateConfig()

    this.rateLimiter = new RateLimiter({
      maxAttempts: config.rateLimitAttempts,
      windowMs: config.rateLimitWindow
    })
  }

  private validateConfig() {
    if (!this.config.jwtSecret || this.config.jwtSecret.length < 32) {
      throw new Error('JWT secret must be at least 32 characters')
    }

    if (this.config.bcryptRounds < 12) {
      throw new Error('Bcrypt rounds must be at least 12')
    }
  }

  async hashPassword(plaintext: string): Promise<string> {
    // Input validation
    if (!plaintext || plaintext.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }

    // Use bcrypt with secure defaults
    return await bcrypt.hash(plaintext, this.config.bcryptRounds)
  }

  async verifyPassword(plaintext: string, hash: string, identifier: string): Promise<boolean> {
    // Rate limiting BEFORE verification
    await this.rateLimiter.checkLimit(identifier)

    try {
      // Constant-time comparison
      return await bcrypt.compare(plaintext, hash)
    } catch (error) {
      // Log potential attack
      await this.logSecurityEvent({
        type: 'failed_verification',
        identifier,
        error: error.message
      })

      return false
    } finally {
      // Record attempt (success or failure) for rate limiting
      await this.rateLimiter.recordAttempt(identifier)
    }
  }

  async generateToken(payload: object): Promise<string> {
    // Sign with secure algorithm
    return jwt.sign(
      payload,
      this.config.jwtSecret,
      {
        algorithm: 'HS256',  // Secure algorithm
        expiresIn: this.config.tokenExpiry
      }
    )
  }

  async verifyToken(token: string): Promise<object | null> {
    try {
      return jwt.verify(token, this.config.jwtSecret, {
        algorithms: ['HS256']  // Explicitly allow only secure algorithms
      }) as object
    } catch (error) {
      // Log suspicious activity
      if (error.name === 'TokenExpiredError') {
        // Normal expiry, don't log as security event
        return null
      }

      await this.logSecurityEvent({
        type: 'invalid_token',
        error: error.message
      })

      return null
    }
  }

  private async logSecurityEvent(event: SecurityEvent) {
    // Send to security monitoring system
    await this.securityLog.write(event)
  }
}

export { SecureAuthenticator }
```

**Swarm instructions:**

```yaml
template_enforcement:
  authentication:
    template: secure-templates/authentication.template.ts
    rule: MUST use SecureAuthenticator class for all authentication
    forbidden_patterns:
      - hardcoded credentials
      - plain-text password storage
      - weak hashing algorithms (MD5, SHA1)
      - custom authentication logic
    validation:
      - All authentication code imports from SecureAuthenticator
      - No custom password hashing
      - JWT secrets loaded from environment
```

## Defense Layer 2: Automated Security Scanning

Run security tools automatically on all swarm outputs before commit.

```typescript
// security-scanner.ts

class SwarmSecurityScanner {
  private scanners = {
    secrets: new SecretScanner(),
    injection: new InjectionScanner(),
    dependencies: new DependencyScanner(),
    authentication: new AuthenticationScanner(),
    dataExposure: new DataExposureScanner()
  }

  async scanCode(files: SourceFile[]): Promise<SecurityScanResult> {
    const results: SecurityIssue[] = []

    // Run all scanners in parallel
    const scanPromises = Object.entries(this.scanners).map(async ([type, scanner]) => {
      const issues = await scanner.scan(files)
      return issues.map(issue => ({ ...issue, scannerType: type }))
    })

    const allIssues = (await Promise.all(scanPromises)).flat()

    // Categorize by severity
    const critical = allIssues.filter(i => i.severity === 'CRITICAL')
    const high = allIssues.filter(i => i.severity === 'HIGH')
    const medium = allIssues.filter(i => i.severity === 'MEDIUM')
    const low = allIssues.filter(i => i.severity === 'LOW')

    return {
      passed: critical.length === 0 && high.length === 0,
      issues: allIssues,
      summary: {
        critical: critical.length,
        high: high.length,
        medium: medium.length,
        low: low.length
      }
    }
  }
}

class SecretScanner {
  private patterns = [
    { name: 'AWS Access Key', pattern: /AKIA[0-9A-Z]{16}/ },
    { name: 'AWS Secret Key', pattern: /[0-9a-zA-Z/+]{40}/ },
    { name: 'GitHub Token', pattern: /gh[ps]_[a-zA-Z0-9]{36}/ },
    { name: 'Stripe Key', pattern: /sk_live_[a-zA-Z0-9]{24}/ },
    { name: 'Generic Secret', pattern: /(secret|password|key|token)\s*=\s*["'][^"']{8,}["']/ },
    { name: 'Private Key', pattern: /-----BEGIN (RSA |DSA )?PRIVATE KEY-----/ }
  ]

  async scan(files: SourceFile[]): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = []

    for (const file of files) {
      for (const pattern of this.patterns) {
        const matches = file.content.matchAll(new RegExp(pattern.pattern, 'g'))

        for (const match of matches) {
          issues.push({
            severity: 'CRITICAL',
            type: 'hardcoded_secret',
            message: `Possible ${pattern.name} found in source code`,
            file: file.path,
            line: this.getLineNumber(file.content, match.index),
            suggestion: `Move secret to environment variable or secrets manager`
          })
        }
      }
    }

    return issues
  }
}

class InjectionScanner {
  async scan(files: SourceFile[]): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = []

    for (const file of files) {
      // SQL injection detection
      issues.push(...await this.detectSQLInjection(file))

      // XSS detection
      issues.push(...await this.detectXSS(file))

      // Command injection detection
      issues.push(...await this.detectCommandInjection(file))
    }

    return issues
  }

  private async detectSQLInjection(file: SourceFile): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = []

    // Look for string concatenation in SQL queries
    const sqlConcatPattern = /\.(query|execute)\s*\(\s*['"`][^'"`]*\$\{[^}]*\}[^'"`]*['"`]/g

    const matches = file.content.matchAll(sqlConcatPattern)

    for (const match of matches) {
      issues.push({
        severity: 'CRITICAL',
        type: 'sql_injection',
        message: 'Possible SQL injection via string concatenation',
        file: file.path,
        line: this.getLineNumber(file.content, match.index),
        suggestion: 'Use parameterized queries instead of string concatenation'
      })
    }

    return issues
  }

  private async detectXSS(file: SourceFile): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = []

    // Look for unsanitized user input in HTML
    const xssPatterns = [
      /innerHTML\s*=\s*[^;]*\$\{/,
      /dangerouslySetInnerHTML/,
      /document\.write\s*\([^)]*\$\{/
    ]

    for (const pattern of xssPatterns) {
      const matches = file.content.matchAll(new RegExp(pattern, 'g'))

      for (const match of matches) {
        issues.push({
          severity: 'HIGH',
          type: 'xss',
          message: 'Possible XSS vulnerability from unsanitized input',
          file: file.path,
          line: this.getLineNumber(file.content, match.index),
          suggestion: 'Sanitize user input before rendering or use safe rendering methods'
        })
      }
    }

    return issues
  }
}
```

**Enforcement:**

```typescript
async completeTask(task: Task, result: TaskResult) {
  // Security scan BEFORE accepting code
  const securityScan = await this.securityScanner.scanCode(result.files)

  if (!securityScan.passed) {
    // Critical or high-severity issues found
    console.error(`Security scan failed for ${task.id}`)
    console.error(`Critical: ${securityScan.summary.critical}`)
    console.error(`High: ${securityScan.summary.high}`)

    // Reject the code
    task.status = 'failed'
    task.failureReason = 'security_scan_failed'
    task.securityIssues = securityScan.issues

    // Create fix task
    this.addTask({
      type: 'fix_security_issues',
      description: `Fix security issues in ${task.description}`,
      context: {
        originalTask: task,
        securityIssues: securityScan.issues
      },
      priority: 'critical'
    })

    return
  }

  // Passed security scan, proceed with commit
  await this.commitCode(result)
}
```

## Defense Layer 3: Policy Enforcement

Codify security and compliance policies as enforceable rules.

```yaml
# security-policies.yaml

policies:
  authentication:
    - rule: All endpoints requiring authentication must use AuthenticationMiddleware
      validation: Check that protected routes include auth middleware
      severity: CRITICAL

    - rule: Passwords must be hashed with bcrypt (cost >= 12)
      validation: No plain-text password storage, bcrypt cost factor >= 12
      severity: CRITICAL

    - rule: JWT tokens must expire within 24 hours
      validation: Token expiry <= 24h
      severity: HIGH

  authorization:
    - rule: All data access must check user permissions
      validation: Database queries include user context and permission checks
      severity: CRITICAL

    - rule: API endpoints must validate user owns requested resource
      validation: Resource ownership validation before returning data
      severity: HIGH

  data_protection:
    - rule: PII must be encrypted at rest
      validation: Sensitive fields use encryption
      severity: CRITICAL

    - rule: Credit card data must not be stored (PCI DSS)
      validation: No credit card storage in database
      severity: CRITICAL

    - rule: User data exports must be rate-limited
      validation: Export endpoints have rate limiting
      severity: HIGH

  secrets_management:
    - rule: No credentials in source code
      validation: Secret scanner finds no hardcoded credentials
      severity: CRITICAL

    - rule: All secrets loaded from environment or vault
      validation: Configuration loaded from process.env or vault
      severity: CRITICAL

  dependencies:
    - rule: No dependencies with known critical vulnerabilities
      validation: npm audit / snyk scan passes
      severity: CRITICAL

    - rule: Dependencies must be actively maintained
      validation: No dependencies unmaintained for > 2 years
      severity: MEDIUM

  logging:
    - rule: Security events must be logged
      validation: Authentication failures, authorization failures logged
      severity: HIGH

    - rule: Logs must not contain sensitive data
      validation: No PII, credentials, or tokens in logs
      severity: HIGH
```

**Policy validator:**

```typescript
class PolicyValidator {
  private policies: Policy[]

  async validateAgainstPolicies(code: SourceFile[]): Promise<PolicyValidationResult> {
    const violations: PolicyViolation[] = []

    for (const policy of this.policies) {
      const policyViolations = await this.checkPolicy(policy, code)
      violations.push(...policyViolations)
    }

    const critical = violations.filter(v => v.severity === 'CRITICAL')

    return {
      passed: critical.length === 0,
      violations,
      summary: this.summarizeViolations(violations)
    }
  }

  private async checkPolicy(policy: Policy, code: SourceFile[]): Promise<PolicyViolation[]> {
    // Use AST analysis, pattern matching, or external validators
    const violations: PolicyViolation[] = []

    switch (policy.category) {
      case 'authentication':
        violations.push(...await this.checkAuthenticationPolicy(policy, code))
        break
      case 'secrets_management':
        violations.push(...await this.checkSecretsPolicy(policy, code))
        break
      // ... other policy categories
    }

    return violations
  }
}
```

## Defense Layer 4: Human Security Review

Some decisions require human judgment. Flag these for manual review.

```typescript
class SecurityReviewTriage {
  async triageForReview(code: SourceFile[], context: TaskContext): Promise<ReviewDecision> {
    // Automatic pass (low risk)
    if (this.isLowRisk(code, context)) {
      return { requiresReview: false, reason: 'low_risk' }
    }

    // Automatic review required (high risk)
    if (this.isHighRisk(code, context)) {
      return {
        requiresReview: true,
        reason: 'high_risk',
        priority: 'immediate',
        reviewers: await this.getSecurityReviewers()
      }
    }

    // Statistical sampling (medium risk)
    if (Math.random() < 0.10) {  // 10% sampling rate
      return {
        requiresReview: true,
        reason: 'statistical_sample',
        priority: 'normal'
      }
    }

    return { requiresReview: false, reason: 'passed_automated_checks' }
  }

  private isLowRisk(code: SourceFile[], context: TaskContext): boolean {
    return (
      context.changeType === 'documentation' ||
      context.changeType === 'test' ||
      context.changeType === 'style' ||
      (this.linesChanged(code) < 50 && this.noSensitiveFiles(code))
    )
  }

  private isHighRisk(code: SourceFile[], context: TaskContext): boolean {
    const highRiskIndicators = [
      this.touchesAuthentication(code),
      this.touchesAuthorization(code),
      this.touchesEncryption(code),
      this.touchesPaymentProcessing(code),
      this.touchesPII(code),
      this.modifiesSecurityConfig(code),
      this.linesChanged(code) > 500
    ]

    return highRiskIndicators.filter(Boolean).length > 0
  }

  private touchesAuthentication(code: SourceFile[]): boolean {
    const authFiles = [
      /auth/i,
      /login/i,
      /password/i,
      /token/i,
      /session/i
    ]

    return code.some(file =>
      authFiles.some(pattern => pattern.test(file.path))
    )
  }
}
```

## Defense Layer 5: Audit Trail

Maintain complete audit trail of all swarm actions for compliance and forensics.

```typescript
class SecurityAuditLog {
  async logSwarmAction(action: SwarmAction) {
    await this.postgres.query(`
      INSERT INTO security_audit_log (
        timestamp,
        swarm_id,
        agent_id,
        action_type,
        files_modified,
        security_scan_result,
        policy_validation_result,
        human_review_required,
        human_reviewer,
        human_review_result,
        commit_hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `, [
      new Date(),
      action.swarmId,
      action.agentId,
      action.type,
      JSON.stringify(action.filesModified),
      JSON.stringify(action.securityScanResult),
      JSON.stringify(action.policyValidationResult),
      action.humanReviewRequired,
      action.humanReviewer,
      action.humanReviewResult,
      action.commitHash
    ])
  }

  async generateAuditReport(timeframe: Timeframe): Promise<AuditReport> {
    const actions = await this.postgres.query(`
      SELECT *
      FROM security_audit_log
      WHERE timestamp >= $1 AND timestamp < $2
      ORDER BY timestamp DESC
    `, [timeframe.start, timeframe.end])

    return {
      totalActions: actions.rows.length,
      securityScansRun: this.countSecurityScans(actions.rows),
      issuesFound: this.countIssuesFound(actions.rows),
      issuesFixed: this.countIssuesFixed(actions.rows),
      humanReviewsRequired: this.countHumanReviews(actions.rows),
      policyViolations: this.countPolicyViolations(actions.rows),
      timeline: this.buildTimeline(actions.rows)
    }
  }
}
```

## Compliance Frameworks

Map policies to compliance requirements:

### GDPR Compliance

```yaml
gdpr_requirements:
  data_minimization:
    - Collect only necessary PII
    - Retention policies enforced
    - Data deletion on request

  swarm_enforcement:
    - Database schemas validated for minimal PII storage
    - Auto-delete jobs scheduled
    - Delete APIs implemented for all user-generated content

  validation:
    - Check schema includes only required PII fields
    - Verify retention policy configuration
    - Test deletion APIs

consent_management:
  requirement: Explicit consent for data processing
  swarm_enforcement:
    - All user creation flows include consent checkboxes
    - Consent stored in database with timestamp
    - Data processing blocked without consent

data_portability:
  requirement: Users can export their data
  swarm_enforcement:
    - Export endpoint implemented for all user data
    - Format: JSON or CSV
    - Includes all PII and user-generated content
```

### SOC 2 Compliance

```yaml
soc2_requirements:
  access_control:
    - Role-based access control
    - Principle of least privilege
    - Regular access reviews

  swarm_enforcement:
    - All endpoints check user roles
    - No overly permissive defaults
    - Audit logs for all access

  audit_logging:
    - All security events logged
    - Logs immutable
    - Logs retained for 1 year

  swarm_enforcement:
    - Security audit log for all changes
    - Append-only log storage
    - Automated retention policy

  change_management:
    - All code changes reviewed
    - Testing before deployment
    - Rollback capability

  swarm_enforcement:
    - Human review for high-risk changes
    - Automated tests must pass
    - Git history enables rollback
```

### PCI DSS Compliance

```yaml
pci_dss_requirements:
  no_card_storage:
    requirement: Do not store credit card data
    swarm_enforcement:
      - Database schemas validated for no card fields
      - Code scanned for card number patterns
      - Only store payment processor tokens

  encryption:
    requirement: Encrypt cardholder data in transit
    swarm_enforcement:
      - All payment API calls use HTTPS
      - TLS 1.2 or higher required
      - Certificate validation enabled

  access_logging:
    requirement: Log all access to cardholder data
    swarm_enforcement:
      - Payment processing logs all transactions
      - Logs include user ID, timestamp, action
      - Logs sent to SIEM system
```

## Incident Response

When security issues are detected:

```typescript
class SecurityIncidentResponse {
  async handleSecurityIncident(incident: SecurityIncident) {
    // 1. Immediate response
    await this.immediateResponse(incident)

    // 2. Investigation
    const investigation = await this.investigate(incident)

    // 3. Remediation
    await this.remediate(incident, investigation)

    // 4. Post-mortem
    await this.postMortem(incident, investigation)
  }

  private async immediateResponse(incident: SecurityIncident) {
    // Terminate swarm if still running
    if (incident.swarmStatus === 'active') {
      await this.orchestrator.terminateSwarm(incident.swarmId, 'security_incident')
    }

    // Revoke any leaked credentials
    if (incident.type === 'credential_leak') {
      await this.revokeCredentials(incident.credentials)
    }

    // Revert problematic commits
    await this.revertCommits(incident.commits)

    // Alert security team
    await this.alertSecurityTeam(incident)
  }

  private async investigate(incident: SecurityIncident): Promise<Investigation> {
    // Gather all relevant data
    const auditLogs = await this.getAuditLogs(incident.swarmId)
    const commits = await this.getCommits(incident.swarmId)
    const agentActions = await this.getAgentActions(incident.swarmId)

    // Determine root cause
    const rootCause = this.analyzeRootCause(auditLogs, commits, agentActions)

    // Assess impact
    const impact = await this.assessImpact(incident)

    return {
      rootCause,
      impact,
      timeline: this.buildIncidentTimeline(auditLogs),
      affectedSystems: this.identifyAffectedSystems(incident)
    }
  }

  private async remediate(incident: SecurityIncident, investigation: Investigation) {
    // Fix the immediate issue
    await this.applyFixes(incident)

    // Update policies to prevent recurrence
    await this.updatePolicies(investigation.rootCause)

    // Enhance detection
    await this.enhanceDetection(investigation.rootCause)
  }

  private async postMortem(incident: SecurityIncident, investigation: Investigation) {
    const report = {
      incident,
      investigation,
      timeline: investigation.timeline,
      rootCause: investigation.rootCause,
      impact: investigation.impact,
      remediation: investigation.remediation,
      preventionMeasures: this.identifyPreventionMeasures(investigation)
    }

    // Share with team
    await this.publishPostMortem(report)

    // Update training materials
    await this.updateTraining(report)
  }
}
```

## Key Takeaways

1. **Security cannot be an afterthought.** Build security into the swarm development process from day one, not as an add-on.

2. **Five defense layers:** Secure templates, automated scanning, policy enforcement, human review, and audit trails. All five are necessary.

3. **Policy as code.** Codify security and compliance requirements as enforceable rules that block insecure code before commit.

4. **Assume swarms will make mistakes.** Design for detection and recovery, not prevention alone. Incidents will happen—have a response plan.

5. **Compliance frameworks map to swarm policies.** GDPR, SOC 2, PCI DSS, and other requirements can be enforced through automated policy validation.

6. **Human judgment still required.** Some security decisions cannot be automated. Triage high-risk changes for manual security review.

7. **Audit everything.** Complete audit trails are essential for compliance, forensics, and continuous improvement.

In the next part of the book, we'll explore the future of swarm development—advanced techniques, emerging patterns, and what comes next after you've mastered the basics.
