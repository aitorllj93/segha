
import z from "zod";
import { MetaArticleSchema, CatalogArticleSchema, DetailedArticleSchema } from "../Article";

export const MetaWikipediaSchema = MetaArticleSchema.extend({
  icon: z.string().optional().default('wikipedia').describe('Icono de Lucide.'),
  format: z.literal("[[Entradas de Enciclopedia]]"),
  platform: z.literal("Wikipedia"),
}).describe('Entrada de Wikipedia: Metadatos de Nota');

export const CatalogWikipediaSchema = CatalogArticleSchema.extend({
  title: z.string().describe('Título de la entrada de Wikipedia'),
}).describe('Entrada de Wikipedia: Datos obtenibles de catalogación');

export const DetailedWikipediaSchema = DetailedArticleSchema.extend({
}).describe('Entrada de Wikipedia: Datos adicionales');

export const WikipediaSchema = CatalogWikipediaSchema.extend(DetailedWikipediaSchema.shape).extend(MetaWikipediaSchema.shape).describe('Entrada de Wikipedia');
