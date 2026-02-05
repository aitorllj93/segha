import z from "zod";

export const Formality = z.enum([
  'Very Casual', // 1,
  'Casual', // 2,
  'Smart Casual', // 3,
  'Formal', // 4,
  'Black Tie', // 5,
]).optional().describe('Formality');
