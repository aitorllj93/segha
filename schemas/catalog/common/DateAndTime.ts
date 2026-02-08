import { regex } from "arkregex";

/**
 * `YYYY` (ISO 8601)
 */
export const Year = regex("^[0-9]{4}$");

/**
 * `YYYY-MM` (ISO 8601)
 */
export const Month = regex("^[0-9]{4}-[0-9]{2}$");

/**
 * `YYYY-MM-DD` (ISO 8601)
 */
export const Date = regex("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");

/**
 * `HH:MM:SSZ` (ISO 8601)
 */
export const Time = regex("^[0-9]{2}:[0-9]{2}:[0-9]{2}Z$");

/**
 * `YYYY-MM-DDTHH:MM:SSZ` (ISO 8601)
 */
export const DateTime = regex("^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$");

/**
 * `YYYY-MM-DDTHH:MM:SSZ[+-][0-9]{2}:[0-9]{2}` (ISO 8601)
 */
export const DateTimeOffset = regex("^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z[+-][0-9]{2}:[0-9]{2}$");

/**
 * `YYYY-Www` (ISO 8601)
 */
export const Week = regex("^[0-9]{4}-W[0-9]{2}$");

/**
 * `YYYY-Www-D` (ISO 8601)
 */
export const WeekWithWeekDay = regex("^[0-9]{4}-W[0-9]{2}-[1-7]$");

/**
 * `YYYY-DDD` (ISO 8601)
 */
export const OrdinalDate = regex("^[0-9]{4}-[0-9]{3}$");
