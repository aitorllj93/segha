import z from "zod";

export const ProductionCountrySchema = z.object({
  iso_3166_1: z.string().describe('Production country ISO 3166-1 Alpha-2 code'),
  name: z.string().describe('Production country name'),
})

export type ProductionCountry = z.infer<typeof ProductionCountrySchema>;
