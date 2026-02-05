import z from "zod"

// Naturales
export const NaturalMaterial = z.enum([
  'Algodón',
  'Lino',
  'Lana',
  'Seda',
  'Cuero',
  'Cachemir',
  'Ante',
]);

// Sintéticos
export const SyntheticMaterial = z.enum([
  'Poliéster',
  'Nylon',
  'Elastano',
  'Viscosa',
  'Piel Sintética',
  'Gore-Tex',
]);

// Tejidos Comunes
export const CommonFabric = z.enum([
  'Denim',
  'Punto',
  'Felpa',
  'Tweed',
  'Satén',
  'Terciopelo',
  'Jacquard',
  'Franela',
  'Gabardina',
]);

export const Material = z.enum([
  ...NaturalMaterial.options,
  ...SyntheticMaterial.options,
  ...CommonFabric.options,
]);

export const Materials = z.array(Material)
  .optional()
  .describe('Materiales');
