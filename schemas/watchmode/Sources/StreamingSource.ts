import z from "zod";

export const SubscriptionServiceType = z.literal('sub').describe('Subscription services (Netflix, Hulu, etc.)');
export const PurchaseServiceType = z.literal('purchase').describe('Rental/purchase services (iTunes, Vudu, etc.)');
export const FreeServiceType = z.literal('free').describe('Free ad-supported services (Tubi, Pluto TV, etc.)');
export const TVEServiceType = z.literal('tve').describe('TV Channel App (cable login required)');

export const StreamingSourceTypeSchema = z.union([
  SubscriptionServiceType,
  PurchaseServiceType,
  FreeServiceType,
  TVEServiceType,
]).describe('Streaming source type');

export const StreamingSourceSchema = z.object({
  id: z.number().describe('ID'),
  name: z.string().describe('Name'),
  type: StreamingSourceTypeSchema,
  logo_100px: z.string().describe('Logo 100px'),
  ios_appstore_url: z.string().nullable().describe('iOS App Store URL'),
  android_playstore_url: z.string().nullable().describe('Android Play Store URL'),
  android_tv_url: z.string().nullable().describe('Android TV URL'),
  fire_tv_url: z.string().nullable().describe('Fire TV URL'),
  roku_url: z.string().nullable().describe('Roku URL'),
  tvos_url: z.string().nullable().describe('tvOS URL'),
  regions: z.array(z.string()).describe('Regions'),
});

export const StreamingSourcesSchema = z.array(StreamingSourceSchema);

export const StreamingSourcesParametersSchema = z.object({
  regions: z.string().describe('Filter sources by region. Pass one or multiple 2-letter country codes comma-separated (e.g., US,GB,CA).'),
  types: z.string().describe('Filter sources by type. Pass one or multiple types comma-separated.'),
});

export type StreamingSourceType = z.infer<typeof StreamingSourceTypeSchema>;
export type StreamingSource = z.infer<typeof StreamingSourceSchema>;
export type StreamingSources = z.infer<typeof StreamingSourcesSchema>;
export type StreamingSourcesParameters = z.infer<typeof StreamingSourcesParametersSchema>;
