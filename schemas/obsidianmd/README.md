# @segha/obsidianmd

[![npm version](https://img.shields.io/npm/v/%40segha%2Fobsidianmd.svg)](https://www.npmjs.com/package/@segha/obsidianmd) [![npm downloads](https://img.shields.io/npm/dm/%40segha%2Fobsidianmd.svg)](https://www.npmjs.com/package/@segha/obsidianmd) [![license](https://img.shields.io/npm/l/%40segha%2Fobsidianmd.svg)](https://github.com/aitorllj93/segha) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![zod](https://img.shields.io/badge/zod-schema-3068b7.svg)](https://zod.dev/)

Schemas for ObsidianMD

## Requirements

- `zod`


## Installation

```bash
pnpm add @segha/obsidianmd
```

## Usage

```typescript
import { DocumentSchema } from '@segha/obsidianmd';

// Validate data
const result = DocumentSchema.parse(data);

// Infer TypeScript types
type Document = z.infer<typeof DocumentSchema>;
```

You can also import specific submodules:

```typescript
import { DocumentSchema } from '@segha/obsidianmd/document';
```

## API Reference

## Document

Obsidian document frontmatter schema

_Object containing the following properties:_

| Property           | Description                           | Type                         |
| :----------------- | :------------------------------------ | :--------------------------- |
| `tags`             | Document tags for categorization      | `Array<string>` (_nullable_) |
| `aliases`          | Alternative names for the document    | `Array<string>` (_nullable_) |
| `cssclasses`       | CSS classes to apply to the document  | `Array<string>` (_nullable_) |
| **`publish`** (\*) | Whether to publish the document       | `boolean`                    |
| `permalink`        | Permanent link for the document       | `string`                     |
| `description`      | Document description for SEO/previews | `string`                     |
| `image`            | Featured image URL                    | `string`                     |
| `cover`            | Cover image URL                       | `string`                     |

_(\*) Required._
