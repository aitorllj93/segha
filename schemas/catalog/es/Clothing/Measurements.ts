import z from "zod";

export const Measurements = z.array(z.number()).describe('Medidas');
