import { defineConfig, defineCollection, s } from 'velite'

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
    headquarters: s.string().optional(),
    colors: s.object({
      primary: s.string().optional(),
      secondary: s.string().optional(),
      accent: s.string().optional()
    }).optional(),
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
    brands
  },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: []
  }
})
