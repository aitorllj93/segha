import z from "zod";

const Premiere = z.literal('1');
const LimitedTheatrical = z.literal('2');
const Theatrical = z.literal('3');
const Digital = z.literal('4');
const Physical = z.literal('5');
const Tv = z.literal('6');

export const ReleaseType = z.enum({
  Premiere: Premiere.value,
  LimitedTheatrical: LimitedTheatrical.value,
  Theatrical: Theatrical.value,
  Digital: Digital.value,
  Physical: Physical.value,
  Tv: Tv.value
});
