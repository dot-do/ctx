import { defineConfig, defineCollection, s } from 'velite'

const business = defineCollection({
  name: 'Business',
  pattern: 'business/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.path(),
    description: s.string(),
    industry: s.string().optional(),
    founded: s.string().optional(),
    headquarters: s.string().optional(),
    employees: s.number().optional(),
    revenue: s.string().optional(),
    website: s.string().url().optional(),
    metadata: s.object({
      ns: s.string().default('business'),
      visibility: s.enum(['public', 'private', 'unlisted']).default('public')
    }).default({}),
    tags: s.array(s.string()).default([]),
    content: s.mdx()
  }).transform(data => ({ ...data, url: `/business/${data.slug}` }))
})

export default defineConfig({
  root: '.',
  output: { data: '.velite', assets: 'public/static', base: '/static/', name: '[name]-[hash:6].[ext]', clean: true },
  collections: { business },
  mdx: { rehypePlugins: [], remarkPlugins: [] }
})
