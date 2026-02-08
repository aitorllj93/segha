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

export const MetallicColor = z.enum([
  'Oro',
  'Plata',
  'Bronce',
]);

export const Color = z.enum([
  ...BaseColor.options,
  ...SpecialColor.options,
  ...MetallicColor.options,
]);

export const PrimaryColor = Color.describe('Color principal');
export const SecondaryColor = Color.describe('Color secundario');

export const Pattern = z.enum([
  'Liso',
  'Rayas',
  'Cuadros',
  'Lunares',
  'Animal Print',
  'Floral',
  'Geométrico',
  'Camuflaje',
  'EstampadoGráfico',
  'Degradado'
]).describe('Estampado');
