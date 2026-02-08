
import z from "zod";

import { Areas, Articles, SourceSchema, Knowledge } from '../Core';
import { Color, Icon, Image, Blue, Pending, InProgress, Read, Consolidated } from "../DataTypes";


const ArticleStatus = z
  .union([Pending, InProgress, Read, Consolidated])
  .describe('Estado de procesamiento del artículo');

const ArticleIcon = z.literal("newspaper");

export const ArticleSchema = SourceSchema.extend({
  format: Articles.default(Articles.value),
  status: ArticleStatus.default(Pending.value),
  areas: Areas.default([Knowledge.value]),
  color: Color.optional().default(Blue.value).describe('Color de la nota.'),
  icon: Icon.optional().default(ArticleIcon.value).describe('Icono de Lucide.'),
  banner: Image.nullable().optional().describe('Banner de la nota.'),
  url: z.url().describe('URL del artículo'),
  title: z.string().describe('Título del artículo'),
  description: z.string().nullable().optional().describe('Descripción'),
  excerpt: z.string().optional().describe('Extracto del artículo'),
}).describe('Artículo');
