import z from "zod";

export const PaginationParamsSchema = z.object({
  page: z.number().optional().describe('Page number'),
  language: z.string().optional().describe('Language code'),
}).describe('Pagination parameters');

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
