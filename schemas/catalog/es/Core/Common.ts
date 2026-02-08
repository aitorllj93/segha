import z from 'zod';

import { Areas } from './Area';
import { Color, Icon, Image, Wikilink } from '../DataTypes';
import { Type } from './Type';
import { Rating } from './Rating';

export const CommonSchema = z.object({
  // Meta
  type: Type,
  areas: Areas.min(1)
    .describe('Áreas de la nota.'),
  color: Color
    .optional()
    .describe('Color'),
  icon: Icon
    .optional()
    .describe('Icono'),
  banner: Image
    .optional()
    .describe('Imagen'),
  cover: Image
    .optional()
    .describe('Cubierta'),
  // Detailed
  projects: z.array(Wikilink)
    .optional()
    .describe('Proyectos asociados.'),
  topics: z.array(z.union([
    Wikilink,
    z.string(),
  ])).optional()
    .describe('Temas: Wikilink o texto libre'),
  status: z.string()
    .optional()
    .describe('Estado de la nota.'),
  rating: Rating
    .optional()
    .describe('Puntuación de la nota.'),
  aliases: z.array(z.string())
    .optional()
    .describe('Alias de la nota.'),
}).describe('Notas');
