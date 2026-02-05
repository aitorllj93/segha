import z from "zod";

export const UseCase = z.enum([
  'Capsule',
  'Favorite',
  'Basic',
  'Sport',
  'Work',
  'Event',
  'Travel',
  'Home',
  'Party',
  'Beach',
  'Rain',
  'Extreme Cold',
])

export const UseCases = z.array(UseCase)
  .optional()
  .describe('Use cases');
