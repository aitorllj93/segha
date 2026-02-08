import z from "zod";

import { Areas, Home, ResourceSchema } from "../Core";
import { Clothes } from "../Core/Subtype";
import { Color, Icon, Image, Orange } from "../DataTypes";
import { Care } from "./Cares";
import { Pattern, PrimaryColor, SecondaryColor } from "./Colors";
import { Fit } from "./Fit";
import { Casual, Formality } from "./Formality";
import { Garment } from "./Garment";
import { Layer } from "./Layer";
import { Material } from "./Materials";
import { Measurements } from "./Measurements";
import { AllYear, Season } from "./Season";
import { Size } from "./Size";
import { Slot } from "./Slot";
import { Good, Status } from "./Status";
import { UseCase } from "./UseCases";
import { Variant } from "./Variants";

const ClothingIcon = z.literal("shirt");

export const ClothingSchema = ResourceSchema.extend({
  subtype: Clothes.default(Clothes.value),
  areas: Areas.default([Home.value]),
  color: Color.optional().default(Orange.value).describe('Color de la nota.'),
  icon: Icon.optional().default(ClothingIcon.value).describe('Icono de Lucide.'),
  cover: Image.nullable().optional().describe('Portada de la prenda de ropa.'),
  name: z.string().describe('Nombre descriptivo de la prenda de ropa'),
  garment: Garment,
  slot: Slot,
  variants: z.array(Variant).optional().describe('Detalles Estructurales'),
  fit: Fit.optional(),
  primary_color: PrimaryColor,
  secondary_color: SecondaryColor.optional(),
  pattern: Pattern.optional(),
  materials: z.array(Material).optional().describe('Materiales'),
  layer: Layer,
  season: Season.optional().default(AllYear.value),
  use_case: z.array(UseCase).optional().describe('Casos de uso'),
  formality: Formality.optional().default(Casual.value),
  brand: z.string().optional().describe('The brand of the clothing'),
  cares: z.array(Care).optional().describe('Cuidado de la prenda'),
  status: Status.optional().default(Good.value),
  size: Size.optional(),
  measurements: Measurements.optional(),
}).describe('Prenda de ropa');
