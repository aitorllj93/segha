import z from "zod";

export const Fit = z.enum([
  'Fitted',
  'Slim',
  'Regular',
  'Relaxed',
  'Loose',
  'Oversized',
]).optional().describe('Fit');
