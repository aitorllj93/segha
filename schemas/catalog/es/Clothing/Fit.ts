import z from "zod";

export const Fit = z.enum([
  'Entallado',
  'Regular',
  'Relajado',
  'Oversize',
]).optional().describe('Ajuste');
