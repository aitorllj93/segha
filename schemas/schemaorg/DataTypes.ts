import z from "zod";


export const TextSchema = z.string().describe('Data type: Text.');

export const URLSchema = z.url().describe('Data type: URL.');