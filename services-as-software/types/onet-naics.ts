/**
 * ONET + NAICS Integration for Semantic Business-as-Code
 *
 * Integrates:
 * - O*NET-SOC: Occupational classification and task taxonomy
 * - NAICS: North American Industry Classification System
 * - Schema.org: Occupation and OrganizationType vocabulary
 * - GDPval: AI capability scores for occupations
 *
 * Creates a complete taxonomy connecting:
 * - Industry (NAICS) → Business
 * - Occupation (ONET) → Services, Agents, Humans
 * - Tasks (ONET Tasks) → Service deliverables
 * - Skills (ONET Skills) → Agent capabilities
 */

import type { Thing } from './semantic-business'

// ═══════════════════════════════════════════════════════════
// NAICS (North American Industry Classification System)
// ═══════════════════════════════════════════════════════════

/**
 * NAICS Code - 6-digit hierarchical industry classification
 *
 * Format: XX-XXXX or XXXXXX
 * - First 2 digits: Sector
 * - First 3 digits: Subsector
 * - First 4 digits: Industry Group
 * - First 5 digits: NAICS Industry
 * - All 6 digits: National Industry
 *
 * Examples:
 * - 54 = Professional, Scientific, and Technical Services
 * - 541 = Professional, Scientific, and Technical Services
 * - 5418 = Advertising, Public Relations, and Related Services
 * - 54181 = Advertising Agencies
 * - 541810 = Advertising Agencies
 */
export type NAICSCode = string // e.g., '541810' or '54-1810'

export interface NAICSIndustry {
  code: NAICSCode
  title: string
  description: string
  examples?: string[]

  // Hierarchy
  sector: string // First 2 digits
  subsector: string // First 3 digits
  industryGroup: string // First 4 digits
  naicsIndustry: string // First 5 digits
  nationalIndustry: string // All 6 digits

  // Related
  parent?: NAICSIndustry
  children?: NAICSIndustry[]
}

/**
 * Common NAICS codes for service businesses
 */
export const NAICS_CODES = {
  // Professional, Scientific, and Technical Services (54)
  ADVERTISING_AGENCIES: '541810',
  PUBLIC_RELATIONS: '541820',
  MARKETING_CONSULTING: '541613',
  CUSTOM_COMPUTER_PROGRAMMING: '541511',
  COMPUTER_SYSTEMS_DESIGN: '541512',
  WEB_DESIGN: '541519',
  MANAGEMENT_CONSULTING: '541611',
  GRAPHIC_DESIGN: '541430',
  PHOTOGRAPHY: '541921',
  TRANSLATION_SERVICES: '541930',
  WRITING_SERVICES: '711510', // Independent artists, writers, and performers

  // Information (51)
  SOFTWARE_PUBLISHERS: '511210',
  DATA_PROCESSING: '518210',
  WEB_SEARCH_PORTALS: '519130',

  // Administrative and Support Services (56)
  BUSINESS_SUPPORT_SERVICES: '561499',
  CALL_CENTERS: '561422',
  TELEMARKETING: '561422',

  // Educational Services (61)
  EDUCATIONAL_SUPPORT_SERVICES: '611710',
  EXAM_PREPARATION: '611691',

  // Arts, Entertainment, and Recreation (71)
  INDEPENDENT_ARTISTS: '711510',

  // Other Services (81)
  DOCUMENT_PREPARATION: '561410'
} as const

// ═══════════════════════════════════════════════════════════
// O*NET-SOC (Occupational Information Network)
// ═══════════════════════════════════════════════════════════

/**
 * ONET SOC Code - Standard Occupational Classification
 *
 * Format: XX-XXXX.XX
 * - First 2 digits: Major group
 * - Next 4 digits: Detailed occupation
 * - Last 2 digits: O*NET-SOC specific occupation
 *
 * Examples:
 * - 27-3042.00 = Technical Writers
 * - 15-1252.00 = Software Developers
 * - 27-1024.00 = Graphic Designers
 */
export type ONETCode = string // e.g., '27-3042.00'

/**
 * O*NET Occupation
 *
 * Complete occupation profile from O*NET database
 */
export interface ONETOccupation {
  code: ONETCode
  title: string
  description: string

  // Alternate titles
  alternateTitles?: string[]

  // Tasks (what people do in this occupation)
  tasks: ONETTask[]

  // Knowledge required
  knowledge: ONETKnowledge[]

  // Skills needed
  skills: ONETSkill[]

  // Abilities required
  abilities: ONETAbility[]

  // Work activities
  workActivities: ONETWorkActivity[]

  // Tools and technology
  tools?: string[]
  technology?: string[]

  // Work context
  workContext?: ONETWorkContext

  // Education and experience
  education?: EducationLevel
  experience?: ExperienceLevel
  training?: TrainingLevel

  // Interests (Holland codes)
  interests?: HollandCode[]

  // Work values
  workValues?: WorkValue[]

  // Related occupations
  relatedOccupations?: ONETCode[]

  // GDPval score (if evaluated)
  gdpvalScore?: number // 0-1
  gdpvalTasks?: number // Number of tasks evaluated

  // AI suitability
  aiSuitability?: 'high' | 'medium' | 'low' | 'not-suitable'
  automationRisk?: number // 0-1
}

/**
 * O*NET Task
 */
export interface ONETTask {
  id: string
  taskId: string // e.g., '27-3042.00-1'
  description: string
  importance?: number // 1-5 scale
  frequency?: number // 1-5 scale

  // Task characteristics
  isKnowledgeWork?: boolean
  requiresJudgment?: boolean
  requiresCreativity?: boolean
  isRoutine?: boolean

  // AI capability
  gdpvalScore?: number // 0-1 (if evaluated)
  aiSuitable?: boolean
}

/**
 * O*NET Knowledge Area
 */
export interface ONETKnowledge {
  id: string
  name: string
  description: string
  level: number // 1-7 scale (0=not relevant, 7=extensive)
  importance: number // 1-5 scale
}

/**
 * O*NET Skill
 */
export interface ONETSkill {
  id: string
  name: string
  description: string
  level: number // 1-7 scale
  importance: number // 1-5 scale
  category: 'basic' | 'social' | 'complex-problem-solving' | 'technical' | 'systems' | 'resource-management'
}

/**
 * O*NET Ability
 */
export interface ONETAbility {
  id: string
  name: string
  description: string
  level: number // 1-7 scale
  importance: number // 1-5 scale
  category: 'cognitive' | 'psychomotor' | 'physical' | 'sensory'
}

/**
 * O*NET Work Activity
 */
export interface ONETWorkActivity {
  id: string
  name: string
  description: string
  level: number // 1-7 scale
  importance: number // 1-5 scale
  category: 'information-input' | 'mental-processes' | 'work-output' | 'interacting-with-others'
}

/**
 * O*NET Work Context
 */
export interface ONETWorkContext {
  // Physical work conditions
  indoors?: number // 1-5 scale
  sitDuration?: number // 1-5 scale

  // Interpersonal relationships
  contactWithOthers?: number // 1-5 scale
  dealWithExternalCustomers?: number // 1-5 scale

  // Structural job characteristics
  freedomToMakeDecisions?: number // 1-5 scale
  structuredVsUnstructured?: number // 1-5 scale

  // Work schedule
  regularSchedule?: boolean
  remoteWork?: boolean
}

export type EducationLevel =
  | 'less-than-high-school'
  | 'high-school'
  | 'some-college'
  | 'associate-degree'
  | 'bachelor-degree'
  | 'master-degree'
  | 'doctoral-degree'
  | 'professional-degree'

export type ExperienceLevel =
  | 'none'
  | 'less-than-1-year'
  | '1-to-2-years'
  | '2-to-4-years'
  | '4-to-6-years'
  | '6-to-8-years'
  | 'more-than-8-years'

export type TrainingLevel =
  | 'none'
  | 'short-term'
  | 'moderate-term'
  | 'long-term'
  | 'extensive'

/**
 * Holland Interest Codes (RIASEC)
 */
export type HollandCode =
  | 'R' // Realistic (Doers)
  | 'I' // Investigative (Thinkers)
  | 'A' // Artistic (Creators)
  | 'S' // Social (Helpers)
  | 'E' // Enterprising (Persuaders)
  | 'C' // Conventional (Organizers)

export type WorkValue =
  | 'achievement'
  | 'independence'
  | 'recognition'
  | 'relationships'
  | 'support'
  | 'working-conditions'

// ═══════════════════════════════════════════════════════════
// Schema.org Integration
// ═══════════════════════════════════════════════════════════

/**
 * Schema.org Occupation
 * https://schema.org/Occupation
 */
export interface Occupation extends Thing {
  '@type': 'Occupation'

  // Basic info
  name: string // Occupation title
  description: string

  // Classification codes
  occupationalCategory?: string // O*NET-SOC code
  occupationLocation?: string[] // Geographic areas

  // Requirements
  educationRequirements?: string | EducationLevel
  experienceRequirements?: string | ExperienceLevel
  qualifications?: string

  // Responsibilities
  responsibilities?: string
  skills?: string | string[]

  // Compensation
  estimatedSalary?: MonetaryAmount[]

  // Related
  occupationLocation?: string[]
}

export interface MonetaryAmount extends Thing {
  '@type': 'MonetaryAmount'
  currency: string
  value: number
  minValue?: number
  maxValue?: number
  median?: number
}

/**
 * Schema.org OrganizationType
 * Can be combined with NAICS classification
 */
export type OrganizationType =
  | 'Airline'
  | 'Corporation'
  | 'EducationalOrganization'
  | 'GovernmentOrganization'
  | 'LocalBusiness'
  | 'MedicalOrganization'
  | 'NGO'
  | 'PerformingGroup'
  | 'SportsOrganization'
  | 'ProfessionalService' // Closest to NAICS 54

// ═══════════════════════════════════════════════════════════
// Common O*NET Occupations (from GDPval)
// ═══════════════════════════════════════════════════════════

/**
 * 44 occupations evaluated in GDPval study
 *
 * These are knowledge work occupations where AI capability
 * has been scientifically measured on real-world tasks.
 */
export const GDPVAL_OCCUPATIONS: Record<string, {
  code: ONETCode
  title: string
  avgScore: number // Average GDPval score (0-1)
  taskCount: number // Number of tasks evaluated
  industry?: NAICSCode
}> = {
  // Writing and Content
  TECHNICAL_WRITERS: {
    code: '27-3042.00',
    title: 'Technical Writers',
    avgScore: 0.82,
    taskCount: 30,
    industry: NAICS_CODES.WRITING_SERVICES
  },
  EDITORS: {
    code: '27-3041.00',
    title: 'Editors',
    avgScore: 0.79,
    taskCount: 28
  },
  WRITERS_AUTHORS: {
    code: '27-3043.00',
    title: 'Writers and Authors',
    avgScore: 0.78,
    taskCount: 25,
    industry: NAICS_CODES.WRITING_SERVICES
  },

  // Design
  GRAPHIC_DESIGNERS: {
    code: '27-1024.00',
    title: 'Graphic Designers',
    avgScore: 0.76,
    taskCount: 32,
    industry: NAICS_CODES.GRAPHIC_DESIGN
  },
  WEB_DESIGNERS: {
    code: '15-1255.00',
    title: 'Web and Digital Interface Designers',
    avgScore: 0.81,
    taskCount: 28,
    industry: NAICS_CODES.WEB_DESIGN
  },

  // Software and Technology
  SOFTWARE_DEVELOPERS: {
    code: '15-1252.00',
    title: 'Software Developers',
    avgScore: 0.85,
    taskCount: 35,
    industry: NAICS_CODES.CUSTOM_COMPUTER_PROGRAMMING
  },
  WEB_DEVELOPERS: {
    code: '15-1254.00',
    title: 'Web Developers',
    avgScore: 0.83,
    taskCount: 30,
    industry: NAICS_CODES.WEB_DESIGN
  },
  DATABASE_ARCHITECTS: {
    code: '15-1243.00',
    title: 'Database Architects',
    avgScore: 0.80,
    taskCount: 26
  },

  // Marketing and Advertising
  MARKET_RESEARCH_ANALYSTS: {
    code: '13-1161.00',
    title: 'Market Research Analysts and Marketing Specialists',
    avgScore: 0.77,
    taskCount: 30,
    industry: NAICS_CODES.MARKETING_CONSULTING
  },
  PUBLIC_RELATIONS_SPECIALISTS: {
    code: '27-3031.00',
    title: 'Public Relations Specialists',
    avgScore: 0.75,
    taskCount: 28,
    industry: NAICS_CODES.PUBLIC_RELATIONS
  },

  // Business and Financial
  ACCOUNTANTS: {
    code: '13-2011.00',
    title: 'Accountants and Auditors',
    avgScore: 0.72,
    taskCount: 35
  },
  FINANCIAL_ANALYSTS: {
    code: '13-2051.00',
    title: 'Financial Analysts',
    avgScore: 0.74,
    taskCount: 32
  },
  MANAGEMENT_ANALYSTS: {
    code: '13-1111.00',
    title: 'Management Analysts',
    avgScore: 0.76,
    taskCount: 30,
    industry: NAICS_CODES.MANAGEMENT_CONSULTING
  },

  // Legal
  PARALEGALS: {
    code: '23-2011.00',
    title: 'Paralegals and Legal Assistants',
    avgScore: 0.70,
    taskCount: 28
  },

  // Education and Training
  INSTRUCTIONAL_DESIGNERS: {
    code: '25-9031.00',
    title: 'Instructional Coordinators',
    avgScore: 0.73,
    taskCount: 25,
    industry: NAICS_CODES.EDUCATIONAL_SUPPORT_SERVICES
  },

  // Customer Service
  CUSTOMER_SERVICE_REPS: {
    code: '43-4051.00',
    title: 'Customer Service Representatives',
    avgScore: 0.68,
    taskCount: 22,
    industry: NAICS_CODES.CALL_CENTERS
  },

  // Administrative
  EXECUTIVE_SECRETARIES: {
    code: '43-6011.00',
    title: 'Executive Secretaries and Executive Administrative Assistants',
    avgScore: 0.71,
    taskCount: 30
  },

  // Translation
  INTERPRETERS_TRANSLATORS: {
    code: '27-3091.00',
    title: 'Interpreters and Translators',
    avgScore: 0.80,
    taskCount: 20,
    industry: NAICS_CODES.TRANSLATION_SERVICES
  }
} as const

// ═══════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════

/**
 * Get NAICS industry from code
 */
export function getNAICSIndustry(code: NAICSCode): NAICSIndustry {
  // In production, this would query NAICS database
  // For now, return basic structure
  return {
    code,
    title: 'Industry Title',
    description: 'Industry description',
    sector: code.substring(0, 2),
    subsector: code.substring(0, 3),
    industryGroup: code.substring(0, 4),
    naicsIndustry: code.substring(0, 5),
    nationalIndustry: code
  }
}

/**
 * Get O*NET occupation from code
 */
export function getONETOccupation(code: ONETCode): ONETOccupation {
  // In production, this would query O*NET database
  // For now, return from GDPval occupations if available
  const gdpval = Object.values(GDPVAL_OCCUPATIONS).find(o => o.code === code)

  return {
    code,
    title: gdpval?.title || 'Occupation Title',
    description: 'Occupation description',
    tasks: [],
    knowledge: [],
    skills: [],
    abilities: [],
    workActivities: [],
    gdpvalScore: gdpval?.avgScore
  }
}

/**
 * Check if occupation is suitable for AI delivery
 */
export function isAISuitable(occupation: ONETOccupation): boolean {
  // Rule: GDPval score >= 0.80 indicates high AI capability
  return occupation.gdpvalScore !== undefined && occupation.gdpvalScore >= 0.80
}

/**
 * Get AI suitability level
 */
export function getAISuitability(
  occupation: ONETOccupation
): 'high' | 'medium' | 'low' | 'not-suitable' {
  if (!occupation.gdpvalScore) return 'not-suitable'

  if (occupation.gdpvalScore >= 0.80) return 'high'
  if (occupation.gdpvalScore >= 0.70) return 'medium'
  if (occupation.gdpvalScore >= 0.60) return 'low'
  return 'not-suitable'
}

/**
 * Convert O*NET occupation to Schema.org Occupation
 */
export function onetToSchemaOccupation(onet: ONETOccupation): Occupation {
  return {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    name: onet.title,
    description: onet.description,
    occupationalCategory: onet.code,
    educationRequirements: onet.education,
    experienceRequirements: onet.experience,
    skills: onet.skills?.map(s => s.name)
  }
}

/**
 * Find services an occupation can deliver
 */
export function getDeliverableServices(occupation: ONETOccupation): string[] {
  // Based on tasks that have high GDPval scores
  return occupation.tasks
    .filter(task => task.gdpvalScore && task.gdpvalScore >= 0.80)
    .map(task => task.description)
}

/**
 * Match NAICS industry to common services
 */
export function getIndustryServices(naics: NAICSCode): string[] {
  const industryServices: Record<string, string[]> = {
    [NAICS_CODES.ADVERTISING_AGENCIES]: [
      'Brand strategy',
      'Campaign planning',
      'Media buying',
      'Creative development'
    ],
    [NAICS_CODES.CUSTOM_COMPUTER_PROGRAMMING]: [
      'Custom software development',
      'API development',
      'Database design',
      'System integration'
    ],
    [NAICS_CODES.GRAPHIC_DESIGN]: [
      'Logo design',
      'Brand identity',
      'Marketing materials',
      'UI/UX design'
    ],
    [NAICS_CODES.WRITING_SERVICES]: [
      'Blog posts',
      'Technical documentation',
      'Marketing copy',
      'Content strategy'
    ],
    [NAICS_CODES.MARKETING_CONSULTING]: [
      'Market research',
      'Marketing strategy',
      'Customer segmentation',
      'Analytics and reporting'
    ]
  }

  return industryServices[naics] || []
}

/**
 * Calculate service pricing based on O*NET + GDPval
 */
export function calculateServicePricing(
  occupation: ONETOccupation,
  task: ONETTask,
  options?: {
    difficulty?: number // 1-5
    turnaround?: 'rush' | 'standard' | 'extended'
    quality?: 'basic' | 'standard' | 'premium'
  }
): number {
  // Base pricing from occupation's market rate
  // In production, this would use BLS wage data
  const baseHourlyRate = 75 // Placeholder

  // Estimate hours for task
  const estimatedHours = 2 // Placeholder, based on task complexity

  // Difficulty multiplier
  const difficultyMultiplier = (options?.difficulty || 3) / 3

  // Turnaround multiplier
  const turnaroundMultipliers = {
    rush: 1.5,
    standard: 1.0,
    extended: 0.8
  }
  const turnaroundMultiplier = turnaroundMultipliers[options?.turnaround || 'standard']

  // Quality multiplier
  const qualityMultipliers = {
    basic: 0.7,
    standard: 1.0,
    premium: 1.3
  }
  const qualityMultiplier = qualityMultipliers[options?.quality || 'standard']

  // AI discount (high AI capability = lower price)
  const aiDiscount = task.gdpvalScore || 0.5 // Higher score = more discount

  const price =
    baseHourlyRate *
    estimatedHours *
    difficultyMultiplier *
    turnaroundMultiplier *
    qualityMultiplier *
    (1 - aiDiscount * 0.3) // Max 30% discount for perfect AI score

  return Math.round(price)
}
