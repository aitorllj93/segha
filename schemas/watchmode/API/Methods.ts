import z from "zod";

import { IDMappingDatasetEndpoint, ListSourcesEndpoint, TitleSourcesEndpoint } from "./Endpoints";
import { IdMappingSchema } from "../IdMapping";
import { StreamingSourcesParametersSchema, StreamingSourcesSchema } from "../Sources/StreamingSource";
import { TitleStreamingSourcesParametersSchema, TitleStreamingSourcesSchema } from "../Titles/StreamingSources";

export const MethodsSchema = z.object({
  datasets: z.object({
    id_mapping: z.object({
      get: z.object({
        endpoint: IDMappingDatasetEndpoint,
        responses: z.object({
          '200': IdMappingSchema.describe('ID mapping dataset (CSV content)'),
        }),
      }),
    }),
  }),
  sources: z.object({
    list: z.object({
      get: z.object({
        endpoint: ListSourcesEndpoint,
        parameters: z.object({
          query: StreamingSourcesParametersSchema,
        }),
        responses: z.object({
          '200': StreamingSourcesSchema,
        }),
      }),
    })
  }),
  titles: z.object({
    sources: z.object({
      get: z.object({
        endpoint: TitleSourcesEndpoint,
        parameters: z.object({
          url: z.object({
            title_id: z.number().describe('Title ID'),
          }),
          query: TitleStreamingSourcesParametersSchema,
        }),
        responses: z.object({
          '200': TitleStreamingSourcesSchema,
        }),
      }),
    })
  })
})


export type Methods = z.infer<typeof MethodsSchema>;
