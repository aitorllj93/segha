import z from "zod";

const arrayExclude = <S extends z.ZodTypeAny>(s: S) => {
  return z.preprocess((as) => {
    const result: z.infer<S>[] = [];
    if (!Array.isArray(as)) {
      return result;
    }
    for (const a of as) {
      const parsed = s.safeParse(a);
      if (parsed.success) {
        result.push(parsed.data);
      }
    }
    return result;
  }, z.array(s));
};

const commaSeparatedStringArray = z.preprocess((val) => {
  if (typeof val === 'string') {
    return val.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (Array.isArray(val)) {
    return val.filter((item): item is string => typeof item === 'string');
  }
  return [];
}, z.array(z.string()));

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
