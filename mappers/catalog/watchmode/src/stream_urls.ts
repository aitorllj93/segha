import type { StreamUrls } from "@segha/catalog/es";
import { StreamingSourceName, StreamingSourceType, TitleStreamingSources } from "@segha/watchmode";

const PRIORITY_SOURCES: StreamingSourceName[] = ["Max", "Netflix", "AppleTV+", "AppleTV", "Prime Video", "Disney+", "Hulu", "Pluto TV", "YouTube"];
const SOURCE_TYPES: StreamingSourceType[] = ["free", "tve", "sub", "purchase"];

type MapStreamUrlOptions = {
  region?: string;
};

const findWatchSource = (sources: TitleStreamingSources, { region }: MapStreamUrlOptions = {}) => {
  const prioritySource = sources.find((source) => PRIORITY_SOURCES.some((priority) => priority === source.name) && (region ? source.region === region : true))?.web_url ?? undefined;

  if (prioritySource) {
    return prioritySource;
  }

  const sortedByType = sources.sort((a, b) => {
    return SOURCE_TYPES.indexOf(a.type) - SOURCE_TYPES.indexOf(b.type);
  });

  return sortedByType.find((source) => (region ? source.region === region : true))?.web_url ?? undefined;
}

const findSource = (sources: TitleStreamingSources, name: StreamingSourceName, { region }: MapStreamUrlOptions = {}) => {
  return sources.find((source) => source.name === name && (region ? source.region === region : true))?.web_url ?? undefined;
};

export function mapStreamUrls(sources: TitleStreamingSources, options: MapStreamUrlOptions = {}): StreamUrls {
  return {
    hbo_max_url: findSource(sources, "Max", options),
    netflix_url: findSource(sources, "Netflix", options),
    apple_tv_url: findSource(sources, "AppleTV+", options) || findSource(sources, "AppleTV", options),
    amazon_prime_url: findSource(sources, "Prime Video", options),
    disney_plus_url: findSource(sources, "Disney+", options),
    hulu_url: findSource(sources, "Hulu", options),
    pluto_tv_url: findSource(sources, "Pluto TV", options),
    youtube_url: findSource(sources, "YouTube", options),
    watch_url: findWatchSource(sources, options),
  };
}
