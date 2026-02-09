import z from "zod";
import { StreamingSourceTypeSchema } from "../Sources/StreamingSource";

export const TitleStreamingSourceSchema = z.object({
  source_id: z.number().describe('Source ID'),
  name: z.string().describe('Name'),
  type: StreamingSourceTypeSchema,
  region: z.string().describe('Region'),
  ios_url: z.string().nullable().describe('iOS deep link URL. For free plans, returns "Deeplinks available for paid plans only."'),
  android_url: z.string().nullable().describe('Android deep link URL. For free plans, returns "Deeplinks available for paid plans only."'),
  web_url: z.string().nullable().describe('Web URL to watch the title'),
  tvos_url: z.string().nullable().describe('tvOS deep link. Only included if TV links are enabled for your account.'),
  android_tv_url: z.string().nullable().describe('Android TV deep link. Only included if TV links are enabled for your account.'),
  roku_url: z.string().nullable().describe('Roku deep link. Only included if TV links are enabled for your account.'),
  format: z.string().nullable().describe('Video quality (HD, 4K, etc.)'),
  price: z.number().nullable().describe('Price for rent/buy sources'),
  seasons: z.number().nullable().describe('Number of seasons available (for TV)'),
  episodes: z.number().nullable().describe('Number of episodes available (for TV)'),
});

export const TitleStreamingSourcesParametersSchema = z.object({
  regions: z.string().describe('Filter sources by region. Pass one or multiple 2-letter country codes comma-separated (e.g., US,GB,CA).'),
});

export const TitleStreamingSourcesSchema = z.array(TitleStreamingSourceSchema);

export type TitleStreamingSource = z.infer<typeof TitleStreamingSourceSchema>;
export type TitleStreamingSources = z.infer<typeof TitleStreamingSourcesSchema>;
export type TitleStreamingSourcesParameters = z.infer<typeof TitleStreamingSourcesParametersSchema>;
