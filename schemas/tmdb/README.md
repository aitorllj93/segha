# @segha/tmdb

[![npm version](https://img.shields.io/npm/v/%40segha%2Ftmdb.svg)](https://www.npmjs.com/package/@segha/tmdb) [![npm downloads](https://img.shields.io/npm/dm/%40segha%2Ftmdb.svg)](https://www.npmjs.com/package/@segha/tmdb) [![license](https://img.shields.io/npm/l/%40segha%2Ftmdb.svg)](https://github.com/aitorllj93/segha) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![zod](https://img.shields.io/badge/zod-schema-3068b7.svg)](https://zod.dev/)

Schemas for TMDB

## Requirements

- `zod`


## Installation

```bash
pnpm add @segha/tmdb
```

## Usage

```typescript
import { BackdropSizeSchema, GenreSchema, ImageSchema, ... } from '@segha/tmdb';

// Validate data
const result = BackdropSizeSchema.parse(data);

// Infer TypeScript types
type BackdropSize = z.infer<typeof BackdropSizeSchema>;
```

You can also import specific submodules:

```typescript
import { SpecSchema, ConfigurationSchema } from '@segha/tmdb/api';
```

### Schemas

- [BackdropSize](#backdropsize)
- [Genre](#genre)
- [Image](#image)
- [ImagesResponse](#imagesresponse)
- [Language](#language)
- [MovieDetailsParams](#moviedetailsparams)
- [MovieDetails](#moviedetails)
- [Movie](#movie)
- [MoviesResponse](#moviesresponse)
- [PaginationParams](#paginationparams)
- [PosterSize](#postersize)
- [ProductionCompany](#productioncompany)
- [ProductionCountry](#productioncountry)
- [SearchMoviesParams](#searchmoviesparams)
- [SearchSeriesParams](#searchseriesparams)
- [SerieDetailsParams](#seriedetailsparams)
- [SerieDetails](#seriedetails)
- [Serie](#serie)
- [SeriesResponse](#seriesresponse)
- [Video](#video)
- [VideosResponse](#videosresponse)

## API Reference

## BackdropSize

Backdrop size

_Enum, one of the following possible values:_

- `'w300'`
- `'w780'`
- `'w1280'`
- `'original'`

## Genre

_Object containing the following properties:_

| Property        | Description                     | Type     |
| :-------------- | :------------------------------ | :------- |
| **`id`** (\*)   | Unique identifier for the genre | `number` |
| **`name`** (\*) | Genre name                      | `string` |

_(\*) Required._

## Image

_Object containing the following properties:_

| Property                | Description                    | Type                  |
| :---------------------- | :----------------------------- | :-------------------- |
| **`aspect_ratio`** (\*) | Aspect ratio                   | `number`              |
| **`height`** (\*)       | Height                         | `number`              |
| **`iso_639_1`** (\*)    | Spoken language ISO 639-1 code | `string` (_nullable_) |
| **`file_path`** (\*)    | File path                      | `string`              |
| **`vote_average`** (\*) | Vote average                   | `number`              |
| **`vote_count`** (\*)   | Vote count                     | `number`              |
| **`width`** (\*)        | Width                          | `number`              |

_(\*) Required._

## ImagesResponse

_Object containing the following properties:_

| Property             | Description | Type                             |
| :------------------- | :---------- | :------------------------------- |
| **`id`** (\*)        | Image ID    | `number`                         |
| **`backdrops`** (\*) | Backdrops   | _Array of [Image](#image) items_ |
| **`logos`** (\*)     | Logos       | _Array of [Image](#image) items_ |
| **`posters`** (\*)   | Posters     | _Array of [Image](#image) items_ |

_(\*) Required._

## Language

_Object containing the following properties:_

| Property                | Description                    | Type     |
| :---------------------- | :----------------------------- | :------- |
| **`iso_639_1`** (\*)    | Spoken language ISO 639-1 code | `string` |
| **`name`** (\*)         | Spoken language name           | `string` |
| **`english_name`** (\*) | Spoken language English name   | `string` |

_(\*) Required._

## MovieDetailsParams

_Object containing the following properties:_

| Property                 | Description            | Type     |
| :----------------------- | :--------------------- | :------- |
| `append_to_response`     | Append to response     | `string` |
| `include_image_language` | Include image language | `string` |
| `language`               | Language               | `string` |

_All properties are optional._

## MovieDetails

_Object containing the following properties:_

| Property                        | Description                                      | Type                                                     |
| :------------------------------ | :----------------------------------------------- | :------------------------------------------------------- |
| **`id`** (\*)                   | Unique identifier for the movie                  | `number`                                                 |
| **`title`** (\*)                | Movie title                                      | `string`                                                 |
| **`original_title`** (\*)       | Original movie title (in original language)      | `string`                                                 |
| **`original_language`** (\*)    | Original language code (e.g., 'en', 'es', 'fr')  | `string`                                                 |
| **`overview`** (\*)             | Movie overview/synopsis                          | `string`                                                 |
| **`poster_path`** (\*)          | Poster path (relative URL)                       | `string`                                                 |
| **`backdrop_path`** (\*)        | Backdrop path (relative URL)                     | `string`                                                 |
| **`release_date`** (\*)         | Release date (YYYY-MM-DD format)                 | `string`                                                 |
| **`vote_average`** (\*)         | Average vote rating (0-10)                       | `number`                                                 |
| **`vote_count`** (\*)           | Total number of votes                            | `number`                                                 |
| **`popularity`** (\*)           | Popularity score                                 | `number`                                                 |
| **`adult`** (\*)                | Adult content flag                               | `boolean`                                                |
| **`video`** (\*)                | Video flag                                       | `boolean`                                                |
| **`genres`** (\*)               | Movie genres                                     | _Array of [Genre](#genre) items_                         |
| **`runtime`** (\*)              | Movie runtime in minutes                         | `number` (_nullable_)                                    |
| **`budget`** (\*)               | Budget in USD                                    | `number`                                                 |
| **`revenue`** (\*)              | Revenue in USD                                   | `number`                                                 |
| **`homepage`** (\*)             | Homepage URL                                     | `string` (_nullable_)                                    |
| **`imdb_id`** (\*)              | IMDB ID                                          | `string` (_nullable_)                                    |
| **`production_companies`** (\*) | Production companies                             | _Array of [ProductionCompany](#productioncompany) items_ |
| **`production_countries`** (\*) | Production countries                             | _Array of [ProductionCountry](#productioncountry) items_ |
| **`spoken_languages`** (\*)     | Spoken languages                                 | _Array of [Language](#language) items_                   |
| **`status`** (\*)               | Current status (Released, Post Production, etc.) | `string`                                                 |
| **`tagline`** (\*)              | Tagline                                          | `string` (_nullable_)                                    |

_(\*) Required._

## Movie

_Object containing the following properties:_

| Property                     | Description                                     | Type            |
| :--------------------------- | :---------------------------------------------- | :-------------- |
| **`id`** (\*)                | Unique identifier for the movie                 | `number`        |
| **`title`** (\*)             | Movie title                                     | `string`        |
| **`original_title`** (\*)    | Original movie title (in original language)     | `string`        |
| **`original_language`** (\*) | Original language code (e.g., 'en', 'es', 'fr') | `string`        |
| **`overview`** (\*)          | Movie overview/synopsis                         | `string`        |
| **`poster_path`** (\*)       | Poster path (relative URL)                      | `string`        |
| **`backdrop_path`** (\*)     | Backdrop path (relative URL)                    | `string`        |
| **`release_date`** (\*)      | Release date (YYYY-MM-DD format)                | `string`        |
| **`vote_average`** (\*)      | Average vote rating (0-10)                      | `number`        |
| **`vote_count`** (\*)        | Total number of votes                           | `number`        |
| **`popularity`** (\*)        | Popularity score                                | `number`        |
| **`adult`** (\*)             | Adult content flag                              | `boolean`       |
| **`genre_ids`** (\*)         | Array of genre IDs                              | `Array<number>` |
| **`video`** (\*)             | Video flag                                      | `boolean`       |

_(\*) Required._

## MoviesResponse

_Object containing the following properties:_

| Property                 | Description   | Type                             |
| :----------------------- | :------------ | :------------------------------- |
| **`page`** (\*)          | Page number   | `number`                         |
| **`results`** (\*)       | Movies        | _Array of [Movie](#movie) items_ |
| **`total_pages`** (\*)   | Total pages   | `number`                         |
| **`total_results`** (\*) | Total results | `number`                         |

_(\*) Required._

## PaginationParams

Pagination parameters

_Object containing the following properties:_

| Property   | Description   | Type     |
| :--------- | :------------ | :------- |
| `page`     | Page number   | `number` |
| `language` | Language code | `string` |

_All properties are optional._

## PosterSize

Poster size

_Enum, one of the following possible values:_

- `'w92'`
- `'w154'`
- `'w185'`
- `'w342'`
- `'w500'`
- `'w780'`
- `'original'`

## ProductionCompany

_Object containing the following properties:_

| Property                  | Description                                  | Type                  |
| :------------------------ | :------------------------------------------- | :-------------------- |
| **`id`** (\*)             | Unique identifier for the production company | `number`              |
| **`name`** (\*)           | Production company name                      | `string`              |
| **`logo_path`** (\*)      | Logo path (relative URL)                     | `string` (_nullable_) |
| **`origin_country`** (\*) | Production company origin country            | `string`              |

_(\*) Required._

## ProductionCountry

_Object containing the following properties:_

| Property              | Description                                | Type     |
| :-------------------- | :----------------------------------------- | :------- |
| **`iso_3166_1`** (\*) | Production country ISO 3166-1 Alpha-2 code | `string` |
| **`name`** (\*)       | Production country name                    | `string` |

_(\*) Required._

## SearchMoviesParams

_Object containing the following properties:_

| Property         | Description          | Type      |
| :--------------- | :------------------- | :-------- |
| `page`           | Page number          | `number`  |
| `language`       | Language code        | `string`  |
| **`query`** (\*) | Search query         | `string`  |
| `include_adult`  | Include adult movies | `boolean` |
| `year`           | Year                 | `number`  |

_(\*) Required._

## SearchSeriesParams

_Object containing the following properties:_

| Property         | Description          | Type      |
| :--------------- | :------------------- | :-------- |
| `page`           | Page number          | `number`  |
| `language`       | Language code        | `string`  |
| **`query`** (\*) | Search query         | `string`  |
| `include_adult`  | Include adult movies | `boolean` |
| `year`           | Year                 | `number`  |

_(\*) Required._

## SerieDetailsParams

_Object containing the following properties:_

| Property                 | Description            | Type     |
| :----------------------- | :--------------------- | :------- |
| `append_to_response`     | Append to response     | `string` |
| `include_image_language` | Include image language | `string` |
| `language`               | Language               | `string` |

_All properties are optional._

## SerieDetails

_Object containing the following properties:_

| Property                        | Description                                     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------ | :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`backdrop_path`** (\*)        | Backdrop path (relative URL)                    | `string` (_nullable_)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`first_air_date`** (\*)       | First air date (YYYY-MM-DD format)              | `string` (_nullable_)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`id`** (\*)                   | Unique identifier for the serie                 | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`name`** (\*)                 | Serie name                                      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`origin_country`** (\*)       | Array of origin countries                       | `Array<string>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`original_language`** (\*)    | Original language code (e.g., 'en', 'es', 'fr') | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`original_name`** (\*)        | Original serie name (in original language)      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`overview`** (\*)             | Serie overview/synopsis                         | `string` (_nullable_)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`popularity`** (\*)           | Popularity score                                | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`poster_path`** (\*)          | Poster path (relative URL)                      | `string` (_nullable_)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`vote_average`** (\*)         | Average vote rating (0-10)                      | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`vote_count`** (\*)           | Total number of votes                           | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`adult`** (\*)                | Adult content flag                              | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`created_by`** (\*)           | Creators of the serie                           | _Array of objects:_<br /><ul><li>**`id`** (\*): `number` - Unique identifier for the creator</li><li>**`credit_id`** (\*): `string` - Credit ID</li><li>**`name`** (\*): `string` - Creator name</li><li>**`gender`** (\*): `number` - Creator gender</li><li>**`profile_path`** (\*): `string` (_nullable_) - Creator profile path (relative URL)</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`episode_run_time`** (\*)     | Episode runtime in minutes                      | `Array<number>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`genres`** (\*)               | Genres of the serie                             | _Array of [Genre](#genre) items_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`homepage`** (\*)             | Homepage URL                                    | `string` (_nullable_)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`in_production`** (\*)        | In production flag                              | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`languages`** (\*)            | Languages of the serie                          | `Array<string>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`last_air_date`** (\*)        | Last air date (YYYY-MM-DD format)               | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`last_episode_to_air`** (\*)  | Last episode to air                             | _Object with properties:_<ul><li>**`id`** (\*): `number` - Unique identifier for the episode</li><li>**`name`** (\*): `string` - Episode name</li><li>**`overview`** (\*): `string` (_nullable_) - Episode overview/synopsis</li><li>**`vote_average`** (\*): `number` - Average vote rating (0-10)</li><li>**`vote_count`** (\*): `number` - Total number of votes</li><li>**`air_date`** (\*): `string` - Air date (YYYY-MM-DD format)</li><li>**`episode_number`** (\*): `number` - Episode number</li><li>**`production_code`** (\*): `string` - Production code</li><li>**`runtime`** (\*): `number` (_nullable_) - Runtime in minutes</li><li>**`season_number`** (\*): `number` - Season number</li><li>**`show_id`** (\*): `number` - Show ID</li><li>**`still_path`** (\*): `string` (_nullable_) - Still path (relative URL)</li></ul> |
| **`next_episode_to_air`** (\*)  | Next episode to air                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`networks`** (\*)             | Networks of the serie                           | _Array of objects:_<br /><ul><li>**`id`** (\*): `number` - Unique identifier for the network</li><li>**`name`** (\*): `string` - Network name</li><li>**`logo_path`** (\*): `string` (_nullable_) - Logo path (relative URL)</li><li>**`origin_country`** (\*): `string` - Network origin country</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **`number_of_episodes`** (\*)   | Number of episodes                              | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`number_of_seasons`** (\*)    | Number of seasons                               | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`production_companies`** (\*) | Production companies of the serie               | _Array of [ProductionCompany](#productioncompany) items_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`production_countries`** (\*) | Production countries of the serie               | _Array of [ProductionCountry](#productioncountry) items_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`seasons`** (\*)              | Seasons of the serie                            | _Array of objects:_<br /><ul><li>**`air_date`** (\*): `string` - Air date (YYYY-MM-DD format)</li><li>**`episode_count`** (\*): `number` - Episode count</li><li>**`id`** (\*): `number` - Unique identifier for the season</li><li>**`name`** (\*): `string` - Season name</li><li>**`overview`** (\*): `string` (_nullable_) - Season overview/synopsis</li><li>**`poster_path`** (\*): `string` (_nullable_) - Poster path (relative URL)</li><li>**`season_number`** (\*): `number` - Season number</li></ul>                                                                                                                                                                                                                                                                                                                                |
| **`spoken_languages`** (\*)     | Spoken languages of the serie                   | _Array of [Language](#language) items_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`status`** (\*)               | Status of the serie                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`tagline`** (\*)              | Tagline of the serie                            | `string` (_nullable_)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`type`** (\*)                 | Type of the serie                               | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

_(\*) Required._

## Serie

_Object containing the following properties:_

| Property                     | Description                                     | Type                  |
| :--------------------------- | :---------------------------------------------- | :-------------------- |
| **`backdrop_path`** (\*)     | Backdrop path (relative URL)                    | `string` (_nullable_) |
| **`first_air_date`** (\*)    | First air date (YYYY-MM-DD format)              | `string` (_nullable_) |
| **`genre_ids`** (\*)         | Array of genre IDs                              | `Array<number>`       |
| **`id`** (\*)                | Unique identifier for the serie                 | `number`              |
| **`name`** (\*)              | Serie name                                      | `string`              |
| **`origin_country`** (\*)    | Array of origin countries                       | `Array<string>`       |
| **`original_language`** (\*) | Original language code (e.g., 'en', 'es', 'fr') | `string`              |
| **`original_name`** (\*)     | Original serie name (in original language)      | `string`              |
| **`overview`** (\*)          | Serie overview/synopsis                         | `string` (_nullable_) |
| **`popularity`** (\*)        | Popularity score                                | `number`              |
| **`poster_path`** (\*)       | Poster path (relative URL)                      | `string` (_nullable_) |
| **`vote_average`** (\*)      | Average vote rating (0-10)                      | `number`              |
| **`vote_count`** (\*)        | Total number of votes                           | `number`              |

_(\*) Required._

## SeriesResponse

_Object containing the following properties:_

| Property                 | Description   | Type                             |
| :----------------------- | :------------ | :------------------------------- |
| **`page`** (\*)          | Page number   | `number`                         |
| **`results`** (\*)       | Series        | _Array of [Serie](#serie) items_ |
| **`total_pages`** (\*)   | Total pages   | `number`                         |
| **`total_results`** (\*) | Total results | `number`                         |

_(\*) Required._

## Video

_Object containing the following properties:_

| Property                | Description                                | Type      |
| :---------------------- | :----------------------------------------- | :-------- |
| **`iso_639_1`** (\*)    | Spoken language ISO 639-1 code             | `string`  |
| **`iso_3166_1`** (\*)   | Production country ISO 3166-1 Alpha-2 code | `string`  |
| **`name`** (\*)         | Video name                                 | `string`  |
| **`key`** (\*)          | Video key                                  | `string`  |
| **`site`** (\*)         | Video site                                 | `string`  |
| **`size`** (\*)         | Video size                                 | `number`  |
| **`type`** (\*)         | Video type                                 | `string`  |
| **`official`** (\*)     | Video official                             | `boolean` |
| **`published_at`** (\*) | Video published at                         | `string`  |
| **`id`** (\*)           | Video ID                                   | `string`  |

_(\*) Required._

## VideosResponse

_Object containing the following properties:_

| Property           | Description | Type                             |
| :----------------- | :---------- | :------------------------------- |
| **`id`** (\*)      | Video ID    | `number`                         |
| **`results`** (\*) | Videos      | _Array of [Video](#video) items_ |

_(\*) Required._
