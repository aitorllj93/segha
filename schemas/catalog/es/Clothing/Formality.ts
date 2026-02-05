import z from "zod";

export const Formality = z.enum([
  'Muy Informal', // 1,
  'Casual', // 2,
  'Arreglado', // 3,
  'Formal', // 4,
  'Etiqueta', // 5,
]).optional().describe('Formalidad');
