import type { StreamUrls } from "@segha/catalog/es";
import { TitleStreamingSources } from "@segha/watchmode";

export function mapStreamUrls(sources: TitleStreamingSources): StreamUrls {
  return {
    hbo_max_url: sources.find((source) => source.name === "HBO Max")?.web_url ?? undefined,
    netflix_url: sources.find((source) => source.name === "Netflix")?.web_url ?? undefined,
    apple_tv_url: sources.find((source) => source.name === "Apple TV")?.web_url ?? undefined,
    amazon_prime_url: sources.find((source) => source.name === "Amazon Prime")?.web_url ?? undefined,
    disney_plus_url: sources.find((source) => source.name === "Disney Plus")?.web_url ?? undefined,
    hulu_url: sources.find((source) => source.name === "Hulu")?.web_url ?? undefined,
    pluto_tv_url: sources.find((source) => source.name === "Pluto TV")?.web_url ?? undefined,
    youtube_url: sources.find((source) => source.name === "YouTube")?.web_url ?? undefined,
  };
}
