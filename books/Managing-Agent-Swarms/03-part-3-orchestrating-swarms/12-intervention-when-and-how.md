# Chapter 12: Intervention: When and How to Guide

Three weeks into a critical project, David Kim watches his swarm with growing concern. The agents are implementing a payment processing system, but they're heading in the wrong direction. Half the agents are building a synchronous HTTP-based system. The other half are building an asynchronous event-driven system. Neither approach will work for the specific requirements: PCI compliance mandates synchronous confirmation for card transactions, but the system also needs asynchronous processing for refunds and reconciliation.

David faces a choice: intervene now and redirect the swarm, or wait and let them discover the problem themselves?

He's hesitant to intervene. The whole point of swarms is emergence—letting solutions arise from local interactions. If he constantly dictates solutions, why use a swarm at all? But if he doesn't intervene, the swarm might waste weeks building the wrong thing.

This is the intervention dilemma: **Too much intervention destroys swarm benefits; too little intervention wastes resources**.

After consulting with his team, David decides to intervene—but carefully. Instead of dictating architecture, he injects a new constraint:

```yaml
constraint_update:
  payment_processing:
    - "Card authorization must be synchronous (PCI requirement)"
    - "Card capture can be asynchronous (< 7 days)"
    - "Refunds must be asynchronous (batch processed)"
    - "Reconciliation must be asynchronous (nightly)"
```

He doesn't tell the agents how to implement this. He tells them what must be true. Within 48 hours, the swarm converges on a hybrid architecture that satisfies the constraints: synchronous authorization with async capture, refunds, and reconciliation.

David learns an important lesson: **The best interventions constrain outcomes, not methods**.

This chapter explores when to intervene in swarm processes, how to intervene effectively without undermining autonomy, and how to recognize when intervention is counterproductive.

## The Intervention Spectrum

Interventions range from light touch to heavy handed:

### Level 1: Observation Only (No Intervention)

**Action**: Monitor metrics but don't change anything

**When**: Swarm is making healthy progress toward goals

**Signals**:
- Convergence rate is acceptable
- Solution quality is improving
- Coordination is effective
- Resource usage is within budget

**Example**:
```
Week 1: 5 different approaches explored
Week 2: Converging on 2 main approaches
Week 3: One approach emerging as winner
→ No intervention needed; natural convergence happening
```

### Level 2: Information Injection

**Action**: Provide additional information, patterns, or examples

**When**: Swarm lacks knowledge but is otherwise functioning well

**Signals**:
- Agents are trying approaches that violate domain constraints
- Agents are missing established best practices
- Similar problems solved elsewhere could inform current work

**Example**:
```python
# Inject information without dictating solution
inject_pattern({
  'name': 'circuit_breaker',
  'purpose': 'Prevent cascade failures in distributed systems',
  'example': circuit_breaker_example_code,
  'when_to_use': 'For calls to external services that might fail'
})
```

The swarm learns about circuit breakers but decides when/how to use them.

### Level 3: Goal/Constraint Adjustment

**Action**: Modify success criteria, add/remove constraints

**When**: Requirements have changed or initial criteria were insufficient

**Signals**:
- Business requirements changed
- Initial success criteria were ambiguous or incomplete
- Performance targets need adjustment based on real data

**Example**:
```yaml
# Original constraint
performance_target:
  latency_p95: < 200ms

# Adjusted constraint (based on user feedback)
performance_target:
  latency_p95: < 100ms  # Users found 200ms too slow
```

The swarm must now optimize further, but how they do it is up to them.

### Level 4: Pruning

**Action**: Remove clearly failing approaches or agents

**When**: Some approaches are obviously wrong and consuming resources

**Signals**:
- Agent/approach consistently fails tests
- Agent/approach violates hard constraints
- Agent/approach is clearly inferior to alternatives

**Example**:
```python
# Identify failing agents
failing_agents = [
    agent for agent in swarm
    if agent.test_pass_rate < 0.3  # Passing < 30% of tests
    or agent.constraint_violations > 10
]

# Remove them to free resources
for agent in failing_agents:
    swarm.remove(agent)

# Reallocate resources to successful approaches
swarm.redistribute_resources()
```

Pruning failed approaches accelerates convergence.

### Level 5: Seeding/Reinforcement

**Action**: Inject successful agents or patterns from outside

**When**: Swarm is stuck or missing key capabilities

**Signals**:
- Convergence stalled
- All current approaches are suboptimal
- Clear better solution exists elsewhere

**Example**:
```python
# Swarm struggling with caching strategy
# Inject agent seeded with proven caching pattern
new_agent = Agent(
    seed_pattern='redis_caching_best_practices',
    focus='caching_optimization'
)
swarm.add(new_agent)
```

New agent introduces alternative approach the swarm can learn from.

### Level 6: Redirection

**Action**: Explicitly change swarm focus or direction

**When**: Swarm is pursuing wrong goals or wasting time on low-value work

**Signals**:
- Swarm optimizing for wrong objectives
- Swarm focusing on non-critical work
- Major architectural error needs correction

**Example**:
```python
# Swarm over-optimizing low-traffic endpoints
# Redirect focus to high-traffic critical paths
swarm.set_priority({
    'high': ['/api/checkout', '/api/payment'],  # 80% of traffic
    'medium': ['/api/user', '/api/products'],
    'low': ['/api/admin/*']  # 2% of traffic
})
```

Explicit prioritization redirects effort.

### Level 7: Direct Control

**Action**: Manually implement solution or dictate specific approach

**When**: Emergency situation or swarm unable to solve problem

**Signals**:
- Critical production issue
- Swarm exhausted reasonable approaches without success
- Time constraints require immediate solution
- Problem requires human expertise swarm doesn't have

**Example**:
```python
# Critical security vulnerability discovered
# Human implements fix immediately
human_fix = implement_security_patch()
swarm.integrate(human_fix)
swarm.learn_from(human_fix)  # Update swarm knowledge
```

This is the most interventionist approach—use rarely.

## When to Intervene

Knowing when to intervene is as important as knowing how. Here are decision frameworks:

### Framework 1: The Two-Week Rule

**Principle**: Observe for 2 weeks before intervening (unless emergency)

**Rationale**: Emergence takes time. What looks like chaos in week 1 often resolves in week 2. Early intervention can prevent valuable emergent solutions.

**Exception**: Critical issues (security vulnerabilities, production outages, major architectural errors) require immediate intervention.

**Example timeline**:
```
Days 1-3: High diversity, multiple approaches, looks chaotic
Days 4-7: Patterns emerging, some consolidation
Days 8-10: Clear frontrunners, convergence beginning
Days 11-14: Dominant approach solidifying

→ If convergence happening naturally by day 14, don't intervene
→ If still chaotic at day 14, intervention needed
```

### Framework 2: Metric-Based Intervention

**Principle**: Intervene when metrics deviate significantly from targets

**Metrics to watch**:

```python
def should_intervene(metrics, targets, swarm_age_days):
    reasons = []

    # Quality declining
    if metrics.defect_rate > targets.max_defect_rate * 1.5:
        reasons.append('quality_degradation')

    # Convergence stalled
    if swarm_age_days > 10 and metrics.diversity > 0.7:
        reasons.append('no_convergence')

    # Cost explosion
    if metrics.cost_per_feature > targets.cost_per_feature * 2.0:
        reasons.append('cost_overrun')

    # Performance degradation
    if metrics.p95_latency > targets.p95_latency * 1.5:
        reasons.append('performance_issue')

    # Coordination breakdown
    if metrics.merge_conflicts > 20 and metrics.duplicate_work > 0.3:
        reasons.append('coordination_failure')

    return len(reasons) > 0, reasons
```

Automated metrics trigger intervention recommendations.

### Framework 3: Milestone-Based Intervention

**Principle**: Check in at predefined milestones; intervene if off-track

**Milestones**:
- **Week 1**: Architecture should be roughed out
- **Week 2**: Core functionality implemented
- **Week 3**: Integration working end-to-end
- **Week 4**: Quality standards met, ready for staging

**Intervention logic**:
```python
def check_milestone(week, swarm_state):
    if week == 1:
        if not swarm_state.has_architecture():
            intervene('inject_architectural_patterns')

    elif week == 2:
        if swarm_state.features_complete < 0.5:
            intervene('adjust_priorities', focus_on='core_features')

    elif week == 3:
        if not swarm_state.integrated:
            intervene('add_integration_agents')

    elif week == 4:
        if swarm_state.quality_score < 0.85:
            intervene('add_qa_agents', 'tighten_quality_standards')
```

Milestone checks ensure swarm stays on track.

### Framework 4: Comparative Intervention

**Principle**: Intervene when swarm significantly underperforms expectations

**Comparison points**:
- Historical data (similar projects)
- Benchmarks (industry standards)
- Human baselines (what human team would achieve)

**Example**:
```python
def compare_performance(swarm_metrics, baseline):
    # Swarm should be faster than humans
    if swarm_metrics.feature_velocity < baseline.human_velocity * 2:
        return 'intervene: swarm not achieving expected speedup'

    # Swarm should maintain quality
    if swarm_metrics.defect_rate > baseline.human_defect_rate * 1.2:
        return 'intervene: swarm quality below human baseline'

    # Swarm should be cost-effective
    if swarm_metrics.cost > baseline.human_cost * 0.8:
        return 'intervene: swarm not cheaper than humans'

    return 'no_intervention_needed'
```

If swarm isn't outperforming alternatives, investigate and intervene.

## How to Intervene Effectively

The goal is to guide without controlling. Here are techniques:

### Technique 1: Adjust Fitness Function

Change what the swarm optimizes for:

```python
# Original fitness function
def fitness_v1(solution):
    return (
        0.5 * correctness_score(solution) +
        0.5 * performance_score(solution)
    )

# Swarm over-optimizing performance at cost of correctness
# Adjust weights to emphasize correctness
def fitness_v2(solution):
    return (
        0.7 * correctness_score(solution) +  # Increased
        0.3 * performance_score(solution)    # Decreased
    )
```

Weight adjustment steers behavior without dictating solutions.

### Technique 2: Add/Remove Constraints

Make solution space clearer:

```yaml
# Swarm exploring architectures that won't work
# Add constraint to rule out invalid approaches

new_constraint:
  data_residency:
    - "Customer data must remain in origin country"
    - "Cannot use global database; must use regional shards"
```

Constraint eliminates whole classes of invalid solutions.

### Technique 3: Inject Negative Examples

Show what doesn't work:

```typescript
// Anti-pattern: What NOT to do
/**
 * ❌ This approach was tried and failed
 * Problem: Causes race conditions under high load
 * Reason: Not thread-safe
 */
class BadCacheImplementation {
  private cache: Map<string, any> = new Map()

  get(key: string) {
    return this.cache.get(key)
  }

  set(key: string, value: any) {
    // Race condition: Multiple agents might set simultaneously
    if (!this.cache.has(key)) {
      this.cache.set(key, value)
    }
  }
}
```

Negative examples prevent agents from repeating mistakes.

### Technique 4: Seed Specialized Agents

Introduce agents with specific capabilities:

```python
# Swarm struggling with security
# Inject security specialist agent
security_agent = Agent(
    role='security_specialist',
    training='owasp_top_10',
    focus='vulnerability_detection',
    priority='high'
)
swarm.add(security_agent)

# Security agent audits code, suggests fixes, prevents vulnerabilities
```

Specialized agents fill capability gaps.

### Technique 5: Adjust Resource Allocation

Reallocate compute toward promising approaches:

```python
# Identify most promising agents/approaches
top_performers = sorted(swarm.agents, key=lambda a: a.score, reverse=True)[:10]

# Give them more resources
for agent in top_performers:
    agent.allocated_compute *= 1.5

# Reduce resources for low performers
bottom_performers = sorted(swarm.agents, key=lambda a: a.score)[:10]
for agent in bottom_performers:
    agent.allocated_compute *= 0.5
```

Resource allocation amplifies successful approaches.

### Technique 6: Phase Transition

Move swarm to next phase of work:

```python
# Phase 1: Exploration (weeks 1-2)
swarm.set_mode('exploration', exploration_rate=0.7)

# Phase 2: Convergence (weeks 3-4)
swarm.set_mode('convergence', exploration_rate=0.3)

# Phase 3: Optimization (weeks 5-6)
swarm.set_mode('optimization', exploration_rate=0.1)
```

Phase transitions change swarm behavior systematically.

## When NOT to Intervene

Intervention has costs. Avoid intervening when:

### 1. Natural Convergence Is Happening

If metrics show healthy convergence, intervention is premature:

```python
def is_naturally_converging(metrics_history):
    # Diversity decreasing over time
    diversity_trend = linear_regression([m.diversity for m in metrics_history])
    if diversity_trend.slope < -0.05:  # Declining
        return True

    # Quality improving over time
    quality_trend = linear_regression([m.quality_score for m in metrics_history])
    if quality_trend.slope > 0.02:  # Improving
        return True

    return False

# Don't intervene if natural convergence occurring
if is_naturally_converging(metrics_history):
    print("Swarm converging naturally - no intervention needed")
```

Let emergence happen.

### 2. Problem Is in Exploration Phase

Early exploration looks chaotic—that's normal:

```python
def is_still_exploring(swarm_age_days, diversity):
    # First week: high diversity is expected
    if swarm_age_days < 7 and diversity > 0.6:
        return True

    # Second week: moderate diversity is healthy
    if swarm_age_days < 14 and diversity > 0.4:
        return True

    return False

# Don't intervene during healthy exploration
if is_still_exploring(swarm_age_days, current_diversity):
    print("Swarm in exploration phase - allow continued exploration")
```

Give swarm time to explore.

### 3. Intervention Would Be Premature Optimization

Don't optimize until you understand the problem:

```python
# Bad: Intervening too early
if swarm_age_days < 5:
    # Don't impose performance constraints yet
    # Swarm still understanding functional requirements
    pass

# Good: Let swarm establish correctness first, then optimize
if swarm_age_days > 14 and correctness_established:
    # Now add performance constraints
    add_performance_requirements()
```

Correctness before performance.

### 4. The "Problem" Is Actually Valuable Exploration

What looks like wasted effort might be valuable learning:

**Example**: Swarm tries 15 different caching strategies. Seems wasteful. But:
- 12 strategies fail quickly (eliminate bad approaches)
- 3 strategies work (competitive selection finds best)
- Final solution combines insights from all 3

The "wasted" exploration informed the final solution.

### 5. Intervention Would Override Emerging Superior Solution

Sometimes the swarm discovers better approaches than you expected:

**Story**: Architect planned relational database schema. Swarm explored graph database instead. Initial reaction: intervene, enforce relational schema. But swarm's graph approach turned out superior for the specific use case (highly connected social data).

If swarm is exploring something unexpected but promising, let it continue.

## Intervention Patterns

Common intervention patterns and when to use them:

### Pattern 1: The Gentle Nudge

**When**: Minor course correction needed
**How**: Inject information or adjust fitness weights slightly
**Example**: Swarm focusing too much on features, not enough on tests. Increase testing weight in fitness function from 0.15 to 0.25.

### Pattern 2: The Hard Reset

**When**: Swarm completely off track
**How**: Stop, clarify requirements, restart with better initialization
**Example**: Swarm building wrong feature entirely. Stop, clarify requirements, restart with correct goal.

### Pattern 3: The Specialist Injection

**When**: Swarm lacking specific capability
**How**: Add specialized agent(s) with needed expertise
**Example**: Security vulnerabilities accumulating. Add security specialist agent.

### Pattern 4: The Constraint Tightening

**When**: Swarm producing correct but low-quality solutions
**How**: Add or tighten quality constraints
**Example**: Code complexity rising. Add constraint: max_complexity < 10.

### Pattern 5: The Timeout Extension

**When**: Swarm making progress but needs more time
**How**: Extend deadline, don't change anything else
**Example**: Swarm converging on good solution but timeline was too aggressive. Extend by 1 week.

### Pattern 6: The Competitive Pressure

**When**: Swarm complacent with mediocre solution
**How**: Introduce competing approach or raise standards
**Example**: Swarm satisfied with "good enough" performance. Introduce agent with aggressive optimization strategy to create competition.

## Measuring Intervention Effectiveness

How do you know if intervention helped?

**Before-After Comparison**:
```python
def evaluate_intervention(before_metrics, after_metrics, intervention_type):
    # Did convergence accelerate?
    convergence_improvement = (
        before_metrics.convergence_rate - after_metrics.convergence_rate
    )

    # Did quality improve?
    quality_improvement = (
        after_metrics.quality_score - before_metrics.quality_score
    )

    # Did cost decrease?
    cost_improvement = (
        before_metrics.cost_per_feature - after_metrics.cost_per_feature
    )

    if convergence_improvement > 0 or quality_improvement > 0:
        return f"Intervention '{intervention_type}' was effective"
    else:
        return f"Intervention '{intervention_type}' did not help (consider reverting)"
```

Track metrics before and after to assess impact.

**Counterfactual Analysis**:

Run parallel swarms: one with intervention, one without:

```python
# Split swarm into two groups
swarm_a = half_swarm()  # Control (no intervention)
swarm_b = half_swarm()  # Treatment (with intervention)

apply_intervention(swarm_b, intervention)

# Compare outcomes after 1 week
if swarm_b.quality_score > swarm_a.quality_score:
    print("Intervention was beneficial")
else:
    print("Intervention was not beneficial")
```

This provides causal evidence of intervention effectiveness.

## Key Takeaways

**Intervention is necessary but should be minimal**. Too much destroys emergence; too little wastes resources.

**Seven intervention levels**: Observation, information injection, goal/constraint adjustment, pruning, seeding, redirection, direct control. Use lightest touch possible.

**Four intervention frameworks**: Two-week rule (wait before intervening), metric-based (intervene when off-target), milestone-based (check predefined points), comparative (intervene if underperforming).

**Effective intervention techniques**: Adjust fitness function, add/remove constraints, inject negative examples, seed specialists, reallocate resources, trigger phase transitions.

**Know when NOT to intervene**: Natural convergence happening, still in exploration phase, would be premature optimization, "problem" is valuable exploration, would override superior emerging solution.

**Common patterns**: Gentle nudge, hard reset, specialist injection, constraint tightening, timeout extension, competitive pressure.

**Measure effectiveness**: Before-after comparison, counterfactual analysis with parallel swarms.

The art of swarm orchestration is knowing when to guide and when to get out of the way. Intervention should enable emergence, not replace it.

In the next chapter, we'll explore termination conditions—how to know when the swarm is done and when to stop.

---

*Continue to Chapter 13: Termination Conditions and Convergence*
