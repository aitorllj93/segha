import z from "zod";

// Superiores
export const TopsSize = z.enum([
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
]);

// Pantalones
export const PantsSize = z.enum([
  '28',
  '30',
  '32',
  '34',
  '36',
  '38',
  '40',
  '42',
  '44',
  '46',
  '48',
]);

// Calzado
export const ShoesSize = z.enum([
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
]);

export const Size = z.enum([
  ...TopsSize.options,
  ...PantsSize.options,
  ...ShoesSize.options,
]);
