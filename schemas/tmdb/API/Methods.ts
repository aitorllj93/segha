import z from "zod";

import { AiringTodayTVEndpoint, MovieDetailsEndpoint, MovieImagesEndpoint, MovieSimilarEndpoint, MovieVideosEndpoint, NowPlayingMoviesEndpoint, OnTheAirTVEndpoint, PopularMoviesEndpoint, PopularTVEndpoint, SearchMoviesEndpoint, SearchTVEndpoint, TopRatedMoviesEndpoint, TopRatedTVEndpoint, TVDetailsEndpoint, TVImagesEndpoint, TVSimilarEndpoint, TVVideosEndpoint, UpcomingMoviesEndpoint } from "./Endpoints";
import { MoviesResponseSchema } from "../Movies/MoviesResponse";
import { MovieDetailsSchema, MovieDetailsParamsSchema } from "../Movies/MovieDetails";
import { SearchMoviesParamsSchema } from "../Movies/SearchMovies";
import { SeriesResponseSchema } from "../TVSeries/SeriesResponse";
import { SearchSeriesParamsSchema } from "../TVSeries/SearchSeries";
import { ImagesResponseSchema, PaginationParamsSchema, VideosResponseSchema } from "../DataTypes";
import { SerieDetailsParamsSchema, SerieDetailsSchema } from "../TVSeries/SerieDetails";

export const MethodsSchema = z.object({
  search: z.object({
    movies: z.object({
      get: z.object({
        endpoint: SearchMoviesEndpoint,
        parameters: z.object({
          query: SearchMoviesParamsSchema,
        }),
        responses: z.object({
          '200': MoviesResponseSchema,
        }),
      }),
    }),
    tv: z.object({
      get: z.object({
        endpoint: SearchTVEndpoint,
        parameters: z.object({
          query: SearchSeriesParamsSchema,
        }),
        responses: z.object({
          '200': SeriesResponseSchema,
        }),
      }),
    }),
  }),
  movie: z.object({
    now_playing: z.object({
      get: z.object({
        endpoint: NowPlayingMoviesEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': MoviesResponseSchema,
        }),
      }),
    }),
    popular: z.object({
      get: z.object({
        endpoint: PopularMoviesEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': MoviesResponseSchema,
        }),
      }),
    }),
    top_rated: z.object({
      get: z.object({
        endpoint: TopRatedMoviesEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': MoviesResponseSchema,
        }),
      }),
    }),
    upcoming: z.object({
      get: z.object({
        endpoint: UpcomingMoviesEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': MoviesResponseSchema,
        }),
      }),
    }),
    details: z.object({
      get: z.object({
        endpoint: MovieDetailsEndpoint,
        parameters: z.object({
          url: z.object({
            movie_id: z.number().describe('Movie ID'),
          }),
          query: MovieDetailsParamsSchema,
        }),
        responses: z.object({
          '200': MovieDetailsSchema,
        }),
      }),
    }),
    images: z.object({
      get: z.object({
        endpoint: MovieImagesEndpoint,
        parameters: z.object({
          url: z.object({
            movie_id: z.number().describe('Movie ID'),
          }),
        }),
        responses: z.object({
          '200': ImagesResponseSchema,
        }),
      }),
    }),
    videos: z.object({
      get: z.object({
        endpoint: MovieVideosEndpoint,
        parameters: z.object({
          url: z.object({
            movie_id: z.number().describe('Movie ID'),
          }),
        }),
        responses: z.object({
          '200': VideosResponseSchema,
        }),
      }),
    }),
    similar: z.object({
      get: z.object({
        endpoint: MovieSimilarEndpoint,
        parameters: z.object({
          url: z.object({
            movie_id: z.number().describe('Movie ID'),
          }),
        }),
        responses: z.object({
          '200': MoviesResponseSchema,
        }),
      }),
    }),
  }),
  tv: z.object({
    airing_today: z.object({
      get: z.object({
        endpoint: AiringTodayTVEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': SeriesResponseSchema,
        }),
      }),
    }),
    on_the_air: z.object({
      get: z.object({
        endpoint: OnTheAirTVEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': SeriesResponseSchema,
        }),
      }),
    }),
    popular: z.object({
      get: z.object({
        endpoint: PopularTVEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': SeriesResponseSchema,
        }),
      }),
    }),
    top_rated: z.object({
      get: z.object({
        endpoint: TopRatedTVEndpoint,
        parameters: z.object({
          query: PaginationParamsSchema,
        }),
        responses: z.object({
          '200': SeriesResponseSchema,
        }),
      }),
    }),
    details: z.object({
      get: z.object({
        endpoint: TVDetailsEndpoint,
        parameters: z.object({
          url: z.object({
            tv_id: z.number().describe('TV ID'),
          }),
          query: SerieDetailsParamsSchema,
        }),
        responses: z.object({
          '200': SerieDetailsSchema,
        }),
      }),
    }),
    images: z.object({
      get: z.object({
        endpoint: TVImagesEndpoint,
        parameters: z.object({
          url: z.object({
            tv_id: z.number().describe('TV ID'),
          }),
        }),
        responses: z.object({
          '200': ImagesResponseSchema,
        }),
      }),
    }),
    videos: z.object({
      get: z.object({
        endpoint: TVVideosEndpoint,
        parameters: z.object({
          url: z.object({
            tv_id: z.number().describe('TV ID'),
          }),
        }),
        responses: z.object({
          '200': VideosResponseSchema,
        }),
      }),
    }),
    similar: z.object({
      get: z.object({
        endpoint: TVSimilarEndpoint,
        parameters: z.object({
          url: z.object({
            tv_id: z.number().describe('TV ID'),
          }),
        }),
        responses: z.object({
          '200': SeriesResponseSchema,
        }),
      }),
    }),
  }),
});

export type Methods = z.infer<typeof MethodsSchema>;
