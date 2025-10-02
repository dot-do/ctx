/**
 * Semantic Business-as-Code
 *
 * Integrates:
 * - English Grammar (Subject-Verb-Object, Parts of Speech)
 * - Schema.org (Things as Nouns, Actions as Verbs)
 * - GS1 EPCIS CBV (5 W's + How: Who, What, When, Where, Why, How)
 *
 * Enables expressing business operations as semantically correct English sentences
 * with full TypeScript type safety.
 */

import type { Business, OKR } from './business'
import type { Service } from './service'
import type { Agent, Human, Team } from './agent'
import type { Order, Customer } from './order'
import type { ExecutionContext } from './workflow'
import type {
  NAICSCode,
  ONETCode,
  ONETOccupation,
  ONETTask,
  NAICSIndustry,
  Occupation as SchemaOccupation
} from './onet-naics'

// ═══════════════════════════════════════════════════════════
// Schema.org Base Types
// ═══════════════════════════════════════════════════════════

/**
 * Schema.org Thing - The most generic type
 * All entities inherit from Thing
 */
export interface Thing {
  '@context': 'https://schema.org'
  '@type': string
  '@id'?: string
  name: string
  description?: string
  identifier?: string
  url?: string
  image?: string
}

/**
 * Schema.org Person
 */
export interface Person extends Thing {
  '@type': 'Person'
  givenName?: string
  familyName?: string
  email?: string
  telephone?: string
  jobTitle?: string
  worksFor?: Organization

  // O*NET occupation
  hasOccupation?: SchemaOccupation | ONETCode // What they can do
  knowsAbout?: string[] // Knowledge areas
  skills?: string[] // Skills
}

/**
 * Schema.org Organization
 */
export interface Organization extends Thing {
  '@type': 'Organization'
  legalName?: string
  foundingDate?: string
  employees?: Person[]
  department?: Organization[]
  parentOrganization?: Organization

  // NAICS classification
  naics?: NAICSCode // Industry classification
  industryCategory?: string // NAICS description
  additionalType?: string // Schema.org organization type
}

/**
 * Schema.org Product
 */
export interface Product extends Thing {
  '@type': 'Product'
  brand?: Organization
  category?: string
  offers?: Offer[]
}

/**
 * Schema.org Service
 */
export interface ServiceThing extends Thing {
  '@type': 'Service'
  serviceType?: string
  provider?: Organization | Person
  areaServed?: string
  availableChannel?: string
  offers?: Offer[]

  // O*NET task mapping
  occupation?: ONETCode // Primary occupation that delivers this
  tasks?: ONETTask[] // Specific tasks involved
  requiresSkills?: string[] // Skills needed
  gdpvalScore?: number // AI capability score (0-1)
}

/**
 * Schema.org Offer (Pricing)
 */
export interface Offer extends Thing {
  '@type': 'Offer'
  price: number
  priceCurrency: string
  priceSpecification?: PriceSpecification
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  validFrom?: string
  validThrough?: string
}

export interface PriceSpecification extends Thing {
  '@type': 'PriceSpecification'
  price: number
  priceCurrency: string
  valueAddedTaxIncluded?: boolean
}

/**
 * Schema.org Place (Location)
 */
export interface Place extends Thing {
  '@type': 'Place'
  address?: string
  geo?: GeoCoordinates
}

export interface GeoCoordinates extends Thing {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
}

// ═══════════════════════════════════════════════════════════
// Schema.org Action Types (Verbs)
// ═══════════════════════════════════════════════════════════

/**
 * Schema.org Action - Base action type
 * Maps to verbs in English grammar
 */
export interface Action {
  '@context': 'https://schema.org'
  '@type': string

  // Who (Subject/Agent)
  agent: Person | Organization

  // What (Object being acted upon)
  object?: Thing

  // When (Temporal context)
  startTime?: Date | string
  endTime?: Date | string

  // Where (Spatial context)
  location?: Place

  // How (Instrument/Method)
  instrument?: Thing

  // Why (Purpose/Reason)
  purpose?: string
  result?: Thing

  // Additional context
  participant?: Person[]
  error?: Thing
  actionStatus?: ActionStatus
}

export type ActionStatus =
  | 'PotentialActionStatus'
  | 'ActiveActionStatus'
  | 'CompletedActionStatus'
  | 'FailedActionStatus'

/**
 * Schema.org CreateAction
 */
export interface CreateAction extends Action {
  '@type': 'CreateAction'
  result: Thing // What was created
}

/**
 * Schema.org AssignAction
 */
export interface AssignAction extends Action {
  '@type': 'AssignAction'
  recipient: Person | Organization // Who receives the assignment
}

/**
 * Schema.org SendAction
 */
export interface SendAction extends Action {
  '@type': 'SendAction'
  recipient: Person | Organization
  sender?: Person | Organization
}

/**
 * Schema.org ReceiveAction
 */
export interface ReceiveAction extends Action {
  '@type': 'ReceiveAction'
  sender?: Person | Organization
}

/**
 * Schema.org UpdateAction
 */
export interface UpdateAction extends Action {
  '@type': 'UpdateAction'
  targetCollection?: Thing
}

/**
 * Schema.org DeleteAction
 */
export interface DeleteAction extends Action {
  '@type': 'DeleteAction'
}

/**
 * Schema.org CheckAction
 */
export interface CheckAction extends Action {
  '@type': 'CheckAction'
}

// ═══════════════════════════════════════════════════════════
// GS1 EPCIS CBV Integration (5 W's + How)
// ═══════════════════════════════════════════════════════════

/**
 * GS1 EPCIS Event with Core Business Vocabulary
 *
 * Captures the 5 W's + How for every business event:
 * - Who: Participants, actors
 * - What: Object(s) involved (EPCs - Electronic Product Codes)
 * - When: Event time, record time
 * - Where: Read point, business location
 * - Why: Business step, disposition
 * - How: Transaction info, source/destination
 */
export interface EPCISEvent {
  '@context': 'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'
  type: 'EPCISDocument'

  // Event identification
  eventID: string
  eventTime: Date | string    // When: Official time of event
  recordTime: Date | string    // When: Time event was recorded

  // What: Objects involved
  epcList?: string[]           // Electronic Product Codes
  quantityList?: QuantityElement[]

  // Where: Location context
  readPoint?: Location         // Physical location where event occurred
  bizLocation?: Location       // Business location (warehouse, store, etc.)

  // Why: Business context
  bizStep?: BusinessStep       // What business process step
  disposition?: Disposition    // What state/condition

  // How: Transaction context
  bizTransactionList?: BizTransaction[]
  sourceList?: Source[]
  destinationList?: Destination[]

  // Who: Participants (via schema.org Action.agent)
  // Combined with Schema.org Action.agent
}

export interface QuantityElement {
  epcClass: string
  quantity: number
  uom?: string // Unit of measure
}

export interface Location {
  type: 'Location'
  id: string // GLN (Global Location Number) or URI
  name?: string
  address?: string
  geo?: GeoCoordinates
}

export type BusinessStep =
  | 'commissioning'    // Creating/registering new items
  | 'decommissioning'  // Removing items from use
  | 'shipping'         // Sending to another location
  | 'receiving'        // Accepting from another location
  | 'storing'          // Holding in inventory
  | 'picking'          // Selecting for fulfillment
  | 'packing'          // Preparing for shipment
  | 'delivering'       // Handing to customer
  | 'retail_selling'   // Point of sale
  | 'accepting'        // Accepting work/order
  | 'inspecting'       // Quality checking
  | 'repairing'        // Fixing issues
  | 'returning'        // Customer return

export type Disposition =
  | 'active'           // Ready for use
  | 'inactive'         // Not in use
  | 'in_transit'       // Being transported
  | 'in_progress'      // Work in progress
  | 'completed'        // Finished
  | 'sold'             // Transferred to customer
  | 'returned'         // Customer returned
  | 'recalled'         // Recalled from market
  | 'destroyed'        // Permanently removed
  | 'expired'          // Past useful life
  | 'damaged'          // Not usable
  | 'reserved'         // Allocated but not yet used

export interface BizTransaction {
  type: string // e.g., 'po' (purchase order), 'invoice', 'payment'
  bizTransaction: string // Transaction ID
}

export interface Source {
  type: string // e.g., 'owning_party', 'location'
  source: string // Source identifier
}

export interface Destination {
  type: string // e.g., 'owning_party', 'location'
  destination: string // Destination identifier
}

// ═══════════════════════════════════════════════════════════
// Semantic Business Event (Schema.org + EPCIS)
// ═══════════════════════════════════════════════════════════

/**
 * Business Event combining Schema.org Action + GS1 EPCIS
 *
 * This is the core event type that captures business operations
 * as semantically correct sentences with full context.
 */
export interface BusinessEvent extends Action {
  // Schema.org Action properties (inherited)
  // - agent: Who
  // - object: What
  // - startTime/endTime: When
  // - location: Where
  // - instrument: How
  // - purpose: Why

  // Additional EPCIS context
  epcis?: EPCISEvent

  // Business context
  business?: {
    id: string
    name: string
  }

  // Execution context
  context?: ExecutionContext
}

// ═══════════════════════════════════════════════════════════
// Grammar-Based API: Subject Types (Nouns)
// ═══════════════════════════════════════════════════════════

/**
 * Subject Proxy - Represents "who" in a sentence
 *
 * Usage:
 *   business.agent('Alice')
 *   business.customer('Bob')
 *   business.system
 */
export interface SubjectProxy {
  // Actors (animate nouns)
  agent: (id: string) => ActorProxy<Agent>
  customer: (id: string) => ActorProxy<Customer>
  human: (id: string) => ActorProxy<Human>
  team: (id: string) => ActorProxy<Team>
  system: ActorProxy<'system'>

  // Objects (inanimate nouns)
  order: (id: string) => ThingProxy<Order>
  service: (id: string) => ThingProxy<Service>
  deliverable: (id: string) => ThingProxy<any>
}

/**
 * Actor Proxy - For animate subjects (can perform actions)
 */
export interface ActorProxy<T> {
  // Verbs (what the actor can do)
  creates: VerbProxy<T, 'create'>
  assigns: VerbProxy<T, 'assign'>
  delivers: VerbProxy<T, 'deliver'>
  sends: VerbProxy<T, 'send'>
  receives: VerbProxy<T, 'receive'>
  checks: VerbProxy<T, 'check'>
  updates: VerbProxy<T, 'update'>
  deletes: VerbProxy<T, 'delete'>

  // State queries
  has: PropertyProxy<T>
  is: StateProxy<T>
}

/**
 * Thing Proxy - For inanimate objects (are acted upon)
 */
export interface ThingProxy<T> {
  // Passive voice (thing is acted upon)
  is: {
    created: PassiveVerbProxy<T, 'create'>
    assigned: PassiveVerbProxy<T, 'assign'>
    delivered: PassiveVerbProxy<T, 'deliver'>
    updated: PassiveVerbProxy<T, 'update'>
    deleted: PassiveVerbProxy<T, 'delete'>
  }

  // State queries
  has: PropertyProxy<T>
  was: StateProxy<T>
}

// ═══════════════════════════════════════════════════════════
// Grammar-Based API: Verb Types (Actions)
// ═══════════════════════════════════════════════════════════

/**
 * Verb Proxy - Represents actions
 *
 * Usage:
 *   agent.creates.order(...)
 *   customer.receives.deliverable(...)
 */
export interface VerbProxy<TSubject, TVerb extends string> {
  // Direct objects (what is being acted upon)
  order: (id?: string) => ContextProxy<TSubject, TVerb, Order>
  deliverable: (id?: string) => ContextProxy<TSubject, TVerb, any>
  service: (id?: string) => ContextProxy<TSubject, TVerb, Service>
  payment: (id?: string) => ContextProxy<TSubject, TVerb, any>
  work: (id?: string) => ContextProxy<TSubject, TVerb, any>
  quality: (id?: string) => ContextProxy<TSubject, TVerb, any>
  notification: (id?: string) => ContextProxy<TSubject, TVerb, any>
}

/**
 * Passive Verb Proxy - For passive voice
 *
 * Usage:
 *   order.is.created.by('agent-123')
 */
export interface PassiveVerbProxy<TObject, TVerb extends string> {
  by: (agentId: string) => ContextProxy<any, TVerb, TObject>
}

// ═══════════════════════════════════════════════════════════
// Grammar-Based API: Context (5 W's + How)
// ═══════════════════════════════════════════════════════════

/**
 * Context Proxy - Adds adverbs and prepositional phrases
 *
 * Implements GS1 EPCIS 5 W's + How:
 * - at(when) - When (temporal)
 * - in(where) - Where (spatial)
 * - via(how) - How (method/instrument)
 * - because(why) - Why (purpose/reason)
 * - for(why) - Why (purpose)
 * - with(what) - With what (companion/tool)
 * - to(who) - To whom (recipient)
 * - from(who) - From whom (source)
 */
export interface ContextProxy<TSubject, TVerb, TObject> {
  // Execute immediately (callable)
  (): Promise<BusinessEvent>

  // When (temporal context)
  at(when: Date | string | 'now' | 'immediately'): this

  // Where (spatial context)
  in(where: string | Location): this

  // How (method/instrument)
  via(how: string): this
  using(tool: string | Thing): this

  // Why (purpose/reason)
  because(why: string): this
  for(purpose: string): this

  // With what/whom (companion)
  with(companion: string | Thing): this

  // To/From (directional)
  to(recipient: string): this
  from(source: string): this

  // Business context
  step(bizStep: BusinessStep): this
  state(disposition: Disposition): this

  // Conjunctions (for compound sentences)
  and: VerbProxy<TSubject, any>
  but: VerbProxy<TSubject, any>
  then: VerbProxy<TSubject, any>
}

// ═══════════════════════════════════════════════════════════
// Grammar-Based API: Property & State Queries
// ═══════════════════════════════════════════════════════════

/**
 * Property Proxy - For "has" queries
 *
 * Usage:
 *   agent.has.capacity.for('new-order') // boolean
 */
export interface PropertyProxy<T> {
  capacity: QueryProxy
  availability: QueryProxy
  status: QueryProxy
  quality: QueryProxy
  // ... dynamically typed based on T
}

export interface QueryProxy {
  for(query: any): Promise<boolean>
  (): Promise<any>
}

/**
 * State Proxy - For "is" queries
 *
 * Usage:
 *   order.is.completed // boolean
 *   agent.is.idle // boolean
 */
export interface StateProxy<T> {
  // Common states
  active: Promise<boolean>
  inactive: Promise<boolean>
  pending: Promise<boolean>
  completed: Promise<boolean>
  failed: Promise<boolean>
  idle: Promise<boolean>
  busy: Promise<boolean>
  // ... dynamically typed based on T
}

// ═══════════════════════════════════════════════════════════
// Semantic Business Class
// ═══════════════════════════════════════════════════════════

/**
 * Semantic Business - Natural language business operations
 *
 * Usage:
 * ```typescript
 * const business = new SemanticBusiness(myBusiness)
 *
 * // Active voice: Agent creates order
 * await business.agent('Alice')
 *   .creates.order('#123')
 *   .at('2025-10-02T10:00:00Z')
 *   .in('warehouse-A')
 *   .for('customer-request')
 *   .via('dashboard')
 *
 * // Passive voice: Order is created by agent
 * await business.order('#123')
 *   .is.created
 *   .by('agent-Alice')
 *   .at('2025-10-02')
 *
 * // Questions: Does agent have capacity?
 * const hasCapacity = await business.agent('Alice').has.capacity.for('new-order')
 *
 * // State check: Is order completed?
 * const isComplete = await business.order('#123').is.completed
 * ```
 */
export class SemanticBusiness implements SubjectProxy {
  constructor(
    private business: Business,
    private eventHandler: (event: BusinessEvent) => Promise<void>
  ) {}

  // Subject proxies (nouns)
  get agent() {
    return (id: string) => this.createActorProxy('agent', id)
  }

  get customer() {
    return (id: string) => this.createActorProxy('customer', id)
  }

  get human() {
    return (id: string) => this.createActorProxy('human', id)
  }

  get team() {
    return (id: string) => this.createActorProxy('team', id)
  }

  get system() {
    return this.createActorProxy('system', 'system')
  }

  get order() {
    return (id: string) => this.createThingProxy('order', id)
  }

  get service() {
    return (id: string) => this.createThingProxy('service', id)
  }

  get deliverable() {
    return (id: string) => this.createThingProxy('deliverable', id)
  }

  // Implementation methods
  private createActorProxy(type: string, id: string): any {
    const context = {
      subject: { type, id },
      verb: undefined as string | undefined,
      object: undefined as { type: string; id?: string } | undefined,
      when: undefined as Date | string | undefined,
      where: undefined as string | Location | undefined,
      how: undefined as string | undefined,
      why: undefined as string | undefined,
      with: undefined as string | Thing | undefined,
      to: undefined as string | undefined,
      from: undefined as string | undefined,
      bizStep: undefined as BusinessStep | undefined,
      disposition: undefined as Disposition | undefined
    }

    return new Proxy({}, {
      get: (target, prop: string) => {
        // Verbs
        if (['creates', 'assigns', 'delivers', 'sends', 'receives', 'checks', 'updates', 'deletes'].includes(prop)) {
          context.verb = prop.replace(/s$/, '') // Remove trailing 's'
          return this.createVerbProxy(context)
        }

        // Queries
        if (prop === 'has') {
          return this.createPropertyProxy(context.subject)
        }
        if (prop === 'is') {
          return this.createStateProxy(context.subject)
        }

        return undefined
      }
    })
  }

  private createThingProxy(type: string, id: string): any {
    // Similar to createActorProxy but for passive voice
    return new Proxy({}, {
      get: (target, prop: string) => {
        if (prop === 'is') {
          return this.createPassiveVerbProxy(type, id)
        }
        if (prop === 'has') {
          return this.createPropertyProxy({ type, id })
        }
        if (prop === 'was') {
          return this.createStateProxy({ type, id })
        }
        return undefined
      }
    })
  }

  private createVerbProxy(context: any): any {
    return new Proxy({}, {
      get: (target, prop: string) => {
        return (id?: string) => {
          context.object = { type: prop, id }
          return this.createContextProxy(context)
        }
      }
    })
  }

  private createPassiveVerbProxy(type: string, id: string): any {
    return new Proxy({}, {
      get: (target, verb: string) => {
        return {
          by: (agentId: string) => {
            const context = {
              subject: { type: 'agent', id: agentId },
              verb,
              object: { type, id }
            }
            return this.createContextProxy(context)
          }
        }
      }
    })
  }

  private createContextProxy(context: any): any {
    const execute = async (): Promise<BusinessEvent> => {
      const event: BusinessEvent = {
        '@context': 'https://schema.org',
        '@type': `${context.verb}Action`,
        agent: context.subject,
        object: context.object,
        startTime: context.when,
        location: context.where,
        instrument: context.how,
        purpose: context.why || context.for,
        actionStatus: 'CompletedActionStatus',
        business: {
          id: this.business.id,
          name: this.business.name
        },
        epcis: context.bizStep || context.disposition ? {
          '@context': 'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
          type: 'EPCISDocument',
          eventID: `${context.verb}-${Date.now()}`,
          eventTime: context.when || new Date().toISOString(),
          recordTime: new Date().toISOString(),
          bizStep: context.bizStep,
          disposition: context.disposition,
          readPoint: context.where ? { type: 'Location', id: context.where } : undefined
        } : undefined
      }

      await this.eventHandler(event)
      return event
    }

    const proxy: any = execute

    // Context methods (5 W's + How)
    proxy.at = (when: Date | string) => {
      context.when = when
      return proxy
    }

    proxy.in = (where: string | Location) => {
      context.where = where
      return proxy
    }

    proxy.via = (how: string) => {
      context.how = how
      return proxy
    }

    proxy.using = (tool: string | Thing) => {
      context.how = typeof tool === 'string' ? tool : tool.name
      return proxy
    }

    proxy.because = (why: string) => {
      context.why = why
      return proxy
    }

    proxy.for = (purpose: string) => {
      context.for = purpose
      return proxy
    }

    proxy.with = (companion: string | Thing) => {
      context.with = companion
      return proxy
    }

    proxy.to = (recipient: string) => {
      context.to = recipient
      return proxy
    }

    proxy.from = (source: string) => {
      context.from = source
      return proxy
    }

    proxy.step = (bizStep: BusinessStep) => {
      context.bizStep = bizStep
      return proxy
    }

    proxy.state = (disposition: Disposition) => {
      context.disposition = disposition
      return proxy
    }

    // Conjunctions (return new verb proxy)
    proxy.and = this.createVerbProxy({ ...context, verb: undefined, object: undefined })
    proxy.but = this.createVerbProxy({ ...context, verb: undefined, object: undefined })
    proxy.then = this.createVerbProxy({ ...context, verb: undefined, object: undefined })

    return proxy
  }

  private createPropertyProxy(subject: any): any {
    return new Proxy({}, {
      get: (target, prop: string) => {
        return {
          for: async (query: any) => {
            // Implement property query logic
            // This would query the database/state
            return false // Placeholder
          },
          [Symbol.toPrimitive]: async () => {
            // Return property value
            return undefined // Placeholder
          }
        }
      }
    })
  }

  private createStateProxy(subject: any): any {
    return new Proxy({}, {
      get: (target, state: string) => {
        return (async () => {
          // Implement state query logic
          // This would check entity state in database
          return false // Placeholder
        })()
      }
    })
  }
}

// ═══════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════

/**
 * Convert Business to Schema.org Organization
 */
export function businessToOrganization(business: Business): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': business.id,
    name: business.name,
    description: business.mission,
    legalName: business.name,
    foundingDate: new Date().toISOString() // TODO: Add to Business type
  }
}

/**
 * Convert Service to Schema.org Service
 */
export function serviceToSchemaThing(service: Service): ServiceThing {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': service.id,
    name: service.name,
    description: `${service.name} service`,
    serviceType: service.occupation,
    offers: [{
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: `${service.name} pricing`,
      price: 0, // TODO: Extract from pricing model
      priceCurrency: 'USD'
    }]
  }
}

/**
 * Create EPCIS event from business operation
 */
export function createEPCISEvent(
  what: string[],
  when: Date | string,
  where: Location,
  why: { bizStep: BusinessStep; disposition: Disposition },
  how?: { transactions?: BizTransaction[]; source?: Source; destination?: Destination }
): EPCISEvent {
  return {
    '@context': 'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
    type: 'EPCISDocument',
    eventID: `event-${Date.now()}`,
    eventTime: typeof when === 'string' ? when : when.toISOString(),
    recordTime: new Date().toISOString(),
    epcList: what,
    readPoint: where,
    bizLocation: where,
    bizStep: why.bizStep,
    disposition: why.disposition,
    bizTransactionList: how?.transactions,
    sourceList: how?.source ? [how.source] : undefined,
    destinationList: how?.destination ? [how.destination] : undefined
  }
}
