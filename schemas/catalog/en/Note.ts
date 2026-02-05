import z from "zod";

import { ArticleSchema } from "./Article";
import { BookSchema } from "./Book";
import { ClothingSchema } from "./Clothing";
import { MovieSchema } from "./Movie";

export const NoteSchema = z.union([
  ArticleSchema,
  BookSchema,
  ClothingSchema,
  MovieSchema,
]).describe('Note: Union of all note types');
