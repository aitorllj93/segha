import z from "zod";

export const Perfect = z.literal(7)
  .describe('Perfecto, hay que probarlo, te cambia la vida, haz un esfuerzo por buscarlo.');

export const Excellent = z.literal(6)
  .describe('Excelente, vale la pena repetirlo');

export const Good = z.literal(5)
  .describe('Bueno, no hagas un esfuerzo especial, pero es agradable.');

export const Passable = z.literal(4)
  .describe('Aceptable, sirve en caso de apuro.');

export const Bad = z.literal(3)
  .describe('Malo, no lo hagas si puedes evitarlo.');

export const Atrocious = z.literal(2)
  .describe('Atroz, evítalo activamente, repulsivo');

export const Evil = z.literal(1)
  .describe('Malvado, te cambia la vida para mal.');

export const Rating = z.union([
  Perfect,
  Excellent,
  Good,
  Passable,
  Bad,
  Atrocious,
  Evil,
])
  .describe('Puntuación de la nota.');
