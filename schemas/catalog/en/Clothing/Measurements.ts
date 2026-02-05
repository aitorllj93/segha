import z from "zod";

export const Measurements = z.array(z.number())
  .optional()
  .describe('Measurements');
