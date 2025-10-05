# Chapter 10: Defining Success Criteria for Swarms

Carlos Martinez watches his swarm with growing frustration. Three weeks into a project, the agents are still exploring different architectural approaches. No clear winner has emerged. The codebase contains fragments of four different designs, none of them complete.

Carlos realizes his mistake: **He never clearly defined what success looks like**.

He told the swarm to "build a scalable authentication system," but what does that mean? How scalable? What features are required vs. nice-to-have? What trade-offs are acceptable? Without clear success criteria, the swarm explores aimlessly, trying to optimize for everything simultaneously—which means optimizing for nothing.

Carlos hits pause and takes a step back. He writes down explicit success criteria:

```yaml
success_criteria:
  required_features:
    - Email/password authentication
    - OAuth2 (Google, GitHub)
    - JWT tokens with refresh
    - Rate limiting (5 attempts/min/IP)
    - Password strength enforcement

  performance_targets:
    - Login: p95 < 200ms
    - Token refresh: p95 < 50ms
    - Throughput: > 1,000 login/sec

  security_requirements:
    - Pass OWASP Top 10 scans
    - Bcrypt with 12 rounds minimum
    - No credentials in logs
    - Automatic account lockout after 10 failed attempts

  quality_standards:
    - Test coverage > 85%
    - All public APIs documented
    - Zero critical vulnerabilities

  constraints:
    - Must use PostgreSQL (existing)
    - Must integrate with existing user service
    - Budget: < $500/month for auth infrastructure
```

He restarts the swarm with these criteria. Within days, the agents converge on a design that meets all requirements. The difference: **They know what they're optimizing for**.

This chapter explores the art and science of defining success criteria for swarms: how to translate vague requirements into measurable goals, how to balance competing objectives, and how to evolve criteria as understanding deepens.

## Why Success Criteria Matter

In traditional development, humans bridge the gap between vague requirements and concrete implementation through judgment, experience, and iteration. We naturally understand implicit context: "scalable" means "handles expected growth," "fast" means "imperceptibly responsive to users," "maintainable" means "I can hand this off without causing pain."

AI swarms don't have this implicit understanding. They need explicit guidance. Success criteria serve three critical functions:

**1. Direction**: What should agents optimize for?
**2. Convergence**: When can agents stop exploring alternatives?
**3. Selection**: Which solutions are better than others?

Without clear criteria, swarms exhibit pathological behaviors:

**Endless exploration**: Trying every possible approach because no approach is clearly "good enough"

**Premature convergence**: Settling on the first working solution because there's no definition of "better"

**Conflicting optimization**: Half the swarm optimizing for speed, half for simplicity, producing incompatible code

**Scope creep**: Implementing features beyond what's needed because "better" keeps expanding

Clear success criteria prevent these problems. But defining them well is surprisingly difficult.

## The Components of Success Criteria

Success criteria have several elements:

### 1. Required Features (Scope)

What must the solution do? This is the "definition of done."

**Good feature requirements**:
```yaml
required_features:
  - User registration with email verification
  - Login with email/password
  - Password reset via email
  - OAuth2 (Google, GitHub)
  - Two-factor authentication (optional for users, required for admins)
  - Session management with 24-hour expiry
  - Account lockout after 10 failed login attempts
```

**Bad feature requirements**:
```yaml
required_features:
  - Modern authentication system
  - Support for various login methods
  - Security features
  - Good user experience
```

The difference: specificity. Good requirements are concrete, testable, and unambiguous.

### 2. Performance Targets

How fast, efficient, or scalable must the solution be?

**Good performance targets**:
```yaml
performance_targets:
  latency:
    login: { p50: 100ms, p95: 200ms, p99: 500ms }
    token_refresh: { p50: 20ms, p95: 50ms, p99: 100ms }
    oauth_callback: { p50: 800ms, p95: 1500ms, p99: 3000ms }

  throughput:
    sustained: 1,000 requests/sec
    peak: 5,000 requests/sec

  resource_limits:
    memory: < 512MB per instance
    cpu: < 0.5 cores per instance at sustained load
    database: < 100 connections

  scalability:
    horizontal: Support 10+ instances behind load balancer
    geographic: Deploy in 3+ regions with < 50ms cross-region latency
```

**Bad performance targets**:
```yaml
performance_targets:
  - Fast response times
  - Can handle lots of users
  - Doesn't use too much resources
  - Scales well
```

Good targets are measurable, specific, and include both central tendency (p50) and tail behavior (p95, p99).

### 3. Quality Standards

What level of code quality, test coverage, documentation, and maintainability is required?

**Good quality standards**:
```yaml
quality_standards:
  testing:
    unit_test_coverage: > 85%
    integration_test_coverage: > 70%
    all_edge_cases_tested: true
    security_tests: comprehensive (SQL injection, XSS, CSRF, timing attacks)

  code_quality:
    max_function_complexity: 10 (cyclomatic)
    max_function_length: 50 lines
    duplication: < 3% (by line count)
    linter_warnings: 0
    type_coverage: 100% (TypeScript)

  documentation:
    all_public_apis: JSDoc with examples
    architecture: ADR (Architecture Decision Records) for major decisions
    setup_guide: Complete README with quick start
    security_considerations: Document all security assumptions and requirements

  maintainability:
    maintainability_index: > 70
    dependency_count: < 20 (direct dependencies)
    security_vulnerabilities: 0 (critical or high severity)
```

**Bad quality standards**:
```yaml
quality_standards:
  - Good test coverage
  - Clean code
  - Well-documented
  - Easy to maintain
```

Good standards are measurable through automated tooling.

### 4. Security Requirements

What security properties must the solution guarantee?

**Good security requirements**:
```yaml
security_requirements:
  authentication:
    password_hashing: bcrypt with cost factor >= 12
    token_algorithm: RS256 (asymmetric signing)
    token_expiry: access tokens 15min, refresh tokens 7 days
    token_storage: httpOnly, secure, sameSite cookies for web

  authorization:
    principle: Least privilege (explicit grant required)
    session_management: Automatic invalidation on suspicious activity
    rate_limiting: 5 login attempts per minute per IP

  data_protection:
    credentials_in_logs: Never (must be redacted)
    pii_handling: Minimal collection, encrypt at rest
    compliance: GDPR-compliant (data deletion, export)

  attack_prevention:
    sql_injection: Use parameterized queries exclusively
    xss: Sanitize all user inputs
    csrf: CSRF tokens on all state-changing operations
    timing_attacks: Constant-time password comparison
```

**Bad security requirements**:
```yaml
security_requirements:
  - Secure password storage
  - Protected against common attacks
  - Meets industry standards
```

Good security requirements are specific about threats and mitigations.

### 5. Constraints

What limitations must the solution operate within?

**Good constraints**:
```yaml
constraints:
  technology:
    database: Must use PostgreSQL 14+ (existing infrastructure)
    runtime: Node.js 18+ (team expertise)
    deployment: Kubernetes on AWS (existing platform)
    no_new_languages: Stick to TypeScript/JavaScript

  compatibility:
    existing_api: Must not break existing /auth endpoints
    legacy_sessions: Support migration from old session format
    backward_compatibility: 6-month deprecation period for breaking changes

  budget:
    infrastructure: < $500/month
    third_party_services: < $200/month
    total_cost: < $700/month

  timeline:
    mvp: 2 weeks (email/password + OAuth)
    full_features: 4 weeks (2FA, advanced security)
    hardening: 6 weeks (security audit, performance tuning)

  team:
    code_review: All code must be reviewed by at least one human
    deployment: Staged rollout (dev → staging → canary → production)
```

**Bad constraints**:
```yaml
constraints:
  - Use our existing tech stack
  - Don't spend too much
  - Deliver reasonably fast
  - Follow best practices
```

Good constraints are specific about what's fixed vs. what's flexible.

## Multi-Objective Optimization

Real problems have competing objectives. Authentication needs to be secure (complex passwords, 2FA) and usable (simple login flow). The system needs to be performant (caching, denormalization) and maintainable (normalized data, clear abstraction).

You can't optimize all objectives simultaneously. You need to define trade-offs explicitly.

### Weighted Objectives

Assign weights to objectives to express priorities:

```yaml
objectives:
  security:
    weight: 0.35
    metrics:
      - owasp_compliance: must_pass
      - known_vulnerabilities: 0
      - password_strength: strong

  usability:
    weight: 0.25
    metrics:
      - login_success_rate: > 95%
      - time_to_first_login: < 2 minutes
      - password_reset_success_rate: > 90%

  performance:
    weight: 0.20
    metrics:
      - p95_latency: < 200ms
      - throughput: > 1,000 rps

  maintainability:
    weight: 0.15
    metrics:
      - code_complexity: < 10
      - test_coverage: > 85%
      - documentation_completeness: > 90%

  cost:
    weight: 0.05
    metrics:
      - monthly_infra_cost: < $500
      - third_party_services: < $200
```

The swarm optimizes a weighted sum:
```python
overall_score = (
  0.35 * security_score +
  0.25 * usability_score +
  0.20 * performance_score +
  0.15 * maintainability_score +
  0.05 * cost_score
)
```

Weights communicate priorities. In this example, security matters most (0.35), cost matters least (0.05).

### Pareto Frontiers

Some trade-offs are fundamental: you can't maximize both. For example:
- Security vs. Usability (more security checks = more friction)
- Performance vs. Maintainability (optimization often obscures logic)
- Features vs. Quality (more features = more complexity)

Instead of forcing a single optimal point, let the swarm find the **Pareto frontier**: solutions where improving one objective requires worsening another.

**Example**: Authentication speed vs. security

```
High Security, Low Speed:
- Bcrypt cost 15, 2FA required, CAPTCHA on all logins
- p95 latency: 800ms, security score: 98/100

Medium Security, Medium Speed:
- Bcrypt cost 12, 2FA optional, CAPTCHA after failed attempts
- p95 latency: 200ms, security score: 92/100

Low Security, High Speed:
- Bcrypt cost 10, no 2FA, no CAPTCHA
- p95 latency: 80ms, security score: 78/100
```

The swarm can explore all three and present options. You (or explicit criteria) choose based on context. For internal admin tools, high security. For consumer applications, medium balance. For read-only public data, maybe low security is acceptable.

### Constraints vs. Objectives

Distinguish hard constraints (must be satisfied) from soft objectives (should be optimized):

**Constraints** (must-have):
- All security scans must pass
- Cannot break existing API contracts
- Must deploy on existing infrastructure
- Budget must not exceed $700/month

**Objectives** (optimize):
- Maximize performance
- Minimize complexity
- Maximize test coverage
- Minimize cost (within budget constraint)

Solutions violating constraints are invalid (fitness = 0). Among valid solutions, optimize objectives.

```python
def fitness(solution):
  # Check constraints first
  if not passes_security_scans(solution):
    return 0.0
  if breaks_api_contract(solution):
    return 0.0
  if monthly_cost(solution) > 700:
    return 0.0

  # Optimize objectives
  performance_score = evaluate_performance(solution)
  complexity_score = evaluate_complexity(solution)
  coverage_score = evaluate_coverage(solution)
  cost_score = 1.0 - (monthly_cost(solution) / 700.0)

  return (
    0.4 * performance_score +
    0.3 * complexity_score +
    0.2 * coverage_score +
    0.1 * cost_score
  )
```

## Evolving Criteria Over Time

Success criteria aren't static. As understanding deepens, criteria should evolve.

### Phase 1: MVP (Minimum Viable Product)

Early on, prioritize learning over perfection:

```yaml
mvp_criteria:
  required_features:
    - Email/password login only
    - Basic session management
    - Minimal security (password hashing)

  performance_targets:
    - p95 < 1000ms (generous, just needs to work)

  quality_standards:
    - Basic tests (> 60% coverage)
    - No critical security issues

  constraints:
    - 2-week timeline
    - One developer
```

Goal: Validate that the approach works.

### Phase 2: Production-Ready

Once validated, tighten criteria:

```yaml
production_criteria:
  required_features:
    - Email/password + OAuth2
    - Proper session management
    - Password reset flow
    - Rate limiting
    - Account lockout

  performance_targets:
    - p95 < 200ms
    - Support 1,000 concurrent users

  quality_standards:
    - Test coverage > 85%
    - Zero critical or high vulnerabilities
    - Documentation complete

  constraints:
    - 4-week timeline
    - Must not disrupt existing users
```

Goal: Meet production quality standards.

### Phase 3: Scale and Optimize

After launch, optimize based on real usage:

```yaml
optimization_criteria:
  performance_targets:
    - p95 < 100ms (tighter)
    - Support 10,000 concurrent users
    - < 50ms cross-region latency

  quality_standards:
    - Test coverage > 95%
    - Maintainability index > 85

  new_features:
    - Biometric authentication
    - Hardware security keys
    - Advanced fraud detection

  constraints:
    - Zero downtime deployment
    - Gradual rollout (canary, blue-green)
```

Goal: Excellence at scale.

Criteria evolve as the product matures. Don't optimize prematurely; start with good enough and tighten as needed.

## Common Pitfalls

### Pitfall 1: Vague Criteria

**Bad**: "Build a fast, secure authentication system"

**Good**: "p95 latency < 200ms, passes OWASP Top 10, supports 1,000 rps"

Vagueness leads to misalignment and endless exploration.

### Pitfall 2: Conflicting Criteria

**Conflict**: "Maximize features AND minimize complexity"

Adding features inherently increases complexity. You can't maximize both.

**Resolution**: "Implement features A, B, C while keeping complexity < threshold T"

Be explicit about trade-offs.

### Pitfall 3: Unmeasurable Criteria

**Bad**: "Code should be clean and maintainable"

How do you measure "clean"? When is it clean enough?

**Good**: "Cyclomatic complexity < 10, duplication < 3%, maintainability index > 70"

Use metrics that can be automated.

### Pitfall 4: Over-Specification

**Too specific**: "Use bcrypt with exactly cost factor 12, rotate tokens every 14.5 minutes, lock accounts after exactly 7 failed attempts from the same IP within a 5-minute window"

This eliminates all flexibility. The swarm can't explore better approaches.

**Better balance**: "Use industry-standard password hashing (e.g., bcrypt, scrypt, argon2) with appropriate cost. Implement rate limiting and account lockout with thresholds that balance security and usability (test with real attack scenarios)."

Specify outcomes, not implementation details.

### Pitfall 5: Ignoring Context

Success criteria should reflect the specific context:

**Consumer SaaS**: Prioritize usability and performance over absolute security
**Enterprise B2B**: Prioritize compliance, auditability, enterprise SSO
**Internal tools**: Prioritize cost efficiency and rapid iteration
**Critical infrastructure**: Prioritize reliability and security above all

One-size-fits-all criteria miss context-specific trade-offs.

## Templates for Common Scenarios

Here are starting templates for common scenarios. Adapt to your specific needs.

### Template: Web API Service

```yaml
name: API Service Success Criteria
version: 1.0

required_features:
  - REST API with endpoints: [list specific endpoints]
  - Authentication: [specify method]
  - Input validation: [specify requirements]
  - Error handling: [specify error response format]
  - Logging: [specify what to log]

performance_targets:
  latency: { p50: Xms, p95: Yms, p99: Zms }
  throughput: N requests/sec
  resource_limits: { memory: Xmb, cpu: Y cores }

quality_standards:
  test_coverage: > X%
  documentation: OpenAPI spec + examples
  linter_warnings: 0

security_requirements:
  - Input sanitization
  - Authentication on protected endpoints
  - Rate limiting
  - HTTPS only

constraints:
  runtime: [specify language/framework]
  database: [if applicable]
  deployment: [platform]
  budget: $X/month
```

### Template: Data Processing Pipeline

```yaml
name: Pipeline Success Criteria
version: 1.0

required_features:
  - Ingest from sources: [list sources]
  - Transform: [specify transformations]
  - Validate: [specify validation rules]
  - Load to destinations: [list destinations]
  - Error handling: Dead letter queue + alerts

performance_targets:
  throughput: N records/sec
  latency: < X seconds end-to-end
  resource_efficiency: Cost per million records < $Y

quality_standards:
  data_quality: > 99.9% records processed successfully
  monitoring: Alerts for failures, latency, data quality
  testing: Unit tests + integration tests

reliability_requirements:
  uptime: 99.9%
  data_loss: None (idempotent processing)
  recovery: Automatic retry with exponential backoff

constraints:
  data_sources: [specific sources]
  data_formats: [formats to support]
  compliance: [e.g., GDPR, HIPAA]
  budget: $X/month
```

### Template: ML Model Service

```yaml
name: ML Model Service Success Criteria
version: 1.0

required_features:
  - Model inference API
  - Batch prediction support
  - Model versioning
  - A/B testing capability
  - Monitoring and observability

performance_targets:
  latency: { p50: Xms, p95: Yms }
  throughput: N predictions/sec
  model_accuracy: > X% on validation set

quality_standards:
  test_coverage: > 80% (application code)
  model_tests: Accuracy, fairness, robustness tests
  documentation: Model card + API docs

ml_requirements:
  model_accuracy: [metrics and thresholds]
  fairness: [bias metrics and thresholds]
  explainability: [if required, specify method]
  data_quality: [input validation requirements]

constraints:
  model_framework: [e.g., TensorFlow, PyTorch]
  deployment: [platform]
  latency_budget: Critical (affects user experience)
  cost_per_prediction: < $X
```

## Key Takeaways

**Success criteria are the foundation of swarm orchestration**. They define direction, enable convergence, and guide selection.

**Good criteria have five components**: Required features (scope), performance targets (speed, scale), quality standards (code, tests, docs), security requirements (threats, mitigations), and constraints (limits, compatibility).

**Multi-objective optimization requires explicit trade-offs**. Use weighted objectives to communicate priorities. Consider Pareto frontiers when objectives conflict fundamentally.

**Distinguish constraints from objectives**. Constraints must be satisfied (hard requirements). Objectives should be optimized (soft goals).

**Criteria should evolve**. Start with MVP criteria (loose, focused on learning). Tighten for production (stricter quality, performance). Optimize at scale (excellence, advanced features).

**Avoid common pitfalls**: Vague criteria, conflicting objectives, unmeasurable goals, over-specification, and ignoring context.

**Specificity enables autonomy**. The more precise your success criteria, the more freedom the swarm has to explore solutions.

Defining success criteria is as much art as science. It requires understanding the problem deeply, anticipating trade-offs, and communicating priorities clearly. Get this right, and the swarm will produce excellent results. Get it wrong, and the swarm will flounder.

In the next chapter, we'll explore initialization and seeding strategies—how to give swarms the right starting point to achieve those success criteria efficiently.

---

*Continue to Chapter 11: Initialization and Seeding Strategies*
