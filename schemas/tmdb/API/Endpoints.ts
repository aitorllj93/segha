import z from "zod";

export const SearchMoviesEndpoint = z.literal('/search/movie').describe('Search for movies by their original, translated and alternative titles.');
export const SearchTVEndpoint = z.literal('/search/tv').describe('Search for TV shows by their original, translated and also known as names.');

export const NowPlayingMoviesEndpoint = z.literal('/movie/now_playing').describe('Get a list of movies that are currently in theatres.');
export const PopularMoviesEndpoint = z.literal('/movie/popular').describe('Get a list of movies ordered by popularity.');
export const TopRatedMoviesEndpoint = z.literal('/movie/top_rated').describe('Get a list of movies ordered by rating.');
export const UpcomingMoviesEndpoint = z.literal('/movie/upcoming').describe('Get a list of movies that are being released soon.');
export const MovieDetailsEndpoint = z.literal('/movie/{movie_id}').describe('Get the top level details of a movie by ID.');
export const MovieImagesEndpoint = z.literal('/movie/{movie_id}/images').describe('Get the images that belong to a movie.');
export const MovieVideosEndpoint = z.literal('/movie/{movie_id}/videos').describe('Get the videos that belong to a movie.');
export const MovieSimilarEndpoint = z.literal('/movie/{movie_id}/similar').describe('Get the similar movies based on genres and keywords.');

export const AiringTodayTVEndpoint = z.literal('/tv/airing_today').describe('Get a list of TV shows airing today.');
export const OnTheAirTVEndpoint = z.literal('/tv/on_the_air').describe('Get a list of TV shows that air in the next 7 days.');
export const PopularTVEndpoint = z.literal('/tv/popular').describe('Get a list of TV shows ordered by popularity.');
export const TopRatedTVEndpoint = z.literal('/tv/top_rated').describe('Get a list of TV shows ordered by rating.');
export const TVDetailsEndpoint = z.literal('/tv/{tv_id}').describe('Get the top level details of a TV show by ID.');
export const TVImagesEndpoint = z.literal('/tv/{tv_id}/images').describe('Get the images that belong to a TV show.');
export const TVVideosEndpoint = z.literal('/tv/{tv_id}/videos').describe('Get the videos that belong to a TV show.');
export const TVSimilarEndpoint = z.literal('/tv/{tv_id}/similar').describe('Get the similar TV shows.');

export const SearchEndpoints = z.union([
  SearchMoviesEndpoint,
  SearchTVEndpoint,
]);

export const MovieEndpoints = z.union([
  NowPlayingMoviesEndpoint,
  PopularMoviesEndpoint,
  TopRatedMoviesEndpoint,
  UpcomingMoviesEndpoint,
  MovieDetailsEndpoint,
  MovieImagesEndpoint,
  MovieVideosEndpoint,
  MovieSimilarEndpoint,
]);

export const TVEndpoints = z.union([
  AiringTodayTVEndpoint,
  OnTheAirTVEndpoint,
  PopularTVEndpoint,
  TopRatedTVEndpoint,
  TVDetailsEndpoint,
  TVImagesEndpoint,
  TVVideosEndpoint,
  TVSimilarEndpoint,
]);

export const AllEndpoints = z.union([
  SearchEndpoints,
  MovieEndpoints,
  TVEndpoints,
]);

export const EndpointsSchema = z.object({
  search: z.object({
    movies: SearchMoviesEndpoint,
    tv: SearchTVEndpoint,
  }),
  movie: z.object({
    now_playing: NowPlayingMoviesEndpoint,
    popular: PopularMoviesEndpoint,
    top_rated: TopRatedMoviesEndpoint,
    upcoming: UpcomingMoviesEndpoint,
    details: MovieDetailsEndpoint,
    images: MovieImagesEndpoint,
    videos: MovieVideosEndpoint,
    similar: MovieSimilarEndpoint,
  }),
  tv: z.object({
    airing_today: AiringTodayTVEndpoint,
    on_the_air: OnTheAirTVEndpoint,
    popular: PopularTVEndpoint,
    top_rated: TopRatedTVEndpoint,
    details: TVDetailsEndpoint,
    images: TVImagesEndpoint,
    videos: TVVideosEndpoint,
    similar: TVSimilarEndpoint,
  }),
}).describe('API Endpoints');

export type SearchEndpoints = z.infer<typeof SearchEndpoints>;
export type MovieEndpoints = z.infer<typeof MovieEndpoints>;
export type TVEndpoints = z.infer<typeof TVEndpoints>;
export type AllEndpoints = z.infer<typeof AllEndpoints>;

export type Endpoints = z.infer<typeof EndpointsSchema>;
