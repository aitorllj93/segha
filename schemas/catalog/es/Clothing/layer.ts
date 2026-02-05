import z from "zod";

// Capa Térmica
export const Layer = z.enum([
  'Base',
  'Intermedia',
  'Exterior',
]).describe('Capa Térmica');
