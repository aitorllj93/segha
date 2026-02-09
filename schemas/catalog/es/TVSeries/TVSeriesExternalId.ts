import z from "zod";
import { regex } from "arkregex";

const TVSeriesExternalIdRegex = regex("^(tmdb|imdb|watchmode|tvmaze|tvdb):.+$");

export const TVSeriesExternalId = z.string().regex(TVSeriesExternalIdRegex, "Formato de ID externo inválido");

