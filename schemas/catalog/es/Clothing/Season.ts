import z from "zod";

export const Winter = z.literal('Invierno').describe('Invierno');
export const Summer = z.literal('Verano').describe('Verano');
export const Autumn = z.literal('Entretiempo').describe('Entretiempo');
export const AllYear = z.literal('Todo el año').describe('Todo el año');

export const Season = z.enum([
  Winter.value,
  Summer.value,
  Autumn.value,
  AllYear.value,
]).describe('Estaciones');
