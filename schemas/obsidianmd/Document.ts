import z from "zod/v3";
import { arrayExclude, commaSeparatedStringArray } from "../../utils/v3/array";

export const DocumentSchema = z.object({
  tags: arrayExclude(z.string()).nullish(),
  aliases: commaSeparatedStringArray.nullish(),
  cssclasses: commaSeparatedStringArray.nullish(),
  publish: z.preprocess((val) => {
    if (typeof val === "string") {
      if (val.toLowerCase() === "true") return true;
      if (val.toLowerCase() === "false") return false;
    }
    return val;
  }, z.boolean().optional()),
  permalink: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  cover: z.string().optional(),
});