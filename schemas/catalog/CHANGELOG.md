# Changelog

All notable changes to @segha/catalog will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.0] - 2026-02-08

### Spanish (es)

#### Added

- **BREAKING** Property `topics` in `ArticleSchema` changed from required to optional
- **BREAKING** Property `topics` in `BookSchema` changed from required to optional
- **BREAKING** Property `topics` in `ClothingSchema` changed from required to optional
- **BREAKING** Property `topics` in `EncyclopediaEntrySchema` changed from required to optional
- **BREAKING** Property `topics` in `MovieSchema` changed from required to optional
- **BREAKING** Property `topics` in `PaintingSchema` changed from required to optional
- **BREAKING** Property `topics` in `VideoSchema` changed from required to optional
- **BREAKING** Property `topics` in `VimeoSchema` changed from required to optional
- **BREAKING** Property `topics` in `WikipediaEntrySchema` changed from required to optional
- **BREAKING** Property `topics` in `YoutubeSchema` changed from required to optional

#### Changed

- Property `topics` in `ArticleSchema` was modified
- Property `topics` in `BookSchema` was modified
- Property `topics` in `ClothingSchema` was modified
- Property `topics` in `EncyclopediaEntrySchema` was modified
- Property `topics` in `MovieSchema` was modified
- Property `topics` in `PaintingSchema` was modified
- Property `topics` in `VideoSchema` was modified
- Property `topics` in `VimeoSchema` was modified
- Property `topics` in `WikipediaEntrySchema` was modified
- Property `topics` in `YoutubeSchema` was modified

## [4.0.0] - 2026-02-08

### Spanish (es)

#### Added

- **BREAKING** Property `size` in `ClothingSchema` changed from required to optional

#### Changed

- Property `variants` in `ClothingSchema` was modified
- Property `materials` in `ClothingSchema` was modified
- Property `use_case` in `ClothingSchema` was modified
- Property `cares` in `ClothingSchema` was modified

#### Removed

- **BREAKING** Schema `CatalogClothingSchema` was removed

## [3.0.0] - 2026-02-08

### COMMON (common)

#### Added

- Schema `Palette` was added
- Schema `Scheme` was added

### Spanish (es)

#### Added

- Schema `EncyclopediaEntrySchema` was added
- Schema `VideoSchema` was added
- Schema `VimeoSchema` was added
- Schema `WikipediaEntrySchema` was added
- Optional property `cover` was added to `ArticleSchema`
- Optional property `aliases` was added to `ArticleSchema`
- **BREAKING** Property `type` in `ArticleSchema` changed from required to optional
- **BREAKING** Property `status` in `ArticleSchema` changed from required to optional
- **BREAKING** Property `format` in `ArticleSchema` changed from required to optional
- Optional property `banner` was added to `BookSchema`
- Optional property `projects` was added to `BookSchema`
- Optional property `aliases` was added to `BookSchema`
- **BREAKING** Property `type` in `BookSchema` changed from required to optional
- **BREAKING** Property `status` in `BookSchema` changed from required to optional
- **BREAKING** Property `format` in `BookSchema` changed from required to optional
- **BREAKING** Property `author` in `BookSchema` changed from required to optional
- Optional property `banner` was added to `ClothingSchema`
- Optional property `projects` was added to `ClothingSchema`
- **BREAKING** Required property `topics` was added to `ClothingSchema`
- Optional property `rating` was added to `ClothingSchema`
- Optional property `aliases` was added to `ClothingSchema`
- **BREAKING** Property `type` in `ClothingSchema` changed from required to optional
- **BREAKING** Property `subtype` in `ClothingSchema` changed from required to optional
- Optional property `banner` was added to `MovieSchema`
- Optional property `projects` was added to `MovieSchema`
- Optional property `aliases` was added to `MovieSchema`
- Optional property `external_ids` was added to `MovieSchema`
- **BREAKING** Property `type` in `MovieSchema` changed from required to optional
- **BREAKING** Property `status` in `MovieSchema` changed from required to optional
- **BREAKING** Property `format` in `MovieSchema` changed from required to optional
- Optional property `banner` was added to `PaintingSchema`
- Optional property `status` was added to `PaintingSchema`
- Optional property `aliases` was added to `PaintingSchema`
- Optional property `url` was added to `PaintingSchema`
- **BREAKING** Property `type` in `PaintingSchema` changed from required to optional
- **BREAKING** Property `cover` in `PaintingSchema` changed from required to optional
- **BREAKING** Property `format` in `PaintingSchema` changed from required to optional
- Optional property `cover` was added to `YoutubeSchema`
- Optional property `aliases` was added to `YoutubeSchema`
- **BREAKING** Property `type` in `YoutubeSchema` changed from required to optional
- **BREAKING** Property `status` in `YoutubeSchema` changed from required to optional
- **BREAKING** Property `format` in `YoutubeSchema` changed from required to optional

#### Changed

- **BREAKING** Property `status` in `ArticleSchema` type changed from `string` to `undefined`
- **BREAKING** Property `rating` in `ArticleSchema` type changed from `number` to `undefined`
- **BREAKING** Property `cover` in `BookSchema` type changed from `string` to `undefined`
- **BREAKING** Property `status` in `BookSchema` type changed from `string` to `undefined`
- **BREAKING** Property `rating` in `BookSchema` type changed from `number` to `undefined`
- **BREAKING** Property `description` in `BookSchema` type changed from `string` to `undefined`
- **BREAKING** Property `last_time_read` in `BookSchema` type changed from `string` to `undefined`
- **BREAKING** Property `cover` in `ClothingSchema` type changed from `string` to `undefined`
- **BREAKING** Property `cover` in `MovieSchema` type changed from `string` to `undefined`
- **BREAKING** Property `topics` in `MovieSchema` type changed from `undefined` to `array`
- **BREAKING** Property `status` in `MovieSchema` type changed from `string` to `undefined`
- **BREAKING** Property `rating` in `MovieSchema` type changed from `number` to `undefined`
- **BREAKING** Property `last_time_watched` in `MovieSchema` type changed from `string` to `undefined`
- **BREAKING** Property `cover` in `PaintingSchema` type changed from `string` to `undefined`
- **BREAKING** Property `rating` in `PaintingSchema` type changed from `number` to `undefined`
- **BREAKING** Property `published` in `PaintingSchema` type changed from `string` to `undefined`
- **BREAKING** Property `status` in `YoutubeSchema` type changed from `string` to `undefined`
- **BREAKING** Property `rating` in `YoutubeSchema` type changed from `number` to `undefined`
- Property `type` in `ArticleSchema` was modified
- Property `color` in `ArticleSchema` was modified
- Property `icon` in `ArticleSchema` was modified
- Property `banner` in `ArticleSchema` was modified
- Property `projects` in `ArticleSchema` was modified
- Property `topics` in `ArticleSchema` was modified
- Property `format` in `ArticleSchema` was modified
- Property `url` in `ArticleSchema` was modified
- Property `author` in `ArticleSchema` was modified
- Property `published` in `ArticleSchema` was modified
- Property `type` in `BookSchema` was modified
- Property `color` in `BookSchema` was modified
- Property `icon` in `BookSchema` was modified
- Property `topics` in `BookSchema` was modified
- Property `format` in `BookSchema` was modified
- Property `url` in `BookSchema` was modified
- Property `author` in `BookSchema` was modified
- Property `published` in `BookSchema` was modified
- Property `read_url` in `BookSchema` was modified
- Property `times_read` in `BookSchema` was modified
- Property `type` in `ClothingSchema` was modified
- Property `color` in `ClothingSchema` was modified
- Property `icon` in `ClothingSchema` was modified
- Property `subtype` in `ClothingSchema` was modified
- Property `type` in `MovieSchema` was modified
- Property `color` in `MovieSchema` was modified
- Property `icon` in `MovieSchema` was modified
- Property `format` in `MovieSchema` was modified
- Property `url` in `MovieSchema` was modified
- Property `author` in `MovieSchema` was modified
- Property `published` in `MovieSchema` was modified
- Property `watch_url` in `MovieSchema` was modified
- Property `times_watched` in `MovieSchema` was modified
- Property `type` in `PaintingSchema` was modified
- Property `color` in `PaintingSchema` was modified
- Property `icon` in `PaintingSchema` was modified
- Property `projects` in `PaintingSchema` was modified
- Property `topics` in `PaintingSchema` was modified
- Property `format` in `PaintingSchema` was modified
- Property `author` in `PaintingSchema` was modified
- Property `title` in `PaintingSchema` was modified
- Property `type` in `YoutubeSchema` was modified
- Property `color` in `YoutubeSchema` was modified
- Property `icon` in `YoutubeSchema` was modified
- Property `banner` in `YoutubeSchema` was modified
- Property `projects` in `YoutubeSchema` was modified
- Property `topics` in `YoutubeSchema` was modified
- Property `format` in `YoutubeSchema` was modified
- Property `url` in `YoutubeSchema` was modified
- Property `author` in `YoutubeSchema` was modified
- Property `published` in `YoutubeSchema` was modified
- Property `title` in `YoutubeSchema` was modified

#### Removed

- **BREAKING** Schema `Area` was removed
- **BREAKING** Schema `Areas` was removed
- **BREAKING** Schema `FirstLevelArea` was removed
- **BREAKING** Schema `Icon` was removed
- **BREAKING** Schema `CatalogArticleSchema` was removed
- **BREAKING** Schema `CatalogBookSchema` was removed
- **BREAKING** Schema `CatalogMovieSchema` was removed
- **BREAKING** Schema `CatalogPaintingSchema` was removed
- **BREAKING** Schema `CatalogWikipediaSchema` was removed
- **BREAKING** Schema `CatalogYoutubeSchema` was removed
- **BREAKING** Schema `DetailedArticleSchema` was removed
- **BREAKING** Schema `DetailedBookSchema` was removed
- **BREAKING** Schema `DetailedClothingSchema` was removed
- **BREAKING** Schema `DetailedMovieSchema` was removed
- **BREAKING** Schema `DetailedPaintingSchema` was removed
- **BREAKING** Schema `DetailedWikipediaSchema` was removed
- **BREAKING** Schema `DetailedYoutubeSchema` was removed
- **BREAKING** Schema `MetaArticleSchema` was removed
- **BREAKING** Schema `MetaBookSchema` was removed
- **BREAKING** Schema `MetaClothingSchema` was removed
- **BREAKING** Schema `MetaMovieSchema` was removed
- **BREAKING** Schema `MetaPaintingSchema` was removed
- **BREAKING** Schema `MetaWikipediaSchema` was removed
- **BREAKING** Schema `MetaYoutubeSchema` was removed
- **BREAKING** Schema `WikipediaSchema` was removed
- **BREAKING** Property `topics` in `ArticleSchema` changed from optional to required
- **BREAKING** Property `url` in `ArticleSchema` changed from optional to required
- **BREAKING** Property `topics` in `BookSchema` changed from optional to required
- **BREAKING** Property `description` was removed from `MovieSchema`
- **BREAKING** Property `topics` in `MovieSchema` changed from optional to required
- **BREAKING** Property `description` was removed from `PaintingSchema`
- **BREAKING** Property `topics` in `PaintingSchema` changed from optional to required
- **BREAKING** Property `title` in `PaintingSchema` changed from optional to required
- **BREAKING** Property `description` was removed from `YoutubeSchema`
- **BREAKING** Property `excerpt` was removed from `YoutubeSchema`
- **BREAKING** Property `topics` in `YoutubeSchema` changed from optional to required

## [2.2.0] - 2026-02-06

### Added

- Schema `CatalogWikipediaSchema` was added
- Schema `DetailedWikipediaSchema` was added
- Schema `MetaWikipediaSchema` was added
- Schema `WikipediaSchema` was added
- **BREAKING** Property `status` in `ClothingSchema` changed from required to optional
- **BREAKING** Property `status` in `DetailedClothingSchema` changed from required to optional

## [2.1.0] - 2026-02-05

### Added

- Schema `ArticleSchema` was added
- Schema `BookSchema` was added
- Schema `CatalogArticleSchema` was added
- Schema `CatalogBookSchema` was added
- Schema `CatalogMovieSchema` was added
- Schema `DetailedArticleSchema` was added
- Schema `DetailedBookSchema` was added
- Schema `DetailedMovieSchema` was added
- Schema `MetaArticleSchema` was added
- Schema `MetaBookSchema` was added
- Schema `MetaMovieSchema` was added
- Schema `MovieSchema` was added
- Schema `NoteSchema` was added

## [2.0.0] - 2026-02-05

### Added

- Enum values added to `CatalogClothingSchema`.`garment`: `Undershirts`, `Boxers`, `Panties`, `Bras`, `Socks`, `T-Shirts`, `Polo Shirts`, `Shirts`, `Blouses`, `Sweaters`, `Hoodies`, `Cardigans`, `Jackets`, `Pants`, `Jeans`, `Skirts`, `Blazers`, `Coats`, `Trench Coats`, `Vests`, `Leggings`, `Technical Wear`, `Sports Shorts`, `Technical T-Shirts`, `Dresses`, `Jumpsuits`, `Sneakers`, `Shoes`, `Boots`, `Sandals`, `Belts`, `Caps`, `Hats`, `Scarves`, `Gloves`, `Handbags`, `Backpacks`, `Sunglasses`, `Handkerchiefs`, `Watches`, `Jewelry`, `Pajamas`, `Robes`, `Swimsuits`
- Enum values added to `CatalogClothingSchema`.`slot`: `Top`, `Bottom`, `Full Body`, `Outer`, `Footwear`, `Accessories`
- Enum values added to `CatalogClothingSchema`.`fit`: `Fitted`, `Slim`, `Relaxed`, `Loose`, `Oversized`
- Enum values added to `CatalogClothingSchema`.`primary_color`: `White`, `Black`, `Gray`, `Brown`, `Blue`, `Green`, `Red`, `Burgundy`, `Pink`, `Yellow`, `Orange`, `Purple`, `Khaki`, `Navy`, `Cream`, `Gold`, `Silver`, `Bronze`
- Enum values added to `CatalogClothingSchema`.`secondary_color`: `White`, `Black`, `Gray`, `Brown`, `Blue`, `Green`, `Red`, `Burgundy`, `Pink`, `Yellow`, `Orange`, `Purple`, `Khaki`, `Navy`, `Cream`, `Gold`, `Silver`, `Bronze`
- Enum values added to `CatalogClothingSchema`.`pattern`: `Solid`, `Stripes`, `Plaid`, `Polka Dots`, `Geometric`, `Camouflage`, `Graphic Print`, `Gradient`
- Enum values added to `CatalogClothingSchema`.`layer`: `Mid`, `Outer`
- Enum values added to `CatalogClothingSchema`.`season`: `Winter`, `Summer`, `Spring/Fall`, `All Year`
- Enum values added to `CatalogClothingSchema`.`formality`: `Very Casual`, `Smart Casual`, `Black Tie`
- Enum values added to `ClothingSchema`.`garment`: `Undershirts`, `Boxers`, `Panties`, `Bras`, `Socks`, `T-Shirts`, `Polo Shirts`, `Shirts`, `Blouses`, `Sweaters`, `Hoodies`, `Cardigans`, `Jackets`, `Pants`, `Jeans`, `Skirts`, `Blazers`, `Coats`, `Trench Coats`, `Vests`, `Leggings`, `Technical Wear`, `Sports Shorts`, `Technical T-Shirts`, `Dresses`, `Jumpsuits`, `Sneakers`, `Shoes`, `Boots`, `Sandals`, `Belts`, `Caps`, `Hats`, `Scarves`, `Gloves`, `Handbags`, `Backpacks`, `Sunglasses`, `Handkerchiefs`, `Watches`, `Jewelry`, `Pajamas`, `Robes`, `Swimsuits`
- Enum values added to `ClothingSchema`.`slot`: `Top`, `Bottom`, `Full Body`, `Outer`, `Footwear`, `Accessories`
- Enum values added to `ClothingSchema`.`fit`: `Fitted`, `Slim`, `Relaxed`, `Loose`, `Oversized`
- Enum values added to `ClothingSchema`.`primary_color`: `White`, `Black`, `Gray`, `Brown`, `Blue`, `Green`, `Red`, `Burgundy`, `Pink`, `Yellow`, `Orange`, `Purple`, `Khaki`, `Navy`, `Cream`, `Gold`, `Silver`, `Bronze`
- Enum values added to `ClothingSchema`.`secondary_color`: `White`, `Black`, `Gray`, `Brown`, `Blue`, `Green`, `Red`, `Burgundy`, `Pink`, `Yellow`, `Orange`, `Purple`, `Khaki`, `Navy`, `Cream`, `Gold`, `Silver`, `Bronze`
- Enum values added to `ClothingSchema`.`pattern`: `Solid`, `Stripes`, `Plaid`, `Polka Dots`, `Geometric`, `Camouflage`, `Graphic Print`, `Gradient`
- Enum values added to `ClothingSchema`.`layer`: `Mid`, `Outer`
- Enum values added to `ClothingSchema`.`season`: `Winter`, `Summer`, `Spring/Fall`, `All Year`
- Enum values added to `ClothingSchema`.`formality`: `Very Casual`, `Smart Casual`, `Black Tie`
- Enum values added to `ClothingSchema`.`status`: `New`, `Good`, `Worn`, `Damaged`, `Retire`
- Enum values added to `DetailedClothingSchema`.`status`: `New`, `Good`, `Worn`, `Damaged`, `Retire`

### Changed

- Description changed in `CatalogClothingSchema`
- Property `name` in `CatalogClothingSchema` was modified
- Property `variants` in `CatalogClothingSchema` was modified
- Property `materials` in `CatalogClothingSchema` was modified
- Property `use_case` in `CatalogClothingSchema` was modified
- Description changed in `ClothingSchema`
- Property `name` in `ClothingSchema` was modified
- Property `variants` in `ClothingSchema` was modified
- Property `materials` in `ClothingSchema` was modified
- Property `use_case` in `ClothingSchema` was modified
- Property `cares` in `ClothingSchema` was modified
- Property `measurements` in `ClothingSchema` was modified
- Property `type` in `ClothingSchema` was modified
- Property `subtype` in `ClothingSchema` was modified
- Property `areas` in `ClothingSchema` was modified
- Description changed in `DetailedClothingSchema`
- Property `cares` in `DetailedClothingSchema` was modified
- Property `measurements` in `DetailedClothingSchema` was modified
- Description changed in `MetaClothingSchema`
- Property `type` in `MetaClothingSchema` was modified
- Property `subtype` in `MetaClothingSchema` was modified
- Property `areas` in `MetaClothingSchema` was modified

### Removed

- **BREAKING** Enum values removed from `CatalogClothingSchema`.`garment`: `Camisetas Interiores`, `Calzoncillos`, `Bragas`, `Sujetadores`, `Calcetines`, `Camisetas`, `Polos`, `Camisas`, `Blusas`, `Jerseys`, `Sudaderas`, `Cárdigans`, `Chaquetas`, `Pantalones`, `Vaqueros`, `Faldas`, `Americanas`, `Abrigos`, `Gabardinas`, `Cazadoras`, `Chalecos`, `Mallas`, `Ropa Técnica`, `Shorts Deportivos`, `Camisetas Técnicas`, `Vestidos`, `Monos`, `Zapatillas`, `Zapatos`, `Botas`, `Sandalias`, `Cinturones`, `Gorras`, `Sombreros`, `Bufandas`, `Guantes`, `Bolsos`, `Mochilas`, `Gafas de Sol`, `Pañuelos`, `Relojes`, `Joyas`, `Pijamas`, `Batas`, `Bañadores`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`slot`: `Superior`, `Inferior`, `Cuerpo Completo`, `Exterior`, `Calzado`, `Accesorios`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`fit`: `Entallado`, `Ajustado`, `Relajado`, `Holgado`, `Extragrande`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`primary_color`: `Blanco`, `Negro`, `Gris`, `Marrón`, `Azul`, `Verde`, `Rojo`, `Burdeos`, `Rosa`, `Amarillo`, `Naranja`, `Morado`, `Caqui`, `Marino`, `Crema`, `Oro`, `Plata`, `Bronce`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`secondary_color`: `Blanco`, `Negro`, `Gris`, `Marrón`, `Azul`, `Verde`, `Rojo`, `Burdeos`, `Rosa`, `Amarillo`, `Naranja`, `Morado`, `Caqui`, `Marino`, `Crema`, `Oro`, `Plata`, `Bronce`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`pattern`: `Liso`, `Rayas`, `Cuadros`, `Lunares`, `Geométrico`, `Camuflaje`, `EstampadoGráfico`, `Degradado`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`layer`: `Intermedia`, `Exterior`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`season`: `Invierno`, `Verano`, `Entretiempo`, `Todo el año`
- **BREAKING** Enum values removed from `CatalogClothingSchema`.`formality`: `Muy Informal`, `Arreglado`, `Etiqueta`
- **BREAKING** Enum values removed from `ClothingSchema`.`garment`: `Camisetas Interiores`, `Calzoncillos`, `Bragas`, `Sujetadores`, `Calcetines`, `Camisetas`, `Polos`, `Camisas`, `Blusas`, `Jerseys`, `Sudaderas`, `Cárdigans`, `Chaquetas`, `Pantalones`, `Vaqueros`, `Faldas`, `Americanas`, `Abrigos`, `Gabardinas`, `Cazadoras`, `Chalecos`, `Mallas`, `Ropa Técnica`, `Shorts Deportivos`, `Camisetas Técnicas`, `Vestidos`, `Monos`, `Zapatillas`, `Zapatos`, `Botas`, `Sandalias`, `Cinturones`, `Gorras`, `Sombreros`, `Bufandas`, `Guantes`, `Bolsos`, `Mochilas`, `Gafas de Sol`, `Pañuelos`, `Relojes`, `Joyas`, `Pijamas`, `Batas`, `Bañadores`
- **BREAKING** Enum values removed from `ClothingSchema`.`slot`: `Superior`, `Inferior`, `Cuerpo Completo`, `Exterior`, `Calzado`, `Accesorios`
- **BREAKING** Enum values removed from `ClothingSchema`.`fit`: `Entallado`, `Ajustado`, `Relajado`, `Holgado`, `Extragrande`
- **BREAKING** Enum values removed from `ClothingSchema`.`primary_color`: `Blanco`, `Negro`, `Gris`, `Marrón`, `Azul`, `Verde`, `Rojo`, `Burdeos`, `Rosa`, `Amarillo`, `Naranja`, `Morado`, `Caqui`, `Marino`, `Crema`, `Oro`, `Plata`, `Bronce`
- **BREAKING** Enum values removed from `ClothingSchema`.`secondary_color`: `Blanco`, `Negro`, `Gris`, `Marrón`, `Azul`, `Verde`, `Rojo`, `Burdeos`, `Rosa`, `Amarillo`, `Naranja`, `Morado`, `Caqui`, `Marino`, `Crema`, `Oro`, `Plata`, `Bronce`
- **BREAKING** Enum values removed from `ClothingSchema`.`pattern`: `Liso`, `Rayas`, `Cuadros`, `Lunares`, `Geométrico`, `Camuflaje`, `EstampadoGráfico`, `Degradado`
- **BREAKING** Enum values removed from `ClothingSchema`.`layer`: `Intermedia`, `Exterior`
- **BREAKING** Enum values removed from `ClothingSchema`.`season`: `Invierno`, `Verano`, `Entretiempo`, `Todo el año`
- **BREAKING** Enum values removed from `ClothingSchema`.`formality`: `Muy Informal`, `Arreglado`, `Etiqueta`
- **BREAKING** Enum values removed from `ClothingSchema`.`status`: `Nuevo`, `Bien`, `Gastado`, `Dañado`, `Retirar`
- **BREAKING** Enum values removed from `DetailedClothingSchema`.`status`: `Nuevo`, `Bien`, `Gastado`, `Dañado`, `Retirar`

## [1.2.0] - 2026-02-05

### Added

- **BREAKING** Required property `name` was added to `CatalogClothingSchema`
- **BREAKING** Required property `name` was added to `ClothingSchema`

## [1.1.0] - 2026-02-05

### Added

- **BREAKING** Required property `name` was added to `CatalogClothingSchema`
- **BREAKING** Required property `name` was added to `ClothingSchema`

## [1.0.0] - 2025-02-04

### Removed

- **BREAKING** Enum values removed: Oversize

## [0.1.0] - 2025-02-03

### Added

- Schema `CatalogClothingSchema`
- Schema `ClothingSchema`
- Schema `DetailedClothingSchema`
- Schema `MetaClothingSchema`

## [0.0.1] - 2025-02-02

### Added

- Initial schemas for Clothing
- Colors, Materials, Sizes, Measurements
- Garments, Layers and Use Cases
- Variants and Status
