
import z from "zod";

import { Areas, Knowledge, SourceSchema, Videos } from '../Core';
import { Blue, Color, Icon, InProgress, Pending, Watched } from "../DataTypes";

const VideoStatus = z
  .union([Pending, InProgress, Watched])
  .describe('Estado de visualización de la película');

const VideoIcon = z.literal("video");

const VideoPlatform = z.union([
  z.literal("YouTube"),
  z.literal("Vimeo")
]).describe('Plataforma de visualización del vídeo');

export const VideoSchema = SourceSchema.extend({
  format: Videos.default(Videos.value),
  status: VideoStatus.default(Pending.value),
  areas: Areas.default([Knowledge.value]),
  color: Color.optional().default(Blue.value).describe('Color de la nota.'),
  icon: Icon.optional().default(VideoIcon.value).describe('Icono de Lucide.'),
  title: z.string().describe('Título de la película'),
  platform: VideoPlatform,
}).describe('Vídeo');

export const YoutubeSchema = VideoSchema.extend({
  platform: z.literal("YouTube"),
  icon: Icon.optional().default('youtube').describe('Icono de Lucide.'),
}).describe('Vídeo de YouTube');

export const VimeoSchema = VideoSchema.extend({
  platform: z.literal("Vimeo"),
}).describe('Vídeo de Vimeo');
