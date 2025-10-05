# Chapter 3: The Business-as-Code Architecture

*"The structure of a system shapes the behavior of the system."*
— Donella Meadows, Systems Thinker

In 1996, Jeff Bezos wrote a memo that would define Amazon's culture for decades. It contained a deceptively simple directive: "All teams will henceforth expose their data and functionality through service interfaces."

This wasn't about technology—it was about architecture. By forcing teams to build their software as APIs from day one, Bezos ensured Amazon could evolve from an online bookstore to a global technology platform. The architectural decision enabled the strategic outcome.

Twenty-nine years later, we face a similar inflection point. How we architect our businesses—not just our software, but our entire operations—will determine whether we thrive or struggle in the age of autonomous AI.

This chapter presents the complete Business-as-Code architecture: the primitives, patterns, and practices that let you encode business logic that AI agents can execute reliably. Master this architecture, and you unlock the ability to build businesses that ideate, build, launch, and operate autonomously.

---

## The Architecture in Three Layers

As we introduced in Chapter 1, Business-as-Code consists of three layers:

1. **Semantic Foundation** - The ontologies that give agents business context
2. **Business Logic** - The executable definitions of processes, workflows, and rules
3. **Autonomous Execution** - The runtime that interprets logic and coordinates agents

Let's explore each in comprehensive detail.

---

## Layer 1: The Semantic Foundation

Before AI agents can execute business logic, they need to **understand** business contexts. This requires standardized ontologies—shared vocabularies and taxonomies that let agents interpret what businesses do, how they operate, and what outcomes matter.

Think of this like the difference between assembly language and Python. Assembly requires you to specify exact CPU instructions. Python lets you express intentions at a higher level because the language has rich semantics built in. Similarly, Business-as-Code needs semantic richness so agents understand business intentions, not just syntactic commands.

### The graphdl Hierarchy

The **graphdl** package (Graph Definition Language) provides the semantic foundation through four integrated ontologies:

**1. do.industries - NAICS Industry Classifications**

The North American Industry Classification System (NAICS) provides 723 hierarchical industry categories.

**Why This Matters:**
Different industries have different practices, regulations, and norms. An AI agent managing a healthcare business needs to understand HIPAA compliance. An agent managing a financial services business needs to understand SEC reporting requirements. An agent managing a restaurant needs to understand health department regulations.

**Structure:**
```yaml
# NAICS Hierarchy Example
Sector: 51 - Information
  Subsector: 511 - Publishing Industries
    Industry Group: 5112 - Software Publishers
      Industry: 511210 - Software Publishers
        Description: "Companies primarily engaged in computer software
                     publishing or publishing and reproduction"
        Typical Activities:
          - Design, develop, and publish software
          - Provide support and updates
          - License software to end users
```

**Usage in Business-as-Code:**
```yaml
business:
  industry: "NAICS 511210"  # Software Publishers

  # Agent automatically inherits industry context:
  # - Licensing models common in software
  # - Subscription revenue recognition rules
  # - Intellectual property considerations
  # - Distribution channel norms
```

**2. O*NET Occupational Database - 1,016 Occupations**

O*NET (Occupational Information Network) maintained by the U.S. Department of Labor provides detailed profiles for 1,016 occupations.

**What Each Occupation Includes:**
- **Tasks:** Specific work activities (42 tasks for Software Developers)
- **Skills:** Developed capacities (e.g., Critical Thinking, Programming)
- **Knowledge:** Subject matter expertise (e.g., Computer Science, Mathematics)
- **Abilities:** Enduring attributes (e.g., Deductive Reasoning, Information Ordering)
- **Technologies:** Tools commonly used (e.g., Git, Docker, Python)
- **Work Activities:** Generalized work behaviors
- **Work Context:** Physical and social environment
- **Interests:** Career interests alignment (Holland Codes)

**Example: Software Developers (15-1252.00)**
```yaml
occupation:
  code: "15-1252.00"
  title: "Software Developers"

  tasks:
    - "Analyze user needs and develop software solutions"
    - "Design and write computer programs to store, locate, retrieve data"
    - "Develop and direct software system testing procedures"
    - "Consult with customers about software system design and maintenance"
    # ... 38 more tasks

  skills:
    - name: "Programming"
      level: 4.25 / 5.00
    - name: "Critical Thinking"
      level: 4.00 / 5.00
    - name: "Complex Problem Solving"
      level: 4.00 / 5.00
    # ... more skills

  technologies:
    - "Git version control software"
    - "Docker containerization"
    - "Python programming language"
    - "React JavaScript library"
    # ... more technologies
```

**Usage in Business-as-Code:**
```yaml
agent: senior_developer
  occupation: "ONET 15-1252.00"
  # Agent automatically knows:
  # - What tasks software developers perform
  # - What skills are required
  # - What tools they typically use
  # - How to evaluate work quality

  responsibilities:
    - "architecture_design"
    - "code_review"
    - "performance_optimization"
```

When you assign an occupation to an agent, it inherits that occupation's entire profile—tasks it can perform, skills it possesses, tools it can use, and context about how that role operates.

**3. schema.org.ai - Semantic Vocabulary (800+ Types)**

Schema.org is a collaborative vocabulary created by Google, Microsoft, Yahoo, and Yandex to describe structured data on the web. It provides semantic types for describing entities and their relationships.

**Core Types Relevant to Business:**
```
Thing
├── Action (actions that can be performed)
├── CreativeWork (articles, code, videos, etc.)
├── Event (meetings, launches, deadlines)
├── Intangible
│   ├── Service (offerings)
│   ├── Brand (brand identities)
│   └── Audience (customer segments)
├── Organization (companies, departments, teams)
├── Person (employees, customers, partners)
├── Place (locations, facilities)
└── Product (goods being sold)
```

**Properties and Relationships:**
- **Person:** name, email, jobTitle, worksFor, knows, memberOf
- **Organization:** name, foundingDate, numberOfEmployees, owns, sponsors
- **Product:** name, price, manufacturer, offers, reviews
- **Service:** serviceType, provider, areaServed, termsOfService

**Example Usage:**
```yaml
entities:
  - type: "schema:Organization"
    id: "org:acme-corp"
    properties:
      name: "Acme Corporation"
      foundingDate: "2024-01-15"
      industry: "NAICS 511210"
      numberOfEmployees: 47

  - type: "schema:Person"
    id: "person:jane-doe"
    properties:
      name: "Jane Doe"
      email: "jane@acme.example"
      jobTitle: "ONET 11-3051.00"  # Product Manager
      worksFor: "org:acme-corp"
      memberOf: "team:product"

  - type: "schema:Product"
    id: "product:premium-saas"
    properties:
      name: "Premium SaaS Platform"
      price: "$99/month"
      manufacturer: "org:acme-corp"
      category: "productivity-software"
```

AI agents can now reason semantically: "Jane Doe is a Product Manager at Acme Corporation, which makes Premium SaaS Platform. She can make decisions about product features because that's within a Product Manager's authority."

**4. gs1.org.ai - GS1 EPCIS (The 5W1H Framework)**

GS1 is the global organization that manages standards for supply chains and commerce (they created the barcode). Their Electronic Product Code Information Services (EPCIS) standard provides a framework for describing business events.

**The 5W1H Model:**
```
WHO     - What business roles/agents performed the action
WHAT    - Which objects/entities were affected
WHEN    - Temporal context (timestamp, duration, deadline)
WHERE   - Location, facility, or spatial context
WHY     - Business intent, reason, or outcome goal
HOW     - Method, mechanism, or process used
```

**Example: Order Fulfillment Event**
```yaml
event:
  type: "epcis:BusinessTransaction"

  WHO:
    - agent: "agent:fulfillment-bot"
      role: "ONET 43-5061.00"  # Production, Planning, Expediting Clerks

  WHAT:
    - object: "order:12345"
      type: "schema:Order"
    - object: "product:SKU-7890"
      type: "schema:Product"
      quantity: 2

  WHEN:
    timestamp: "2025-10-05T14:30:00Z"
    duration: "PT15M"  # 15 minutes

  WHERE:
    location: "facility:warehouse-3"
    coordinates:
      lat: 37.7749
      lon: -122.4194

  WHY:
    businessIntent: "fulfill_customer_order"
    outcome: "customer_satisfaction"
    kpi: "order_to_ship_time"

  HOW:
    method: "automated_picking"
    api: "logistics-api"
    workflow: "standard_fulfillment"
```

This structure lets agents (and humans) query business events semantically:
- "Show me all orders fulfilled by agent:fulfillment-bot in the last week"
- "What's the average order-to-ship time at facility:warehouse-3?"
- "Which business events contributed to missing our Q3 revenue goal?"

**Why EPCIS Matters:**
Business events are the atomic units of what happens in a business. Orders placed, inventory moved, customers contacted, features deployed, bugs fixed—all events. Having a standardized way to describe these events means:
- Agents can log their actions consistently
- Humans can query and understand what agents did
- Systems can analyze patterns and optimize
- Compliance and audit become straightforward

### Integration: How the Four Ontologies Work Together

These ontologies aren't separate—they integrate to provide rich semantic context:

**Example: An agent processing a customer refund**

```yaml
event:
  type: "epcis:BusinessTransaction"

  WHO:
    - agent: "agent:support-bot"
      occupation: "ONET 43-4051.00"  # Customer Service Representatives
      organization: "org:acme-corp"  # Schema.org Organization

  WHAT:
    - object: "refund:REF-456"
      type: "schema:Invoice"
      amount: "$149.00"
    - customer: "person:john-smith"
      type: "schema:Person"

  WHEN:
    timestamp: "2025-10-05T16:45:00Z"

  WHERE:
    location: "virtual"  # Online interaction
    channel: "chat"

  WHY:
    businessIntent: "resolve_customer_complaint"
    reason: "product_defect"
    outcome: "customer_retention"

  HOW:
    method: "automated_refund_processing"
    api: "stripe-refunds"
    compliance: "industry:NAICS-511210 → software return policy"
    authority: "occupation:ONET-43-4051 → refund_limit:$500"
```

Notice how all four ontologies contribute:
- **O*NET:** Defines what tasks a Customer Service Rep can perform and their authority limits
- **Schema.org:** Provides types for Person, Organization, Invoice
- **NAICS:** Determines industry-specific policies (software returns)
- **EPCIS:** Structures the event so it's queryable and auditable

This is the semantic richness that lets agents **understand** business contexts, not just execute syntactic commands.

---

## Layer 2: The Business Logic Layer

With semantic understanding in place, we need executable business logic. This layer defines **what the business does** in a form that AI agents can interpret and execute.

### The Five Primitives

Business-as-Code uses five core primitives to express business logic:

**1. Agents - Autonomous Entities with Roles**

Agents are the actors in your business. They have:
- **Occupation:** O*NET code defining capabilities
- **Responsibilities:** Specific business functions they handle
- **Authority:** Decision-making limits and constraints
- **Tools:** APIs and services they can access
- **Goals:** Metrics they optimize for

```yaml
agent: customer_success_manager
  occupation: "ONET 13-1151.00"  # Training and Development Specialists
  organization: "org:acme-corp"

  responsibilities:
    - "onboard_new_customers"
    - "drive_product_adoption"
    - "prevent_churn"
    - "identify_upsell_opportunities"

  authority:
    discount_limit: "$1000 annually per customer"
    can_extend_trial: true
    max_trial_extension: "30 days"

  tools:
    - crm: "hubspot-api"
    - email: "sendgrid-api"
    - analytics: "amplitude-api"
    - scheduling: "calendly-api"

  goals:
    primary: "maximize_customer_ltv"
    metrics:
      - "product_adoption_score"
      - "usage_frequency"
      - "renewal_rate"
```

**2. Workflows - Sequential or Parallel Processes**

Workflows define sequences of steps, possibly with branches and loops.

```yaml
workflow: customer_onboarding
  trigger: "event:customer_signed_up"

  inputs:
    - customer_id: string
    - plan_type: enum["trial", "starter", "professional"]

  steps:
    - name: "send_welcome_email"
      agent: "email_automation"
      action: "send_template"
      params:
        template: "welcome_email"
        to: "${customer.email}"

    - name: "provision_account"
      agent: "infrastructure_manager"
      action: "create_tenant"
      params:
        customer_id: "${customer_id}"
        plan: "${plan_type}"

    - name: "schedule_onboarding_call"
      agent: "customer_success_manager"
      action: "book_meeting"
      params:
        customer_id: "${customer_id}"
        meeting_type: "onboarding"
        duration: "30_minutes"
      condition: "plan_type IN ['professional', 'enterprise']"

    - name: "setup_trial_expiry_reminder"
      agent: "lifecycle_automation"
      action: "schedule_email"
      params:
        send_date: "NOW() + 14 days"
        template: "trial_ending_soon"
      condition: "plan_type == 'trial'"

  outputs:
    - customer_status: "onboarded"
    - onboarding_completion_time: timestamp
```

**3. Functions - Reusable Business Logic**

Functions encapsulate logic that's used in multiple places.

```yaml
function: calculate_mrr
  description: "Calculate Monthly Recurring Revenue"

  inputs:
    - time_period: DateRange
    - customer_segment: string (optional)

  logic: |
    // Query all active subscriptions in period
    subscriptions = db.query(`
      SELECT customer_id, plan_type, billing_amount, billing_frequency
      FROM subscriptions
      WHERE status = 'active'
        AND start_date <= ${time_period.end}
        AND (end_date IS NULL OR end_date >= ${time_period.start})
    `)

    // Normalize to monthly amount
    mrr = 0
    for sub in subscriptions:
      monthly_amount = normalize_to_monthly(sub.billing_amount, sub.billing_frequency)

      // Apply segment filter if provided
      if customer_segment:
        customer = db.get_customer(sub.customer_id)
        if customer.segment == customer_segment:
          mrr += monthly_amount
      else:
        mrr += monthly_amount

    return {
      total_mrr: mrr,
      subscriber_count: subscriptions.length,
      arpu: mrr / subscriptions.length
    }

  outputs:
    - total_mrr: Money
    - subscriber_count: number
    - arpu: Money
```

**4. Integrations - External Service Connections**

Integrations define how your business connects to external services.

```yaml
integration: stripe_payments
  type: "payment_processor"
  provider: "stripe"

  authentication:
    method: "api_key"
    key: "${secrets.STRIPE_API_KEY}"

  capabilities:
    - name: "create_customer"
      endpoint: "POST /v1/customers"
    - name: "create_subscription"
      endpoint: "POST /v1/subscriptions"
    - name: "charge_card"
      endpoint: "POST /v1/charges"
    - name: "process_refund"
      endpoint: "POST /v1/refunds"

  webhooks:
    - event: "payment.succeeded"
      handler: "workflow:payment_success"
    - event: "payment.failed"
      handler: "workflow:payment_retry"
    - event: "subscription.cancelled"
      handler: "workflow:handle_churn"

  retry_policy:
    max_attempts: 3
    backoff: "exponential"
    timeout: "30s"
```

**5. Policies - Business Rules and Constraints**

Policies define the rules agents must follow.

```yaml
policy: refund_policy
  applies_to:
    - agent: "customer_support_agent"
    - workflow: "process_refund"

  rules:
    - name: "automatic_refund_threshold"
      condition: "refund_amount <= $100"
      action: "approve_automatically"

    - name: "manager_approval_required"
      condition: "refund_amount > $100 AND refund_amount <= $500"
      action: "require_approval"
      approver: "agent:support_manager"

    - name: "executive_approval_required"
      condition: "refund_amount > $500"
      action: "require_approval"
      approver: "agent:cfo"

    - name: "time_limit"
      condition: "purchase_date < NOW() - 30 days"
      action: "deny_with_explanation"
      message: "Refunds only available within 30 days of purchase"

  exceptions:
    - "High-value customers (LTV > $10k) → extend time limit to 90 days"
    - "Product defects → no time limit"
```

### Composition: Building Complex Logic from Primitives

The power comes from composing these primitives:

**Example: Complete Product Launch**

```yaml
workflow: launch_new_feature
  description: "End-to-end feature launch process"

  steps:
    - name: "validate_idea"
      agent: "product_manager"
      action: "evaluate_feature_request"
      function: "calculate_potential_impact"
      # Returns: {estimated_revenue_impact, development_cost, user_demand_score}

    - name: "prioritize"
      agent: "product_manager"
      action: "add_to_roadmap"
      condition: "validate_idea.user_demand_score > 7.0"
      policy: "feature_prioritization_policy"

    - name: "create_spec"
      agent: "product_manager"
      action: "generate_specification"
      tools: ["docs_generator", "figma_api"]

    - name: "assign_development"
      agent: "engineering_manager"
      action: "create_sprint_task"
      integration: "jira_api"

    - name: "build_feature"
      agent: "development_team"
      workflow: "agile_development"  # Nested workflow
      # This workflow handles: coding, testing, code review, deployment

    - name: "create_marketing_materials"
      agent: "marketing_manager"
      parallel:  # These steps run in parallel
        - action: "write_blog_post"
        - action: "create_video_demo"
        - action: "design_email_campaign"
        - action: "update_changelog"

    - name: "launch"
      agent: "product_manager"
      action: "enable_feature_flag"
      rollout_strategy: "gradual"  # 10% → 50% → 100%
      integration: "launchdarkly_api"

    - name: "monitor_adoption"
      agent: "analytics_agent"
      action: "track_feature_usage"
      duration: "14 days"
      alert_if: "adoption_rate < 20%"

    - name: "iterate"
      condition: "monitor_adoption.adoption_rate < 50%"
      agent: "product_manager"
      workflow: "feature_improvement"
```

This single workflow orchestrates:
- **5 different agents** (product manager, engineering manager, dev team, marketing, analytics)
- **2 nested workflows** (agile development, feature improvement)
- **Multiple integrations** (Jira, LaunchDarkly, analytics)
- **Parallel execution** (marketing tasks happen simultaneously)
- **Conditional logic** (only iterate if adoption is low)
- **Time-based operations** (14-day monitoring period)

And it's all expressed declaratively—you describe **what** should happen, not **how** to make it happen. The runtime figures out how.

---

## Layer 3: The Autonomous Execution Runtime

The bottom two layers provide understanding (semantics) and logic (workflows/agents/functions). The top layer makes it all run: the **runtime** that interprets business logic and coordinates autonomous execution.

### Runtime Architecture

The Business-as-Code runtime has six core components:

**1. Interpreter - Parses and Validates Business Logic**

- Reads YAML/MDX definitions
- Validates against schemas (NAICS codes exist, O*NET occupations valid, etc.)
- Builds execution graph (dependencies, order)
- Type-checks inputs/outputs

**2. Agent Coordinator - Manages Agent Lifecycles**

- Instantiates agents with proper context (occupation, tools, policies)
- Routes tasks to appropriate agents
- Manages agent state and memory
- Handles agent failures and restarts

**3. Workflow Engine - Executes Multi-Step Processes**

- Runs workflows step-by-step
- Handles branches, loops, parallel execution
- Manages state across steps
- Implements retry logic and error handling

**4. Integration Layer - Connects to External Services**

- Authenticates with APIs
- Translates business logic into API calls
- Handles rate limiting and retries
- Normalizes responses

**5. Optimization Engine - Improves Performance Over Time**

- A/B tests different strategies
- Analyzes outcomes
- Adjusts agent behaviors
- Optimizes for specified KPIs

**6. Observability System - Monitoring and Debugging**

- Logs all agent actions and decisions
- Tracks workflow execution
- Measures performance metrics
- Provides dashboards and alerts

### Execution Model: The Event Loop

At its core, the runtime implements an event-driven execution loop:

```python
# Simplified runtime event loop
while business_is_running:
    # 1. Wait for events (webhook, schedule, user action, etc.)
    event = event_queue.pop()

    # 2. Find workflows triggered by this event
    triggered_workflows = find_workflows_for_event(event)

    # 3. For each workflow, create execution context
    for workflow in triggered_workflows:
        context = create_context(workflow, event)

        # 4. Execute workflow steps
        for step in workflow.steps:
            # Check if step should run (conditions)
            if should_execute(step, context):

                # Find agent responsible for this step
                agent = get_agent(step.agent)

                # Execute step through agent
                result = agent.execute(
                    action=step.action,
                    params=resolve_params(step.params, context),
                    tools=step.tools
                )

                # Update context with results
                context.update(step.name, result)

                # Log for observability
                log_execution(step, result, context)

        # 5. Handle workflow completion
        on_complete(workflow, context)

    # 6. Run scheduled optimizations
    if should_optimize():
        optimization_engine.analyze_and_improve()
```

This loop runs continuously, processing events and coordinating agent execution.

### The Model Context Protocol (MCP) Integration

To enable multi-agent coordination, Business-as-Code uses the Model Context Protocol:

**MCP Provides:**
- **Standardized tool interfaces:** Agents from different systems can use shared tools
- **Context sharing:** Agents can pass state and results to each other
- **Security boundaries:** Role-based access control for agent capabilities
- **Cross-system coordination:** Agents running on different infrastructure can work together

**Example: Multi-System Agent Collaboration**

```yaml
# Agent 1 running in Cloudflare Workers
agent: web_scraper
  runtime: "cloudflare-workers"
  mcp_endpoint: "https://scrapers.workers.dev/mcp"
  capabilities:
    - "fetch_competitor_pricing"
    - "extract_product_features"

# Agent 2 running in AWS Lambda
agent: pricing_optimizer
  runtime: "aws-lambda"
  mcp_endpoint: "https://abc123.execute-api.us-east-1.amazonaws.com/mcp"
  capabilities:
    - "analyze_competitive_prices"
    - "optimize_pricing_strategy"

# Workflow spanning both agents
workflow: competitive_pricing_analysis
  steps:
    - agent: "web_scraper"
      action: "fetch_competitor_pricing"
      # Executes in Cloudflare Workers

    - agent: "pricing_optimizer"
      action: "analyze_competitive_prices"
      mcp_context: "${web_scraper.output}"
      # Receives data from web_scraper via MCP
      # Executes in AWS Lambda
```

MCP handles the cross-runtime communication, authentication, and data transfer—you just define the workflow.

---

## Putting It All Together: A Complete Example

Let's walk through a complete Business-as-Code implementation for a SaaS company:

### The Business: "ProductivityPro"

**What They Do:** Project management SaaS for small teams
**Business Model:** Freemium (free tier + paid plans)
**Key Processes:** User acquisition, onboarding, feature development, customer support

### Business Definition

```yaml
# business.yaml - Complete business definition

business:
  name: "ProductivityPro"
  industry: "NAICS 511210"  # Software Publishers
  founded: "2024-06-01"
  model: "SaaS B2B"

# ===== AGENTS =====
agents:
  product_manager:
    occupation: "ONET 11-3051.06"  # Product Managers
    responsibilities:
      - "roadmap_planning"
      - "feature_prioritization"
      - "user_research"
    tools:
      - "analytics"
      - "user_feedback"
      - "competitor_analysis"
    goals:
      primary: "user_satisfaction"
      metrics: ["nps_score", "feature_adoption", "churn_rate"]

  engineering_lead:
    occupation: "ONET 15-1252.00"  # Software Developers
    responsibilities:
      - "architecture_design"
      - "code_review"
      - "technical_decisions"
    tools:
      - "github"
      - "deployment_platform"
      - "monitoring"
    goals:
      primary: "system_reliability"
      metrics: ["uptime", "response_time", "bug_count"]

  growth_marketer:
    occupation: "ONET 11-2021.00"  # Marketing Managers
    responsibilities:
      - "user_acquisition"
      - "content_marketing"
      - "email_campaigns"
    tools:
      - "analytics"
      - "email_platform"
      - "ad_platforms"
    goals:
      primary: "cost_effective_growth"
      metrics: ["cac", "conversion_rate", "trial_to_paid"]

  customer_success:
    occupation: "ONET 13-1151.00"  # Training Specialists
    responsibilities:
      - "user_onboarding"
      - "adoption_driving"
      - "churn_prevention"
    tools:
      - "crm"
      - "email"
      - "in_app_messaging"
    goals:
      primary: "customer_retention"
      metrics: ["activation_rate", "engagement_score", "renewal_rate"]

  support_agent:
    occupation: "ONET 43-4051.00"  # Customer Service Reps
    responsibilities:
      - "answer_questions"
      - "troubleshoot_issues"
      - "process_refunds"
    tools:
      - "knowledge_base"
      - "ticketing_system"
      - "screen_sharing"
    authority:
      refund_limit: "$500"
    goals:
      primary: "customer_satisfaction"
      metrics: ["csat_score", "response_time", "resolution_rate"]

# ===== WORKFLOWS =====
workflows:
  user_acquisition:
    trigger: "schedule:daily"
    steps:
      - agent: "growth_marketer"
        action: "analyze_acquisition_channels"
        function: "calculate_channel_roi"

      - agent: "growth_marketer"
        action: "optimize_ad_spend"
        policy: "budget_allocation_policy"

      - agent: "growth_marketer"
        action: "create_content"
        frequency: "3x per week"

  user_onboarding:
    trigger: "event:user_signed_up"
    steps:
      - agent: "customer_success"
        action: "send_welcome_email"

      - agent: "engineering_lead"
        action: "provision_account"

      - agent: "customer_success"
        action: "schedule_onboarding_email_sequence"
        duration: "14 days"

      - agent: "customer_success"
        action: "monitor_activation"
        alert_if: "not_activated_after_7_days"

  feature_development:
    trigger: "event:feature_prioritized"
    steps:
      - agent: "product_manager"
        action: "create_specification"

      - agent: "engineering_lead"
        workflow: "implement_feature"

      - agent: "growth_marketer"
        parallel:
          - "write_announcement_post"
          - "create_feature_video"
          - "design_email_campaign"

      - agent: "product_manager"
        action: "launch_to_users"
        rollout: "gradual"

      - agent: "product_manager"
        action: "track_adoption"
        duration: "30 days"

  customer_support:
    trigger: "event:ticket_created"
    steps:
      - agent: "support_agent"
        action: "categorize_ticket"

      - agent: "support_agent"
        action: "search_knowledge_base"

      - agent: "support_agent"
        action: "attempt_resolution"
        escalate_if: "cannot_resolve_in_30_minutes"

      - agent: "support_agent"
        action: "follow_up"
        delay: "24 hours"

  churn_prevention:
    trigger: "event:churn_risk_detected"
    steps:
      - agent: "customer_success"
        action: "analyze_usage_patterns"

      - agent: "customer_success"
        action: "reach_out_proactively"

      - agent: "customer_success"
        action: "offer_incentive"
        policy: "retention_incentive_policy"

      - agent: "customer_success"
        action: "schedule_check_in"
        frequency: "weekly"

# ===== FUNCTIONS =====
functions:
  calculate_channel_roi:
    inputs: [time_period, channel]
    logic: |
      spent = get_ad_spend(channel, time_period)
      conversions = get_conversions(channel, time_period)
      revenue = get_revenue_from_conversions(conversions)
      return {roi: (revenue - spent) / spent, cac: spent / conversions.length}
    outputs: {roi: number, cac: Money}

  calculate_churn_risk:
    inputs: [customer_id]
    logic: |
      usage = get_usage_metrics(customer_id, last_30_days)
      engagement = calculate_engagement_score(usage)
      support_tickets = get_tickets(customer_id, last_30_days)
      risk_score = model.predict_churn(engagement, support_tickets, customer.plan)
      return {risk_score: risk_score, factors: model.explain_prediction()}
    outputs: {risk_score: number, factors: array}

# ===== INTEGRATIONS =====
integrations:
  stripe:
    type: "payment_processor"
    webhooks:
      - "payment.succeeded -> workflow:activate_subscription"
      - "payment.failed -> workflow:payment_retry"

  sendgrid:
    type: "email_service"
    capabilities: ["send_transactional", "send_campaign"]

  amplitude:
    type: "analytics"
    capabilities: ["track_event", "query_data", "create_cohort"]

# ===== POLICIES =====
policies:
  budget_allocation:
    constraints:
      max_cac: "$150"
      max_monthly_spend: "$50000"
    rules:
      - "Allocate budget proportional to channel ROI"
      - "Reserve 20% for experimentation"
      - "Pause channels with CAC > $200"

  retention_incentive:
    rules:
      - "Customer LTV < $500: Offer 20% discount for 3 months"
      - "Customer LTV $500-$2000: Offer 1 month free"
      - "Customer LTV > $2000: Offer dedicated support + custom features"
```

### What Happens at Runtime

When you deploy this Business-as-Code definition:

**Day 1:**
- Runtime instantiates all 5 agents with their respective occupations, tools, and goals
- Sets up integrations (Stripe, SendGrid, Amplitude)
- Begins listening for events

**User Signs Up:**
- `event:user_signed_up` triggers `workflow:user_onboarding`
- `customer_success` agent sends welcome email
- `engineering_lead` agent provisions account
- `customer_success` schedules 14-day email sequence

**Support Ticket Created:**
- `event:ticket_created` triggers `workflow:customer_support`
- `support_agent` categorizes ticket
- Searches knowledge base for solution
- Attempts resolution
- Escalates if unresolved after 30 minutes

**Churn Risk Detected:**
- Analytics continuously monitor usage with `calculate_churn_risk` function
- When risk_score > 0.7, triggers `workflow:churn_prevention`
- `customer_success` agent reaches out proactively
- Offers retention incentive per policy
- Schedules weekly check-ins

**Feature Launch:**
- `product_manager` prioritizes feature
- `event:feature_prioritized` triggers `workflow:feature_development`
- Spec created, feature built, marketing materials created in parallel
- Gradual rollout monitored by `product_manager`

All of this happens **autonomously**. Humans monitor dashboards, handle escalations, provide strategic direction—but routine execution is automatic.

---

## Advantages Over Traditional Architecture

Why is Business-as-Code better than traditional approaches?

**1. Version Control for Business Logic**

Your entire business is in Git:
```bash
git log business.yaml
# See entire history of business rule changes

git diff v1.0..v2.0
# See exactly what changed between versions

git checkout feature/new-pricing-model
# Test changes in staging before production
```

**2. Testability**

You can test business logic before deploying:
```yaml
test: refund_workflow
  scenario: "Customer requests refund within 30 days"
  given:
    - customer: "test-customer-1"
    - purchase_date: "2025-09-15"
    - refund_request_date: "2025-10-01"
    - amount: "$99"
  when:
    - trigger: "workflow:process_refund"
  then:
    - expect: "refund_approved"
    - expect: "amount_refunded == $99"
    - expect: "email_sent == 'refund_confirmation'"
```

**3. Audit Trail**

Every business event logged with full context:
```
2025-10-05 14:30:00 | agent:support-agent | refund_processed
  customer: john-smith
  amount: $149
  reason: product_defect
  policy_applied: refund_policy.automatic_approval
  result: success
```

**4. Continuous Optimization**

The runtime continuously improves:
- A/B tests different strategies
- Measures outcomes
- Adjusts agent behaviors
- All without human intervention

**5. Composability**

Build complex businesses from simple primitives:
- Agents → Workflows → Business
- Functions → Integrations → Workflows
- Policies → Agents → Decisions

**6. Portability**

Business logic is infrastructure-agnostic:
- Run on AWS, GCP, Cloudflare, or hybrid
- Switch providers without rewriting logic
- Multi-cloud by default

---

## Getting Started: Your First Business-as-Code Implementation

Ready to try Business-as-Code? Here's a practical starting point:

**Step 1: Choose a Bounded Process**

Don't try to encode your entire business day one. Pick one process:
- Lead qualification
- Customer onboarding
- Support ticket triage
- Content publishing
- Invoice processing

**Step 2: Map to Ontologies**

Identify the NAICS industry, O*NET occupations involved, Schema.org types, and key business events (EPCIS).

**Step 3: Define in YAML**

Write the business logic:
```yaml
agent: lead_qualifier
  occupation: "ONET 41-3099.00"  # Sales Workers

workflow: qualify_lead
  trigger: "event:form_submitted"
  steps: [...]

function: calculate_lead_score
  logic: |
    # Scoring algorithm
```

**Step 4: Deploy to Runtime**

Use a Business-as-Code runtime (like AGI.do or build your own):
```bash
bac deploy business.yaml --env production
```

**Step 5: Monitor and Iterate**

Watch the dashboards. See what works. Adjust agents, refine workflows, optimize policies.

**Step 6: Expand Scope**

Once one process is autonomous, add another. Then another. Gradually, your entire business becomes encoded.

---

## Key Takeaways

- **Three-layer architecture:** Semantic Foundation (ontologies) + Business Logic (workflows/agents) + Autonomous Execution (runtime)
- **Four ontologies provide semantic understanding:** NAICS industries, O*NET occupations, Schema.org vocabulary, GS1 EPCIS events
- **Five primitives express business logic:** Agents, Workflows, Functions, Integrations, Policies
- **Event-driven execution model:** Runtime continuously processes events, coordinates agents, optimizes performance
- **Model Context Protocol enables multi-agent coordination** across different systems and providers
- **Advantages over traditional architecture:** version control, testability, audit trails, continuous optimization, composability, portability
- **Start small:** Pick one bounded process, encode it, deploy it, iterate, then expand

---

*Next: Chapter 4 - Ideation: AI as Entrepreneur*

---

*End of Part I: The Foundations*

We've now established the complete architectural foundation for Business-as-Code. You understand the historical pattern (IaC → SaaS :: BaC → SaS), the enabling technology (agentic AI), and the complete architecture (semantics + logic + execution).

In Part II, we'll walk through the entire autonomous business lifecycle, showing how AI agents handle each stage: ideation, building, launching, experimenting, growing, scaling, and operating. Each chapter will include real case studies, implementation frameworks, and best practices from companies operating autonomous businesses today.

The revolution is architected. Now let's see it in action.
