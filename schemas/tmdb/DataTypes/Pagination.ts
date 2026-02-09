import z from "zod";

export const PaginationParamsSchema = z.object({
  page: z.number().describe('Page number'),
  language: z.string().describe('Language code'),
}).describe('Pagination parameters');

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
