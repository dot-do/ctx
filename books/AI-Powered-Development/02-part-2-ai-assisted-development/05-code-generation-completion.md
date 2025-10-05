# Chapter 5: Code Generation and Completion

Tom Rodriguez had been coding for 15 years. He'd written hundreds of thousands of lines of code across a dozen languages. He was fast—really fast.

Then he tried GitHub Copilot for a week.

His first reaction: "This is just fancy autocomplete. I'm already fast enough."

But his manager insisted: "Give it a real shot. Four weeks minimum."

Week 1: Tom found it annoying. Copilot kept suggesting code he didn't want.

Week 2: Tom started understanding when Copilot was useful. He accepted maybe 20% of suggestions.

Week 3: Tom was accepting 50% of suggestions. He noticed he was writing less boilerplate.

Week 4: Tom was *designing* his code to work better with Copilot. He was writing comments first, letting Copilot generate implementation. His acceptance rate hit 65%.

Month 3: Tom looked at his velocity metrics. He was completing tasks 2.3x faster than his pre-Copilot baseline. More importantly, he wasn't bored anymore. The tedious parts of coding had vanished.

"I was wrong," Tom admitted to his manager. "This isn't fancy autocomplete. It's a completely different way to write code."

---

This chapter teaches you that different way.

## Beyond Autocomplete

AI code generation isn't just "better autocomplete." It's a fundamentally different interaction model.

### Traditional Coding

```
Developer thinks → Translates thought to code → Types code → Computer executes
```

**Bottleneck**: Translation and typing

### AI-Assisted Coding

```
Developer thinks → Expresses intent → AI generates code → Developer reviews → Computer executes
```

**Bottleneck shifts**: From translation/typing to intent expression and review

This shift has profound implications for how you code.

## The Code Generation Spectrum

AI code generation exists on a spectrum from simple completion to full generation.

### Level 1: Line Completion

**What it does**: Completes the current line based on context

**Example**:
```typescript
// You type:
const users = await db.users.find

// AI completes:
({ where: { active: true }, orderBy: { createdAt: 'desc' }})
```

**When it's useful**:
- Writing similar lines repeatedly
- Working with well-known APIs
- Standard language patterns

**Effectiveness**: High (70-80% acceptance rate for good AI tools)

### Level 2: Multi-Line Completion

**What it does**: Completes several lines based on pattern recognition

**Example**:
```python
# You type:
def calculate_tax(amount, rate):

# AI generates:
    """Calculate tax on amount."""
    if amount < 0:
        raise ValueError("Amount must be positive")
    if rate < 0 or rate > 1:
        raise ValueError("Rate must be between 0 and 1")
    return amount * rate
```

**When it's useful**:
- Implementing standard patterns
- Adding error handling
- Writing similar functions

**Effectiveness**: Medium-High (50-70% acceptance rate)

### Level 3: Function Generation

**What it does**: Generates complete function from signature and description

**Example**:
```javascript
/**
 * Parse CSV file and convert to array of objects.
 * Handles quoted fields, escaped characters, and custom delimiters.
 *
 * @param {string} csvText - CSV text to parse
 * @param {Object} options - Parsing options
 * @param {string} options.delimiter - Field delimiter (default: ',')
 * @param {boolean} options.hasHeader - First row is header (default: true)
 * @returns {Array<Object>} Parsed data
 */
function parseCSV(csvText, options = {}) {
  // AI generates full implementation
}
```

**AI generates**: Complete, working CSV parser (~50 lines)

**When it's useful**:
- Well-defined problems
- Standard algorithms
- Utility functions

**Effectiveness**: Medium (40-60% acceptance rate, often needs refinement)

### Level 4: Class/Module Generation

**What it does**: Generates entire classes or modules from specifications

**Example**:
```python
"""
Create a caching decorator that:
- Caches function results based on arguments
- Supports TTL (time-to-live)
- Uses LRU eviction when cache is full
- Is thread-safe
- Works with both sync and async functions
"""

class CacheDecorator:
    # AI generates full implementation (~100-150 lines)
```

**When it's useful**:
- Standard design patterns
- Well-understood components
- Replacing copied boilerplate

**Effectiveness**: Low-Medium (30-50% acceptance rate, usually needs significant refinement)

### Level 5: System Generation

**What it does**: Generates multiple related files/components

**Example**:
```
"Create a REST API for a todo application with:
- Express.js server
- PostgreSQL database
- CRUD endpoints for todos
- User authentication
- Input validation
- Error handling
- Tests"
```

**AI generates**: Multiple files (server.js, routes/, models/, tests/)

**When it's useful**:
- Prototyping
- Standard applications
- Learning new frameworks

**Effectiveness**: Low (20-40% acceptance rate, requires heavy revision)

**Rule of thumb**: Higher levels require more human refinement.

## Effective Code Generation Strategies

Let's explore specific strategies for getting the best results at each level.

### Strategy 1: Comment-Driven Development

Write detailed comments, let AI generate implementation.

**Basic pattern**:
```typescript
// Parse JSON with error handling
// Return parsed data if valid
// Return null and log error if invalid

// AI generates:
function parseJSONSafely(jsonString: string): any | null {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
}
```

**Advanced pattern**:
```python
def process_payment(
    amount: Decimal,
    payment_method: PaymentMethod,
    customer: Customer
) -> PaymentResult:
    """
    Process payment transaction.

    Flow:
    1. Validate amount is positive
    2. Check customer has payment method
    3. Call payment gateway API with retry (max 3 attempts)
    4. If successful: create transaction record, send confirmation email
    5. If failed: log error, return error result
    6. Handle idempotency using transaction_id

    Returns:
        PaymentResult with status, transaction_id, and error if any

    Raises:
        ValueError: If amount is invalid
        PaymentGatewayError: If all retries fail
    """
    # AI generates full implementation following the flow
```

**Key insight**: More detailed comments = better generated code

### Strategy 2: Example-Driven Generation

Show AI an example, it generates similar code.

**Pattern**:
```typescript
// I have this function:
function getUserById(id: string): Promise<User> {
  return db.users.findUnique({ where: { id }});
}

// Generate similar functions for:
// - getPostById
// - getCommentById
// - getTagById
```

**AI generates all three following the same pattern**

**Advanced example**:
```python
# Existing pattern
class UserRepository:
    def find_by_id(self, id: UUID) -> Optional[User]:
        result = self.db.execute(
            "SELECT * FROM users WHERE id = ?", (str(id),)
        )
        return User.from_row(result[0]) if result else None

# Generate complete repository with same pattern for:
# - find_by_email
# - find_many (with pagination)
# - create
# - update
# - delete
```

**AI generates consistent repository implementation**

### Strategy 3: Type-Driven Generation

Use strong types to constrain AI generation.

**TypeScript example**:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Create function to fetch user by ID
// Return type: ApiResponse<User>
// Handle network errors, 404, and JSON parse errors

async function fetchUser(userId: string): Promise<ApiResponse<User>> {
  // AI generates implementation matching types exactly
}
```

**Python example with Pydantic**:
```python
from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

class OrderItem(BaseModel):
    product_id: str
    quantity: int
    price: Decimal

    @validator('quantity')
    def quantity_positive(cls, v):
        if v <= 0:
            raise ValueError('Quantity must be positive')
        return v

class Order(BaseModel):
    order_id: str
    user_id: str
    items: List[OrderItem]
    total: Decimal
    status: str
    created_at: datetime

# Generate function to create order from cart
# Validate all items, calculate total, save to database
# Return Order instance

def create_order_from_cart(user_id: str, cart_items: List[OrderItem]) -> Order:
    # AI generates implementation using the models
```

**Types act as specification**: AI knows exactly what to generate

### Strategy 4: Test-First Generation

Write tests first, generate implementation to pass tests.

**Pattern**:
```python
import pytest

def test_parse_duration():
    """Test duration parsing in various formats."""
    assert parse_duration("2h") == timedelta(hours=2)
    assert parse_duration("30m") == timedelta(minutes=30)
    assert parse_duration("45s") == timedelta(seconds=45)
    assert parse_duration("1h30m") == timedelta(hours=1, minutes=30)
    assert parse_duration("2h15m30s") == timedelta(hours=2, minutes=15, seconds=30)

def test_parse_duration_invalid():
    """Test error handling for invalid input."""
    with pytest.raises(ValueError):
        parse_duration("invalid")
    with pytest.raises(ValueError):
        parse_duration("")
    with pytest.raises(ValueError):
        parse_duration("2x")

# Now generate the parse_duration function to pass these tests
```

**AI generates exactly the function needed to pass tests**

**Benefits**:
- Clear specification
- Guaranteed test coverage
- Immediate feedback on correctness

### Strategy 5: Iterative Refinement

Generate initial code, then refine iteratively.

**Iteration 1: Basic implementation**
```
Generate a rate limiter function
```

**AI generates**:
```python
def rate_limiter(func):
    calls = []
    max_calls = 10
    period = 60

    def wrapper(*args, **kwargs):
        now = time.time()
        calls[:] = [c for c in calls if c > now - period]
        if len(calls) >= max_calls:
            raise Exception("Rate limit exceeded")
        calls.append(now)
        return func(*args, **kwargs)
    return wrapper
```

**Iteration 2: Add configuration**
```
Make rate limiter configurable (max_calls and period as parameters)
```

**AI updates**:
```python
def rate_limiter(max_calls=10, period=60):
    calls = []
    def decorator(func):
        def wrapper(*args, **kwargs):
            # Updated implementation
```

**Iteration 3: Thread safety**
```
Make thread-safe using threading.Lock
```

**Iteration 4: Add burst support**
```
Support burst capacity (2x limit for short periods)
```

**Final result**: Production-ready rate limiter built through 4 quick iterations

### Strategy 6: Context-Aware Generation

Provide AI with relevant context from your codebase.

**Pattern**:
```typescript
// Existing code in your project:

// src/utils/database.ts
export async function query<T>(sql: string, params: any[]): Promise<T[]> {
  // ... implementation
}

export async function transaction<T>(
  callback: (tx: Transaction) => Promise<T>
): Promise<T> {
  // ... implementation
}

// src/models/User.ts
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// Now generate UserRepository using these utilities:
// - Use query() for reads
// - Use transaction() for writes
// - Follow User interface

export class UserRepository {
  // AI generates implementation using existing patterns
}
```

**Result**: Generated code matches your codebase style and architecture

## Common Pitfalls and How to Avoid Them

### Pitfall 1: Accepting Without Review

**Problem**: AI-generated code can be subtly wrong

**Example**:
```python
# Prompt: "Check if number is prime"

# AI generates:
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):  # ❌ Inefficient!
        if n % i == 0:
            return False
    return True
```

**Correct but inefficient**: Checks every number up to n instead of √n

**Solution**: Always review generated code

```python
def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):  # ✅ Optimal
        if n % i == 0:
            return False
    return True
```

### Pitfall 2: Vague Prompts

**Problem**: Vague descriptions lead to generic code

**Bad**:
```
// Create user validation
```

**AI generates generic validation that might not fit your needs**

**Good**:
```typescript
/**
 * Validate user registration data.
 *
 * Rules:
 * - Email: valid format, not already registered
 * - Password: min 12 chars, uppercase, lowercase, number, special char
 * - Username: 3-20 chars, alphanumeric + underscore only
 * - Age: must be 18+
 *
 * @param data - User registration data
 * @param db - Database connection (to check email uniqueness)
 * @returns Validation result with specific error messages
 */
async function validateUserRegistration(
  data: UserRegistrationData,
  db: Database
): Promise<ValidationResult> {
  // AI generates specific validation matching your rules
}
```

### Pitfall 3: Ignoring Edge Cases

**Problem**: AI might miss domain-specific edge cases

**Example**:
```python
# Prompt: "Calculate shipping cost"

# AI generates:
def calculate_shipping(weight, distance):
    return weight * 0.5 + distance * 0.1
```

**Missing edge cases**:
- Negative weight/distance
- Zero weight (documents)
- International shipping
- Bulk discounts
- Maximum weight limits

**Solution**: Explicitly specify edge cases

```python
def calculate_shipping(
    weight: float,  # in kg
    distance: float,  # in km
    destination_country: str,
    is_bulk: bool = False
) -> Decimal:
    """
    Calculate shipping cost.

    Edge cases:
    - weight <= 0: raise ValueError
    - weight > 30kg: use freight pricing
    - distance <= 0: raise ValueError
    - International (destination != 'US'): multiply by 1.5
    - Bulk orders (>50kg total): 20% discount

    Returns:
        Shipping cost in USD
    """
    # AI generates implementation handling all edge cases
```

### Pitfall 4: Security Vulnerabilities

**Problem**: AI might generate insecure code

**Example**:
```python
# Prompt: "Create function to execute user query"

# AI might generate:
def run_query(query_string):
    return db.execute(query_string)  # ❌ SQL injection!
```

**Solution**: Specify security requirements explicitly

```python
def run_query(
    table: str,
    filters: Dict[str, Any],
    db: Database
) -> List[Dict]:
    """
    Execute safe database query.

    Security:
    - Use parameterized queries (NO string interpolation)
    - Validate table name against whitelist
    - Sanitize all filter values
    - Limit results to max 1000 rows

    Args:
        table: Table name (must be in ALLOWED_TABLES)
        filters: Column-value pairs for WHERE clause
        db: Database connection

    Returns:
        Query results (max 1000 rows)

    Raises:
        ValueError: If table not in whitelist
    """
    # AI generates secure implementation
```

### Pitfall 5: Performance Issues

**Problem**: AI generates correct but slow code

**Example**:
```javascript
// Prompt: "Find duplicates in array"

// AI might generate:
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {  // ❌ O(n²)
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}
```

**Solution**: Specify performance requirements

```javascript
/**
 * Find duplicate values in array.
 *
 * Requirements:
 * - Time complexity: O(n)
 * - Space complexity: O(n)
 * - Use Set for O(1) lookups
 * - Preserve insertion order
 *
 * @param {Array} arr - Input array
 * @returns {Array} Array of duplicate values (no duplicates in result)
 */
function findDuplicates(arr) {
  // AI generates O(n) implementation using Set
  const seen = new Set();
  const duplicates = new Set();

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }

  return Array.from(duplicates);
}
```

## Advanced Generation Patterns

Let's explore sophisticated techniques for expert users.

### Pattern: Progressive Enhancement

Start with basic implementation, progressively add features.

**Stage 1: Core functionality**
```python
# Create a basic TODO list manager with:
# - Add task
# - Mark complete
# - List tasks

class TodoList:
    # AI generates basic version
```

**Stage 2: Add persistence**
```python
# Add JSON file persistence to TodoList
# - Save after every modification
# - Load from file on initialization
# - Handle file errors gracefully
```

**Stage 3: Add filtering**
```python
# Add methods to filter tasks:
# - by status (complete/incomplete)
# - by priority (high/medium/low)
# - by due date
```

**Stage 4: Add sorting**
```python
# Add sorting options:
# - by priority
# - by due date
# - by creation date
```

**Result**: Complex class built through manageable stages

### Pattern: Template Instantiation

Create a template, have AI instantiate it for specific cases.

**Template**:
```typescript
// Template: Resource API Controller

/**
 * RESTful controller for [RESOURCE] management.
 *
 * Implements:
 * - GET /api/[resources] - List all (with pagination)
 * - GET /api/[resources]/:id - Get by ID
 * - POST /api/[resources] - Create new
 * - PUT /api/[resources]/:id - Update
 * - DELETE /api/[resources]/:id - Delete
 *
 * Auth: Requires valid JWT token
 * Validation: Uses Zod schemas
 * Errors: Returns standard error format
 */

// Now instantiate this template for:
// 1. User resource
// 2. Post resource
// 3. Comment resource
```

**AI generates three complete controllers following the template**

### Pattern: Differential Generation

Generate code that transforms one format to another.

**Example**:
```typescript
// Source: API response format
interface APIUser {
  user_id: string;
  email_address: string;
  full_name: string;
  created_timestamp: number;
}

// Target: Application model
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Generate transformer that converts APIUser to User:
// - Rename fields
// - Convert timestamp to Date
// - Handle null/undefined values
// - Add validation

function transformUser(apiUser: APIUser): User {
  // AI generates transformation logic
}
```

### Pattern: Constraint-Based Generation

Provide constraints, let AI figure out implementation.

**Example**:
```python
"""
Create a function to merge sorted arrays.

Constraints:
- Time complexity: O(n log k) where n=total elements, k=number of arrays
- Space complexity: O(n)
- Use min-heap for efficiency
- Handle empty arrays
- All input arrays are sorted ascending
- Output must be sorted

Input: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
"""

def merge_sorted_arrays(arrays: List[List[int]]) -> List[int]:
    # AI implements using heap queue (heapq)
    # to meet complexity requirements
```

## Measuring Generation Effectiveness

Track these metrics to improve your generation skills:

### Metric 1: Acceptance Rate

```
Acceptance rate = (Suggestions accepted) / (Suggestions shown)

Track over time:
Week 1: 25%
Week 2: 38%
Week 3: 52%
Week 4: 61%

Goal: 60-70% for routine code
```

### Metric 2: Edit Distance

```
How much do you modify generated code?

Minimal edits (< 10% changes): Good generation
Moderate edits (10-30% changes): Acceptable
Heavy edits (> 30% changes): Poor generation

Track which types of prompts lead to minimal edits.
```

### Metric 3: Time to Complete

```
Time saved per task:

Traditional: 30 minutes
With AI (poor prompts): 25 minutes (17% faster)
With AI (good prompts): 12 minutes (60% faster)

Improvement comes from better prompting.
```

### Metric 4: Quality Scores

```
Code review feedback:

Generated code quality:
- Pass rate on first review: 75%
- Bug rate: 0.8 per 100 LOC
- Performance issues: 5%

Compare to manually written code.
```

## Key Takeaways

1. **Code generation is a spectrum**: From line completion to full system generation

2. **More context = better results**: Detailed comments, types, examples, tests

3. **Always review**: AI generates plausible code, not necessarily correct code

4. **Iterate**: First generation is starting point, refine iteratively

5. **Specify edge cases**: AI misses domain-specific edge cases

6. **Explicit security**: State security requirements explicitly

7. **Performance constraints**: Specify complexity requirements

8. **Use types**: Strong typing guides generation

9. **Test-first works well**: Tests provide clear specifications

10. **Track effectiveness**: Measure and improve your generation skills

## What's Next

You now master code generation and completion—getting AI to write code for you.

But code breaks. Bugs happen. The next critical skill is using AI to debug faster and more effectively.

That's what we'll explore next: AI-assisted debugging.

---

**Next**: Chapter 6 - Debugging with AI
