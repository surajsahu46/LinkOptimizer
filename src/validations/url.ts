import { z } from "zod";

export const urlSchema = z.object({
    url: z.string().url({ message: "The URL you provided is not valid." }),
    alias: z.string().refine((data) => data === null || data === undefined || data.trim() === "" || (data.length >= 5 && data.length <= 30), {
        message: "The alias must be between 5 and 30 characters.",
    }),
});
