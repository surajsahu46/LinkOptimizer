"use client";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { sendForgetPasswordEmail } from "@/lib";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Link from "next/link";

export default function ForgetForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const defaultEmailValue = email || "";

    const forgetPasswordSchema = z.object({
        email: z.string().email({ message: "The email you provided is not valid" })
    });

    const form = useForm<z.infer<typeof forgetPasswordSchema>>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: defaultEmailValue,
        },
    });

    const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
        if (!values || !values.email) return;

        try {
            toast.loading("Loading...");
            const res = await sendForgetPasswordEmail(values.email);
            if (!res || res.status !== 201) {
                throw new Error(res?.message);
            }
            toast.dismiss();
            toast.success(res?.message);
        } catch (error: any) {
            console.error('Error sending recovery email', error);
            toast.dismiss();
            toast.error(error?.message);
        }
    };

    return (
        <Card className="w-[375px]">
            <CardHeader className="relative">
                <CardTitle>Recover Your Account</CardTitle>
                <CardDescription>Enter your email address to look up your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" required placeholder="Enter your email address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Recover Password</Button>
                    </form>
                </Form>
                <CardFooter className="p-0 pt-3">
                    <p className="text-sm text-muted-foreground mx-auto">Go back to <Link href={email ? `/auth?email=${email}` : "/auth"} className="text-LinkOptimizer-secondary underline">sign in</Link></p>
                </CardFooter>
            </CardContent>
        </Card>
    );
}
