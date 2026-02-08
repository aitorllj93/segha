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
]).describe('Casos de uso');
