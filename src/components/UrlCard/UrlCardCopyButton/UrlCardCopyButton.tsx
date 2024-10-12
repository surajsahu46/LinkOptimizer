"use client";

import { UrlItem } from "@/models";
import { copyToClipboard } from "@/utils";
import { toast } from "sonner";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components";
import { Copy } from "lucide-react";
import { LINK_OPTIMIZER_URL } from "@/constants"; // Changed constant to LINK_OPTIMIZER_URL

export default function UrlCardCopyButton({ short }: { short: UrlItem['short'] }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Copy
                        size={18}
                        strokeWidth={2.25}
                        className="cursor-pointer active:scale-95"
                        onClick={() => {
                            copyToClipboard(LINK_OPTIMIZER_URL + short) // Updated to use LINK_OPTIMIZER_URL
                            toast.info('URL copied to clipboard'); // Translated to English
                        }}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Copy</p> {/* Translated to English */}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
