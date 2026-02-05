# @segha/catalog

[![npm version](https://img.shields.io/npm/v/%40segha%2Fcatalog.svg)](https://www.npmjs.com/package/@segha/catalog) [![npm downloads](https://img.shields.io/npm/dm/%40segha%2Fcatalog.svg)](https://www.npmjs.com/package/@segha/catalog) [![license](https://img.shields.io/npm/l/%40segha%2Fcatalog.svg)](https://github.com/aitorllj93/segha) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![zod](https://img.shields.io/badge/zod-schema-3068b7.svg)](https://zod.dev/)

Schemas for Petroglyph Catalog

## Requirements

- `zod`


## Installation

```bash
pnpm add @segha/catalog
```

## Usage

```typescript
import { ArticleSchema, BookSchema, CatalogArticleSchema, ... } from '@segha/catalog';

// Validate data
const result = ArticleSchema.parse(data);

// Infer TypeScript types
type Article = z.infer<typeof ArticleSchema>;
```

You can also import specific submodules:

```typescript
import { CatalogClothingSchema, DetailedClothingSchema, MetaClothingSchema } from '@segha/catalog/en/clothing';
```

### Schemas

- [Article](#article)
- [Book](#book)
- [CatalogArticle](#catalogarticle)
- [CatalogBook](#catalogbook)
- [CatalogClothing](#catalogclothing)
- [CatalogMovie](#catalogmovie)
- [Clothing](#clothing)
- [DetailedArticle](#detailedarticle)
- [DetailedBook](#detailedbook)
- [DetailedClothing](#detailedclothing)
- [DetailedMovie](#detailedmovie)
- [MetaArticle](#metaarticle)
- [MetaBook](#metabook)
- [MetaClothing](#metaclothing)
- [MetaMovie](#metamovie)
- [Movie](#movie)
- [Note](#note)

## API Reference

## Article

Article

_Object containing the following properties:_

| Property            | Description            | Type                                                     |
| :------------------ | :--------------------- | :------------------------------------------------------- |
| **`title`** (\*)    | Title of the article   | `string`                                                 |
| `description`       | Description            | `string`                                                 |
| `excerpt`           | Extract of the article | `string`                                                 |
| **`author`** (\*)   | Authors                | `Array<string>`                                          |
| `published`         | Year of publication    | `string`                                                 |
| **`status`** (\*)   | Reading status         | `'Pending' \| 'In Progress' \| 'Read' \| 'Consolidated'` |
| **`projects`** (\*) | Projects               | `Array<string>`                                          |
| **`topics`** (\*)   | Topics                 | `Array<string>`                                          |
| **`rating`** (\*)   | Rating of the article  | `number`                                                 |
| **`type`** (\*)     |                        | `'[[Sources]]'`                                          |
| **`format`** (\*)   |                        | `'[[Articles]]'`                                         |
| **`areas`** (\*)    |                        | `Array<'[[Knowledge]]'>`                                 |
| **`color`** (\*)    |                        | `'#3171B2'`                                              |
| **`icon`** (\*)     |                        | `'newspaper'`                                            |
| `banner`            |                        | `string`                                                 |
| **`url`** (\*)      | URL of the article     | `string`                                                 |

_(\*) Required._

## Book

Book

_Object containing the following properties:_

| Property                  | Description                          | Type                                                     |
| :------------------------ | :----------------------------------- | :------------------------------------------------------- |
| **`title`** (\*)          | Title of the book                    | `string`                                                 |
| `subtitle`                | Subtitle of the book                 | `string`                                                 |
| `description`             | Description of the book              | `string`                                                 |
| **`author`** (\*)         | Authors                              | `Array<string>`                                          |
| **`published`** (\*)      | Year of publication                  | `string`                                                 |
| **`categories`** (\*)     | Categories                           | `Array<string>`                                          |
| **`status`** (\*)         | Reading status                       | `'Pending' \| 'In Progress' \| 'Read' \| 'Consolidated'` |
| **`topics`** (\*)         | Topics                               | `Array<string>`                                          |
| **`rating`** (\*)         | Rating of the book                   | `number`                                                 |
| **`online_rating`** (\*)  | Online rating                        | `number`                                                 |
| **`last_time_read`** (\*) | Last time read                       | `string`                                                 |
| **`times_read`** (\*)     | Times read                           | `number`                                                 |
| **`type`** (\*)           |                                      | `'[[Sources]]'`                                          |
| **`format`** (\*)         |                                      | `'[[Books]]'`                                            |
| **`areas`** (\*)          |                                      | `Array<'[[Knowledge]]'>`                                 |
| **`color`** (\*)          |                                      | `'#3171B2'`                                              |
| **`icon`** (\*)           |                                      | `'book'`                                                 |
| `cover`                   |                                      | `string`                                                 |
| **`url`** (\*)            | URL of the book in Amazon or similar | `string`                                                 |
| **`read_url`** (\*)       | URL of the reading of the book       | `string`                                                 |

_(\*) Required._

## CatalogArticle

Article: Data obtained from catalogation

_Object containing the following properties:_

| Property          | Description            | Type            |
| :---------------- | :--------------------- | :-------------- |
| **`title`** (\*)  | Title of the article   | `string`        |
| `description`     | Description            | `string`        |
| `excerpt`         | Extract of the article | `string`        |
| **`author`** (\*) | Authors                | `Array<string>` |
| `published`       | Year of publication    | `string`        |

_(\*) Required._

## CatalogBook

Book: Data obtained from catalogation

_Object containing the following properties:_

| Property              | Description             | Type            |
| :-------------------- | :---------------------- | :-------------- |
| **`title`** (\*)      | Title of the book       | `string`        |
| `subtitle`            | Subtitle of the book    | `string`        |
| `description`         | Description of the book | `string`        |
| **`author`** (\*)     | Authors                 | `Array<string>` |
| **`published`** (\*)  | Year of publication     | `string`        |
| **`categories`** (\*) | Categories              | `Array<string>` |

_(\*) Required._

## CatalogClothing

Clothing item: Catalogable data

_Object containing the following properties:_

| Property                 | Description                           | Type                                                                                                                                                                                                                                                                                                                |
| :----------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`name`** (\*)          | Descriptive name of the clothing item | `string`                                                                                                                                                                                                                                                                                                            |
| **`garment`** (\*)       | Garment Type                          | `'Undershirts' \| 'Boxers' \| 'Panties' \| 'Bras' \| 'Socks' \| 'T-Shirts' \| 'Polo Shirts' \| 'Shirts' \| 'Blouses' \| 'Tops' \| 'Sweaters' \| 'Hoodies' \| 'Cardigans' \| 'Jackets' \| 'Pants' \| 'Jeans' \| 'Chinos' \| 'Skirts' \| 'Shorts' \| 'Blazers' \| ...`                                                |
| **`slot`** (\*)          | Outfit part                           | `'Top' \| 'Bottom' \| 'Full Body' \| 'Outer' \| 'Footwear' \| 'Accessories'`                                                                                                                                                                                                                                        |
| `variants`               | Structural Details                    | `Array<'Sleeveless' \| 'Short Sleeves' \| 'Long Sleeves' \| 'Round Neck' \| 'V-Neck' \| 'High Neck' \| 'Shirt Collar' \| 'Polo Collar' \| 'Boat Neck' \| 'Mandarin Collar' \| 'Funnel Neck' \| 'Hood' \| 'Overshirt' \| 'Cropped' \| 'Long' \| 'Straight Leg' \| 'Skinny' \| 'Wide' \| 'Cargo' \| 'Flared' \| ...>` |
| `fit`                    | Fit                                   | `'Fitted' \| 'Slim' \| 'Regular' \| 'Relaxed' \| 'Loose' \| 'Oversized'`                                                                                                                                                                                                                                            |
| **`primary_color`** (\*) | Primary color                         | `'White' \| 'Black' \| 'Gray' \| 'Beige' \| 'Brown' \| 'Blue' \| 'Green' \| 'Red' \| 'Burgundy' \| 'Pink' \| 'Yellow' \| 'Orange' \| 'Purple' \| 'Camel' \| 'Khaki' \| 'Navy' \| 'Cream' \| 'Gold' \| 'Silver' \| 'Bronze'`                                                                                         |
| `secondary_color`        | Secondary color                       | `'White' \| 'Black' \| 'Gray' \| 'Beige' \| 'Brown' \| 'Blue' \| 'Green' \| 'Red' \| 'Burgundy' \| 'Pink' \| 'Yellow' \| 'Orange' \| 'Purple' \| 'Camel' \| 'Khaki' \| 'Navy' \| 'Cream' \| 'Gold' \| 'Silver' \| 'Bronze'`                                                                                         |
| `pattern`                | Pattern                               | `'Solid' \| 'Stripes' \| 'Plaid' \| 'Polka Dots' \| 'Animal Print' \| 'Floral' \| 'Geometric' \| 'Camouflage' \| 'Graphic Print' \| 'Gradient'`                                                                                                                                                                     |
| `materials`              | Materials                             | `Array<'Cotton' \| 'Linen' \| 'Wool' \| 'Silk' \| 'Leather' \| 'Cashmere' \| 'Suede' \| 'Polyester' \| 'Nylon' \| 'Elastane' \| 'Viscose' \| 'Synthetic Leather' \| 'Gore-Tex' \| 'Denim' \| 'Knit' \| 'Fleece' \| 'Tweed' \| 'Satin' \| 'Velvet' \| 'Jacquard' \| ...>`                                            |
| **`layer`** (\*)         | Thermal Layer                         | `'Base' \| 'Mid' \| 'Outer'`                                                                                                                                                                                                                                                                                        |
| `season`                 | Seasons                               | `'Winter' \| 'Summer' \| 'Spring/Fall' \| 'All Year'`                                                                                                                                                                                                                                                               |
| `use_case`               | Use cases                             | `Array<'Capsule' \| 'Favorite' \| 'Basic' \| 'Sport' \| 'Work' \| 'Event' \| 'Travel' \| 'Home' \| 'Party' \| 'Beach' \| 'Rain' \| 'Extreme Cold'>`                                                                                                                                                                 |
| `formality`              | Formality                             | `'Very Casual' \| 'Casual' \| 'Smart Casual' \| 'Formal' \| 'Black Tie'`                                                                                                                                                                                                                                            |
| `brand`                  | The brand of the clothing             | `string`                                                                                                                                                                                                                                                                                                            |

_(\*) Required._

## CatalogMovie

Movie: Data obtained from catalogation

_Object containing the following properties:_

| Property               | Description                                  | Type            |
| :--------------------- | :------------------------------------------- | :-------------- |
| **`title`** (\*)       | Title of the movie                           | `string`        |
| **`description`** (\*) | Description of the movie                     | `string`        |
| **`author`** (\*)      | Authors. Writers, directors, producers, etc. | `Array<string>` |
| **`actors`** (\*)      | Actors                                       | `Array<string>` |
| **`published`** (\*)   | Year of publication                          | `string`        |
| **`genres`** (\*)      | Genres                                       | `Array<string>` |

_(\*) Required._

## Clothing

Clothing item

_Object containing the following properties:_

| Property                 | Description                           | Type                                                                                                                                                                                                                                                                                                                | Default  |
| :----------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------- |
| **`name`** (\*)          | Descriptive name of the clothing item | `string`                                                                                                                                                                                                                                                                                                            |          |
| **`garment`** (\*)       | Garment Type                          | `'Undershirts' \| 'Boxers' \| 'Panties' \| 'Bras' \| 'Socks' \| 'T-Shirts' \| 'Polo Shirts' \| 'Shirts' \| 'Blouses' \| 'Tops' \| 'Sweaters' \| 'Hoodies' \| 'Cardigans' \| 'Jackets' \| 'Pants' \| 'Jeans' \| 'Chinos' \| 'Skirts' \| 'Shorts' \| 'Blazers' \| ...`                                                |          |
| **`slot`** (\*)          | Outfit part                           | `'Top' \| 'Bottom' \| 'Full Body' \| 'Outer' \| 'Footwear' \| 'Accessories'`                                                                                                                                                                                                                                        |          |
| `variants`               | Structural Details                    | `Array<'Sleeveless' \| 'Short Sleeves' \| 'Long Sleeves' \| 'Round Neck' \| 'V-Neck' \| 'High Neck' \| 'Shirt Collar' \| 'Polo Collar' \| 'Boat Neck' \| 'Mandarin Collar' \| 'Funnel Neck' \| 'Hood' \| 'Overshirt' \| 'Cropped' \| 'Long' \| 'Straight Leg' \| 'Skinny' \| 'Wide' \| 'Cargo' \| 'Flared' \| ...>` |          |
| `fit`                    | Fit                                   | `'Fitted' \| 'Slim' \| 'Regular' \| 'Relaxed' \| 'Loose' \| 'Oversized'`                                                                                                                                                                                                                                            |          |
| **`primary_color`** (\*) | Primary color                         | `'White' \| 'Black' \| 'Gray' \| 'Beige' \| 'Brown' \| 'Blue' \| 'Green' \| 'Red' \| 'Burgundy' \| 'Pink' \| 'Yellow' \| 'Orange' \| 'Purple' \| 'Camel' \| 'Khaki' \| 'Navy' \| 'Cream' \| 'Gold' \| 'Silver' \| 'Bronze'`                                                                                         |          |
| `secondary_color`        | Secondary color                       | `'White' \| 'Black' \| 'Gray' \| 'Beige' \| 'Brown' \| 'Blue' \| 'Green' \| 'Red' \| 'Burgundy' \| 'Pink' \| 'Yellow' \| 'Orange' \| 'Purple' \| 'Camel' \| 'Khaki' \| 'Navy' \| 'Cream' \| 'Gold' \| 'Silver' \| 'Bronze'`                                                                                         |          |
| `pattern`                | Pattern                               | `'Solid' \| 'Stripes' \| 'Plaid' \| 'Polka Dots' \| 'Animal Print' \| 'Floral' \| 'Geometric' \| 'Camouflage' \| 'Graphic Print' \| 'Gradient'`                                                                                                                                                                     |          |
| `materials`              | Materials                             | `Array<'Cotton' \| 'Linen' \| 'Wool' \| 'Silk' \| 'Leather' \| 'Cashmere' \| 'Suede' \| 'Polyester' \| 'Nylon' \| 'Elastane' \| 'Viscose' \| 'Synthetic Leather' \| 'Gore-Tex' \| 'Denim' \| 'Knit' \| 'Fleece' \| 'Tweed' \| 'Satin' \| 'Velvet' \| 'Jacquard' \| ...>`                                            |          |
| **`layer`** (\*)         | Thermal Layer                         | `'Base' \| 'Mid' \| 'Outer'`                                                                                                                                                                                                                                                                                        |          |
| `season`                 | Seasons                               | `'Winter' \| 'Summer' \| 'Spring/Fall' \| 'All Year'`                                                                                                                                                                                                                                                               |          |
| `use_case`               | Use cases                             | `Array<'Capsule' \| 'Favorite' \| 'Basic' \| 'Sport' \| 'Work' \| 'Event' \| 'Travel' \| 'Home' \| 'Party' \| 'Beach' \| 'Rain' \| 'Extreme Cold'>`                                                                                                                                                                 |          |
| `formality`              | Formality                             | `'Very Casual' \| 'Casual' \| 'Smart Casual' \| 'Formal' \| 'Black Tie'`                                                                                                                                                                                                                                            |          |
| `brand`                  | The brand of the clothing             | `string`                                                                                                                                                                                                                                                                                                            |          |
| `cares`                  | Care Instructions                     | `Array<'Hand Wash' \| 'Machine Wash' \| 'Dry Clean' \| 'Cold' \| 'Hot' \| 'Ironing' \| 'Steam Ironing'>`                                                                                                                                                                                                            |          |
| `status`                 | Status                                | `'New' \| 'Good' \| 'Worn' \| 'Damaged' \| 'Retire'`                                                                                                                                                                                                                                                                | `'Good'` |
| **`size`** (\*)          |                                       | `'28' \| '30' \| '32' \| '34' \| '36' \| '37' \| '38' \| '39' \| '40' \| '41' \| '42' \| '43' \| '44' \| '45' \| '46' \| '48' \| 'XS' \| 'S' \| 'M' \| 'L' \| ...`                                                                                                                                                  |          |
| `measurements`           | Measurements                          | `Array<number>`                                                                                                                                                                                                                                                                                                     |          |
| **`type`** (\*)          |                                       | `'[[Resources]]'`                                                                                                                                                                                                                                                                                                   |          |
| **`subtype`** (\*)       |                                       | `'[[Clothes]]'`                                                                                                                                                                                                                                                                                                     |          |
| **`areas`** (\*)         |                                       | `Array<'[[Home]]'>`                                                                                                                                                                                                                                                                                                 |          |
| **`color`** (\*)         |                                       | `'#CB6120'`                                                                                                                                                                                                                                                                                                         |          |
| **`icon`** (\*)          |                                       | `'shirt'`                                                                                                                                                                                                                                                                                                           |          |
| `cover`                  |                                       | `string`                                                                                                                                                                                                                                                                                                            |          |

_(\*) Required._

## DetailedArticle

Article: Additional data

_Object containing the following properties:_

| Property            | Description           | Type                                                     |
| :------------------ | :-------------------- | :------------------------------------------------------- |
| **`status`** (\*)   | Reading status        | `'Pending' \| 'In Progress' \| 'Read' \| 'Consolidated'` |
| **`projects`** (\*) | Projects              | `Array<string>`                                          |
| **`topics`** (\*)   | Topics                | `Array<string>`                                          |
| **`rating`** (\*)   | Rating of the article | `number`                                                 |

_(\*) Required._

## DetailedBook

Book: Additional data

_Object containing the following properties:_

| Property                  | Description        | Type                                                     |
| :------------------------ | :----------------- | :------------------------------------------------------- |
| **`status`** (\*)         | Reading status     | `'Pending' \| 'In Progress' \| 'Read' \| 'Consolidated'` |
| **`topics`** (\*)         | Topics             | `Array<string>`                                          |
| **`rating`** (\*)         | Rating of the book | `number`                                                 |
| **`online_rating`** (\*)  | Online rating      | `number`                                                 |
| **`last_time_read`** (\*) | Last time read     | `string`                                                 |
| **`times_read`** (\*)     | Times read         | `number`                                                 |

_(\*) Required._

## DetailedClothing

Clothing item: Additional hard-to-obtain data

_Object containing the following properties:_

| Property        | Description       | Type                                                                                                                                                               | Default  |
| :-------------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `cares`         | Care Instructions | `Array<'Hand Wash' \| 'Machine Wash' \| 'Dry Clean' \| 'Cold' \| 'Hot' \| 'Ironing' \| 'Steam Ironing'>`                                                           |          |
| `status`        | Status            | `'New' \| 'Good' \| 'Worn' \| 'Damaged' \| 'Retire'`                                                                                                               | `'Good'` |
| **`size`** (\*) |                   | `'28' \| '30' \| '32' \| '34' \| '36' \| '37' \| '38' \| '39' \| '40' \| '41' \| '42' \| '43' \| '44' \| '45' \| '46' \| '48' \| 'XS' \| 'S' \| 'M' \| 'L' \| ...` |          |
| `measurements`  | Measurements      | `Array<number>`                                                                                                                                                    |          |

_(\*) Required._

## DetailedMovie

Movie: Additional data

_Object containing the following properties:_

| Property                     | Description         | Type                                        |
| :--------------------------- | :------------------ | :------------------------------------------ |
| **`status`** (\*)            | Watching status     | `'Pending' \| 'In Progress' \| 'Completed'` |
| **`topics`** (\*)            | Topics              | `Array<string>`                             |
| **`rating`** (\*)            | Rating of the movie | `number`                                    |
| **`online_rating`** (\*)     | Online rating       | `number`                                    |
| **`last_time_watched`** (\*) | Last time watched   | `string`                                    |
| **`times_watched`** (\*)     | Times watched       | `number`                                    |

_(\*) Required._

## MetaArticle

Article: Metadata of Note

_Object containing the following properties:_

| Property          | Description        | Type                     |
| :---------------- | :----------------- | :----------------------- |
| **`type`** (\*)   |                    | `'[[Sources]]'`          |
| **`format`** (\*) |                    | `'[[Articles]]'`         |
| **`areas`** (\*)  |                    | `Array<'[[Knowledge]]'>` |
| **`color`** (\*)  |                    | `'#3171B2'`              |
| **`icon`** (\*)   |                    | `'newspaper'`            |
| `banner`          |                    | `string`                 |
| **`url`** (\*)    | URL of the article | `string`                 |

_(\*) Required._

## MetaBook

Book: Metadata of Note

_Object containing the following properties:_

| Property            | Description                          | Type                     |
| :------------------ | :----------------------------------- | :----------------------- |
| **`type`** (\*)     |                                      | `'[[Sources]]'`          |
| **`format`** (\*)   |                                      | `'[[Books]]'`            |
| **`areas`** (\*)    |                                      | `Array<'[[Knowledge]]'>` |
| **`color`** (\*)    |                                      | `'#3171B2'`              |
| **`icon`** (\*)     |                                      | `'book'`                 |
| `cover`             |                                      | `string`                 |
| **`url`** (\*)      | URL of the book in Amazon or similar | `string`                 |
| **`read_url`** (\*) | URL of the reading of the book       | `string`                 |

_(\*) Required._

## MetaClothing

Clothing item: Note metadata

_Object containing the following properties:_

| Property           | Type                |
| :----------------- | :------------------ |
| **`type`** (\*)    | `'[[Resources]]'`   |
| **`subtype`** (\*) | `'[[Clothes]]'`     |
| **`areas`** (\*)   | `Array<'[[Home]]'>` |
| **`color`** (\*)   | `'#CB6120'`         |
| **`icon`** (\*)    | `'shirt'`           |
| `cover`            | `string`            |

_(\*) Required._

## MetaMovie

Movie: Metadata of Note

_Object containing the following properties:_

| Property             | Description                         | Type                      |
| :------------------- | :---------------------------------- | :------------------------ |
| **`type`** (\*)      |                                     | `'[[Sources]]'`           |
| **`format`** (\*)    |                                     | `'[[Movies]]'`            |
| **`areas`** (\*)     |                                     | `Array<'[[Creativity]]'>` |
| **`color`** (\*)     |                                     | `'#BE9207'`               |
| **`icon`** (\*)      |                                     | `'movie'`                 |
| `cover`              |                                     | `string`                  |
| **`url`** (\*)       | URL of the movie in IMDB or similar | `string`                  |
| **`watch_url`** (\*) | URL of the movie in streaming       | `string`                  |

_(\*) Required._

## Movie

Movie

_Object containing the following properties:_

| Property                     | Description                                  | Type                                        |
| :--------------------------- | :------------------------------------------- | :------------------------------------------ |
| **`title`** (\*)             | Title of the movie                           | `string`                                    |
| **`description`** (\*)       | Description of the movie                     | `string`                                    |
| **`author`** (\*)            | Authors. Writers, directors, producers, etc. | `Array<string>`                             |
| **`actors`** (\*)            | Actors                                       | `Array<string>`                             |
| **`published`** (\*)         | Year of publication                          | `string`                                    |
| **`genres`** (\*)            | Genres                                       | `Array<string>`                             |
| **`status`** (\*)            | Watching status                              | `'Pending' \| 'In Progress' \| 'Completed'` |
| **`topics`** (\*)            | Topics                                       | `Array<string>`                             |
| **`rating`** (\*)            | Rating of the movie                          | `number`                                    |
| **`online_rating`** (\*)     | Online rating                                | `number`                                    |
| **`last_time_watched`** (\*) | Last time watched                            | `string`                                    |
| **`times_watched`** (\*)     | Times watched                                | `number`                                    |
| **`type`** (\*)              |                                              | `'[[Sources]]'`                             |
| **`format`** (\*)            |                                              | `'[[Movies]]'`                              |
| **`areas`** (\*)             |                                              | `Array<'[[Creativity]]'>`                   |
| **`color`** (\*)             |                                              | `'#BE9207'`                                 |
| **`icon`** (\*)              |                                              | `'movie'`                                   |
| `cover`                      |                                              | `string`                                    |
| **`url`** (\*)               | URL of the movie in IMDB or similar          | `string`                                    |
| **`watch_url`** (\*)         | URL of the movie in streaming                | `string`                                    |

_(\*) Required._

## Note

Note: Union of all note types

_Union of the following possible types:_

- [Article](#article)
- [Book](#book)
- [Clothing](#clothing)
- [Movie](#movie)
