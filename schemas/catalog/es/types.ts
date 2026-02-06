import type z from 'zod';
import { NoteSchema } from './Note';

export * from './Article/types';
export * from './Book/types';
export * from './Clothing/types';
export * from './Movie/types';
export * from './Painting/types';
export * from './Wikipedia/types';
export * from './Youtube/types';

export type Note = z.infer<typeof NoteSchema>;
