import z from "zod";

const Netflix = z.literal(8);
const DisneyPlus = z.literal(337);
const AppleTv = z.literal(350);
const PrimeVideo = z.literal(119);
const Filmin = z.literal(63);
const ATresPlayer = z.literal(62);
const HboMax = z.literal(1899);
const YoutubePremium = z.literal(188);
const RTVE = z.literal(541);
const Plex = z.literal(538);
const CrunchyRoll = z.literal(283);

export const WatchProvider = z.enum({
  Netflix: Netflix.value,
  DisneyPlus: DisneyPlus.value,
  AppleTv: AppleTv.value,
  PrimeVideo: PrimeVideo.value,
  Filmin: Filmin.value,
  ATresPlayer: ATresPlayer.value,
  HboMax: HboMax.value,
  YoutubePremium: YoutubePremium.value,
  RTVE: RTVE.value,
  Plex: Plex.value,
  CrunchyRoll: CrunchyRoll.value,
});
