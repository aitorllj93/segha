
import z from "zod";

import { Areas, Creativity, TVSeries, SourceSchema } from '../Core';
import { Color, Date, Icon, Image, InProgress, Pending, Watched, Yellow } from "../DataTypes";
import { TVSeriesExternalId } from "./TVSeriesExternalId";

const TVSeriesStatus = z
  .union([Pending, InProgress, Watched])
  .describe('Estado de visualización de la serie de TV');

const TVSeriesIcon = z.literal("tv");

export const TVSeriesSchema = SourceSchema.extend({
  format: TVSeries.default(TVSeries.value),
  status: TVSeriesStatus.default(Pending.value),
  areas: Areas.default([Creativity.value]),
  color: Color.optional().default(Yellow.value).describe('Color de la nota.'),
  icon: Icon.optional().default(TVSeriesIcon.value).describe('Icono de Lucide.'),
  cover: Image.nullable().optional().describe('Portada de la serie de TV.'),
  url: z.url().describe('URL de la serie de TV en IMDB o similar'),
  watch_url: z.url().optional().describe('URL de la serie de TV en streaming'),
  external_ids: z.array(TVSeriesExternalId).optional().describe('IDs externos de la serie de TV'),
  title: z.string().describe('Título de la serie de TV'),
  actors: z.array(z.string()).optional().describe('Actores'),
  published: Date.optional().describe('Año de publicación'),
  genres: z.array(z.string()).optional().describe('Géneros'),
  online_rating: z.number().optional().describe('Puntuación en línea'),
  last_time_watched: Date.optional().describe('Última vez vista'),
  times_watched: z.number().default(0).optional().describe('Veces vista'),
}).describe('Serie de TV');
