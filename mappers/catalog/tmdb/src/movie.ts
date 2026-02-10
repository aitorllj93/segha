import type { MovieDetails as TmdbMovie } from "@segha/tmdb/movies";
import type { Movie } from "@segha/catalog/es";
import { getBackdropUrl, getPosterUrl } from "./image";
import { BackdropSize, PosterSize } from "@segha/tmdb";

type MappingOptions = {
  bannerSize?: BackdropSize;
  posterSize?: PosterSize;
}

export function mapMovieTmdbId(movie: TmdbMovie): string {
  return `tmdb:${movie.id}`;
}

export function mapMovieImdbId(movie: TmdbMovie): string {
  return `imdb:${movie.imdb_id}`;
}

export function mapMovieImdbUrl(movie: TmdbMovie): string {
  return `https://www.imdb.com/title/${movie.imdb_id}`;
}

export function mapMovie(movie: TmdbMovie, options: MappingOptions = {}): Movie {
  return {
    type: "[[Fuentes]]",
    format: "[[Películas]]",
    status: "Pendiente",
    areas: ["[[Creatividad]]"],
    color: "#BE9207",
    icon: "film",
    cover: getPosterUrl(movie.poster_path, options.posterSize),
    banner: getBackdropUrl(movie.backdrop_path, options.bannerSize),
    url: mapMovieImdbUrl(movie),
    external_ids: [
      mapMovieImdbId(movie),
      mapMovieTmdbId(movie),
    ],
    title: movie.title,
    description: movie.overview,
    published: movie.release_date,
    genres: movie.genres.map(genre => genre.name),
    online_rating: movie.vote_average,
    aliases: movie.original_title ?
      [movie.original_title] :
      undefined,
  };
}
