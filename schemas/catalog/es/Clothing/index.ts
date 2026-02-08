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
import { Areas, Home, ResourceSchema } from "../Core";
import { Clothes } from "../Core/Subtype";
import { Color, Icon, Image, Orange } from "../DataTypes";

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
  cares: Cares,
  status: Status,
  size: Size,
  measurements: Measurements,
}).describe('Prenda de ropa');

export const CatalogClothingSchema = ClothingSchema.pick({
  name: true,
  garment: true,
  slot: true,
  variants: true,
  fit: true,
  primary_color: true,
  secondary_color: true,
  pattern: true,
  materials: true,
  layer: true,
  season: true,
  use_case: true,
  formality: true,
  brand: true,
}).meta({
  deprecated: true,
}).describe('Prenda de ropa: Datos obtenibles de catalogación');
