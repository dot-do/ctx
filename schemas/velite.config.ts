import { defineConfig, defineCollection, s } from 'velite'

const schemas = defineCollection({
  name: 'Schema',
  pattern: 'schemas/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    type: s.enum(['json-schema', 'zod', 'graphql', 'other']).optional(),
    spec: s.string().optional(),
    metadata: s.object({
      ns: s.string().default('schema'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({ ...data, url: `/schemas/${data.slug}` }))
})

export default defineConfig({
  root: '.',
  output: { data: '.velite', assets: 'public/static', base: '/static/', name: '[name]-[hash:6].[ext]', clean: true },
  collections: { schemas },
  mdx: { rehypePlugins: [], remarkPlugins: [] }
})
