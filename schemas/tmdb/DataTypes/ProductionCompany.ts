import z from "zod";

export const ProductionCompanySchema = z.object({
  id: z.number().describe('Unique identifier for the production company'),
  name: z.string().describe('Production company name'),
  logo_path: z.string().nullable().describe('Logo path (relative URL)'),
  origin_country: z.string().describe('Production company origin country'),
})

export type ProductionCompany = z.infer<typeof ProductionCompanySchema>;
