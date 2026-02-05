import z from "zod";

export const FirstLevelArea = z.enum([
  "[[Alimentación]]",
  "[[Salud]]",
  "[[Conocimiento]]",
  "[[Pensamiento Estructurado]]",
  "[[Hogar]]",
  "[[Productividad]]",
  "[[Exploración]]",
  "[[Vínculos]]",
  "[[Ejercicio]]",
  "[[Energía Vital]]",
  "[[Trabajo]]",
  "[[Finanzas]]",
  "[[Salud Mental]]",
  "[[Creatividad]]",
]).describe('Área de Primer Nivel');

export const Area = z.enum([
  ...FirstLevelArea.options,
]).describe('Área');

export const Areas = z.array(Area).describe('Áreas');
