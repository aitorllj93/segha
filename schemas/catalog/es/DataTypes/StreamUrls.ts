import z from "zod";

export const StreamUrlsSchema = z.object({
  hbo_max_url: z.url().optional().describe('URL de HBO Max'),
  netflix_url: z.url().optional().describe('URL de Netflix'),
  apple_tv_url: z.url().optional().describe('URL de Apple TV'),
  amazon_prime_url: z.url().optional().describe('URL de Amazon Prime'),
  disney_plus_url: z.url().optional().describe('URL de Disney Plus'),
  hulu_url: z.url().optional().describe('URL de Hulu'),
  pluto_tv_url: z.url().optional().describe('URL de Pluto TV'),
  youtube_url: z.url().optional().describe('URL de YouTube'),
  watch_url: z.url().optional().describe('URL de streaming'),
}).describe('URLs de streaming');
