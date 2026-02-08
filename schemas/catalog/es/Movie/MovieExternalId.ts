import z from "zod";
import { regex } from "arkregex";

const MovieExternalIdRegex = regex("^(tmdb|imdb|watchmode|tvmaze|tvdb):.+$");

export const MovieExternalId = z.string().regex(MovieExternalIdRegex, "Formato de ID externo inválido");

