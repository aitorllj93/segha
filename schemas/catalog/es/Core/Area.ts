import z from "zod";

export const Food = z.literal("[[Alimentación]]")
  .describe('Alimentación');

export const Health = z.literal("[[Salud]]")
  .describe('Salud');

export const Knowledge = z.literal("[[Conocimiento]]")
  .describe('Conocimiento');

export const StructuredThinking = z.literal("[[Pensamiento Estructurado]]")
  .describe('Pensamiento Estructurado');

export const Home = z.literal("[[Hogar]]")
  .describe('Hogar');

export const Productivity = z.literal("[[Productividad]]")
  .describe('Productividad');

export const Exploration = z.literal("[[Exploración]]")
  .describe('Exploración');

export const Links = z.literal("[[Vínculos]]")
  .describe('Vínculos');

export const Exercise = z.literal("[[Ejercicio]]")
  .describe('Ejercicio');

export const Energy = z.literal("[[Energía Vital]]")
  .describe('Energía Vital');

export const Work = z.literal("[[Trabajo]]")
  .describe('Trabajo');

export const Finances = z.literal("[[Finanzas]]")
  .describe('Finanzas');

export const MentalHealth = z.literal("[[Salud Mental]]")
  .describe('Salud Mental');

export const Creativity = z.literal("[[Creatividad]]")
  .describe('Creatividad');

export const FirstLevelArea = z.enum([
  Food.value,
  Health.value,
  Knowledge.value,
  StructuredThinking.value,
  Home.value,
  Productivity.value,
  Exploration.value,
  Links.value,
  Exercise.value,
  Energy.value,
  Work.value,
  Finances.value,
  MentalHealth.value,
  Creativity.value,
]).describe('Área de Primer Nivel');

export const Area = z.enum([
  ...FirstLevelArea.options,
]).describe('Área');

export const Areas = z.array(Area).describe('Áreas');
