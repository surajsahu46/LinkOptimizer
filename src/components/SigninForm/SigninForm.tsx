"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input, Button, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components";
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation";
import { signinSchema } from "@/validations";
import { updatedUnauthUrlsWithLocalStorage } from "@/utils";
import { LINK_OPTIMIZER_URL } from "@/constants";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginForm() {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const defaultEmailValue = searchParams.get('email') || "";

    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: defaultEmailValue,
            password: "",
        },
    });

    const forgetLink = form.getValues('email') && z.string().email().safeParse(form.getValues('email')).success ? `/forget-password?email=${form.getValues('email')}` : "/forget-password";

    // Handle submit
    const handleGoogle = async () => {
        await signIn('google', {
            callbackUrl: LINK_OPTIMIZER_URL,
        });
    };

    const handleGitHub = async () => {
        await signIn('github', {
            callbackUrl: LINK_OPTIMIZER_URL,
        });
    };
    
    const onSubmit = async (values: z.infer<typeof signinSchema>) => {
        if (!values || !values.email || !values.password) return;

        try {
            toast.loading("Loading...");
            const res = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false
            });

            if (res && res?.ok) {
                updatedUnauthUrlsWithLocalStorage(values.email);

                toast.dismiss();
                return push('/');
            } else if (res && res?.error) {
                throw new Error(res.error);
            }
        } catch (error: any) {
            toast.dismiss();
            toast.error(error?.message);
        }
    }

    return (
        <div className="w-full max-w-[400px]">
            <div className="w-full">
                <button
                    className="w-full max-w-[400px] flex justify-center py-2.5 text-[14px] px-8 leading-3 font-bold text-center uppercase align-middle items-center rounded-md border border-[rgba(0,0,0,0.25)] gap-4 text-[#505050] bg-white cursor-pointer"
                    onClick={handleGoogle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                        <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                    </svg>
                    Continue with Google
                </button>
            </div>
            <div className="w-full mt-4">
                <button
                    className="w-full max-w-[400px] flex gap-4 justify-center bg-[rgb(24,23,23)] text-white py-2.5 text-[14px] px-8 leading-3 font-bold text-center uppercase align-middle items-center rounded-md border-none cursor-pointer"
                    onClick={handleGitHub}
                >
                    <svg fill="#ffffff" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeWidth="0"></g>
                        <g strokeLinejoin="round" strokeLinecap="round"></g>
                        <g>
                            <rect fill="none" height="24" width="24"></rect>
                            <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path>
                        </g>
                    </svg>
                    Continue with GitHub
                </button>
            </div>

            <div className="flex gap-1.5 items-center w-full max-w-[400px] mx-auto my-4">
                <div className="w-full h-px bg-[#ddd] mt-1" />
                <p className="text-center w-fit text-nowrap text-[14px] text-[#aaa]">or with your email and password</p>
                <div className="w-full h-px bg-[#ddd] mt-1" />
            </div>

            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" required placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" required placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        <Link href={forgetLink} className="text-LinkOptimizer-secondary underline">Forgot your password?</Link>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Log In</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
