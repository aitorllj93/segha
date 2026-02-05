import z from "zod";

// Ropa Interior
export const Underwear = z.enum([
  'Camisetas Interiores',
  'Calzoncillos',
  'Bragas',
  'Sujetadores',
  'Calcetines',
]).describe('Ropa Interior');

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
]).describe('Ropa Superior');

export const Bottom = z.enum([
  'Pantalones',
  'Vaqueros',
  'Chinos',
  'Faldas',
  'Shorts',
]).describe('Ropa Inferior');

export const Outerwear = z.enum([
  'Americanas',
  'Abrigos',
  'Gabardinas',
  'Parkas',
  'Cazadoras',
  'Chalecos',
]).describe('Ropa Exterior');

// Deportivas
export const Sportswear = z.enum([
  'Mallas',
  'Ropa Técnica',
  'Shorts Deportivos',
  'Camisetas Técnicas',
]).describe('Ropa Deportiva');

export const Dress = z.enum([
  'Vestidos',
  'Monos',
]).describe('Pieza única');

export const Shoes = z.enum([
  'Zapatillas',
  'Zapatos',
  'Botas',
  'Sandalias',
]).describe('Calzado');

export const Home = z.enum([
  'Pijamas',
  'Batas'
]).describe('Ropa de Casa');

export const Accessories = z.enum([
  'Cinturones',
  'Gorras',
  'Sombreros',
  'Bufandas',
  'Guantes',
  'Bolsos',
  'Mochilas',
  'Gafas de Sol',
  'Pañuelos',
  'Relojes',
  'Joyas',
]).describe('Accesorios');

export const Swimsuits = z.enum([
  'Bañadores',
  'Bikinis',
]).describe('Trajes de baño');

export const Garment = z.enum([
  ...Underwear.options,
  ...Top.options,
  ...Bottom.options,
  ...Outerwear.options,
  ...Sportswear.options,
  ...Dress.options,
  ...Shoes.options,
  ...Accessories.options,
  ...Home.options,
  ...Swimsuits.options,
]).describe('Tipo de Prenda');
