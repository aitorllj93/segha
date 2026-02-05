import z from "zod";

// Underwear
export const Underwear = z.enum([
  'Undershirts',
  'Boxers',
  'Panties',
  'Bras',
  'Socks',
]).describe('Underwear');

// Tops
export const Top = z.enum([
  'T-Shirts',
  'Polo Shirts',
  'Shirts',
  'Blouses',
  'Tops',
  'Sweaters',
  'Hoodies',
  'Cardigans',
  'Jackets',
]).describe('Top');

export const Bottom = z.enum([
  'Pants',
  'Jeans',
  'Chinos',
  'Skirts',
  'Shorts',
]).describe('Bottom');

export const Outerwear = z.enum([
  'Blazers',
  'Coats',
  'Trench Coats',
  'Parkas',
  'Jackets',
  'Vests',
]).describe('Outerwear');

// Sportswear
export const Sportswear = z.enum([
  'Leggings',
  'Technical Wear',
  'Sports Shorts',
  'Technical T-Shirts',
]).describe('Sportswear');

export const Dress = z.enum([
  'Dresses',
  'Jumpsuits',
]).describe('One-piece');

export const Shoes = z.enum([
  'Sneakers',
  'Shoes',
  'Boots',
  'Sandals',
]).describe('Footwear');

export const Home = z.enum([
  'Pajamas',
  'Robes'
]).describe('Homewear');

export const Accessories = z.enum([
  'Belts',
  'Caps',
  'Hats',
  'Scarves',
  'Gloves',
  'Handbags',
  'Backpacks',
  'Sunglasses',
  'Handkerchiefs',
  'Watches',
  'Jewelry',
]).describe('Accessories');

export const Swimsuits = z.enum([
  'Swimsuits',
  'Bikinis',
]).describe('Swimwear');

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
]).describe('Garment Type');
