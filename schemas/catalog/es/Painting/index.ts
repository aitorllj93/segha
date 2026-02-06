
import z from "zod";

import { Areas } from '../Areas';

export const MetaPaintingSchema = z.object({
  type: z.literal("[[Fuentes]]"),
  format: z.literal("[[Pinturas]]"),
  areas: Areas.default(["[[Creatividad]]"]),
  color: z.string().optional().default("#BE9207").describe('Color de la nota.'),
  icon: z.string().optional().default('frame').describe('Icono de Lucide.'),
  cover: z.string().describe('Imagen de la pintura.'),
}).describe('Pintura: Metadatos de Nota');

export const CatalogPaintingSchema = z.object({
  title: z.string().optional().describe('Título de la pintura'),
  description: z.string().optional().describe('Descripción'),
  author: z.array(z.string()).optional().describe('Autores'),
  published: z.string().optional().describe('Año de publicación'),
}).describe('Pintura: Datos obtenibles de catalogación');

export const DetailedPaintingSchema = z.object({
  collection: z.string().optional().describe('Colección'),
  position: z.string().optional().describe('Posición en la colección'),
  projects: z.array(z.string()).optional().describe('Proyectos'),
  topics: z.array(z.string()).optional().describe('Temas'),
  rating: z.number().optional().describe('Puntuación del artículo'),
}).describe('Pintura: Datos adicionales');

export const PaintingSchema = CatalogPaintingSchema.extend(DetailedPaintingSchema.shape).extend(MetaPaintingSchema.shape).describe('Pintura');
