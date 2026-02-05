import z from "zod";

export const Season = z.enum([
  'Winter',
  'Summer',
  'Spring/Fall',
  'All Year',
]).optional().describe('Seasons');
