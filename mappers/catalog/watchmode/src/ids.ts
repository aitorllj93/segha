import type { IdMappingEntry } from "@segha/watchmode";

export function mapExternalIds(mapping: IdMappingEntry): string[] {
  const watchmodeId = `watchmode:${mapping['Watchmode ID']}`;
  const imdbId = mapping["IMDB ID"] ? `imdb:${mapping["IMDB ID"]}` : undefined;
  const tmdbId = mapping["TMDB ID"] ? `tmdb:${mapping["TMDB ID"]}` : undefined;
  return [watchmodeId, imdbId, tmdbId].filter(Boolean) as string[];
}
