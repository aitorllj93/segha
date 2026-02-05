# @segha/obsidianmd

Schemas for ObsidianMD

## Installation

```bash
npm install @segha/obsidianmd
```

or

```bash
pnpm add @segha/obsidianmd
```

## Usage

```typescript
import { /* schemas */ } from '@segha/obsidianmd';

// Example: Validate data with a schema
// const result = YourSchema.parse(data);
```

## API Reference


## Document
_Object containing the following properties:_
| Property             | Type                                                                                       |
| :------------------- | :----------------------------------------------------------------------------------------- |
| `tags`               | `Array<string>` (_nullable_)                                                               |
| `aliases`            | `string` (_optional & nullable_) _or_ `Array<string>` (_optional & nullable_) (_nullable_) |
| `cssclasses`         | `string` (_optional & nullable_) _or_ `Array<string>` (_optional & nullable_) (_nullable_) |
| `publish`            | `boolean`                                                                                  |
| **`permalink`** (\*) | `string`                                                                                   |
| `description`        | `string`                                                                                   |
| `image`              | `string`                                                                                   |
| `cover`              | `string`                                                                                   |
_(\*) Required._
