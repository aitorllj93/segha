import z from "zod";

export const ImageSchema = z.object({
  aspect_ratio: z.number().describe('Aspect ratio'),
  height: z.number().describe('Height'),
  iso_639_1: z.string().nullable().describe('Spoken language ISO 639-1 code'),
  file_path: z.string().describe('File path'),
  vote_average: z.number().describe('Vote average'),
  vote_count: z.number().describe('Vote count'),
  width: z.number().describe('Width'),
})

export const ImagesResponseSchema = z.object({
  id: z.number().describe('Image ID'),
  backdrops: z.array(ImageSchema).describe('Backdrops'),
  logos: z.array(ImageSchema).describe('Logos'),
  posters: z.array(ImageSchema).describe('Posters'),
});

export const PosterSizeSchema = z.enum(['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']).describe('Poster size');
export const BackdropSizeSchema = z.enum(['w300', 'w780', 'w1280', 'original']).describe('Backdrop size');

export type BackdropSize = z.infer<typeof BackdropSizeSchema>;
export type PosterSize = z.infer<typeof PosterSizeSchema>;

export type Image = z.infer<typeof ImageSchema>;
export type ImagesResponse = z.infer<typeof ImagesResponseSchema>;
