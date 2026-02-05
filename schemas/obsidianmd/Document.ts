import z from "zod";
import { arrayExclude, commaSeparatedStringArray } from "../../utils/array";

export const DocumentSchema = z.object({
  tags: arrayExclude(z.string()).nullish().describe('Document tags for categorization'),
  aliases: commaSeparatedStringArray.nullish().describe('Alternative names for the document'),
  cssclasses: commaSeparatedStringArray.nullish().describe('CSS classes to apply to the document'),
  publish: z.preprocess((val) => {
    if (typeof val === "string") {
      if (val.toLowerCase() === "true") return true;
      if (val.toLowerCase() === "false") return false;
    }
    return val;
  }, z.boolean().optional()).describe('Whether to publish the document'),
  permalink: z.string().optional().describe('Permanent link for the document'),
  description: z.string().optional().describe('Document description for SEO/previews'),
  image: z.string().optional().describe('Featured image URL'),
  cover: z.string().optional().describe('Cover image URL'),
}).describe('Obsidian document frontmatter schema');
