import z from "zod";
import { MethodsSchema } from "./Methods";

export const Version = z.literal("1").describe("API version");
export const BaseUrl = z.literal('https://api.watchmode.com/v1').describe('Base URL for the API');
export const DatasetsBaseUrl = z.literal('https://api.watchmode.com/datasets').describe('Base URL for datasets');

export const SpecSchema = z.object({
  version: Version,
  baseUrl: BaseUrl,
  datasetsBaseUrl: DatasetsBaseUrl,
  methods: MethodsSchema,
});

export const ConfigurationSchema = z.object({
  apiKey: z.string().describe('Your Watchmode API key'),
});

export type Spec = z.infer<typeof SpecSchema>;
export type Configuration = z.infer<typeof ConfigurationSchema>;
