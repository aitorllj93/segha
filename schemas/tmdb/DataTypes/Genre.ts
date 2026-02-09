import z from "zod";

export const GenreSchema = z.object({
  id: z.number().describe('Unique identifier for the genre'),
  name: z.string().describe('Genre name'),
})

export type Genre = z.infer<typeof GenreSchema>;
