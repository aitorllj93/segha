import z from "zod";

export const Status = z.enum([
  'New',
  'Good',
  'Worn',
  'Damaged',
  'Retire'
]).optional().default('Good').describe('Status');
