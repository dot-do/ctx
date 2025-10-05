import { defineConfig, defineCollection, s } from 'velite'

const workers = defineCollection({
  name: 'Worker',
  pattern: '*.mdx',
  schema: s.object({
    $type: s.string().optional().default('Worker'),
    $id: s.string(),
    name: s.string(),
    description: s.string().optional(),
    main: s.string().optional().default('src/index.ts'),
    compatibility_date: s.string().optional(),
    account_id: s.string().optional(),
    routes: s.array(s.any()).optional(),
    services: s.array(s.any()).optional(),
    kv_namespaces: s.array(s.any()).optional(),
    r2_buckets: s.array(s.any()).optional(),
    d1_databases: s.array(s.any()).optional(),
    queues: s.any().optional(),
    vars: s.record(s.any()).optional(),
    observability: s.any().optional(),
    placement: s.any().optional(),
    metadata: s
      .object({
        ns: s.string().default('worker'),
        visibility: s.enum(['public', 'private', 'unlisted']).default('public'),
      })
      .default({ ns: 'worker', visibility: 'public' }),
    tags: s.array(s.string()).optional(),
    slug: s.slug('workers'),
    content: s.markdown(),
  }),
})

export default defineConfig({
  root: '.',
  output: {
    data: '.velite',
    assets: 'public',
    base: '/',
    name: '[name]-[hash:8].[ext]',
    clean: true,
  },
  collections: { workers },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
})
