import z from "zod";

import { MethodsSchema } from "./Methods";

export const API_VERSION = '3' as const;
export const API_BASE_URL = 'https://api.themoviedb.org/3' as const;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p' as const;

export const Version = z.literal(API_VERSION).describe("API version");
export const BaseUrl = z.literal(API_BASE_URL).describe('Base URL for the API');
export const ImageBaseUrl = z.literal(IMAGE_BASE_URL).describe('Base URL for images');

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
