import type z from "zod";
import { StreamUrlsSchema } from "./StreamUrls";

export type StreamUrls = z.infer<typeof StreamUrlsSchema>;
