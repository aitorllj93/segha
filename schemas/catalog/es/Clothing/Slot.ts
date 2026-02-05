import z from "zod";

export const Slot = z.enum([
  'Superior',
  'Inferior',
  'Cuerpo Completo',
  'Exterior',
  'Calzado',
  'Accesorios',
]).describe('Parte del outfit');
