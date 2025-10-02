/**
 * O*NET + NAICS Integration Example
 *
 * Demonstrates complete taxonomy integration:
 * - NAICS: Classifies the BUSINESS (industry)
 * - O*NET: Classifies the WORK (occupation/tasks)
 * - Schema.org: Provides semantic vocabulary
 * - GDPval: Measures AI capability
 * - EPCIS: Tracks business events (5 W's + How)
 *
 * Creates a complete knowledge graph connecting:
 * Industry → Business → Services → Occupations → Tasks → AI Capability
 */

import type {
  NAICSCode,
  ONETCode,
  ONETOccupation,
  ONETTask,
  NAICSIndustry,
  NAICS_CODES,
  GDPVAL_OCCUPATIONS
} from '../types/onet-naics'
import type {
  Organization,
  Person,
  ServiceThing,
  BusinessEvent
} from '../types/semantic-business'
import { getONETOccupation, isAISuitable, calculateServicePricing } from '../types/onet-naics'

// ═══════════════════════════════════════════════════════════
// Example 1: AI Content Agency
// NAICS 541810 - Advertising Agencies
// ═══════════════════════════════════════════════════════════

/**
 * Step 1: Define the Business (NAICS classification)
 */
const contentAgency: Organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://content.agency',
  name: 'AI Content Agency',
  description: 'AI-powered content creation at software prices',
  legalName: 'AI Content Agency Inc.',
  foundingDate: '2024-01-01',

  // NAICS Classification
  naics: NAICS_CODES.ADVERTISING_AGENCIES, // 541810
  industryCategory: 'Advertising Agencies',
  additionalType: 'ProfessionalService',

  employees: [] // Defined below
}

/**
 * Step 2: Define Employees with O*NET occupations
 */
const alice: Person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'alice',
  name: 'Alice Johnson',
  givenName: 'Alice',
  familyName: 'Johnson',
  email: 'alice@content.agency',
  jobTitle: 'CEO & Founder',
  worksFor: contentAgency,

  // O*NET occupation: Management (simplified, would be specific code)
  hasOccupation: '11-1021.00', // General and Operations Managers
  knowsAbout: ['Business strategy', 'Marketing', 'Content production', 'AI/ML'],
  skills: ['Leadership', 'Strategic planning', 'Communication']
}

const contentBotAlpha: Person = {
  '@context': 'https://schema.org',
  '@type': 'Person', // AI agents modeled as Person for Schema.org compatibility
  '@id': 'contentbot-alpha',
  name: 'ContentBot Alpha',
  jobTitle: 'Senior AI Writer',
  worksFor: contentAgency,

  // O*NET occupation: Technical Writers
  hasOccupation: GDPVAL_OCCUPATIONS.TECHNICAL_WRITERS.code, // 27-3042.00
  knowsAbout: ['Technical writing', 'SEO', 'Content strategy', 'Research'],
  skills: ['Writing', 'Editing', 'SEO optimization', 'Research']
}

contentAgency.employees = [alice, contentBotAlpha]

/**
 * Step 3: Define Services mapped to O*NET tasks
 */

// Get O*NET occupation data
const technicalWriterOccupation = getONETOccupation(
  GDPVAL_OCCUPATIONS.TECHNICAL_WRITERS.code
)

// Define specific O*NET tasks
const blogWritingTask: ONETTask = {
  id: 'task-001',
  taskId: '27-3042.00-1',
  description: 'Write original blog posts optimized for search engines and readability',
  importance: 5, // Very important
  frequency: 5, // Very frequent
  isKnowledgeWork: true,
  requiresJudgment: true,
  requiresCreativity: true,
  isRoutine: false,
  gdpvalScore: 0.82, // High AI capability
  aiSuitable: true
}

const technicalDocTask: ONETTask = {
  id: 'task-002',
  taskId: '27-3042.00-2',
  description: 'Create technical documentation, user guides, and API references',
  importance: 5,
  frequency: 4,
  isKnowledgeWork: true,
  requiresJudgment: true,
  requiresCreativity: false,
  isRoutine: false,
  gdpvalScore: 0.85,
  aiSuitable: true
}

// SEO Blog Post Service
const seoBlogPostService: ServiceThing = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'seo-blog-post',
  name: 'SEO Blog Post',
  description: 'Professional blog post optimized for search engines with guaranteed quality',
  serviceType: 'Content Writing',
  provider: contentAgency,
  areaServed: 'Worldwide',
  availableChannel: 'web-app',

  // O*NET mapping
  occupation: GDPVAL_OCCUPATIONS.TECHNICAL_WRITERS.code,
  tasks: [blogWritingTask],
  requiresSkills: ['Writing', 'SEO', 'Research', 'Editing'],
  gdpvalScore: 0.82,

  // Pricing
  offers: [
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Standard Blog Post',
      price: calculateServicePricing(technicalWriterOccupation, blogWritingTask, {
        difficulty: 3,
        turnaround: 'standard',
        quality: 'standard'
      }),
      priceCurrency: 'USD',
      availability: 'InStock',
      validFrom: '2025-01-01',
      priceSpecification: {
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: 'Outcome-based pricing',
        price: 299,
        priceCurrency: 'USD',
        valueAddedTaxIncluded: false
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Rush Blog Post (24h)',
      price: calculateServicePricing(technicalWriterOccupation, blogWritingTask, {
        difficulty: 3,
        turnaround: 'rush',
        quality: 'standard'
      }),
      priceCurrency: 'USD',
      availability: 'InStock'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Premium Blog Post',
      price: calculateServicePricing(technicalWriterOccupation, blogWritingTask, {
        difficulty: 4,
        turnaround: 'standard',
        quality: 'premium'
      }),
      priceCurrency: 'USD',
      availability: 'InStock'
    }
  ]
}

// Technical Documentation Service
const technicalDocService: ServiceThing = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'technical-documentation',
  name: 'Technical Documentation',
  description: 'Comprehensive API documentation, user guides, and developer resources',
  serviceType: 'Technical Writing',
  provider: contentAgency,

  // O*NET mapping
  occupation: GDPVAL_OCCUPATIONS.TECHNICAL_WRITERS.code,
  tasks: [technicalDocTask],
  requiresSkills: ['Technical writing', 'API documentation', 'Developer tools', 'Markdown'],
  gdpvalScore: 0.85,

  offers: [
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'API Documentation',
      price: 599,
      priceCurrency: 'USD',
      availability: 'InStock'
    }
  ]
}

// ═══════════════════════════════════════════════════════════
// Example 2: AI Design Agency
// NAICS 541430 - Graphic Design Services
// ═══════════════════════════════════════════════════════════

const designAgency: Organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://design.agency',
  name: 'AI Design Agency',
  description: 'AI-powered design services for modern brands',
  legalName: 'AI Design Agency LLC',

  // NAICS Classification
  naics: NAICS_CODES.GRAPHIC_DESIGN, // 541430
  industryCategory: 'Graphic Design Services',
  additionalType: 'ProfessionalService',

  employees: []
}

const designBotPro: Person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'designbot-pro',
  name: 'DesignBot Pro',
  jobTitle: 'Senior AI Designer',
  worksFor: designAgency,

  // O*NET occupation: Graphic Designers
  hasOccupation: GDPVAL_OCCUPATIONS.GRAPHIC_DESIGNERS.code, // 27-1024.00
  knowsAbout: ['Graphic design', 'Brand identity', 'Typography', 'Color theory'],
  skills: ['Design software', 'Creative direction', 'Brand strategy']
}

const logoTask: ONETTask = {
  id: 'task-logo',
  taskId: '27-1024.00-1',
  description: 'Design brand logos and visual identity systems',
  importance: 5,
  frequency: 4,
  isKnowledgeWork: true,
  requiresJudgment: true,
  requiresCreativity: true,
  isRoutine: false,
  gdpvalScore: 0.76,
  aiSuitable: true
}

const logoDesignService: ServiceThing = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'logo-design',
  name: 'Logo Design',
  description: 'Professional logo design with multiple concepts and unlimited revisions',
  serviceType: 'Graphic Design',
  provider: designAgency,

  // O*NET mapping
  occupation: GDPVAL_OCCUPATIONS.GRAPHIC_DESIGNERS.code,
  tasks: [logoTask],
  requiresSkills: ['Graphic design', 'Brand strategy', 'Adobe Creative Suite', 'Figma'],
  gdpvalScore: 0.76,

  offers: [
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Logo Design Package',
      price: 499,
      priceCurrency: 'USD',
      availability: 'InStock'
    }
  ]
}

// ═══════════════════════════════════════════════════════════
// Example 3: AI Software Agency
// NAICS 541511 - Custom Computer Programming Services
// ═══════════════════════════════════════════════════════════

const softwareAgency: Organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://software.agency',
  name: 'AI Software Agency',
  description: 'AI-powered software development at unprecedented speed',
  legalName: 'AI Software Agency Inc.',

  // NAICS Classification
  naics: NAICS_CODES.CUSTOM_COMPUTER_PROGRAMMING, // 541511
  industryCategory: 'Custom Computer Programming Services',
  additionalType: 'ProfessionalService',

  employees: []
}

const codeBotElite: Person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'codebot-elite',
  name: 'CodeBot Elite',
  jobTitle: 'Principal AI Engineer',
  worksFor: softwareAgency,

  // O*NET occupation: Software Developers
  hasOccupation: GDPVAL_OCCUPATIONS.SOFTWARE_DEVELOPERS.code, // 15-1252.00
  knowsAbout: ['Software engineering', 'System design', 'API development', 'Testing'],
  skills: [
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'System architecture',
    'API design'
  ]
}

const apiDevTask: ONETTask = {
  id: 'task-api',
  taskId: '15-1252.00-1',
  description: 'Design and implement RESTful APIs and backend services',
  importance: 5,
  frequency: 5,
  isKnowledgeWork: true,
  requiresJudgment: true,
  requiresCreativity: true,
  isRoutine: false,
  gdpvalScore: 0.85,
  aiSuitable: true
}

const apiDevelopmentService: ServiceThing = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'api-development',
  name: 'API Development',
  description: 'Custom API development with documentation, testing, and deployment',
  serviceType: 'Software Development',
  provider: softwareAgency,

  // O*NET mapping
  occupation: GDPVAL_OCCUPATIONS.SOFTWARE_DEVELOPERS.code,
  tasks: [apiDevTask],
  requiresSkills: ['API design', 'Backend development', 'Database design', 'Testing'],
  gdpvalScore: 0.85,

  offers: [
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Custom API Development',
      price: 2999,
      priceCurrency: 'USD',
      availability: 'InStock'
    }
  ]
}

// ═══════════════════════════════════════════════════════════
// Knowledge Graph: Connecting Everything
// ═══════════════════════════════════════════════════════════

/**
 * The taxonomy connects:
 *
 * Industry (NAICS)
 *   ↓
 * Business (Organization)
 *   ↓
 * Services (ServiceThing)
 *   ↓
 * Occupations (O*NET)
 *   ↓
 * Tasks (O*NET Tasks)
 *   ↓
 * AI Capability (GDPval Score)
 *
 * This creates a knowledge graph:
 */
interface KnowledgeGraph {
  industries: NAICSIndustry[]
  businesses: Organization[]
  services: ServiceThing[]
  occupations: ONETOccupation[]
  tasks: ONETTask[]
  people: Person[]
}

const knowledgeGraph: KnowledgeGraph = {
  industries: [
    {
      code: NAICS_CODES.ADVERTISING_AGENCIES,
      title: 'Advertising Agencies',
      description:
        'Establishments primarily engaged in creating advertising campaigns and placing such advertising in media',
      sector: '54',
      subsector: '541',
      industryGroup: '5418',
      naicsIndustry: '54181',
      nationalIndustry: '541810'
    },
    {
      code: NAICS_CODES.GRAPHIC_DESIGN,
      title: 'Graphic Design Services',
      description:
        'Establishments primarily engaged in planning, designing, and managing the production of visual communication',
      sector: '54',
      subsector: '541',
      industryGroup: '5414',
      naicsIndustry: '54143',
      nationalIndustry: '541430'
    },
    {
      code: NAICS_CODES.CUSTOM_COMPUTER_PROGRAMMING,
      title: 'Custom Computer Programming Services',
      description:
        'Establishments primarily engaged in writing, modifying, testing, and supporting software to meet the needs of a particular customer',
      sector: '54',
      subsector: '541',
      industryGroup: '5415',
      naicsIndustry: '54151',
      nationalIndustry: '541511'
    }
  ],

  businesses: [contentAgency, designAgency, softwareAgency],

  services: [seoBlogPostService, technicalDocService, logoDesignService, apiDevelopmentService],

  occupations: [
    getONETOccupation(GDPVAL_OCCUPATIONS.TECHNICAL_WRITERS.code),
    getONETOccupation(GDPVAL_OCCUPATIONS.GRAPHIC_DESIGNERS.code),
    getONETOccupation(GDPVAL_OCCUPATIONS.SOFTWARE_DEVELOPERS.code)
  ],

  tasks: [blogWritingTask, technicalDocTask, logoTask, apiDevTask],

  people: [alice, contentBotAlpha, designBotPro, codeBotElite]
}

// ═══════════════════════════════════════════════════════════
// Queries and Analytics
// ═══════════════════════════════════════════════════════════

/**
 * Find all services AI can deliver profitably
 */
function findAIServices(graph: KnowledgeGraph): ServiceThing[] {
  return graph.services.filter(service => service.gdpvalScore && service.gdpvalScore >= 0.80)
}

/**
 * Find services by industry
 */
function findServicesByIndustry(graph: KnowledgeGraph, naics: NAICSCode): ServiceThing[] {
  const businesses = graph.businesses.filter(b => b.naics === naics)
  return graph.services.filter(s =>
    businesses.some(b => b['@id'] === (s.provider as Organization)?.['@id'])
  )
}

/**
 * Find services by occupation
 */
function findServicesByOccupation(graph: KnowledgeGraph, onet: ONETCode): ServiceThing[] {
  return graph.services.filter(s => s.occupation === onet)
}

/**
 * Calculate total market opportunity
 */
function calculateMarketOpportunity(graph: KnowledgeGraph): {
  totalServices: number
  aiSuitableServices: number
  avgGDPvalScore: number
  estimatedRevenue: number
} {
  const aiServices = findAIServices(graph)

  const avgScore =
    aiServices.reduce((sum, s) => sum + (s.gdpvalScore || 0), 0) / aiServices.length

  // Estimate revenue based on service count and average price
  const avgPrice =
    graph.services.reduce((sum, s) => sum + (s.offers?.[0]?.price || 0), 0) / graph.services.length
  const estimatedRevenue = aiServices.length * avgPrice * 100 // 100 orders/month per service

  return {
    totalServices: graph.services.length,
    aiSuitableServices: aiServices.length,
    avgGDPvalScore: avgScore,
    estimatedRevenue
  }
}

// ═══════════════════════════════════════════════════════════
// Example Output
// ═══════════════════════════════════════════════════════════

console.log('═══ ONET + NAICS Knowledge Graph ═══\n')

console.log('📊 Industries:', knowledgeGraph.industries.length)
knowledgeGraph.industries.forEach(industry => {
  console.log(`  - ${industry.code}: ${industry.title}`)
})

console.log('\n🏢 Businesses:', knowledgeGraph.businesses.length)
knowledgeGraph.businesses.forEach(business => {
  console.log(`  - ${business.name} (NAICS: ${business.naics})`)
})

console.log('\n🎯 Services:', knowledgeGraph.services.length)
knowledgeGraph.services.forEach(service => {
  console.log(
    `  - ${service.name} (O*NET: ${service.occupation}, Score: ${service.gdpvalScore})`
  )
})

console.log('\n👥 People:', knowledgeGraph.people.length)
knowledgeGraph.people.forEach(person => {
  console.log(`  - ${person.name} (${person.jobTitle})`)
})

console.log('\n📈 Market Opportunity:')
const opportunity = calculateMarketOpportunity(knowledgeGraph)
console.log(`  Total Services: ${opportunity.totalServices}`)
console.log(`  AI-Suitable: ${opportunity.aiSuitableServices}`)
console.log(`  Avg GDPval Score: ${opportunity.avgGDPvalScore.toFixed(2)}`)
console.log(`  Est. Monthly Revenue: $${opportunity.estimatedRevenue.toLocaleString()}`)

console.log('\n✅ Complete taxonomy integration demonstrated!')
console.log('   NAICS → Business → Services → O*NET → Tasks → GDPval')

// ═══════════════════════════════════════════════════════════
// Export
// ═══════════════════════════════════════════════════════════

export {
  contentAgency,
  designAgency,
  softwareAgency,
  seoBlogPostService,
  logoDesignService,
  apiDevelopmentService,
  knowledgeGraph,
  findAIServices,
  findServicesByIndustry,
  findServicesByOccupation,
  calculateMarketOpportunity
}
