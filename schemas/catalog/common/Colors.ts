
import { regex } from "arkregex";
import z from "zod";

/**
 * `#RRGGBB` or `#RRGGBBAA`
 */
export const Hex = regex("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$");

/**
 * Captures both `rgb(255, 255, 255)` or `rgba(255, 255, 255, 1)`
 */
export const RGBA = regex("^rgba?\\(\\s*[^)]+\\s*\\)$");

/**
 * Captures both `hsl(255, 100%, 100%)` or `hsla(255, 100%, 100%, 1)`
 */
export const HSLA = regex("^hsla?\\(\\s*[^)]+\\s*\\)$");

/**
 * Captures `oklab(L C H[ / A])`. Eg
 */
export const OKLAB = regex("^oklab\\(\\s*[^)]+\\s*\\)$");

/**
 * Captures `oklch(L C H[ / A])`. Eg
 */
export const OKLCH = regex("^oklch\\(\\s*[^)]+\\s*\\)$");

export const Palette = z.enum([
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
  'magenta',
])

export const Scheme = z.enum([
  'primary',
  'semaphore',
  'rainbow',
  'contrast',
  'monochrome',
]);
