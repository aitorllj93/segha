import z from "zod";

export const Fit = z.enum([
  'Entallado',
  'Ajustado',
  'Regular',
  'Relajado',
  'Holgado',
  'Extragrande',
]).describe('Ajuste');
