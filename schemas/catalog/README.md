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
import { CatalogClothingSchema, ClothingSchema, DetailedClothingSchema, ... } from '@segha/catalog';

// Validate data
const result = ClothingSchema.parse(data);

// Infer TypeScript types
type Clothing = z.infer<typeof ClothingSchema>;
```

You can also import specific submodules:

```typescript
import { CatalogClothingSchema, DetailedClothingSchema, MetaClothingSchema } from '@segha/catalog/es/clothing';
```

### Schemas

- [CatalogClothing](#catalogclothing)
- [Clothing](#clothing)
- [DetailedClothing](#detailedclothing)
- [MetaClothing](#metaclothing)

## API Reference

## CatalogClothing

Prenda de ropa: Datos obtenibles de catalogación

_Object containing the following properties:_

| Property                 | Description               | Type                                                                                                                                                                                                                                                                               |
| :----------------------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`garment`** (\*)       | Tipo de Prenda            | `'Camisetas' \| 'Polos' \| 'Camisas' \| 'Blusas' \| 'Tops' \| 'Jerseys' \| 'Sudaderas' \| 'Cárdigans' \| 'Chaquetas' \| 'Pantalones' \| 'Vaqueros' \| 'Chinos' \| 'Faldas' \| 'Shorts' \| 'Abrigos' \| 'Gabardinas' \| 'Parkas' \| 'Cazadoras' \| 'Chalecos' \| 'Vestidos' \| ...` |
| **`slot`** (\*)          | Parte del outfit          | `'Superior' \| 'Inferior' \| 'Cuerpo Completo' \| 'Exterior' \| 'Calzado' \| 'Accesorios'`                                                                                                                                                                                         |
| `variants`               | Detalles Estructurales    | `Array<'Sin Mangas' \| 'Mangas Cortas' \| 'Mangas Largas' \| 'Cuello Redondo' \| 'Cuello Pico' \| 'Cuello Alto' \| 'Cuello Camisa' \| 'Overshirt' \| 'Cropped' \| 'Larga' \| 'Pierna Recta' \| 'Pitillo' \| 'Ancha' \| 'Cargo' \| 'Trench' \| 'Plumífero' \| 'Doble botonadura'>`  |
| `fit`                    | Ajuste                    | `'Entallado' \| 'Regular' \| 'Relajado' \| 'Oversize'`                                                                                                                                                                                                                             |
| **`primary_color`** (\*) | Color principal           | `'Blanco' \| 'Negro' \| 'Gris' \| 'Beige' \| 'Marrón' \| 'Azul' \| 'Verde' \| 'Rojo' \| 'Burdeos' \| 'Rosa' \| 'Amarillo' \| 'Naranja' \| 'Morado' \| 'Camel' \| 'Caqui' \| 'Marino' \| 'Crema'`                                                                                   |
| `secondary_color`        | Color secundario          | `'Blanco' \| 'Negro' \| 'Gris' \| 'Beige' \| 'Marrón' \| 'Azul' \| 'Verde' \| 'Rojo' \| 'Burdeos' \| 'Rosa' \| 'Amarillo' \| 'Naranja' \| 'Morado' \| 'Camel' \| 'Caqui' \| 'Marino' \| 'Crema'`                                                                                   |
| `pattern`                | Estampado                 | `'Liso' \| 'Rayas' \| 'Cuadros'`                                                                                                                                                                                                                                                   |
| `materials`              | Materiales                | `Array<'Algodón' \| 'Lino' \| 'Lana' \| 'Seda' \| 'Cuero' \| 'Poliéster' \| 'Nylon' \| 'Elastano' \| 'Viscosa' \| 'Denim' \| 'Punto' \| 'Felpa'>`                                                                                                                                  |
| **`layer`** (\*)         | Capa Térmica              | `'Base' \| 'Intermedia' \| 'Exterior'`                                                                                                                                                                                                                                             |
| `season`                 | Estaciones                | `'Invierno' \| 'Verano' \| 'Entretiempo' \| 'Todo el año'`                                                                                                                                                                                                                         |
| `use_case`               | Casos de uso              | `Array<'Capsula' \| 'Favorita' \| 'Básico' \| 'Deporte' \| 'Trabajo' \| 'Evento' \| 'Viaje' \| 'Casa'>`                                                                                                                                                                            |
| `formality`              | Formalidad                | `'Muy Informal' \| 'Casual' \| 'Arreglado' \| 'Formal' \| 'Etiqueta'`                                                                                                                                                                                                              |
| `brand`                  | The brand of the clothing | `string`                                                                                                                                                                                                                                                                           |

_(\*) Required._

## Clothing

Prenda de ropa

_Object containing the following properties:_

| Property                 | Description               | Type                                                                                                                                                                                                                                                                               | Default  |
| :----------------------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| **`garment`** (\*)       | Tipo de Prenda            | `'Camisetas' \| 'Polos' \| 'Camisas' \| 'Blusas' \| 'Tops' \| 'Jerseys' \| 'Sudaderas' \| 'Cárdigans' \| 'Chaquetas' \| 'Pantalones' \| 'Vaqueros' \| 'Chinos' \| 'Faldas' \| 'Shorts' \| 'Abrigos' \| 'Gabardinas' \| 'Parkas' \| 'Cazadoras' \| 'Chalecos' \| 'Vestidos' \| ...` |          |
| **`slot`** (\*)          | Parte del outfit          | `'Superior' \| 'Inferior' \| 'Cuerpo Completo' \| 'Exterior' \| 'Calzado' \| 'Accesorios'`                                                                                                                                                                                         |          |
| `variants`               | Detalles Estructurales    | `Array<'Sin Mangas' \| 'Mangas Cortas' \| 'Mangas Largas' \| 'Cuello Redondo' \| 'Cuello Pico' \| 'Cuello Alto' \| 'Cuello Camisa' \| 'Overshirt' \| 'Cropped' \| 'Larga' \| 'Pierna Recta' \| 'Pitillo' \| 'Ancha' \| 'Cargo' \| 'Trench' \| 'Plumífero' \| 'Doble botonadura'>`  |          |
| `fit`                    | Ajuste                    | `'Entallado' \| 'Regular' \| 'Relajado' \| 'Oversize'`                                                                                                                                                                                                                             |          |
| **`primary_color`** (\*) | Color principal           | `'Blanco' \| 'Negro' \| 'Gris' \| 'Beige' \| 'Marrón' \| 'Azul' \| 'Verde' \| 'Rojo' \| 'Burdeos' \| 'Rosa' \| 'Amarillo' \| 'Naranja' \| 'Morado' \| 'Camel' \| 'Caqui' \| 'Marino' \| 'Crema'`                                                                                   |          |
| `secondary_color`        | Color secundario          | `'Blanco' \| 'Negro' \| 'Gris' \| 'Beige' \| 'Marrón' \| 'Azul' \| 'Verde' \| 'Rojo' \| 'Burdeos' \| 'Rosa' \| 'Amarillo' \| 'Naranja' \| 'Morado' \| 'Camel' \| 'Caqui' \| 'Marino' \| 'Crema'`                                                                                   |          |
| `pattern`                | Estampado                 | `'Liso' \| 'Rayas' \| 'Cuadros'`                                                                                                                                                                                                                                                   |          |
| `materials`              | Materiales                | `Array<'Algodón' \| 'Lino' \| 'Lana' \| 'Seda' \| 'Cuero' \| 'Poliéster' \| 'Nylon' \| 'Elastano' \| 'Viscosa' \| 'Denim' \| 'Punto' \| 'Felpa'>`                                                                                                                                  |          |
| **`layer`** (\*)         | Capa Térmica              | `'Base' \| 'Intermedia' \| 'Exterior'`                                                                                                                                                                                                                                             |          |
| `season`                 | Estaciones                | `'Invierno' \| 'Verano' \| 'Entretiempo' \| 'Todo el año'`                                                                                                                                                                                                                         |          |
| `use_case`               | Casos de uso              | `Array<'Capsula' \| 'Favorita' \| 'Básico' \| 'Deporte' \| 'Trabajo' \| 'Evento' \| 'Viaje' \| 'Casa'>`                                                                                                                                                                            |          |
| `formality`              | Formalidad                | `'Muy Informal' \| 'Casual' \| 'Arreglado' \| 'Formal' \| 'Etiqueta'`                                                                                                                                                                                                              |          |
| `brand`                  | The brand of the clothing | `string`                                                                                                                                                                                                                                                                           |          |
| `cares`                  | Cuidados                  | `Array<'Lavado a mano' \| 'Lavado a máquina' \| 'Lavado en seco' \| 'Frio' \| 'Caliente' \| 'Planchado' \| 'Planchado a vapor'>`                                                                                                                                                   |          |
| `status`                 | Estado                    | `'Nuevo' \| 'Bien' \| 'Gastado' \| 'Dañado' \| 'Retirar'`                                                                                                                                                                                                                          | `'Bien'` |
| **`size`** (\*)          |                           | `'28' \| '30' \| '32' \| '34' \| '36' \| '37' \| '38' \| '39' \| '40' \| '41' \| '42' \| '43' \| '44' \| '45' \| '46' \| '48' \| 'XS' \| 'S' \| 'M' \| 'L' \| ...`                                                                                                                 |          |
| `measurements`           | Medidas                   | `Array<number>`                                                                                                                                                                                                                                                                    |          |
| **`type`** (\*)          |                           | `'[[Recursos]]'`                                                                                                                                                                                                                                                                   |          |
| **`subtype`** (\*)       |                           | `'[[Prendas]]'`                                                                                                                                                                                                                                                                    |          |
| **`areas`** (\*)         |                           | `Array<'[[Hogar]]'>`                                                                                                                                                                                                                                                               |          |
| **`color`** (\*)         |                           | `'#CB6120'`                                                                                                                                                                                                                                                                        |          |
| **`icon`** (\*)          |                           | `'shirt'`                                                                                                                                                                                                                                                                          |          |
| `cover`                  |                           | `string`                                                                                                                                                                                                                                                                           |          |

_(\*) Required._

## DetailedClothing

Prenda de ropa: Datos adicionales de dificil obtención

_Object containing the following properties:_

| Property        | Description | Type                                                                                                                                                               | Default  |
| :-------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `cares`         | Cuidados    | `Array<'Lavado a mano' \| 'Lavado a máquina' \| 'Lavado en seco' \| 'Frio' \| 'Caliente' \| 'Planchado' \| 'Planchado a vapor'>`                                   |          |
| `status`        | Estado      | `'Nuevo' \| 'Bien' \| 'Gastado' \| 'Dañado' \| 'Retirar'`                                                                                                          | `'Bien'` |
| **`size`** (\*) |             | `'28' \| '30' \| '32' \| '34' \| '36' \| '37' \| '38' \| '39' \| '40' \| '41' \| '42' \| '43' \| '44' \| '45' \| '46' \| '48' \| 'XS' \| 'S' \| 'M' \| 'L' \| ...` |          |
| `measurements`  | Medidas     | `Array<number>`                                                                                                                                                    |          |

_(\*) Required._

## MetaClothing

Prenda de ropa: Metadatos de Nota

_Object containing the following properties:_

| Property           | Type                 |
| :----------------- | :------------------- |
| **`type`** (\*)    | `'[[Recursos]]'`     |
| **`subtype`** (\*) | `'[[Prendas]]'`      |
| **`areas`** (\*)   | `Array<'[[Hogar]]'>` |
| **`color`** (\*)   | `'#CB6120'`          |
| **`icon`** (\*)    | `'shirt'`            |
| `cover`            | `string`             |

_(\*) Required._
