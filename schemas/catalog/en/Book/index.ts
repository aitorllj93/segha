
import z from "zod";

export const MetaBookSchema= z.object({
  type: z.literal("[[Sources]]"),
  format: z.literal("[[Books]]"),
  areas: z.array(z.literal("[[Knowledge]]")),
  color: z.literal("#3171B2"),
  icon: z.literal("book"),
  cover: z.string().optional(),
  url: z.string().describe('URL of the book in Amazon or similar'),
  read_url: z.string().describe('URL of the reading of the book'),
}).describe('Book: Metadata of Note');

export const CatalogBookSchema = z.object({
  title: z.string().describe('Title of the book'),
  subtitle: z.string().optional().describe('Subtitle of the book'),
  description: z.string().optional().describe('Description of the book'),
  author: z.array(z.string()).describe('Authors'),
  published: z.string().describe('Year of publication'),
  categories: z.array(z.string()).describe('Categories'),
}).describe('Book: Data obtained from catalogation');

export const DetailedBookSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Read", "Consolidated"]).describe('Reading status'),
  topics: z.array(z.string()).describe('Topics'),
  rating: z.number().describe('Rating of the book'),
  online_rating: z.number().describe('Online rating'),
  last_time_read: z.string().describe('Last time read'),
  times_read: z.number().describe('Times read'),
}).describe('Book: Additional data');

export const BookSchema = CatalogBookSchema.extend(DetailedBookSchema.shape).extend(MetaBookSchema.shape).describe('Book');
