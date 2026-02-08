
import z from "zod";

import * as Colors from '../../common/Colors';

export const Hex = z.string()
  .regex(Colors.Hex, "Formato de color inválido. Debe ser un código hexadecimal de 6 dígitos.")
  .describe('Color: Código hexadecimal de 6 o 8 dígitos.');

// Right now only Hex is supported
export const Color = z.string()
  .regex(Colors.Hex, "Formato de color inválido. Debe ser un código hexadecimal de 6 dígitos.")
  .describe('Color: Código hexadecimal de 6 o 8 dígitos.');

export const Blue = z.literal("#3171B2")
  .describe('Color: Azul');

export const Yellow = z.literal("#BE9207")
  .describe('Color: Amarillo');

export const Orange = z.literal("#CB6120")
  .describe('Color: Naranja');
