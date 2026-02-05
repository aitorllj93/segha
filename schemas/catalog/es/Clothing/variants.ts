import z from "zod";

// Mangas
export const Sleeves = z.enum([
  'Sin Mangas',
  'Mangas Cortas',
  'Mangas Largas',
]);

// Cuellos
export const Necks = z.enum([
  'Cuello Redondo',
  'Cuello Pico',
  'Cuello Alto',
  'Cuello Camisa'
]);

// Cortes especiales
export const SpecialCuts = z.enum([
  'Overshirt',
  'Cropped',
  'Larga'
]);

// Pantalones
export const Pants = z.enum([
  'Pierna Recta',
  'Pitillo',
  'Ancha',
  'Cargo'
]);

// Abrigos
export const Outerwear = z.enum([
  'Trench',
  'Plumífero',
  'Doble botonadura'
]);

export const Variant = z.enum([
  ...Sleeves.options,
  ...Necks.options,
  ...SpecialCuts.options,
  ...Pants.options,
  ...Outerwear.options,
]);

export const Variants = z.array(Variant)
  .optional()
  .describe('Detalles Estructurales');
