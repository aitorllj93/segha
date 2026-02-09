
import type { z } from 'zod';

import type { TVSeriesSchema } from ".";

export type TVSeries = z.infer<typeof TVSeriesSchema>;
