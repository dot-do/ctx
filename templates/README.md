# MDXLD Templates - GraphDL Reimagined

This directory contains templates for creating MDXLD entities that replace the complexity of GraphDL with simple, composable, AI-friendly documents.

## Philosophy

**GraphDL tried to be a DSL. MDXLD is just Markdown + TypeScript + YAML.**

- ✅ Write code that **IS** the definition
- ✅ No build steps or code generation
- ✅ AI can read/write naturally
- ✅ Human-readable documentation
- ✅ Executable immediately
- ✅ Type-safe by default
- ✅ Graph relationships built-in

## Available Templates

### 1. [Noun → Thing Template](./noun-thing-template.mdx)

**Use for:** Entities, data models, types

**GraphDL equivalent:**
```yaml
graph: MyGraph
  nouns:
    Product:
      properties:
        name: string
        price: number
```

**MDXLD approach:**
```mdx
---
$type: Product
name: Widget
price: 49.99
---

# Widget

Markdown documentation here.

\`\`\`typescript
export interface Product {
  name: string
  price: number
}
\`\`\`
```

### 2. [Verb → Function Template](./verb-function-template.mdx)

**Use for:** Actions, operations, business logic

**GraphDL equivalent:**
```yaml
verbs:
  purchase:
    subject: User
    object: Product
    implementation: ./purchase.ts
```

**MDXLD approach:**
```mdx
---
$type: Function
title: Purchase Product
inputs: [...]
outputs: [...]
---

\`\`\`typescript
export async function purchaseProduct(input) {
  // Implementation here
}
\`\`\`
```

### 3. [Graph → Collection Template](./graph-collection-template.mdx)

**Use for:** Groups of related entities

**GraphDL equivalent:**
```yaml
graph: ECommerce
  nouns: [User, Product, Order]
  verbs: [purchase, review]
```

**MDXLD approach:**
```mdx
---
$type: Collection
title: E-commerce
relatedTo:
  - /types/User
  - /types/Product
  - /functions/purchase
---

# E-commerce Collection

All entities for e-commerce functionality.
```

### 4. [Workflow Template](./workflow-template.mdx)

**Use for:** Multi-step processes, automation

**New in MDXLD** (GraphDL didn't have this!)

```mdx
---
$type: Workflow
trigger:
  type: webhook
  event: user.created
steps:
  - id: send-email
    function: /functions/send-email
---

\`\`\`typescript
export async function onboardUser(data) {
  // Workflow implementation
}
\`\`\`
```

## Quick Start

### 1. Choose a Template

Pick the template that matches what you want to create:
- **Entity/Type?** → Use Thing template
- **Action/Function?** → Use Function template
- **Collection/Graph?** → Use Collection template
- **Process/Automation?** → Use Workflow template

### 2. Copy Template

```bash
cp templates/noun-thing-template.mdx entities/my-entity.mdx
```

### 3. Customize

Replace placeholders:
- `NAMESPACE` → Your namespace (e.g., `products`, `users`)
- `IDENTIFIER` → Unique ID (e.g., `premium-widget`)
- `EntityName` → Your type name
- Fill in frontmatter properties
- Write documentation
- Add TypeScript implementation
- Include tests

### 4. Save

File is immediately:
- ✅ Documented (Markdown)
- ✅ Validated (YAML schema)
- ✅ Executable (TypeScript)
- ✅ Testable (Vitest)
- ✅ Deployable (API/MCP/RPC)

## Example: E-commerce System

Let's build a simple e-commerce system using templates.

### Step 1: Create Product Type

```bash
cp templates/noun-thing-template.mdx types/product.mdx
```

Edit `types/product.mdx`:
```mdx
---
$type: Product
title: Product
name: Product Catalog Item
metadata:
  ns: products
  visibility: public
---

# Product

Items available for purchase.

\`\`\`typescript
export interface Product {
  id: string
  name: string
  price: number
  inventory: number
}
\`\`\`
```

### Step 2: Create Purchase Function

```bash
cp templates/verb-function-template.mdx functions/purchase-product.mdx
```

Edit `functions/purchase-product.mdx`:
```mdx
---
$type: Function
title: Purchase Product
inputs:
  - name: productId
    type: string
  - name: quantity
    type: number
outputs:
  - name: orderId
    type: string
subject: User
object: Product
creates: Order
---

# Purchase Product

\`\`\`typescript
export async function purchaseProduct({ productId, quantity }) {
  const product = await db.products.findById(productId)
  const order = await db.orders.create({
    productId,
    quantity,
    total: product.price * quantity
  })
  return { orderId: order.id }
}
\`\`\`
```

### Step 3: Create E-commerce Collection

```bash
cp templates/graph-collection-template.mdx collections/ecommerce.mdx
```

Edit `collections/ecommerce.mdx`:
```mdx
---
$type: Collection
title: E-commerce
relatedTo:
  - /types/Product
  - /types/User
  - /types/Order
  - /functions/purchase-product
---

# E-commerce Collection

Complete e-commerce functionality.
```

### Step 4: Create Checkout Workflow

```bash
cp templates/workflow-template.mdx workflows/checkout.mdx
```

Edit `workflows/checkout.mdx`:
```mdx
---
$type: Workflow
title: Checkout
trigger:
  type: webhook
  event: cart.checkout
steps:
  - id: purchase
    function: /functions/purchase-product
  - id: confirm
    function: /functions/send-confirmation
---

# Checkout Workflow

Complete purchase flow.
```

### Done!

You now have a complete e-commerce system that:
- ✅ Is fully documented
- ✅ Has type-safe APIs
- ✅ Includes tests
- ✅ Can be deployed instantly
- ✅ Has graph relationships
- ✅ Is AI-discoverable

## GraphDL Migration

### Converting GraphDL to MDXLD

If you have existing GraphDL files:

**GraphDL (graph.gdl):**
```yaml
graph: MySystem
  nouns:
    User:
      properties:
        name: string
        email: string
    Product:
      properties:
        name: string
        price: number

  verbs:
    purchase:
      subject: User
      object: Product
      creates: Order
      implementation: ./purchase.ts
```

**Becomes MDXLD:**

**types/user.mdx:**
```mdx
---
$type: Person
name: User
---

\`\`\`typescript
export interface User {
  name: string
  email: string
}
\`\`\`
```

**types/product.mdx:**
```mdx
---
$type: Product
name: Product
---

\`\`\`typescript
export interface Product {
  name: string
  price: number
}
\`\`\`
```

**functions/purchase.mdx:**
```mdx
---
$type: Function
title: Purchase
subject: User
object: Product
creates: Order
---

\`\`\`typescript
export async function purchase(userId, productId) {
  // Implementation from ./purchase.ts
}
\`\`\`
```

**collections/my-system.mdx:**
```mdx
---
$type: Collection
title: My System
relatedTo:
  - /types/User
  - /types/Product
  - /functions/purchase
---

# My System

Complete system collection.
```

### Benefits of Migration

**Before (GraphDL):**
- ❌ Complex YAML DSL
- ❌ Code generation required
- ❌ Difficult to debug
- ❌ Poor IDE support
- ❌ No clear execution model

**After (MDXLD):**
- ✅ Simple Markdown + TypeScript
- ✅ No code generation
- ✅ Easy to debug
- ✅ Full IDE support (VSCode, Cursor)
- ✅ Executes immediately

## AI Integration

### Generate with AI

All templates work great with AI:

```typescript
// Generate entity with AI
const entity = await ai.generate({
  prompt: "Create a Product entity with name, price, and inventory",
  template: "noun-thing-template"
})

// AI returns complete MDXLD file ready to save
```

### AI Understands MDXLD

LLMs can:
- ✅ Read MDXLD files naturally
- ✅ Write new entities from descriptions
- ✅ Modify existing entities
- ✅ Generate tests
- ✅ Create documentation
- ✅ Suggest improvements

**Example prompt:**
```
Using the Function template, create a function that:
1. Validates email addresses
2. Checks domain MX records
3. Returns validation score
4. Include comprehensive tests
```

AI generates complete, working MDXLD file.

## Best Practices

### 1. One Entity Per File

Don't put multiple entities in one file. Keep it simple:

✅ Good:
```
types/user.mdx
types/product.mdx
functions/purchase.mdx
```

❌ Bad:
```
all-entities.mdx  # Contains everything
```

### 2. Use Descriptive IDs

Use kebab-case, descriptive IDs:

✅ Good:
```
$id: https://apis.do/functions/send-verification-email
```

❌ Bad:
```
$id: https://apis.do/functions/func123
```

### 3. Document Thoroughly

Write good Markdown docs:

✅ Good:
```mdx
# Send Email

Sends transactional emails via SendGrid.

## Usage

\`\`\`typescript
await sendEmail({ to: 'user@example.com', subject: 'Welcome' })
\`\`\`

## Error Handling

Throws `EmailError` if sending fails.
```

❌ Bad:
```mdx
# Send Email

Sends emails.
```

### 4. Include Tests

Always add test blocks:

✅ Good:
```mdx
\`\`\`typescript test
describe('sendEmail', () => {
  it('sends successfully', async () => {
    const result = await sendEmail(...)
    expect(result.messageId).toBeDefined()
  })
})
\`\`\`
```

❌ Bad:
```mdx
<!-- No tests -->
```

### 5. Use Type Safety

Define proper TypeScript interfaces:

✅ Good:
```typescript
export interface SendEmailInput {
  to: string
  subject: string
  body: string
}

export async function sendEmail(input: SendEmailInput) {
  // Type-safe!
}
```

❌ Bad:
```typescript
export async function sendEmail(to, subject, body) {
  // No types
}
```

## Advanced Patterns

### Composition

Compose functions into workflows:

```mdx
import { validateCart } from './validate-cart.mdx'
import { processPayment } from './process-payment.mdx'

\`\`\`typescript
export async function checkout(cart) {
  await validateCart(cart)
  await processPayment(cart.total)
}
\`\`\`
```

### Relationships

Link entities via `relatedTo`:

```mdx
---
$type: Function
relatedTo:
  - /types/User
  - /types/Product
  - /functions/send-email
---
```

These create graph edges automatically!

### Multi-Output

Same MDXLD generates:
- OpenAPI spec
- GraphQL schema
- TypeScript SDK
- CLI tool
- React UI
- Documentation

```bash
mdxld build functions/purchase.mdx --targets openapi,sdk,docs
```

## Support

- **Documentation:** [/notes/2025-10-02-graphdl-reimagined.md](../../notes/2025-10-02-graphdl-reimagined.md)
- **Examples:** See `ctx/` directory for real examples
- **Issues:** GitHub Issues in .do repository

## License

MIT - These templates are free to use and modify.
