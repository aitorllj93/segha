import z from "zod"

// Natural
export const NaturalMaterial = z.enum([
  'Cotton',
  'Linen',
  'Wool',
  'Silk',
  'Leather',
  'Cashmere',
  'Suede',
]);

// Synthetic
export const SyntheticMaterial = z.enum([
  'Polyester',
  'Nylon',
  'Elastane',
  'Viscose',
  'Synthetic Leather',
  'Gore-Tex',
]);

// Common Fabrics
export const CommonFabric = z.enum([
  'Denim',
  'Knit',
  'Fleece',
  'Tweed',
  'Satin',
  'Velvet',
  'Jacquard',
  'Flannel',
  'Gabardine',
]);

export const Material = z.enum([
  ...NaturalMaterial.options,
  ...SyntheticMaterial.options,
  ...CommonFabric.options,
]);

export const Materials = z.array(Material)
  .optional()
  .describe('Materials');
