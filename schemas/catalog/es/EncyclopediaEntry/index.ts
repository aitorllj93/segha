import z from "zod";

import { Areas, Articles, SourceSchema, Knowledge, EncyclopediaEntries } from '../Core';
import { Color, Icon, Image, Blue, Pending, InProgress, Read, Consolidated } from "../DataTypes";


const EntryStatus = z
  .union([Pending, InProgress, Read, Consolidated])
  .describe('Estado de procesamiento del artículo');

const EntryIcon = z.literal("book");

  export const EncyclopediaEntrySchema = SourceSchema.extend({
    format: EncyclopediaEntries.default(EncyclopediaEntries.value),
    status: EntryStatus.default(Pending.value),
    areas: Areas.default([Knowledge.value]),
    color: Color.optional().default(Blue.value).describe('Color de la nota.'),
    icon: Icon.optional().default(EntryIcon.value).describe('Icono de Lucide.'),
    banner: Image.nullable().optional().describe('Banner de la nota.'),
    cover: Image.nullable().optional().describe('Portada de la nota.'),
    url: z.url().describe('URL de la entrada'),
    title: z.string().describe('Título de la entrada'),
    description: z.string().nullable().optional().describe('Descripción'),
    excerpt: z.string().optional().describe('Extracto de la entrada'),
  }).describe('Entrada de Enciclopedia');

export const WikipediaEntrySchema = EncyclopediaEntrySchema.extend({
  platform: z.literal("Wikipedia"),
  icon: Icon.optional().default('wikipedia').describe('Icono de Lucide.'),
}).describe('Entrada de Wikipedia');
