import z from "zod";

import { ArticleSchema } from "./Article";
import { BookSchema } from "./Book";
import { ClothingSchema } from "./Clothing";
import { MovieSchema } from "./Movie";
import { PaintingSchema } from "./Painting";
import { TVSeriesSchema } from "./TVSeries";
import { VideoSchema } from "./Video";
import { EncyclopediaEntrySchema } from "./EncyclopediaEntry";

export const NoteSchema = z.union([
  ArticleSchema,
  BookSchema,
  ClothingSchema,
  EncyclopediaEntrySchema,
  MovieSchema,
  PaintingSchema,
  TVSeriesSchema,
  VideoSchema,
]).describe('Nota: Unión de todos los tipos de notas');
