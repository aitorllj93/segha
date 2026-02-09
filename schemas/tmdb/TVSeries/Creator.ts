import z from "zod";

export const CreatorSchema = z.object({
  id: z.number().describe('Unique identifier for the creator'),
  credit_id: z.string().describe('Credit ID'),
  name: z.string().describe('Creator name'),
  gender: z.number().describe('Creator gender'),
  profile_path: z.string().nullable().describe('Creator profile path (relative URL)'),
});
