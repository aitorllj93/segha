import z from "zod";

import { Wikilink } from "./Wikilink";

export const Image = z.union([
  z.url(),
  Wikilink
])
.describe('Imagen: URL o Wikilink de una imagen.');
