import z from "zod";

import * as ISO8601 from '../../common/DateAndTime';

export const Year = z.string()
  .regex(ISO8601.Year, "Formato de año inválido. Debe ser un formato válido de año.")
  .describe('Año: YYYY');

export const Month = z.string()
  .regex(ISO8601.Month, "Formato de mes inválido. Debe ser un formato válido de mes.")
  .describe('Mes: YYYY-MM');

export const FullDate = z.string()
  .regex(ISO8601.Date, "Formato de fecha inválido. Debe ser un formato válido de fecha.")
  .describe('Fecha: YYYY-MM-DD');

export const Date = z.union([
  Year,
  Month,
  FullDate,
]).describe('Fecha: YYYY, YYYY-MM o YYYY-MM-DD');

export const Time = z.string()
  .regex(ISO8601.Time, "Formato de hora inválido. Debe ser un formato válido de hora.")
  .describe('Hora: HH:MM:SSZ');

export const DateTime = z.string()
  .regex(ISO8601.DateTime, "Formato de fecha y hora inválido. Debe ser un formato válido de fecha y hora.")
  .describe('Fecha y hora: YYYY-MM-DDTHH:MM:SSZ');

export const DateTimeOffset = z.string()
  .regex(ISO8601.DateTimeOffset, "Formato de fecha y hora con offset inválido. Debe ser un formato válido de fecha y hora con offset.")
  .describe('Fecha y hora con offset: YYYY-MM-DDTHH:MM:SSZ[+-][0-9]{2}:[0-9]{2}');

export const Week = z.string()
  .regex(ISO8601.Week, "Formato de semana inválido. Debe ser un formato válido de semana.")
  .describe('Semana: YYYY-Www');

export const WeekWithWeekDay = z.string()
  .regex(ISO8601.WeekWithWeekDay, "Formato de semana con día de la semana inválido. Debe ser un formato válido de semana con día de la semana.")
  .describe('Semana con día de la semana: YYYY-Www-D');

export const OrdinalDate = z.string()
  .regex(ISO8601.OrdinalDate, "Formato de fecha ordinal inválido. Debe ser un formato válido de fecha ordinal.")
  .describe('Fecha ordinal: YYYY-DDD');
