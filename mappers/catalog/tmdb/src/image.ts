import { type BackdropSize, type PosterSize } from "@segha/tmdb";
import { ImageBaseUrl } from "@segha/tmdb/api";

export const getPosterUrl = (
  path: string | null,
  size: PosterSize = 'original'
): string => {
  if (!path) {
    return '';
  }

  return `${ImageBaseUrl.values}/${size}${path}`;
}

export const getBackdropUrl = (
  path: string | null,
  size: BackdropSize = 'original'
): string => {
  if (!path) {
    return '';
  }

  return `${ImageBaseUrl.values}/${size}${path}`;
}
