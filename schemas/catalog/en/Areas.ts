import z from "zod";

export const FirstLevelArea = z.enum([
  "[[Food]]",
  "[[Health]]",
  "[[Knowledge]]",
  "[[Structured Thinking]]",
  "[[Home]]",
  "[[Productivity]]",
  "[[Exploration]]",
  "[[Links]]",
  "[[Exercise]]",
  "[[Energy]]",
  "[[Work]]",
  "[[Finances]]",
  "[[Mental Health]]",
  "[[Creativity]]",
]).describe('First level area');

export const Area = z.enum([
  ...FirstLevelArea.options,
]).describe('Area');

export const Areas = z.array(Area).describe('Areas');
