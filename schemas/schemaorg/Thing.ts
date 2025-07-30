import z from "zod";
import { TextSchema, URLSchema } from "./DataTypes";

export const ThingSchema = z.object({
  additionalType: z.union([
    TextSchema,
    URLSchema
  ]).nullish(),
  alternateName: TextSchema.nullish(),
  description: TextSchema.nullish(), // or TextObject
  disambiguatingDescription: TextSchema.nullish(),
  identifier: z.union([ // or PropertyValue
    TextSchema,
    URLSchema
  ]).nullish(),
  image: URLSchema.nullish(), // or ImageObject
  mainEntityOfPage: URLSchema.nullish(), // or CreativeWork
  name: TextSchema.nullish(),
  // potentialAction
  sameAs: URLSchema.nullish(),
  // subjectOf
  url: URLSchema.nullish(),
})