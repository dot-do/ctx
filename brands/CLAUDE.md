# CLAUDE.md - brands Repository

## Project Overview

The **brands repository** (brands.do) stores **brand identity and metadata** as MDX files with Zod schema validation via Velite, enabling bidirectional synchronization with the PostgreSQL database.

**Purpose**: Define and manage brand entities as version-controlled MDX files that sync automatically to the database.

**Position**: 📝 **Content Layer** - Content source that syncs to db layer

## Schema

The Velite schema for brands includes:

### Required Fields
- **title** (string): Brand name
- **description** (string): Brief description

### Optional Fields
- **logo** (string): Path to logo image
- **website** (URL): Brand website
- **industry** (string): Industry sector
- **founded** (string): Year founded
- **headquarters** (string): Location
- **colors**: Brand color palette
  - primary, secondary, accent
- **metadata**: Namespace and visibility
- **tags** (array): Categorization tags

## Related Documentation

- **Parent**: [Root CLAUDE.md](../CLAUDE.md) - Multi-repo management
- **Database**: [db/CLAUDE.md](../db/CLAUDE.md) - Database schema and sync
- **API**: [api/CLAUDE.md](../api/CLAUDE.md) - Webhook handler

---

**Last Updated**: 2025-10-03
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/brands
