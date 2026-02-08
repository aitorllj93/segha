import z from "zod";

export const Capabilities = z.literal("[[Capacidades]]")
  .describe('Habilidades, competencias, procedimientos ejecutables. Incluyen instrucciones, métodos, prompts, workflows.');

export const Sources = z.literal("[[Fuentes]]")
  .describe('Bibliografías, recursos validados sobre los que acumular información.');

export const Extracts = z.literal("[[Extractos]]")
  .describe('Fragmentos o citas extraídos de fuentes.');

export const Publications = z.literal("[[Publicaciones]]")
  .describe('Producciones propias: ensayos, posts, novelas, guiones, artículos.');

export const Chronicles = z.literal("[[Crónicas]]")
  .describe('Narraciones detalladas sobre eventos, experiencias personales, cambios de vida, cambios de estado. (Diarios, Hebdomarios, Mensarios, Estacionarios, Anuarios)');

export const Entities = z.literal("[[Entidades]]")
  .describe('Personas, organizaciones, lugares o sistemas identificables con información estable.');

export const Resources = z.literal("[[Recursos]]")
  .describe('Elementos materiales o digitales (herramientas, dispositivos, software) que facilitan la acción.');

export const Scenarios = z.literal("[[Escenarios]]")
  .describe('Situaciones y contextos específicos.')

export const Type = z.enum([
  Capabilities.value,
  Sources.value,
  Extracts.value,
  Publications.value,
  Chronicles.value,
  Entities.value,
  Resources.value,
  Scenarios.value,
]).describe('Tipo de nota.');
