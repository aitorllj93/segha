# Segha

A monorepo containing type-safe schema definitions using [Zod](https://zod.dev/) for various domains and use cases.

## Overview

Segha provides a collection of validated schemas organized into separate packages, each targeting specific domains:

- **Catalog Schemas** - Schemas for the Petroglyph Catalog tooling.
- **ObsidianMD Schemas** - Schemas for ObsidianMD document structures
- **Schema.org Schemas** - TypeScript/Zod implementations of Schema.org types

## Packages

### `@segha/catalog`

Schemas for Petroglyph Catalog, including comprehensive clothing item definitions with properties such as:

- Garment types (shirts, pants, jackets, etc.)
- Colors, patterns, and materials
- Fit, formality, and seasonal attributes
- Care instructions and status tracking
- Size and measurement data

**Exports:**
- `@segha/catalog` - Main catalog schemas
- `@segha/catalog/es` - Spanish-specific schemas
- `@segha/catalog/es/clothing` - Clothing schemas

### `@segha/obsidianmd`

Schemas for ObsidianMD document structures and metadata.

**Exports:**
- `@segha/obsidianmd` - Main ObsidianMD schemas
- `@segha/obsidianmd/document` - Document schemas
- `@segha/obsidianmd/types` - Type definitions

### `@segha/schemaorg`

TypeScript/Zod implementations of Schema.org vocabulary types, including:

- Core types like `Thing`
- Data types (`Text`, `URL`, etc.)
- Structured data schemas

**Exports:**
- `@segha/schemaorg` - Main Schema.org schemas
- `@segha/schemaorg/thing` - Thing type
- `@segha/schemaorg/datatypes` - Data type definitions
- `@segha/schemaorg/types` - Type definitions

## Installation

This is a pnpm workspace monorepo. To install dependencies:

```bash
pnpm install
```

## Usage

Each package can be imported and used independently:

```typescript
import { ClothingSchema } from '@segha/catalog/es/clothing';
import { DocumentSchema } from '@segha/obsidianmd/document';
import { ThingSchema } from '@segha/schemaorg/thing';

// Validate data
const clothing = ClothingSchema.parse({
  garment: 'Camisetas',
  slot: 'Superior',
  primary_color: 'Blanco',
  layer: 'Base',
  // ... other required fields
});
```

## Development

### Generating Documentation

Documentation is automatically generated from Zod schemas using `zod2md` with a generic script that includes additional information:

```bash
# Generate documentation for all schemas
pnpm run docs

# Or generate for a specific package
cd schemas/catalog && pnpm run docs
cd schemas/obsidianmd && pnpm run docs
cd schemas/schemaorg && pnpm run docs
```

The generic TypeScript script (`utils/generate-docs.ts`) generates standard npm-style READMEs:
- Reads metadata from `package.json`
- Includes package description, installation, and usage sections
- Auto-generates API reference from Zod schemas using `zod2md`
- No configuration files needed - just pass the title as argument

Requires `tsx` as a dev dependency (already included).

### Project Structure

```
segha/
├── schemas/          # Schema packages
│   ├── catalog/      # Catalog schemas
│   ├── obsidianmd/   # ObsidianMD schemas
│   └── schemaorg/    # Schema.org schemas
├── utils/             # Shared utilities
└── pnpm-workspace.yaml
```

## Requirements

- Node.js (version specified in package.json)
- pnpm 9.15.4+

## License

MIT

## Author

Aitor Llamas Jiménez <aitorllj93@gmail.com>

## Repository

[https://github.com/aitorllj93/segha](https://github.com/aitorllj93/segha)
