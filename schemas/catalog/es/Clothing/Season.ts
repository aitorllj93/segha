import z from "zod";

export const Season = z.enum([
  'Invierno',
  'Verano',
  'Entretiempo',
  'Todo el año',
]).optional().describe('Estaciones');
