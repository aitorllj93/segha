

import type { z } from 'zod';

import type { VideoSchema, VimeoSchema, YoutubeSchema } from ".";

export type Video = z.infer<typeof VideoSchema>;
export type Youtube = z.infer<typeof YoutubeSchema>;
export type Vimeo = z.infer<typeof VimeoSchema>;
