
import z from "zod";

import { CommonSchema } from "./Common";
import { Sources } from "./Type";
import { Articles, Paintings } from "./Format";
import { Rating } from "./Rating";
import { Date } from "../DataTypes";

export const SourcesFormat = z.union([
  Articles,
  Paintings,
]).describe('Formato de la fuente.');

export const SourceSchema = CommonSchema.extend({
  type: Sources,
  format: SourcesFormat,
  status: z.string()
    .optional()
    .default('Pendiente')
    .describe('Estado de procesamiento de la fuente.'),
  rating: Rating
    .optional()
    .describe('Valoración personal de la fuente.'),
  url: z.url()
    .optional()
    .describe('URL de la fuente.'),
  author: z.array(z.string())
    .optional()
    .describe('Autores de la fuente.'),
  published: Date
    .optional()
    .describe('Fecha de publicación de la fuente.'),
  title: z.string()
    .optional()
    .describe('Título de la fuente.'),
}).describe('Fuentes Bibliográficas');
