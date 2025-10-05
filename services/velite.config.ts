import { defineConfig, defineCollection, s } from 'velite'

const services = defineCollection({
  name: 'Service',
  pattern: 'services/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    baseUrl: s.string().url().optional(),
    endpoints: s.array(s.string()).default([]),
    auth: s.string().optional(),
    metadata: s.object({
      ns: s.string().default('service'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({ ...data, url: `/services/${data.slug}` }))
})

export default defineConfig({
  root: '.',
  output: { data: '.velite', assets: 'public/static', base: '/static/', name: '[name]-[hash:6].[ext]', clean: true },
  collections: { services },
  mdx: { rehypePlugins: [], remarkPlugins: [] }
})
