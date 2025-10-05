# Chapter 2: Prompt Engineering for Code

David Kim had been using GitHub Copilot for three months, but he was frustrated. His colleague Jen seemed to get amazing results—complex functions appearing perfectly formed, clever solutions to hard problems. Meanwhile, David's Copilot suggestions were mediocre at best.

"What am I doing wrong?" he asked Jen.

She looked at his code. "Show me how you use it."

David typed: `# function to process data`

Copilot suggested some generic boilerplate.

"Okay," Jen said. "Now watch." She deleted David's comment and typed:

```python
def process_user_transactions(transactions: List[Transaction]) -> Dict[str, TransactionSummary]:
    """
    Process list of transactions to generate per-user summaries.

    Args:
        transactions: List of Transaction objects with user_id, amount, timestamp

    Returns:
        Dictionary mapping user_id to TransactionSummary with total, count, avg
    """
```

Copilot generated a complete, correct implementation.

David stared. "It's... it's the same request. I just described it differently."

"Exactly," Jen said. "The quality of what you get out depends entirely on what you put in. Welcome to prompt engineering."

---

Prompt engineering is the most important skill for AI-powered development. It's the difference between AI being marginally useful and AI multiplying your productivity 3-5x.

This chapter teaches you that skill.

## What is Prompt Engineering?

**Prompt engineering** is the practice of structuring your requests to AI models to get the best possible results.

Think of it as the interface between human intent and AI capability. A poor prompt gets poor results. A great prompt gets great results—even from the same model.

### Why It Matters for Code

Unlike natural language tasks (writing emails, summarizing text), code generation has specific requirements:
- **Correctness**: Code must actually work
- **Type safety**: Must match expected types
- **Error handling**: Should handle edge cases
- **Performance**: Should be reasonably efficient
- **Style**: Should match codebase conventions
- **Context**: Should fit into existing architecture

Generic prompts ("write a function to do X") don't provide enough information for the AI to meet these requirements. Specific prompts do.

## The Anatomy of a Good Code Prompt

Let's break down what makes a code prompt effective.

### Example: Bad vs. Good Prompts

**❌ Bad Prompt**:
```
# calculate tax
```

**AI generates**:
```python
def calculate_tax(amount):
    return amount * 0.1
```

Problems:
- Hardcoded tax rate
- No type hints
- No error handling
- Unclear what "amount" represents
- Magic number 0.1

**✅ Good Prompt**:
```python
def calculate_sales_tax(
    subtotal: Decimal,
    state: str,
    tax_rates: Dict[str, Decimal]
) -> Decimal:
    """
    Calculate sales tax for a purchase.

    Args:
        subtotal: Purchase subtotal in USD (positive)
        state: Two-letter state code (e.g., 'CA', 'NY')
        tax_rates: Mapping of state codes to tax rates (e.g., {'CA': Decimal('0.0725')})

    Returns:
        Tax amount in USD

    Raises:
        ValueError: If subtotal is negative or state not in tax_rates
    """
```

**AI generates**:
```python
def calculate_sales_tax(
    subtotal: Decimal,
    state: str,
    tax_rates: Dict[str, Decimal]
) -> Decimal:
    """
    Calculate sales tax for a purchase.

    Args:
        subtotal: Purchase subtotal in USD (positive)
        state: Two-letter state code (e.g., 'CA', 'NY')
        tax_rates: Mapping of state codes to tax rates (e.g., {'CA': Decimal('0.0725')})

    Returns:
        Tax amount in USD

    Raises:
        ValueError: If subtotal is negative or state not in tax_rates
    """
    if subtotal < 0:
        raise ValueError(f"Subtotal must be positive, got {subtotal}")

    if state not in tax_rates:
        raise ValueError(f"Unknown state code: {state}")

    tax_rate = tax_rates[state]
    return subtotal * tax_rate
```

The second prompt provided:
- Clear type hints
- Detailed docstring
- Edge case specifications
- Expected error handling
- Example values

Result: The AI generated production-quality code.

### The Six Elements of Effective Code Prompts

**1. Clear function signature**
- Name describes purpose
- Type hints for all parameters
- Return type specified

**2. Comprehensive docstring**
- What the function does
- What each parameter means
- What it returns
- What errors it might raise

**3. Example inputs/outputs**
- Shows expected behavior
- Clarifies edge cases
- Demonstrates format

**4. Constraints and requirements**
- Performance requirements
- Memory constraints
- Error handling expectations

**5. Context**
- Related code shown
- Relevant types defined
- Architecture patterns indicated

**6. Style guidance**
- Code style preferences
- Naming conventions
- Structural patterns

You don't need all six for every prompt. But the more you include, the better the results.

## Prompt Engineering Patterns

Let's explore proven patterns for different coding scenarios.

### Pattern 1: Function Implementation

**Use case**: Generate a complete function implementation

**Template**:
```python
def function_name(param: Type) -> ReturnType:
    """
    [One-line summary]

    [Detailed description]

    Args:
        param: [Description with constraints]

    Returns:
        [Description of return value]

    Raises:
        [Error types and when they're raised]

    Example:
        >>> function_name(example_input)
        expected_output
    """
```

**Real example**:
```typescript
async function fetchUserWithRetry(
  userId: string,
  maxRetries: number = 3
): Promise<User> {
  /**
   * Fetch user data with exponential backoff retry.
   *
   * Retries on network errors and 5xx responses.
   * Does not retry on 4xx responses (client errors).
   *
   * @param userId - User ID to fetch
   * @param maxRetries - Maximum retry attempts (default: 3)
   * @returns User object
   * @throws {NotFoundError} If user doesn't exist (404)
   * @throws {NetworkError} If all retries exhausted
   *
   * @example
   * const user = await fetchUserWithRetry('user-123', 3)
   * console.log(user.email)
   */
```

**AI generates**:
```typescript
async function fetchUserWithRetry(
  userId: string,
  maxRetries: number = 3
): Promise<User> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`/api/users/${userId}`);

      if (response.status === 404) {
        throw new NotFoundError(`User ${userId} not found`);
      }

      if (response.status >= 400 && response.status < 500) {
        // Client error - don't retry
        throw new Error(`Client error: ${response.status}`);
      }

      if (response.ok) {
        return await response.json() as User;
      }

      // 5xx error - will retry
      throw new Error(`Server error: ${response.status}`);

    } catch (error) {
      lastError = error;

      if (error instanceof NotFoundError) {
        throw error; // Don't retry 404s
      }

      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const delayMs = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new NetworkError(`Failed after ${maxRetries} retries: ${lastError.message}`);
}
```

Notice:
- Proper error handling
- Exponential backoff implementation
- Different behavior for different error types
- Clear logic flow

### Pattern 2: Class Implementation

**Use case**: Generate a complete class with multiple methods

**Template**:
```python
class ClassName:
    """
    [One-line summary of class purpose]

    [Detailed description of class responsibility]

    Attributes:
        attr1: [Description]
        attr2: [Description]

    Example:
        >>> obj = ClassName(param1, param2)
        >>> obj.method()
        expected_result
    """

    def __init__(self, param: Type):
        """Initialize with [description]."""

    def method_name(self, param: Type) -> ReturnType:
        """[Method purpose and behavior]."""
```

**Real example**:
```python
class RateLimiter:
    """
    Token bucket rate limiter for API requests.

    Allows bursts up to bucket capacity, then throttles to refill rate.
    Thread-safe implementation using locks.

    Attributes:
        capacity: Maximum tokens in bucket
        refill_rate: Tokens added per second
        tokens: Current available tokens
        last_refill: Timestamp of last refill

    Example:
        >>> limiter = RateLimiter(capacity=10, refill_rate=2)
        >>> limiter.allow_request()  # True (consume 1 token)
        >>> limiter.tokens
        9
    """

    def __init__(self, capacity: int, refill_rate: float):
        """
        Initialize rate limiter.

        Args:
            capacity: Maximum tokens (bucket size)
            refill_rate: Tokens per second refill rate
        """

    def allow_request(self) -> bool:
        """
        Check if request is allowed under rate limit.

        Returns:
            True if request allowed (token consumed), False if rate limited
        """

    def _refill(self) -> None:
        """Refill tokens based on elapsed time since last refill."""
```

**AI generates**: [Complete implementation with all methods, thread-safe, correct algorithm]

### Pattern 3: Test Generation

**Use case**: Generate tests for existing code

**Template**:
```python
# Show the function to test
def function_to_test(...):
    """..."""
    # implementation

# Then request tests with specific scenarios
"""
Generate pytest tests for function_to_test covering:
- Normal case: [specific scenario]
- Edge case: [specific scenario]
- Error case: [specific scenario]
- Performance: [specific requirement]

Use fixtures for [specific data]
Mock [specific dependencies]
"""
```

**Real example**:
```python
def parse_duration(duration_str: str) -> timedelta:
    """
    Parse duration string to timedelta.

    Supports formats: '2h', '30m', '45s', '1h30m', '2h15m30s'

    Args:
        duration_str: Duration string

    Returns:
        timedelta object

    Raises:
        ValueError: If format is invalid
    """
    # implementation here...

"""
Generate pytest tests covering:
- Valid formats: '2h', '30m', '45s', '1h30m', '2h15m30s'
- Invalid formats: empty string, 'invalid', '1x'
- Edge cases: '0m', '0s', very large values
- Multiple of same unit: '2h3h' should raise ValueError
"""
```

**AI generates**:
```python
import pytest
from datetime import timedelta

def test_parse_duration_hours():
    assert parse_duration('2h') == timedelta(hours=2)
    assert parse_duration('1h') == timedelta(hours=1)

def test_parse_duration_minutes():
    assert parse_duration('30m') == timedelta(minutes=30)
    assert parse_duration('45m') == timedelta(minutes=45)

def test_parse_duration_seconds():
    assert parse_duration('45s') == timedelta(seconds=45)
    assert parse_duration('90s') == timedelta(seconds=90)

def test_parse_duration_combined():
    assert parse_duration('1h30m') == timedelta(hours=1, minutes=30)
    assert parse_duration('2h15m30s') == timedelta(hours=2, minutes=15, seconds=30)

def test_parse_duration_zero():
    assert parse_duration('0m') == timedelta(0)
    assert parse_duration('0s') == timedelta(0)

def test_parse_duration_large_values():
    assert parse_duration('100h') == timedelta(hours=100)
    assert parse_duration('9999m') == timedelta(minutes=9999)

def test_parse_duration_invalid_format():
    with pytest.raises(ValueError, match="Invalid format"):
        parse_duration('invalid')

    with pytest.raises(ValueError, match="Invalid format"):
        parse_duration('1x')

    with pytest.raises(ValueError, match="Invalid format"):
        parse_duration('')

def test_parse_duration_duplicate_units():
    with pytest.raises(ValueError, match="Duplicate unit"):
        parse_duration('2h3h')

    with pytest.raises(ValueError, match="Duplicate unit"):
        parse_duration('30m15m')
```

### Pattern 4: Refactoring

**Use case**: Improve existing code

**Template**:
```
Refactor the following code to [specific improvement]:

[Paste code]

Requirements:
- [Specific requirement 1]
- [Specific requirement 2]
- Maintain [what must stay the same]
```

**Real example**:
```python
"""
Refactor this code to be more maintainable and testable:
"""

def process_order(order_data):
    # Validate
    if not order_data.get('items'):
        return {'error': 'No items'}
    if not order_data.get('user_id'):
        return {'error': 'No user'}

    # Calculate total
    total = 0
    for item in order_data['items']:
        price = item['price']
        quantity = item['quantity']
        total += price * quantity

    # Apply discount
    if order_data.get('coupon'):
        if order_data['coupon'] == 'SAVE10':
            total *= 0.9
        elif order_data['coupon'] == 'SAVE20':
            total *= 0.8

    # Save to database
    db.orders.insert({
        'user_id': order_data['user_id'],
        'items': order_data['items'],
        'total': total,
        'coupon': order_data.get('coupon')
    })

    return {'success': True, 'total': total}

"""
Requirements:
- Separate validation, calculation, and persistence
- Make discount logic extensible
- Add type hints
- Make it easy to unit test without database
- Follow single responsibility principle
"""
```

**AI generates**:
```python
from dataclasses import dataclass
from typing import List, Dict, Optional
from decimal import Decimal

@dataclass
class OrderItem:
    price: Decimal
    quantity: int

@dataclass
class Order:
    user_id: str
    items: List[OrderItem]
    coupon: Optional[str] = None

class OrderValidator:
    """Validates order data."""

    def validate(self, order: Order) -> None:
        """
        Validate order.

        Raises:
            ValueError: If validation fails
        """
        if not order.items:
            raise ValueError("Order must have at least one item")

        if not order.user_id:
            raise ValueError("Order must have a user_id")

class OrderCalculator:
    """Calculates order totals with discounts."""

    # Discount registry - easy to extend
    DISCOUNTS: Dict[str, Decimal] = {
        'SAVE10': Decimal('0.10'),
        'SAVE20': Decimal('0.20'),
    }

    def calculate_subtotal(self, items: List[OrderItem]) -> Decimal:
        """Calculate subtotal before discounts."""
        return sum(
            item.price * item.quantity
            for item in items
        )

    def apply_discount(self, subtotal: Decimal, coupon: Optional[str]) -> Decimal:
        """Apply coupon discount if valid."""
        if not coupon or coupon not in self.DISCOUNTS:
            return subtotal

        discount_rate = self.DISCOUNTS[coupon]
        return subtotal * (Decimal('1') - discount_rate)

    def calculate_total(self, order: Order) -> Decimal:
        """Calculate final order total."""
        subtotal = self.calculate_subtotal(order.items)
        return self.apply_discount(subtotal, order.coupon)

class OrderRepository:
    """Persists orders to database."""

    def __init__(self, db):
        self.db = db

    def save(self, order: Order, total: Decimal) -> None:
        """Save order to database."""
        self.db.orders.insert({
            'user_id': order.user_id,
            'items': [{'price': str(item.price), 'quantity': item.quantity}
                     for item in order.items],
            'total': str(total),
            'coupon': order.coupon
        })

class OrderProcessor:
    """Main order processing service."""

    def __init__(
        self,
        validator: OrderValidator,
        calculator: OrderCalculator,
        repository: OrderRepository
    ):
        self.validator = validator
        self.calculator = calculator
        self.repository = repository

    def process(self, order: Order) -> Dict[str, any]:
        """
        Process an order.

        Args:
            order: Order to process

        Returns:
            Dict with 'success' and 'total' keys

        Raises:
            ValueError: If validation fails
        """
        self.validator.validate(order)
        total = self.calculator.calculate_total(order)
        self.repository.save(order, total)

        return {
            'success': True,
            'total': str(total)
        }
```

Now the code is:
- Testable (can mock repository)
- Maintainable (each class has one job)
- Extensible (easy to add new discounts)
- Type-safe (full type hints)
- Well-documented

### Pattern 5: Code Explanation

**Use case**: Understand unfamiliar code

**Template**:
```
Explain this code:

[Paste code]

Specifically:
- What is the high-level purpose?
- How does [specific part] work?
- Why might [specific approach] have been chosen?
- What are potential issues or edge cases?
```

**Real example**:
```python
"""
Explain this code:
"""

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]

"""
Specifically:
- Why use a doubly-linked list with a dictionary?
- How does _remove and _add maintain the LRU order?
- What's the time complexity of get/put operations?
"""
```

**AI explains**:
```
This is an LRU (Least Recently Used) Cache implementation.

HIGH-LEVEL PURPOSE:
- Stores key-value pairs with a capacity limit
- When capacity is exceeded, evicts the least recently used item
- Provides O(1) access time for both get and put operations

WHY DOUBLY-LINKED LIST + DICTIONARY:

The combination gives us O(1) for all operations:

1. Dictionary (hash map): O(1) lookup by key
2. Doubly-linked list: O(1) removal and insertion

The list maintains recency order:
- Most recently used at tail
- Least recently used at head
- Doubly-linked allows O(1) removal from middle

HOW _REMOVE AND _ADD WORK:

_remove(node):
- Removes node from its current position
- Updates prev.next and next.prev pointers
- O(1) because we have direct node reference

_add(node):
- Adds node at tail (most recent position)
- Inserts between tail.prev and tail
- O(1) operation

LRU ORDER MAINTENANCE:

On get():
- Remove node from current position
- Add to tail (mark as most recently used)

On put():
- If key exists: remove old node
- Add new node to tail
- If over capacity: remove head.next (LRU item)

TIME COMPLEXITY:
- get(): O(1) - dict lookup + list operations
- put(): O(1) - dict insert + list operations

SPACE COMPLEXITY:
- O(capacity) - stores at most capacity items

POTENTIAL ISSUES:
- Not thread-safe (would need locks for concurrent access)
- No TTL (time-to-live) - items never expire on their own
- Memory overhead from doubly-linked list pointers
```

## Advanced Prompting Techniques

Once you master basic prompts, these advanced techniques multiply your effectiveness.

### Technique 1: Providing Context

Give the AI information about your codebase, conventions, and architecture.

**Example**:
```typescript
/**
 * Context: Our codebase uses:
 * - React with TypeScript
 * - React Query for data fetching
 * - Zod for validation
 * - Tailwind for styling
 * - We prefer composition over inheritance
 * - We keep components under 200 lines
 * - We co-locate tests with components
 *
 * Task: Create a UserProfile component that:
 * - Fetches user data with React Query
 * - Validates response with Zod
 * - Shows loading and error states
 * - Is fully accessible (ARIA labels)
 */

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  // AI will generate component following the conventions above
```

### Technique 2: Iterative Refinement

Don't expect perfection on first try. Refine iteratively.

**First prompt**:
```
Create a function to validate passwords
```

**Review AI output, then refine**:
```
Update the password validation to:
- Require at least one uppercase letter
- Require at least one number
- Require at least one special character
- Be at least 12 characters long
- Return specific error messages for each violation
```

**Review again, then refine further**:
```
Add a strength indicator that returns:
- "weak": meets minimum requirements
- "medium": > 14 chars with multiple character types
- "strong": > 16 chars with all character types and no dictionary words
```

Each iteration improves the result.

### Technique 3: Show, Don't Tell

Instead of describing what you want, show examples.

**Less effective**:
```
Create an API client with error handling and retry logic
```

**More effective**:
```typescript
// Create an API client following this pattern:

class ExampleClient {
  async fetchData<T>(endpoint: string): Promise<T> {
    // Should include:
    // - Automatic retry on 5xx errors (max 3 attempts)
    // - Timeout of 30 seconds
    // - Auth header injection
    // - JSON parsing
    // - Typed errors (NetworkError, TimeoutError, etc.)
  }
}

// Example usage:
const client = new APIClient('https://api.example.com', apiKey);
const data = await client.fetchData<User>('/users/123');
```

### Technique 4: Specify Negative Cases

Tell the AI what NOT to do.

```python
def calculate_fibonacci(n: int) -> int:
    """
    Calculate nth Fibonacci number.

    Requirements:
    - Use iteration, NOT recursion (for performance)
    - Return 0 for n=0, 1 for n=1
    - Raise ValueError for negative n
    - DO NOT use memoization/caching (not needed for iterative)
    - DO NOT import external libraries

    Args:
        n: Position in Fibonacci sequence (0-indexed)

    Returns:
        nth Fibonacci number

    Example:
        >>> calculate_fibonacci(10)
        55
    """
```

### Technique 5: Chain of Thought

For complex tasks, break down the thought process.

```python
"""
Create a function to find the longest palindromic substring.

Thought process:
1. For each possible center point (single char or between chars)
2. Expand outward while characters match
3. Track the longest palindrome found
4. Return that palindrome

Requirements:
- O(n²) time complexity (expand around center approach)
- O(1) space complexity (no DP table)
- Handle empty string and single character
- Include comprehensive test cases
"""

def longest_palindrome(s: str) -> str:
```

The AI will follow the thought process you've outlined.

## Common Prompting Mistakes

### Mistake 1: Vague Requirements

**❌ Bad**:
```
// Make this function better
function processData(data) { ... }
```

**✅ Good**:
```
/**
 * Refactor processData to:
 * 1. Add TypeScript types
 * 2. Split into smaller functions (validation, transformation, output)
 * 3. Add error handling for invalid data
 * 4. Improve performance by avoiding nested loops
 */
function processData(data) { ... }
```

### Mistake 2: No Error Handling Specification

**❌ Bad**:
```python
def fetch_user(user_id):
    """Fetch user from API."""
```

**✅ Good**:
```python
def fetch_user(user_id: str) -> User:
    """
    Fetch user from API.

    Args:
        user_id: User identifier

    Returns:
        User object

    Raises:
        ValueError: If user_id is invalid format
        NotFoundError: If user doesn't exist
        NetworkError: If API request fails after retries
    """
```

### Mistake 3: No Examples

**❌ Bad**:
```
Parse a date string in various formats
```

**✅ Good**:
```python
def parse_date(date_str: str) -> datetime:
    """
    Parse date string in multiple formats.

    Supported formats:
    - '2024-01-15' (ISO)
    - '01/15/2024' (US)
    - '15/01/2024' (EU)
    - 'January 15, 2024'
    - '15 Jan 2024'

    Examples:
        >>> parse_date('2024-01-15')
        datetime(2024, 1, 15)
        >>> parse_date('01/15/2024')
        datetime(2024, 1, 15)
    """
```

### Mistake 4: Assuming Context

**❌ Bad**:
```
// Add authentication middleware
```

**✅ Good**:
```typescript
/**
 * Create Express middleware for JWT authentication.
 *
 * Context:
 * - We use JWT tokens in Authorization header ("Bearer <token>")
 * - Tokens are signed with HS256 algorithm
 * - Secret stored in process.env.JWT_SECRET
 * - Token payload has { userId, email, role }
 *
 * Behavior:
 * - Verify token signature
 * - Check expiration
 * - Attach payload to req.user
 * - Return 401 if invalid/expired
 * - Return 403 if missing
 */
```

### Mistake 5: Not Reviewing Output

**The biggest mistake**: Accepting AI-generated code without review.

Always:
- Read the generated code
- Understand what it does
- Test it thoroughly
- Check for edge cases
- Verify performance
- Ensure security

## Measuring Prompt Effectiveness

How do you know if your prompts are good?

### Metrics to Track

**1. First-time acceptance rate**
- How often is AI output usable without modification?
- Target: 60-80% for well-prompted tasks

**2. Iteration count**
- How many refinements needed to get desired result?
- Target: 1-2 iterations for most tasks

**3. Error density**
- Bugs per 100 lines of AI-generated code
- Compare to your manually-written code

**4. Time savings**
- Time to complete task with AI vs. without
- Target: 2-3x faster for suitable tasks

### Example Tracking

```
Task: Create user registration API endpoint

Manual approach:
- Time: 45 minutes
- Bugs found in review: 2
- Lines of code: 120

AI-assisted (poor prompt):
- Time: 35 minutes (including 4 iterations)
- Bugs found in review: 3
- Lines of code: 130

AI-assisted (good prompt):
- Time: 15 minutes (including 1 iteration)
- Bugs found in review: 1
- Lines of code: 115

Conclusion: Good prompting saved 30 minutes (67% reduction)
```

## Building Your Prompt Library

The most effective AI-assisted developers build reusable prompt templates.

### Creating Templates

**Example: API Endpoint Template**

```typescript
/**
 * TEMPLATE: Express API Endpoint
 *
 * Replace:
 * - [RESOURCE]: Resource name (e.g., "User", "Order")
 * - [ACTION]: Action name (e.g., "Create", "Update", "Delete")
 * - [VALIDATION]: Validation requirements
 * - [BUSINESS_LOGIC]: Business logic description
 *
 * Standards:
 * - Use Zod for validation
 * - Return proper HTTP status codes
 * - Include error handling
 * - Add OpenAPI comments
 * - Use async/await
 */

/**
 * @openapi
 * /api/[resources]/[action]:
 *   post:
 *     description: [ACTION] a [RESOURCE]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/[RESOURCE][ACTION]Request'
 */
router.post('/[resources]/[action]', async (req, res) => {
  // Validation: [VALIDATION]
  // Business logic: [BUSINESS_LOGIC]
  // Response: [RESPONSE_FORMAT]
```

### Organizing Templates

Create a `prompts/` directory in your project:

```
prompts/
├── functions/
│   ├── async-handler.md
│   ├── validation.md
│   └── retry-logic.md
├── classes/
│   ├── repository.md
│   ├── service.md
│   └── controller.md
├── api/
│   ├── rest-endpoint.md
│   ├── graphql-resolver.md
│   └── websocket-handler.md
└── tests/
    ├── unit-test.md
    ├── integration-test.md
    └── e2e-test.md
```

### Example Template: Repository Pattern

```typescript
/**
 * Repository Template
 *
 * Usage:
 * 1. Replace [ENTITY] with your entity name
 * 2. Replace [TABLE] with database table name
 * 3. Fill in specific query methods needed
 *
 * Standards:
 * - All methods return Promise
 * - Use parameterized queries (no SQL injection)
 * - Include proper error handling
 * - Add TypeScript types
 * - Support transactions where appropriate
 */

interface [ENTITY]Repository {
  /**
   * Find [ENTITY] by ID.
   *
   * @param id - [ENTITY] identifier
   * @returns [ENTITY] if found, null otherwise
   * @throws DatabaseError if query fails
   */
  findById(id: string): Promise<[ENTITY] | null>;

  /**
   * Find all [ENTITY]s matching filter.
   *
   * @param filter - Filter criteria
   * @param options - Pagination and sorting options
   * @returns Array of [ENTITY]s
   * @throws DatabaseError if query fails
   */
  findMany(
    filter: [ENTITY]Filter,
    options?: QueryOptions
  ): Promise<[ENTITY][]>;

  /**
   * Create new [ENTITY].
   *
   * @param data - [ENTITY] data
   * @returns Created [ENTITY] with generated ID
   * @throws ValidationError if data is invalid
   * @throws DatabaseError if insert fails
   */
  create(data: Create[ENTITY]Input): Promise<[ENTITY]>;

  /**
   * Update existing [ENTITY].
   *
   * @param id - [ENTITY] identifier
   * @param data - Updated fields
   * @returns Updated [ENTITY]
   * @throws NotFoundError if [ENTITY] doesn't exist
   * @throws DatabaseError if update fails
   */
  update(id: string, data: Update[ENTITY]Input): Promise<[ENTITY]>;

  /**
   * Delete [ENTITY].
   *
   * @param id - [ENTITY] identifier
   * @returns true if deleted, false if not found
   * @throws DatabaseError if delete fails
   */
  delete(id: string): Promise<boolean>;
}
```

## Key Takeaways

1. **Prompt quality directly determines output quality**: Spend time on your prompts

2. **Specificity wins**: The more specific your prompt, the better the result

3. **Show examples**: Examples are worth thousands of words

4. **Iterate**: First results are rarely perfect; refine

5. **Build a library**: Reuse successful prompts as templates

6. **Always review**: Never trust AI output blindly

7. **Context matters**: Provide relevant context about your codebase

8. **Specify errors**: Tell the AI how to handle errors

9. **Track effectiveness**: Measure and improve your prompting skills

10. **Learn from failures**: When AI generates bad code, analyze why and improve your prompt

## What's Next

You now understand how to communicate effectively with AI coding assistants through prompt engineering.

But prompt engineering is just one piece of the puzzle. The next question is: **How do you integrate AI into your actual daily development workflow?**

That's what we'll explore in the next chapter.

---

**Next**: Chapter 3 - Development Workflow Integration
