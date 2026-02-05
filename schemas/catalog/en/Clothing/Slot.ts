import z from "zod";

export const Slot = z.enum([
  'Top',
  'Bottom',
  'Full Body',
  'Outer',
  'Footwear',
  'Accessories',
]).describe('Outfit part');
