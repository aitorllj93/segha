import { type BackdropSize, type PosterSize } from "@segha/tmdb";
import { IMAGE_BASE_URL } from "@segha/tmdb/api";

export const getPosterUrl = (
  path: string | null,
  size: PosterSize = 'original'
): string => {
  if (!path) {
    return '';
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export const getBackdropUrl = (
  path: string | null,
  size: BackdropSize = 'original'
): string => {
  if (!path) {
    return '';
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export const getLogoUrl = (
  path: string | null,
  size: BackdropSize = 'original'
): string => {
  if (!path) {
    return '';
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}
