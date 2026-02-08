
import z from "zod";

import * as Wiki from '../../common/Wiki';

export const Wikilink = z.string()
  .regex(Wiki.Link, "Formato de Wikilink inválido. Debe ser un formato válido de Wikilink o Embedding.")
  .describe('Wikilink: [[Wikilink]] o [[Wikilink|Display Text]]');

export const WikilinkOrEmbedding = z.string()
  .regex(Wiki.LinkOrEmbedding, "Formato de Wikilink o Embedding inválido. Debe ser un formato válido de Wikilink o Embedding.")
  .describe('Wikilink o Embedding: [[Wikilink]] o ![[Wikilink]] o [[Wikilink|Display Text]] o ![[Wikilink|Display Text]]');

export const Embedding = z.string()
  .regex(Wiki.Embedding, "Formato de Embedding inválido. Debe ser un formato válido de Embedding.")
  .describe('Embedding: ![[Wikilink]] o ![[Wikilink|Display Text]]');
