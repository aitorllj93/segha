import z from "zod";
import { StreamingSourceTypeSchema } from "../Sources/StreamingSource";

export const StreamingSourceNameSchema = z.enum(["Netflix","Hulu","Max","Prime Video","Disney+","AppleTV+","BBC iPlayer","Hayu","Paramount+","Paramount+ with Showtime","Crave","Peacock","Peacock Premium","Amazon Freevee","Netflix Free","Crave Starz","Stan","STARZ","CBC Gem","Foxtel Now","Sky Go","MAX Free","MGM+","Now TV","All 4","BINGE","Britbox UK","Tubi TV","AMC","Arrow Player","Fawesome","FX","Kanopy","NBC","SkyShowtime","USA","Videoland","Youtube Premium","Youtube Premium","Crunchyroll Premium","Movistar+","Plex","Topic","The Criterion Channel","FILMIN","Fandor","Shudder","WWE Network","AppleTV","PBS","Google Play","Amazon","Fandango at Home","YouTube","The Roku Channel","Syfy","Syfy","Acorn TV (Via Amazon Prime)","Cinemax (Via Amazon Prime)","Curiosity Stream (Via Amazon Prime)","Fandor (Via Amazon Prime)","Hallmark Movies Now (Via Amazon Prime)","Shout! Factory TV (Via Amazon Prime)","Shudder (Via Amazon Prime)","STARZ (Via Amazon Prime)","SundanceNow Doc Club (Via Amazon Prime)","Spectrum On Demand","DirecTV On Demand","7plus","9Now","A&E","A&E","ABC iview","Acorn TV","Adult Swim","Adult Swim","AHC GO","AMC+","Animal Planet GO","BBC America","Beamafilm","BET","BET+","BFI Player","Bravo","Britbox","Britbox (Via Amazon Prime)","Cartoon Network","Cartoon Network","CBS","CBS News","Chili","Cinemax (Via Hulu)","Cineplex","Clarovideo","Crunchyroll","CTV","Curiosity Stream","Curzon Home Cinema","The CW","Darkmatter TV","Destination America GO","Discovery GO","Discovery Life GO","Discovery+","Fetch TV","Flix Premiere","FlixFling","Food Network","FOX","FOX","Freeform","Freeform","fuboTV","fyi","fyi","Globoplay","GuideDoc","Hallmark Channel Everywhere","Hallmark Movies Now","HBO (Via Hulu)","HGTV","HiDive","The History Channel","The History Channel","Hollywood Suite","Hoopla","JioHotstar","Hungama Play","ICI TOU.TV","IFC","Investigation Discovery","Investigation Discovery GO","ITVX","Lifetime","Lifetime","LOGO","MGM+ (Via Amazon Prime)","MTV","MTV","MUBI","Amazon MX Player","My5","National Geographic","National Geographic","NBC","NBC News","NLZIET","Oxygen","OzFlix","Paramount Network","PBS Kids","Plex","Pluto TV","Popcornflix","Rakuten TV","SBS On Demand","Science GO","Shout! Factory TV","Sky Store","Sony LIV","South Park Studios","STARZ (Via Hulu)","Sun Nxt","Sundance","SundanceNow Doc Club","Talk Talk TV","TBS","tenplay","TLC GO","TNT","Travel Channel","truTV","TV Land","TV Land","UKTV Play","USA","VH1","VH1","Vice TV","Vimeo","Virgin TV GO","Fandango at Home Free","Watch Food Network","Watch HGTV","Watch TCM","Watch Travel Channel","WE tv","Windows Store","YouTube","Zee5"]);

export const TitleStreamingSourceSchema = z.object({
  source_id: z.number().describe('Source ID'),
  name: StreamingSourceNameSchema,
  type: StreamingSourceTypeSchema,
  region: z.string().describe('Region'),
  ios_url: z.string().nullable().describe('iOS deep link URL. For free plans, returns "Deeplinks available for paid plans only."'),
  android_url: z.string().nullable().describe('Android deep link URL. For free plans, returns "Deeplinks available for paid plans only."'),
  web_url: z.string().nullable().describe('Web URL to watch the title'),
  tvos_url: z.string().nullable().describe('tvOS deep link. Only included if TV links are enabled for your account.'),
  android_tv_url: z.string().nullable().describe('Android TV deep link. Only included if TV links are enabled for your account.'),
  roku_url: z.string().nullable().describe('Roku deep link. Only included if TV links are enabled for your account.'),
  format: z.string().nullable().describe('Video quality (HD, 4K, etc.)'),
  price: z.number().nullable().describe('Price for rent/buy sources'),
  seasons: z.number().nullable().describe('Number of seasons available (for TV)'),
  episodes: z.number().nullable().describe('Number of episodes available (for TV)'),
});

export const TitleStreamingSourcesParametersSchema = z.object({
  regions: z.string().describe('Filter sources by region. Pass one or multiple 2-letter country codes comma-separated (e.g., US,GB,CA).'),
});

export const TitleStreamingSourcesSchema = z.array(TitleStreamingSourceSchema);

export type TitleStreamingSource = z.infer<typeof TitleStreamingSourceSchema>;
export type TitleStreamingSources = z.infer<typeof TitleStreamingSourcesSchema>;
export type TitleStreamingSourcesParameters = z.infer<typeof TitleStreamingSourcesParametersSchema>;
export type StreamingSourceName = z.infer<typeof StreamingSourceNameSchema>;
export type StreamingSourceType = z.infer<typeof StreamingSourceTypeSchema>;
