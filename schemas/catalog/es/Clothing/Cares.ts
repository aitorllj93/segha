import z from "zod";

export const WashType = z.enum([
  'Lavado a mano',
  'Lavado a máquina',
  'Lavado en seco',
]);

export const Temperature = z.enum([
  'Frio',
  'Caliente',
]);

export const Ironing = z.enum([
  'Planchado',
  'Planchado a vapor',
]);

export const Care = z.enum([
  ...WashType.options,
  ...Temperature.options,
  ...Ironing.options,
]);

export const Cares = z.array(Care)
  .optional()
  .describe('Cuidados');
