# Changelog

All notable changes to @segha/catalog will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
