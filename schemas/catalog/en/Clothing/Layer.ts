import z from "zod";

// Thermal Layer
export const Layer = z.enum([
  'Base',
  'Mid',
  'Outer',
]).describe('Thermal Layer');
