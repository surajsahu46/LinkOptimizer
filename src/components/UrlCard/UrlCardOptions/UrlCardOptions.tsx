'use client';

import { revalidateUrlsAction } from "@/actions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Label } from "@/components";
import { deleteUrl, updateUrl } from "@/lib";
import { UrlItem } from "@/models";
import { copyToClipboard } from "@/utils";
import React, { useState } from "react";
import { urlSchema } from "@/validations";
import { toast } from "sonner";
import { SlidersHorizontal, Trash2, Edit, Copy } from "lucide-react";
import { LINK_OPTIMIZER_URL } from "@/constants";

export default function UrlCardOptions({ url }: { url: UrlItem }) {
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState<boolean>(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string>();
    const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState<boolean>(false);
    const [newUrlData, setNewUrlData] = useState<{ newOriginal: UrlItem['original'], newShort: UrlItem['short'] }>({
        newOriginal: url.original,
        newShort: url.short
    });

    const handleNewUrlData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUrlData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleDelete = async () => {
        const res = await deleteUrl(url._id);
        if (res.status !== 201) throw new Error(res.message);
        await revalidateUrlsAction();
        return res;
    }

    const handleDeleteUrl = async () => {
        try {
            toast.promise(handleDelete(), {
                loading: 'Loading...',
                success: (res) => {
                    return res.message;
                },
                error: (res) => {
                    console.error(`Error ${res.status} deleting URL`, res.message);
                    return res.message;
                },
            });
        } catch (error) {
            console.error('Error deleting URL', error);
        }
    }

    const handleUpdate = async () => {
        const res = await updateUrl(url._id, newUrlData);
        if (res.status !== 201) throw new Error(res.message);
        await revalidateUrlsAction();
        setUpdateDialogIsOpen(false);
        return res;
    }

    const handleUpdateUrl = async () => {
        const { newOriginal, newShort } = newUrlData;
        if (newOriginal === url.original && newShort === url.short) return;

        try {
            urlSchema.parse({ url: newOriginal, alias: newShort });
            toast.promise(handleUpdate, {
                loading: 'Loading...',
                action: {
                    label: "Undo",
                    onClick: async () => {
                        await updateUrl(url._id, { newOriginal: url.original, newShort: url.short });
                        await revalidateUrlsAction();
                    },
                },
                success: (res) => {
                    return res.message;
                },
                error: (res) => {
                    console.error(`Error ${res.status} updating URL`, res.message);
                    return res.message;
                },
            });
        } catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                const errorMessage = (error as any).errors[0].message;
                console.error(errorMessage);
                toast.error(errorMessage);
            }
        }
    }

    return (
        <div className="absolute top-2.5 right-2.5">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={null} size="fit" className="bg-LinkOptimizer-primary">
                        <div className="text-white">
                            <SlidersHorizontal size={18} strokeWidth={1.5} />
                        </div>
                        <span className="sr-only">Options</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                        copyToClipboard(LINK_OPTIMIZER_URL + url.short);
                        toast.info('URL copied to clipboard');
                    }}>
                        <Copy size={16} strokeWidth={1.5} />
                        <span className="ml-1.5">Copy</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setUpdateDialogIsOpen(true)}>
                        <Edit size={16} strokeWidth={1.5} />
                        <span className="ml-1.5">Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteDialogIsOpen(true)}>
                        <Trash2 size={16} strokeWidth={1.5} />
                        <span className="ml-1.5">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={updateDialogIsOpen} onOpenChange={setUpdateDialogIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit URL</DialogTitle>
                        <DialogDescription>
                            Make changes to the URL here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="original" className="text-right">
                                Original URL
                            </Label>
                            <Input
                                id="original"
                                name="newOriginal"
                                defaultValue={url.original}
                                onChange={handleNewUrlData}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="short" className="text-right">
                                Short URL
                            </Label>
                            <Input
                                id="short"
                                name="newShort"
                                defaultValue={url.short}
                                onChange={handleNewUrlData}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleUpdateUrl}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteDialogIsOpen} onOpenChange={setDeleteDialogIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this URL and its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="deleteShort" className="text-destructive/90">
                            Type <strong className="text-destructive">{url.short}</strong> to confirm
                        </Label>
                        <Input
                            id="deleteShort"
                            name="deleteShort"
                            placeholder="..."
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeleteConfirm(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {
                            deleteConfirm === url.short
                                ? <AlertDialogAction onClick={handleDeleteUrl}>Confirm</AlertDialogAction>
                                : <Button onClick={() => console.log('Please type the alias!')}>Confirm</Button>
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
