import z from "zod/v3";


export const arrayExclude = <S extends z.ZodTypeAny>(s: S) => {
  return z.preprocess((as) => {
    const result: S[] = [];
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

export const commaSeparatedStringArray = z.union([
  z.coerce.string()
    .transform((value) => value.split(','))
    .pipe(arrayExclude(z.string())),
  arrayExclude(z.string()),
]);