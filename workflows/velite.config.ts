import { defineConfig, defineCollection, s } from 'velite'

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
  }).transform(data => ({ ...data, url: `/workflows/${data.slug}` }))
})

export default defineConfig({
  root: '.',
  output: { data: '.velite', assets: 'public/static', base: '/static/', name: '[name]-[hash:6].[ext]', clean: true },
  collections: { workflows },
  mdx: { rehypePlugins: [], remarkPlugins: [] }
})
