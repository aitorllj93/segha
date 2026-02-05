import z from "zod";

export const UseCase = z.enum([
  'Capsula',
  'Favorita',
  'Básico',
  'Deporte',
  'Trabajo',
  'Evento',
  'Viaje',
  'Casa',
])

export const UseCases = z.array(UseCase)
  .optional()
  .describe('Casos de uso');
