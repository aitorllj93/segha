import z from "zod";

export const Clothes = z.literal("[[Prendas]]")
  .describe('Prendas de ropa');

export const Subtype = z.enum([
  Clothes.value,
]).describe('Subtipo de nota.');
