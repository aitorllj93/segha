
import z from "zod";
import { MetaArticleSchema, CatalogArticleSchema, DetailedArticleSchema } from "../Article";

export const MetaWikipediaSchema = MetaArticleSchema.extend({
  icon: z.string().optional().default('wikipedia').describe('Lucide icon.'),
  format: z.literal("[[Encyclopedia Entries]]"),
  platform: z.literal("Wikipedia"),
}).describe('Wikipedia entry: Metadata of Note');

export const CatalogWikipediaSchema = CatalogArticleSchema.extend({
  title: z.string().describe('Title of the Wikipedia entry'),
}).describe('Wikipedia entry: Data obtainable from cataloging');

export const DetailedWikipediaSchema = DetailedArticleSchema.extend({
}).describe('Wikipedia entry: Additional data');

export const WikipediaSchema = CatalogWikipediaSchema.extend(DetailedWikipediaSchema.shape).extend(MetaWikipediaSchema.shape).describe('Wikipedia entry');
