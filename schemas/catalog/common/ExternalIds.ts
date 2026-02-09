import { regex } from "arkregex";

/**
 * Captures `tmdb:123`, `imdb:123`, `watchmode:123`, `tvmaze:123` or `tvdb:123`
 */
export const TV = regex("^(tmdb|imdb|watchmode|tvmaze|tvdb):.+$");
