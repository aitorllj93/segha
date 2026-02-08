import z from "zod";

import * as Icons from '../../common/Icons';

export const Icon = z.string()
  .regex(Icons.LucideCode, "Código de icono inválido. Debe ser un código de icono válido.")
  .describe('Icono: Código de icono (Lucide).');
