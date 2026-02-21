import type { SerieDetails as TmdbSerie } from "@segha/tmdb/tv-series";
import type { TVSeries } from "@segha/catalog/es";
import { getBackdropUrl, getLogoUrl, getPosterUrl } from "./image";
import { BackdropSize, PosterSize } from "@segha/tmdb";
import { getTrailerUrl, getVideoUrl } from "./video";


type MappingOptions = {
  bannerSize?: BackdropSize;
  posterSize?: PosterSize;
}

export function mapSerieTmdbId(serie: TmdbSerie): string {
  return `tmdb:${serie.id}`;
}

export function mapSerieTmdbUrl(serie: TmdbSerie): string {
  return `https://www.themoviedb.org/tv/${serie.id}`;
}

export function mapSerie(serie: TmdbSerie, options: MappingOptions = {}): TVSeries {
  const images = [
    ...serie.images?.backdrops.map(i => getBackdropUrl(i.file_path)) ?? [],
    ...serie.images?.logos.map(i => getLogoUrl(i.file_path)) ?? [],
    ...serie.images?.posters.map(i => getPosterUrl(i.file_path)) ?? [],
  ].filter(Boolean) as string[];
  const videos = serie.videos?.results?.map(getVideoUrl).filter(Boolean) as string[];

  return {
    type: "[[Fuentes]]",
    format: "[[Series]]",
    status: "Pendiente",
    areas: ["[[Creatividad]]"],
    color: "#BE9207",
    icon: "tv",
    cover: getPosterUrl(serie.poster_path, options.posterSize),
    banner: getBackdropUrl(serie.backdrop_path, options.bannerSize),
    trailer: getTrailerUrl(serie.videos?.results),
    url: mapSerieTmdbUrl(serie),
    external_ids: [
      mapSerieTmdbId(serie),
    ],
    title: serie.name,
    subtitle: serie.tagline ?? undefined,
    description: serie.overview ?? undefined,
    published: serie.first_air_date ?? undefined,
    genres: serie.genres.map(genre => genre.name),
    online_rating: serie.vote_average,
    aliases: serie.original_name ?
      [serie.original_name] :
      undefined,
    author: serie.created_by?.map(author => author.name) ?? undefined,
    images: images.length ? images : undefined,
    videos: videos.length ? videos : undefined,
  };
}
