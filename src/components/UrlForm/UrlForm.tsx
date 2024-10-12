"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { revalidateUrlsAction } from "@/actions";
import { LINK_OPTIMIZER_URL } from "@/constants"; // Changed from TINY_TARGET_URL
import { useSession } from "next-auth/react";
import { urlSchema } from "@/validations";
import { UrlItem } from "@/models";
import { createUrl } from "@/lib";
import { UrlCard } from "..";

export default function UrlForm() {
    const { data: session } = useSession();

    let unauthedUrlIds: string[] = [];
    if (typeof window !== 'undefined' && window.localStorage) {
        const rawUnauthedUrlIds = localStorage.getItem("unauthedUrls");
        unauthedUrlIds = JSON.parse(rawUnauthedUrlIds!) || [];
    }

    const [newUrl, setNewUrl] = useState<UrlItem | null>(null);

    const form = useForm<z.infer<typeof urlSchema>>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            url: "",
            alias: ""
        },
    })

    const handleCreateUrl = async (formData: { user_email: string, url: string; alias?: string }) => {
        const res = await createUrl(formData);
        if (res.status !== 201) throw new Error(res.message);
        revalidateUrlsAction();
        setNewUrl(res.data);

        if (!formData.user_email) {
            const newUnauthedUrlIds = [res.data._id, ...unauthedUrlIds];
            localStorage.setItem("unauthedUrls", JSON.stringify(newUnauthedUrlIds));
        }

        return res;
    }

    const onSubmit = async (values: z.infer<typeof urlSchema>) => {
        const user_email = session?.user?.email!;
        const alias = values.alias;
        const url = values.url;

        if (!url) return toast.warning("Please enter a valid URL.");
        if (unauthedUrlIds.length === 10) return toast.error("You cannot create more URLs without logging in.");

        let formData: { user_email: string, url: string; alias?: string } = {
            user_email,
            url,
        };

        if (alias && alias.trim() !== "" && alias.trim().length > 5) {
            formData = {
                ...formData,
                alias
            }
        }

        try {
            toast.promise(handleCreateUrl(formData), {
                loading: 'Loading...',
                success: (res) => {
                    return res.message;
                },
                error: (res) => {
                    console.error(`Error ${res.status} while creating the URL`, res.message);
                    return res.message;
                },
            });
        } catch (err) {
            console.error('Error while creating the URL', err)
        }
    }

    return (
        <>
            <div className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input type="text" required placeholder="Enter a URL to shorten" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be the site where the shortened URL will redirect
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="alias"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alias <small className="text-[#505050] dark:text-[#ddd]">(optional)</small></FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter an alias" maxLength={30} {...field} />
                                    </FormControl>
                                    {
                                        form.getValues().alias && form.getValues().alias.trim() !== "" &&
                                        <FormDescription>
                                            {LINK_OPTIMIZER_URL + form.getValues().alias} 
                                        </FormDescription>
                                    }
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-2.5 items-center">
                            <Button type="submit">Shorten</Button>
                            {
                                !session && (
                                    <p className="text-sm text-muted-foreground">
                                        To create unlimited URLs, please{' '}
                                        <span className="font-bold">log in</span> or{' '}
                                        <span className="font-bold">sign up</span>.
                                    </p>
                                )
                            }
                        </div>
                    </form>
                </Form>
            </div>
            {
                newUrl &&
                <div className="mt-8 flex flex-col gap-2.5 justify-center items-center">
                    <h2 className="text-foreground font-bold text-[20px] self-start">Your new short URL: </h2>
                    <UrlCard url={newUrl} options={false} />
                </div>
            }
        </>
    )
}
