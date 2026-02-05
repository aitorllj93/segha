import z from "zod";

import { Cares } from "./Cares";
import { Pattern, PrimaryColor, SecondaryColor } from "./Colors";
import { Fit } from "./Fit";
import { Formality } from "./Formality";
import { Garment } from "./Garment";
import { Layer } from "./layer";
import { Materials } from "./materials";
import { Season } from "./season";
import { Size } from "./size";
import { Slot } from "./slot";
import { Status } from "./status";
import { UseCases } from "./use_cases";
import { Variants } from "./variants";
import { Measurements } from "./measurements";

export const CatalogClothingSchema = z.object({
  garment: Garment,
  slot: Slot,
  variants: Variants,
  fit: Fit,
  primary_color: PrimaryColor,
  secondary_color: SecondaryColor,
  pattern: Pattern,
  materials: Materials,
  layer: Layer,
  season: Season,
  use_case: UseCases,
  formality: Formality,
  brand: z.string().optional().describe('The brand of the clothing'),
}).describe('Prenda de ropa: Datos obtenibles de catalogación');

export const DetailedClothingSchema = z.object({
  cares: Cares,
  status: Status,
  size: Size,
  measurements: Measurements,
}).describe('Prenda de ropa: Datos adicionales de dificil obtención');

export const MetaClothingSchema = z.object({
  type: z.literal("[[Recursos]]"),
  subtype: z.literal("[[Prendas]]"),
  areas: z.array(z.literal("[[Hogar]]")),
  color: z.literal("#CB6120"),
  icon: z.literal("shirt"),
  cover: z.string().optional(),
}).describe('Prenda de ropa: Metadatos de Nota');

export const ClothingSchema = CatalogClothingSchema.extend(DetailedClothingSchema.shape).extend(MetaClothingSchema.shape).describe('Prenda de ropa');
