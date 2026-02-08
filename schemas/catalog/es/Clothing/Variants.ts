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
  'Cuello Camisa',
  'Cuello Polo',
  'Cuello Panadero',
  'Cuello Mao',
  'Cuello Chimenea',
  'Capucha',
]);

// Cierres
export const Closures = z.enum([
  'Botones',
  'Cremallera',
  'Velcro',
  'Cordones',
  'Broches',
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
  'Cargo',
  'Acampanado',
]);

// Abrigos
export const Outerwear = z.enum([
  'Trench',
  'Plumífero',
  'Doble botonadura'
]);

export const AdditionalFeatures = z.enum([
  'Bolsillos',
  'Sin Bolsillos',
  'Reversible',
]);

export const Variant = z.enum([
  ...Sleeves.options,
  ...Necks.options,
  ...SpecialCuts.options,
  ...Pants.options,
  ...Outerwear.options,
  ...Closures.options,
  ...AdditionalFeatures.options,
])
.describe('Detalles Estructurales');
