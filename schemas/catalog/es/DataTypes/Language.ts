import z from "zod";

import * as Languages from '../../common/Languages';

export const Language = z.string()
  .regex(Languages.AnyCode, "Código de idioma inválido. Debe ser un código de idioma válido.")
  .describe('Idioma: Código de idioma (ISO 639-1 o ISO 639-3).');

export const LanguageTag = z.string()
  .regex(Languages.LanguageTag, "Tag de idioma inválida. Debe ser un tag de idioma válido.")
  .describe('Idioma: Tag de idioma (BCP 47).');
