import z from "zod";

export const LanguageSchema = z.object({
  iso_639_1: z.string().describe('Spoken language ISO 639-1 code'),
  name: z.string().describe('Spoken language name'),
  english_name: z.string().describe('Spoken language English name'),
});

export type Language = z.infer<typeof LanguageSchema>;
