import { regex } from "arkregex";

/**
 * `xx` (ISO 3166-1 Alpha-2)
 */
export const ShortCode = regex("^[a-z]{2}$");

/**
 * `xxx` (ISO 3166-1 Alpha-3)
 */
export const LongCode = regex("^[a-z]{3}$");

/**
 * `000` (ISO 3166-1 Numeric-3)
 */
export const NumericCode = regex("^[0-9]{3}$");

/**
 * `xx-yy` or `xx-yyy` (ISO 3166-2)
 */
export const DivisionCode = regex("^[a-z]{2}-[a-z]{2,3}$");

