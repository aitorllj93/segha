
import z from "zod";

import { CommonSchema } from "./Common";
import { Sources } from "./Type";
import { Clothes } from "./Subtype";
import { Rating } from "./Rating";
import { Date } from "../DataTypes";

export const ResourcesSubtype = z.union([
  Clothes,
]).describe('Subtipo de recurso.');

export const ResourceSchema = CommonSchema.extend({
  type: Sources,
  subtype: ResourcesSubtype,
  name: z.string().optional().describe('Nombre del recurso'),
}).describe('Fuentes Bibliográficas');
