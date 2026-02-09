import z from "zod";

export const NetworkSchema = z.object({
  id: z.number().describe('Unique identifier for the network'),
  name: z.string().describe('Network name'),
  logo_path: z.string().nullable().describe('Logo path (relative URL)'),
  origin_country: z.string().describe('Network origin country'),
});
