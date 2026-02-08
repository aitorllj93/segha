import z from "zod";

export const VeryCasual = z.literal('Muy Informal').describe('Muy Informal');
export const Casual = z.literal('Casual').describe('Casual');
export const SmartCasual = z.literal('Arreglado').describe('Arreglado');
export const Formal = z.literal('Formal').describe('Formal');
export const BlackTie = z.literal('Etiqueta').describe('Etiqueta');

export const Formality = z.enum([
  VeryCasual.value,
  Casual.value,
  SmartCasual.value,
  Formal.value,
  BlackTie.value,
]).describe('Formalidad');
