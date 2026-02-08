
import { regex } from "arkregex";

/**
 * `[[Wikilink]]` or `[[Wikilink|Display Text]]`
 */
export const Link = regex("\\[\\[([^\\]|]+)(?:\\|([^\\]]+))?\\]\\]");

/**
 * `![[Wikilink]]` or `![[Wikilink|Display Text]]`
 */
export const Embedding = regex("!\\[\\[([^\\]|]+)(?:\\|([^\\]]+))?\\]\\]");

/**
 * `[[Wikilink]]` or `![[Wikilink]]` or `[[Wikilink|Display Text]]` or `![[Wikilink|Display Text]]`
 */
export const LinkOrEmbedding = regex("(!)?\\[\\[([^\\]|]+)(?:\\|([^\\]]+))?\\]\\]");
