import z from "zod";

export const Pending = z.literal("Pendiente");
export const InProgress = z.literal("En Proceso");
export const Read = z.literal("Leído");
export const Consolidated = z.literal("Consolidado");
export const Seen = z.literal("Visto");
export const Watched = z.literal("Visto");
