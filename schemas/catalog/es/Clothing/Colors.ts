import z from "zod"

// Colores Base
export const BaseColor = z.enum([
  'Blanco',
  'Negro',
  'Gris',
  'Beige',
  'Marrón',
  'Azul',
  'Verde',
  'Rojo',
  'Burdeos',
  'Rosa',
  'Amarillo',
  'Naranja',
  'Morado',
]);

// Tonos especiales
export const SpecialColor = z.enum([
  'Camel',
  'Caqui',
  'Marino',
  'Crema'
]);

export const Color = z.enum([
  ...BaseColor.options,
  ...SpecialColor.options,
]);

export const PrimaryColor = Color.describe('Color principal');
export const SecondaryColor = Color.optional().describe('Color secundario');

export const Pattern = z.enum([
  'Liso',
  'Rayas',
  'Cuadros',
]).optional().describe('Estampado');
