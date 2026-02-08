import { regex } from "arkregex";

/**
 * `xx` (ISO 639-1)
 */
export const ShortCode = regex("^[a-z]{2}$");

/**
 * `xxx` (ISO 639-3)
 */
export const LongCode = regex("^[a-z]{3}$");

/**
 * `xx` or `xxx` (ISO 639-1 or ISO 639-3)
 */
export const AnyCode = regex("^[a-z]{2,3}$");

/**
 * `xx_XX` or `xxx_XX` (BCP 47)
 */
export const LanguageTag = regex("^[a-z]{2,3}(?:[-_][a-z]{2})?$");
