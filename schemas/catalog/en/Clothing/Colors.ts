import z from "zod"

// Base Colors
export const BaseColor = z.enum([
  'White',
  'Black',
  'Gray',
  'Beige',
  'Brown',
  'Blue',
  'Green',
  'Red',
  'Burgundy',
  'Pink',
  'Yellow',
  'Orange',
  'Purple',
]);

// Special Tones
export const SpecialColor = z.enum([
  'Camel',
  'Khaki',
  'Navy',
  'Cream'
]);

export const MetallicColor = z.enum([
  'Gold',
  'Silver',
  'Bronze',
]);

export const Color = z.enum([
  ...BaseColor.options,
  ...SpecialColor.options,
  ...MetallicColor.options,
]);

export const PrimaryColor = Color.describe('Primary color');
export const SecondaryColor = Color.optional().describe('Secondary color');

export const Pattern = z.enum([
  'Solid',
  'Stripes',
  'Plaid',
  'Polka Dots',
  'Animal Print',
  'Floral',
  'Geometric',
  'Camouflage',
  'Graphic Print',
  'Gradient'
]).optional().describe('Pattern');
