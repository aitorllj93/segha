import z from "zod";

import { Cares } from "./Cares";
import { Pattern, PrimaryColor, SecondaryColor } from "./Colors";
import { Fit } from "./Fit";
import { Formality } from "./Formality";
import { Garment } from "./Garment";
import { Layer } from "./Layer";
import { Materials } from "./Materials";
import { Measurements } from "./Measurements";
import { Season } from "./Season";
import { Size } from "./Size";
import { Slot } from "./Slot";
import { Status } from "./Status";
import { UseCases } from "./UseCases";
import { Variants } from "./Variants";

export const CatalogClothingSchema = z.object({
  name: z.string().describe('Descriptive name of the clothing item'),
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
}).describe('Clothing item: Catalogable data');

export const DetailedClothingSchema = z.object({
  cares: Cares,
  status: Status,
  size: Size,
  measurements: Measurements,
}).describe('Clothing item: Additional hard-to-obtain data');

export const MetaClothingSchema = z.object({
  type: z.literal("[[Resources]]"),
  subtype: z.literal("[[Clothes]]"),
  areas: z.array(z.literal("[[Home]]")),
  color: z.literal("#CB6120"),
  icon: z.literal("shirt"),
  cover: z.string().optional(),
}).describe('Clothing item: Note metadata');

export const ClothingSchema = CatalogClothingSchema.extend(DetailedClothingSchema.shape).extend(MetaClothingSchema.shape).describe('Clothing item');
