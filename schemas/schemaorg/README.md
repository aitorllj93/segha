# @segha/schemaorg

[![npm version](https://img.shields.io/npm/v/%40segha%2Fschemaorg.svg)](https://www.npmjs.com/package/@segha/schemaorg) [![npm downloads](https://img.shields.io/npm/dm/%40segha%2Fschemaorg.svg)](https://www.npmjs.com/package/@segha/schemaorg) [![license](https://img.shields.io/npm/l/%40segha%2Fschemaorg.svg)](https://github.com/aitorllj93/segha) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![zod](https://img.shields.io/badge/zod-schema-3068b7.svg)](https://zod.dev/)

Schemas for Schema.org

## Requirements

- `zod`


## Installation

```bash
pnpm add @segha/schemaorg
```

## Usage

```typescript
import { TextSchema, ThingSchema, URLSchema } from '@segha/schemaorg';

// Validate data
const result = ThingSchema.parse(data);

// Infer TypeScript types
type Thing = z.infer<typeof ThingSchema>;
```

You can also import specific submodules:

```typescript
import { ThingSchema } from '@segha/schemaorg/thing';
```

### Schemas

- [Text](#text)
- [Thing](#thing)
- [URL](#url)

## API Reference

## Text

Data type: Text.

_String._

## Thing

The most generic type of item.

_Object containing the following properties:_

| Property                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Type                                        |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------ |
| `additionalType`            | An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. Typically the value is a URI-identified RDF class, and in this case corresponds to the use of rdf:type in RDF. Text values can be used sparingly, for cases where useful information can be added without their being an appropriate schema to reference. In the case of text values, the class label should follow the schema.org style guide. | [Text](#text) _or_ [URL](#url) (_nullable_) |
| `alternateName`             | An alias for the item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `string` (_nullable_)                       |
| `description`               | A description of the item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `string` (_nullable_)                       |
| `disambiguatingDescription` | A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation.                                                                                                                                                                                                                                                                                                              | `string` (_nullable_)                       |
| `identifier`                | The identifier property represents any kind of identifier for any kind of Thing, such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See background notes for more details.                                                                                                                                                                                                                                                                   | [Text](#text) _or_ [URL](#url) (_nullable_) |
| `image`                     | An image of the item. This can be a URL or a fully described ImageObject.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `string` (_url_) (_nullable_)               |
| `mainEntityOfPage`          | Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See background notes for details. Inverse property: mainEntity                                                                                                                                                                                                                                                                                                                                                                                          | `string` (_url_) (_nullable_)               |
| `name`                      | The name of the item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `string` (_nullable_)                       |
| `sameAs`                    | URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website.                                                                                                                                                                                                                                                                                                                                                                                             | `string` (_url_) (_nullable_)               |
| `url`                       | URL of the item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `string` (_url_) (_nullable_)               |

_All properties are optional._

## URL

Data type: URL.

_String which is a valid URL._
