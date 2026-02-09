import z from "zod";

export const VideoSchema = z.object({
  iso_639_1: z.string().describe('Spoken language ISO 639-1 code'),
  iso_3166_1: z.string().describe('Production country ISO 3166-1 Alpha-2 code'),
  name: z.string().describe('Video name'),
  key: z.string().describe('Video key'),
  site: z.string().describe('Video site'),
  size: z.number().describe('Video size'),
  type: z.string().describe('Video type'),
  official: z.boolean().describe('Video official'),
  published_at: z.string().describe('Video published at'),
  id: z.string().describe('Video ID'),
});

export const VideosResponseSchema = z.object({
  id: z.number().describe('Video ID'),
  results: z.array(VideoSchema).describe('Videos'),
});

export type Video = z.infer<typeof VideoSchema>;
export type VideosResponse = z.infer<typeof VideosResponseSchema>;
