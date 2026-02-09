# @segha/watchmode

[![npm version](https://img.shields.io/npm/v/%40segha%2Fwatchmode.svg)](https://www.npmjs.com/package/@segha/watchmode) [![npm downloads](https://img.shields.io/npm/dm/%40segha%2Fwatchmode.svg)](https://www.npmjs.com/package/@segha/watchmode) [![license](https://img.shields.io/npm/l/%40segha%2Fwatchmode.svg)](https://github.com/aitorllj93/segha) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![zod](https://img.shields.io/badge/zod-schema-3068b7.svg)](https://zod.dev/)

Schemas for Watchmode

## Requirements

- `zod`


## Installation

```bash
pnpm add @segha/watchmode
```

## Usage

```typescript
import { FreeServiceTypeSchema, IdMappingEntrySchema, IdMappingSchema, ... } from '@segha/watchmode';

// Validate data
const result = FreeServiceTypeSchema.parse(data);

// Infer TypeScript types
type FreeServiceType = z.infer<typeof FreeServiceTypeSchema>;
```

You can also import specific submodules:

```typescript
import { SpecSchema, ConfigurationSchema } from '@segha/watchmode/api';
```

### Schemas

- [FreeServiceType](#freeservicetype)
- [IdMappingEntry](#idmappingentry)
- [IdMapping](#idmapping)
- [PurchaseServiceType](#purchaseservicetype)
- [StreamingSource](#streamingsource)
- [StreamingSourceType](#streamingsourcetype)
- [StreamingSourcesParameters](#streamingsourcesparameters)
- [StreamingSources](#streamingsources)
- [SubscriptionServiceType](#subscriptionservicetype)
- [TVEServiceType](#tveservicetype)
- [TitleStreamingSource](#titlestreamingsource)
- [TitleStreamingSourcesParameters](#titlestreamingsourcesparameters)
- [TitleStreamingSources](#titlestreamingsources)

## API Reference

## FreeServiceType

Free ad-supported services (Tubi, Pluto TV, etc.)

_Literal `'free'` value._

## IdMappingEntry

_Object containing the following properties:_

| Property                | Description  | Type     |
| :---------------------- | :----------- | :------- |
| **`Watchmode ID`** (\*) | Watchmode ID | `string` |
| **`IMDB ID`** (\*)      | IMDB ID      | `string` |
| **`TMDB ID`** (\*)      | TMDB ID      | `string` |
| **`TMDB Type`** (\*)    | TMDB Type    | `string` |
| **`Title`** (\*)        | Title        | `string` |
| **`Year`** (\*)         | Year         | `string` |

_(\*) Required._

## IdMapping

_Array of [IdMappingEntry](#idmappingentry) items._

## PurchaseServiceType

Rental/purchase services (iTunes, Vudu, etc.)

_Literal `'purchase'` value._

## StreamingSource

_Object containing the following properties:_

| Property                         | Description            | Type                                        |
| :------------------------------- | :--------------------- | :------------------------------------------ |
| **`id`** (\*)                    | ID                     | `number`                                    |
| **`name`** (\*)                  | Name                   | `string`                                    |
| **`type`** (\*)                  | Streaming source type  | [StreamingSourceType](#streamingsourcetype) |
| **`logo_100px`** (\*)            | Logo 100px             | `string`                                    |
| **`ios_appstore_url`** (\*)      | iOS App Store URL      | `string` (_nullable_)                       |
| **`android_playstore_url`** (\*) | Android Play Store URL | `string` (_nullable_)                       |
| **`android_tv_url`** (\*)        | Android TV URL         | `string` (_nullable_)                       |
| **`fire_tv_url`** (\*)           | Fire TV URL            | `string` (_nullable_)                       |
| **`roku_url`** (\*)              | Roku URL               | `string` (_nullable_)                       |
| **`tvos_url`** (\*)              | tvOS URL               | `string` (_nullable_)                       |
| **`regions`** (\*)               | Regions                | `Array<string>`                             |

_(\*) Required._

## StreamingSourceType

Streaming source type

_Union of the following possible types:_

- [SubscriptionServiceType](#subscriptionservicetype)
- [PurchaseServiceType](#purchaseservicetype)
- [FreeServiceType](#freeservicetype)
- [TVEServiceType](#tveservicetype)

## StreamingSourcesParameters

_Object containing the following properties:_

| Property           | Description                                                                                             | Type     |
| :----------------- | :------------------------------------------------------------------------------------------------------ | :------- |
| **`regions`** (\*) | Filter sources by region. Pass one or multiple 2-letter country codes comma-separated (e.g., US,GB,CA). | `string` |
| **`types`** (\*)   | Filter sources by type. Pass one or multiple types comma-separated.                                     | `string` |

_(\*) Required._

## StreamingSources

_Array of [StreamingSource](#streamingsource) items._

## SubscriptionServiceType

Subscription services (Netflix, Hulu, etc.)

_Literal `'sub'` value._

## TVEServiceType

TV Channel App (cable login required)

_Literal `'tve'` value._

## TitleStreamingSource

_Object containing the following properties:_

| Property                  | Description                                                                               | Type                                        |
| :------------------------ | :---------------------------------------------------------------------------------------- | :------------------------------------------ |
| **`source_id`** (\*)      | Source ID                                                                                 | `number`                                    |
| **`name`** (\*)           | Name                                                                                      | `string`                                    |
| **`type`** (\*)           | Streaming source type                                                                     | [StreamingSourceType](#streamingsourcetype) |
| **`region`** (\*)         | Region                                                                                    | `string`                                    |
| **`ios_url`** (\*)        | iOS deep link URL. For free plans, returns "Deeplinks available for paid plans only."     | `string` (_nullable_)                       |
| **`android_url`** (\*)    | Android deep link URL. For free plans, returns "Deeplinks available for paid plans only." | `string` (_nullable_)                       |
| **`web_url`** (\*)        | Web URL to watch the title                                                                | `string` (_nullable_)                       |
| **`tvos_url`** (\*)       | tvOS deep link. Only included if TV links are enabled for your account.                   | `string` (_nullable_)                       |
| **`android_tv_url`** (\*) | Android TV deep link. Only included if TV links are enabled for your account.             | `string` (_nullable_)                       |
| **`roku_url`** (\*)       | Roku deep link. Only included if TV links are enabled for your account.                   | `string` (_nullable_)                       |
| **`format`** (\*)         | Video quality (HD, 4K, etc.)                                                              | `string` (_nullable_)                       |
| **`price`** (\*)          | Price for rent/buy sources                                                                | `number` (_nullable_)                       |
| **`seasons`** (\*)        | Number of seasons available (for TV)                                                      | `number` (_nullable_)                       |
| **`episodes`** (\*)       | Number of episodes available (for TV)                                                     | `number` (_nullable_)                       |

_(\*) Required._

## TitleStreamingSourcesParameters

_Object containing the following properties:_

| Property           | Description                                                                                             | Type     |
| :----------------- | :------------------------------------------------------------------------------------------------------ | :------- |
| **`regions`** (\*) | Filter sources by region. Pass one or multiple 2-letter country codes comma-separated (e.g., US,GB,CA). | `string` |

_(\*) Required._

## TitleStreamingSources

_Array of [TitleStreamingSource](#titlestreamingsource) items._
