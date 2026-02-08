import z from "zod";

export const Base = z.literal('Base').describe('Base');
export const Intermediate = z.literal('Intermedia').describe('Intermedia');
export const Exterior = z.literal('Exterior').describe('Exterior');

// Capa Térmica
export const Layer = z.enum([
  Base.value,
  Intermediate.value,
  Exterior.value,
]).describe('Capa Térmica');
