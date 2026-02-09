import type { SerieDetails as TmdbSerie } from "@segha/tmdb/tv-series";
import type { TVSeries } from "@segha/catalog/es";
import { getBackdropUrl, getPosterUrl } from "./image";
import { BackdropSize, PosterSize } from "@segha/tmdb";


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
  return {
    type: "[[Fuentes]]",
    format: "[[Series]]",
    status: "Pendiente",
    areas: ["[[Creatividad]]"],
    color: "#BE9207",
    icon: "movie",
    cover: getPosterUrl(serie.poster_path, options.posterSize),
    banner: getBackdropUrl(serie.backdrop_path, options.bannerSize),
    url: mapSerieTmdbUrl(serie),
    external_ids: [
      mapSerieTmdbId(serie),
    ],
    title: serie.name,
    description: serie.overview ?? undefined,
    published: serie.first_air_date ?? undefined,
    genres: serie.genres.map(genre => genre.name),
    online_rating: serie.vote_average,
    aliases: serie.original_name ?
      [serie.original_name] :
      undefined,
    author: serie.created_by?.map(author => author.name) ?? undefined,
  };
}
