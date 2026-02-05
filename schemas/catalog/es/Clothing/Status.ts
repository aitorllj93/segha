import z from "zod";

export const Status = z.enum([
  'Nuevo',
  'Bien',
  'Gastado',
  'Dañado',
  'Retirar'
]).optional().default('Bien').describe('Estado');
