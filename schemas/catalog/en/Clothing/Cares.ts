import z from "zod";

export const WashType = z.enum([
  'Hand Wash',
  'Machine Wash',
  'Dry Clean',
]);

export const Temperature = z.enum([
  'Cold',
  'Hot',
]);

export const Ironing = z.enum([
  'Ironing',
  'Steam Ironing',
]);

export const Care = z.enum([
  ...WashType.options,
  ...Temperature.options,
  ...Ironing.options,
]);

export const Cares = z.array(Care)
  .optional()
  .describe('Care Instructions');
