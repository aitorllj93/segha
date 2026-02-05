import z from "zod";

// Superiores
export const Top = z.enum([
  'Camisetas',
  'Polos',
  'Camisas',
  'Blusas',
  'Tops',
  'Jerseys',
  'Sudaderas',
  'Cárdigans',
  'Chaquetas',
]);

export const Bottom = z.enum([
  'Pantalones',
  'Vaqueros',
  'Chinos',
  'Faldas',
  'Shorts',
]);

export const Outerwear = z.enum([
  'Abrigos',
  'Gabardinas',
  'Parkas',
  'Cazadoras',
  'Chalecos',
]);

export const Dress = z.enum([
  'Vestidos',
  'Monos',
]);

export const Shoes = z.enum([
  'Zapatillas',
  'Zapatos',
  'Botas',
  'Sandalias',
]);

export const Accessories = z.enum([
  'Cinturones',
  'Gorras',
  'Sombreros',
  'Bufandas',
  'Guantes',
  'Bolsos',
  'Mochilas'
])

export const Garment = z.enum([
  ...Top.options,
  ...Bottom.options,
  ...Outerwear.options,
  ...Dress.options,
  ...Shoes.options,
  ...Accessories.options,
]).describe('Tipo de Prenda');
