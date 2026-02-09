import z from "zod";

import { MethodsSchema } from "./Methods";

export const Version = z.literal("3").describe("API version");
export const BaseUrl = z.literal('https://api.themoviedb.org/3').describe('Base URL for the API');
export const ImageBaseUrl = z.literal('https://image.tmdb.org/t/p').describe('Base URL for images');

export const SpecSchema = z.object({
  version: Version,
  baseUrl: BaseUrl,
  imageBaseUrl: ImageBaseUrl,
  methods: MethodsSchema,
});

export const ConfigurationSchema = z.object({
  apiKey: z.string().describe('Your TMDB API key'),
});

export type Spec = z.infer<typeof SpecSchema>;
export type Configuration = z.infer<typeof ConfigurationSchema>;
