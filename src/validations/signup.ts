import { z } from "zod";

export const passwordSchema = z.string().min(8, { message: "The password must be at least 8 characters long." }).max(40, { message: "The password must not exceed 40 characters." });

export const signupSchema = z.object({
    fullName: z.string().min(5, { message: "The name must be at least 5 characters long." }).max(40, { message: "The name must not exceed 40 characters." }),
    email: z.string().email({ message: "The email you provided is not valid." }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});
