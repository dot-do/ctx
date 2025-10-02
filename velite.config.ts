import { defineConfig, defineCollection, s } from 'velite'

// Entity collection schemas
const brands = defineCollection({
  name: 'Brand',
  pattern: 'brands/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    logo: s.string().optional(),
    website: s.string().url().optional(),
    industry: s.string().optional(),
    founded: s.string().optional(),
    metadata: s.object({
      ns: s.string().default('brand'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({
    ...data,
    url: `/brands/${data.slug}`
  }))
})

const functions = defineCollection({
  name: 'Function',
  pattern: 'functions/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    type: s.enum(['code', 'generative', 'human', 'agentic']),
    inputs: s.array(s.object({
      name: s.string(),
      type: s.string(),
      description: s.string().optional(),
      required: s.boolean().default(false)
    })).default([]),
    outputs: s.array(s.object({
      name: s.string(),
      type: s.string(),
      description: s.string().optional()
    })).default([]),
    metadata: s.object({
      ns: s.string().default('function'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({
    ...data,
    url: `/functions/${data.slug}`
  }))
})

const nouns = defineCollection({
  name: 'Noun',
  pattern: 'nouns/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    schemaType: s.string().optional(), // Schema.org type
    properties: s.array(s.object({
      name: s.string(),
      type: s.string(),
      description: s.string().optional(),
      required: s.boolean().default(false)
    })).default([]),
    metadata: s.object({
      ns: s.string().default('noun'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({
    ...data,
    url: `/nouns/${data.slug}`
  }))
})

const verbs = defineCollection({
  name: 'Verb',
  pattern: 'verbs/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    subject: s.string().optional(), // What performs the action
    object: s.string().optional(), // What receives the action
    parameters: s.array(s.object({
      name: s.string(),
      type: s.string(),
      description: s.string().optional(),
      required: s.boolean().default(false)
    })).default([]),
    metadata: s.object({
      ns: s.string().default('verb'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({
    ...data,
    url: `/verbs/${data.slug}`
  }))
})

const workflows = defineCollection({
  name: 'Workflow',
  pattern: 'workflows/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    trigger: s.string().optional(),
    steps: s.array(s.object({
      name: s.string(),
      description: s.string(),
      function: s.string().optional(),
      inputs: s.record(s.string(), s.any()).optional()
    })).default([]),
    metadata: s.object({
      ns: s.string().default('workflow'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({
    ...data,
    url: `/workflows/${data.slug}`
  }))
})

const agents = defineCollection({
  name: 'Agent',
  pattern: 'agents/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    role: s.string().optional(),
    capabilities: s.array(s.string()).default([]),
    tools: s.array(s.string()).default([]),
    model: s.string().optional(),
    systemPrompt: s.string().optional(),
    metadata: s.object({
      ns: s.string().default('agent'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({
    ...data,
    url: `/agents/${data.slug}`
  }))
})

const ideas = defineCollection({
  name: 'Idea',
  pattern: 'ideas/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    status: s.enum(['concept', 'proposed', 'approved', 'in-progress', 'completed', 'rejected']).default('concept'),
    priority: s.enum(['low', 'medium', 'high', 'critical']).optional(),
    category: s.string().optional(),
    relatedTo: s.array(s.string()).default([]),
    metadata: s.object({
      ns: s.string().default('idea'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({
    ...data,
    url: `/ideas/${data.slug}`
  }))
})

export default defineConfig({
  root: '.',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    brands,
    functions,
    nouns,
    verbs,
    workflows,
    agents,
    ideas
  },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: []
  }
})
