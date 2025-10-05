# Chapter 7: Refactoring and Code Quality

The code worked. It passed tests. It was in production.

But Jake Martinez couldn't stop thinking about it. The function was 300 lines long, nested six levels deep, with variable names like `temp`, `result2`, and `data_processed_final`. It worked, but it was a nightmare to understand.

"I should refactor this," Jake thought. "But it'll take a week, and I have new features to build."

Then he remembered: AI could help.

He pasted the function into ChatGPT with a simple prompt: "Refactor this for readability and maintainability."

Two minutes later, he had a suggested refactoring: the same 300-line function broken into 8 smaller functions with clear names, proper abstractions, and a simple structure.

Jake spent 30 minutes reviewing, testing, and refining. Total time: under an hour. The refactored code was dramatically better.

"This changes everything," Jake realized. "Refactoring isn't expensive anymore."

---

AI makes refactoring fast enough to do regularly. This chapter shows you how.

## Why Refactor with AI?

Traditional refactoring is time-consuming:
- Reading and understanding code: 40%
- Planning improvements: 30%
- Implementing changes: 20%
- Testing and validation: 10%

AI accelerates the first three steps, making refactoring 3-5x faster.

## Refactoring Patterns

### Pattern 1: Extract Functions

**Problem**: Long functions that do too much

**Prompt**:
```
Refactor this function by extracting logical sections into smaller functions:

```python
def process_order(order_data):
    # 300 lines of code doing:
    # - Validation
    # - Price calculation
    # - Inventory check
    # - Payment processing
    # - Email notification
```

**AI generates**:
```python
def process_order(order_data):
    """Main order processing pipeline."""
    validate_order(order_data)
    total = calculate_total_price(order_data)
    reserve_inventory(order_data.items)
    payment = process_payment(order_data.payment_info, total)
    send_confirmation_email(order_data.customer_email, payment)
    return create_order_record(order_data, payment)

def validate_order(order_data):
    """Validate order has all required fields."""
    # Extracted validation logic

def calculate_total_price(order_data):
    """Calculate order total with tax and shipping."""
    # Extracted price calculation

# ... other extracted functions
```

### Pattern 2: Simplify Complex Conditionals

**Problem**: Nested if-statements that are hard to follow

**Before**:
```javascript
if (user) {
  if (user.isActive) {
    if (user.subscription) {
      if (user.subscription.isValid) {
        if (!user.subscription.isCancelled) {
          return true;
        }
      }
    }
  }
}
return false;
```

**Prompt**: "Simplify this conditional logic"

**After**:
```javascript
function hasActiveSubscription(user) {
  if (!user || !user.isActive) return false;
  if (!user.subscription) return false;
  if (!user.subscription.isValid) return false;
  if (user.subscription.isCancelled) return false;
  return true;
}

// Or even better:
function hasActiveSubscription(user) {
  return user?.isActive &&
         user?.subscription?.isValid &&
         !user?.subscription?.isCancelled;
}
```

### Pattern 3: Replace Magic Numbers

**Problem**: Hardcoded values without explanation

**Prompt**:
```
Refactor to replace magic numbers with named constants:

def calculate_price(base_price, quantity):
    if quantity > 10:
        discount = base_price * 0.15
    else:
        discount = base_price * 0.05
    tax = (base_price - discount) * 0.0725
    return base_price - discount + tax
```

**After**:
```python
# Constants with meaningful names
BULK_ORDER_THRESHOLD = 10
BULK_DISCOUNT_RATE = 0.15
STANDARD_DISCOUNT_RATE = 0.05
SALES_TAX_RATE = 0.0725

def calculate_price(base_price, quantity):
    """Calculate final price with discounts and tax."""
    discount_rate = (BULK_DISCOUNT_RATE if quantity > BULK_ORDER_THRESHOLD
                    else STANDARD_DISCOUNT_RATE)
    discount = base_price * discount_rate
    taxable_amount = base_price - discount
    tax = taxable_amount * SALES_TAX_RATE
    return taxable_amount + tax
```

### Pattern 4: Improve Naming

**Prompt**:
```
Improve variable and function names for clarity:

def fn(d):
    r = []
    for i in d:
        if i['s'] == 'A':
            r.append(i)
    return r
```

**After**:
```python
def filter_active_items(items):
    """Return only items with 'active' status."""
    active_items = []
    for item in items:
        if item['status'] == 'active':
            active_items.append(item)
    return active_items

# Or more Pythonic:
def filter_active_items(items):
    """Return only items with 'active' status."""
    return [item for item in items if item['status'] == 'active']
```

### Pattern 5: Remove Code Duplication

**Problem**: Similar code repeated in multiple places

**Prompt**:
```
Refactor to eliminate duplication:

def create_user(data):
    if not data.get('email'):
        return {'error': 'Email required'}
    if not validate_email(data['email']):
        return {'error': 'Invalid email'}
    # ... create user

def update_user(user_id, data):
    if not data.get('email'):
        return {'error': 'Email required'}
    if not validate_email(data['email']):
        return {'error': 'Invalid email'}
    # ... update user
```

**After**:
```python
def validate_user_email(data):
    """Validate email field in user data."""
    if not data.get('email'):
        return {'error': 'Email required'}
    if not validate_email(data['email']):
        return {'error': 'Invalid email'}
    return None  # No error

def create_user(data):
    error = validate_user_email(data)
    if error:
        return error
    # ... create user

def update_user(user_id, data):
    error = validate_user_email(data)
    if error:
        return error
    # ... update user
```

## Code Quality Improvements

### Improvement 1: Add Type Hints

**Prompt**:
```
Add comprehensive type hints:

def calculate_discount(price, customer_type, coupon):
    if customer_type == 'premium':
        base_discount = 0.2
    else:
        base_discount = 0.1

    if coupon:
        base_discount += 0.05

    return price * (1 - base_discount)
```

**After**:
```python
from typing import Optional
from decimal import Decimal

def calculate_discount(
    price: Decimal,
    customer_type: str,
    coupon: Optional[str] = None
) -> Decimal:
    """
    Calculate discounted price based on customer type and coupon.

    Args:
        price: Original price
        customer_type: Either 'premium' or 'standard'
        coupon: Optional coupon code

    Returns:
        Final price after discounts
    """
    base_discount = 0.2 if customer_type == 'premium' else 0.1

    if coupon:
        base_discount += 0.05

    return price * (Decimal('1') - Decimal(str(base_discount)))
```

### Improvement 2: Add Error Handling

**Prompt**:
```
Add comprehensive error handling:

def fetch_user_data(user_id):
    response = requests.get(f'{API_URL}/users/{user_id}')
    return response.json()
```

**After**:
```python
import requests
from typing import Optional, Dict, Any

class UserNotFoundError(Exception):
    """Raised when user doesn't exist."""
    pass

class APIError(Exception):
    """Raised when API request fails."""
    pass

def fetch_user_data(user_id: str) -> Dict[str, Any]:
    """
    Fetch user data from API.

    Args:
        user_id: User identifier

    Returns:
        User data dictionary

    Raises:
        UserNotFoundError: If user doesn't exist
        APIError: If API request fails
        ValueError: If user_id is invalid
    """
    if not user_id or not isinstance(user_id, str):
        raise ValueError(f"Invalid user_id: {user_id}")

    try:
        response = requests.get(
            f'{API_URL}/users/{user_id}',
            timeout=10
        )

        if response.status_code == 404:
            raise UserNotFoundError(f"User {user_id} not found")

        response.raise_for_status()
        return response.json()

    except requests.RequestException as e:
        raise APIError(f"Failed to fetch user {user_id}: {e}")
```

### Improvement 3: Add Documentation

**Prompt**:
```
Add comprehensive documentation:

def merge_configs(default_config, user_config, environment):
    result = default_config.copy()
    result.update(user_config)
    if environment == 'production':
        result['debug'] = False
    return result
```

**After**:
```python
from typing import Dict, Any

def merge_configs(
    default_config: Dict[str, Any],
    user_config: Dict[str, Any],
    environment: str
) -> Dict[str, Any]:
    """
    Merge configuration dictionaries with environment-specific overrides.

    Merging order (later overwrites earlier):
    1. default_config (base configuration)
    2. user_config (user-specific overrides)
    3. environment-specific settings (e.g., disable debug in production)

    Args:
        default_config: Base configuration with defaults
        user_config: User-specific configuration overrides
        environment: Deployment environment ('development', 'staging', 'production')

    Returns:
        Merged configuration dictionary

    Example:
        >>> default = {'debug': True, 'log_level': 'INFO'}
        >>> user = {'log_level': 'DEBUG'}
        >>> merge_configs(default, user, 'production')
        {'debug': False, 'log_level': 'DEBUG'}

    Note:
        Production environment always sets debug=False for security.
    """
    result = default_config.copy()
    result.update(user_config)

    # Environment-specific overrides
    if environment == 'production':
        result['debug'] = False

    return result
```

## Advanced Refactoring

### Technique 1: Design Pattern Application

**Prompt**:
```
Refactor this code to use appropriate design patterns:

# Code with lots of if-elif chains based on type
def process_notification(notification):
    if notification.type == 'email':
        # Send email logic
    elif notification.type == 'sms':
        # Send SMS logic
    elif notification.type == 'push':
        # Send push notification logic
    elif notification.type == 'webhook':
        # Call webhook logic
```

**After** (Strategy Pattern):
```python
from abc import ABC, abstractmethod

class NotificationStrategy(ABC):
    @abstractmethod
    def send(self, notification):
        pass

class EmailStrategy(NotificationStrategy):
    def send(self, notification):
        # Send email logic
        pass

class SMSStrategy(NotificationStrategy):
    def send(self, notification):
        # Send SMS logic
        pass

class PushStrategy(NotificationStrategy):
    def send(self, notification):
        # Send push logic
        pass

class WebhookStrategy(NotificationStrategy):
    def send(self, notification):
        # Call webhook logic
        pass

NOTIFICATION_STRATEGIES = {
    'email': EmailStrategy(),
    'sms': SMSStrategy(),
    'push': PushStrategy(),
    'webhook': WebhookStrategy(),
}

def process_notification(notification):
    strategy = NOTIFICATION_STRATEGIES.get(notification.type)
    if not strategy:
        raise ValueError(f"Unknown notification type: {notification.type}")
    strategy.send(notification)
```

### Technique 2: Performance Optimization

**Prompt**:
```
Optimize this code for performance:

def find_common_elements(list1, list2):
    common = []
    for item in list1:
        if item in list2:
            common.append(item)
    return common
```

**After**:
```python
def find_common_elements(list1: list, list2: list) -> list:
    """
    Find elements present in both lists.

    Time complexity: O(n + m) where n=len(list1), m=len(list2)
    Space complexity: O(m) for the set

    Args:
        list1: First list
        list2: Second list

    Returns:
        List of common elements (preserves order from list1)
    """
    set2 = set(list2)  # O(m) time to create, O(1) lookups
    return [item for item in list1 if item in set2]  # O(n) time
```

### Technique 3: Modernize Legacy Code

**Prompt**:
```
Modernize this legacy code to use current best practices:

# Python 2 style code
def read_config(filename):
    f = open(filename)
    data = f.read()
    f.close()
    return data
```

**After**:
```python
from pathlib import Path
from typing import Union

def read_config(filename: Union[str, Path]) -> str:
    """
    Read configuration file contents.

    Args:
        filename: Path to configuration file

    Returns:
        File contents as string

    Raises:
        FileNotFoundError: If file doesn't exist
        PermissionError: If file can't be read
    """
    filepath = Path(filename)
    return filepath.read_text(encoding='utf-8')
```

## The Refactoring Workflow

### Step 1: Identify Code Smells

Ask AI to analyze your code:

**Prompt**:
```
Identify code smells and suggest improvements:

[paste your code]

Focus on:
- Complexity
- Duplication
- Naming
- Structure
- Performance
- Error handling
```

### Step 2: Prioritize Improvements

**Prompt**:
```
Given these code smells you identified, which should I fix first?

Prioritize by:
1. Impact on maintainability
2. Bug risk
3. Performance impact
4. Effort required
```

### Step 3: Implement Refactoring

Work through improvements iteratively:

```
Implement the #1 priority improvement you suggested.
Show me the refactored code.
```

### Step 4: Validate

```
Review this refactored code for:
- Correctness (same behavior as original)
- Edge cases (anything missed?)
- Test coverage (what tests should I add?)
```

## Key Takeaways

1. **AI makes refactoring fast**: What took hours now takes minutes
2. **Refactor regularly**: No longer too expensive to do often
3. **Start with high-impact changes**: Use AI to prioritize
4. **Always test**: Refactoring should preserve behavior
5. **Improve incrementally**: Don't try to perfect everything at once
6. **Learn patterns**: AI teaches best practices through examples
7. **Document improvements**: Explain why changes were made
8. **Combine with traditional tools**: AI + linters + tests
9. **Review AI suggestions**: Don't blindly accept
10. **Build quality in**: Make refactoring part of regular workflow

## What's Next

Refactoring improves existing code. But what about ensuring new code is high-quality from the start?

That's where AI-assisted testing and documentation come in.

---

**Next**: Chapter 8 - Testing and Documentation
