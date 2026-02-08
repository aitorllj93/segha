
import z from "zod";

import { CommonSchema } from "./Common";
import { Resources } from "./Type";
import { Clothes } from "./Subtype";
import { Rating } from "./Rating";
import { Date } from "../DataTypes";

export const ResourcesSubtype = z.union([
  Clothes,
]).describe('Subtipo de recurso.');

export const ResourceSchema = CommonSchema.extend({
  type: Resources.default(Resources.value),
  subtype: ResourcesSubtype,
  name: z.string().optional().describe('Nombre del recurso'),
}).describe('Fuentes Bibliográficas');
