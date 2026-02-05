import z from "zod";


export const arrayExclude = <S extends z.ZodTypeAny>(s: S) => {
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

export const commaSeparatedStringArray = z.preprocess((val) => {
  if (typeof val === 'string') {
    return val.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (Array.isArray(val)) {
    return val.filter((item): item is string => typeof item === 'string');
  }
  return [];
}, z.array(z.string()));
