import z from "zod";

export const New = z.literal('Nuevo').describe('Nuevo');
export const Good = z.literal('Bien').describe('Bien');
export const Worn = z.literal('Gastado').describe('Gastado');
export const Damaged = z.literal('Dañado').describe('Dañado');
export const Retire = z.literal('Retirar').describe('Retirar');

export const Status = z.enum([
  New.value,
  Good.value,
  Worn.value,
  Damaged.value,
  Retire.value,
]).describe('Estado de la prenda de ropa');
