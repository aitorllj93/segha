import z from "zod";

import { ArticleSchema } from "./Article";
import { BookSchema } from "./Book";
import { ClothingSchema } from "./Clothing";
import { MovieSchema } from "./Movie";
import { PaintingSchema } from "./Painting";
import { WikipediaSchema } from "./Wikipedia";
import { YoutubeSchema } from "./Youtube";

export const NoteSchema = z.union([
  ArticleSchema,
  BookSchema,
  ClothingSchema,
  MovieSchema,
  PaintingSchema,
  WikipediaSchema,
  YoutubeSchema,
]).describe('Nota: Unión de todos los tipos de notas');
