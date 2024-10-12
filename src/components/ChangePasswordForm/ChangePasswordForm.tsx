"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/validations";
import { useForm } from "react-hook-form";
import { changePassword } from "@/lib";
import { toast } from "sonner";
import { z } from "zod";

export default function ChangePasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    const changePasswordSchema = z.object({
        newPassword: passwordSchema,
        confirmNewPassword: passwordSchema,
    }).refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    });

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
        if (!values || !values.newPassword || !values.confirmNewPassword) return;

        try {
            toast.loading("Loading...");
            const res = await changePassword({ newPassword: values.newPassword, confirmNewPassword: values.confirmNewPassword, token });
            if (!res || res.status !== 201) {
                if (res.redirect) return router.push('/auth');

                throw new Error(res?.message);
            }
            toast.dismiss();
            toast.success(res?.message);
            return router.push('/auth');
        } catch (error: any) {
            console.error('Error changing password', error);
            toast.dismiss();
            toast.error(error?.message);
        }
    };

    return (
        <Card className="w-[375px]">
            <CardHeader className="relative">
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Provide a new password for your account. Make sure to remember it well.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" required placeholder="Enter your new password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" required placeholder="Repeat your new password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Change Password</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
