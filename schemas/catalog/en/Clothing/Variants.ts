import z from "zod";

// Sleeves
export const Sleeves = z.enum([
  'Sleeveless',
  'Short Sleeves',
  'Long Sleeves',
]);

// Necklines
export const Necks = z.enum([
  'Round Neck',
  'V-Neck',
  'High Neck',
  'Shirt Collar',
  'Polo Collar',
  'Boat Neck',
  'Mandarin Collar',
  'Funnel Neck',
  'Hood',
]);

// Closures
export const Closures = z.enum([
  'Buttons',
  'Zipper',
  'Velcro',
  'Laces',
  'Snaps',
]);

// Special Cuts
export const SpecialCuts = z.enum([
  'Overshirt',
  'Cropped',
  'Long'
]);

// Pants
export const Pants = z.enum([
  'Straight Leg',
  'Skinny',
  'Wide',
  'Cargo',
  'Flared',
]);

// Outerwear
export const Outerwear = z.enum([
  'Trench',
  'Puffer',
  'Double Breasted'
]);

export const AdditionalFeatures = z.enum([
  'Pockets',
  'No Pockets',
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
]);

export const Variants = z.array(Variant)
  .optional()
  .describe('Structural Details');
