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
  'Fiesta',
  'Playa',
  'Lluvia',
  'Frío Extremo',
])

export const UseCases = z.array(UseCase)
  .optional()
  .describe('Casos de uso');
