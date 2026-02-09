import z from "zod";

export const IDMappingDatasetEndpoint = z.literal('/title_id_map.csv').describe('ID mapping dataset');

export const ListSourcesEndpoint = z.literal('/sources').describe('List all sources');
export const TitleSourcesEndpoint = z.literal('/title/{title_id}/sources').describe('Title sources');

export const DatasetsEndpoints = z.union([
  IDMappingDatasetEndpoint,
]);

export const SourcesEndpoints = z.union([
  ListSourcesEndpoint,
]);

export const TitlesEndpoints = z.union([
  TitleSourcesEndpoint,
]);

export const APIEndpoints = z.union([
  SourcesEndpoints,
  TitlesEndpoints,
]);

export const EndpointsSchema = z.object({
  datasets: z.object({
    id_mapping: IDMappingDatasetEndpoint,
  }),
  sources: z.object({
    list: ListSourcesEndpoint,
  }),
  titles: z.object({
    sources: TitleSourcesEndpoint,
  })
});



export type DatasetsEndpoints = z.infer<typeof DatasetsEndpoints>;
export type SourcesEndpoints = z.infer<typeof SourcesEndpoints>;
export type TitlesEndpoints = z.infer<typeof TitlesEndpoints>;
export type APIEndpoints = z.infer<typeof APIEndpoints>;

export type Endpoints = z.infer<typeof EndpointsSchema>;
