import { z } from "zod";

export const signinSchema = z.object({
    email: z.string().email({ message: "The email you provided is not valid." }),
    password: z.string().min(8, { message: "The password must be at least 8 characters long." }).max(40, { message: "The password must not exceed 40 characters." }),
});
