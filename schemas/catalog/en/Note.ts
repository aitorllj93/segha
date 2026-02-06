import z from "zod";

import { ArticleSchema } from "./Article";
import { BookSchema } from "./Book";
import { ClothingSchema } from "./Clothing";
import { MovieSchema } from "./Movie";
import { WikipediaSchema } from "./Wikipedia";

export const NoteSchema = z.union([
  ArticleSchema,
  BookSchema,
  ClothingSchema,
  MovieSchema,
  WikipediaSchema,
]).describe('Note: Union of all note types');
