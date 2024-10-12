import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components";
import { Github, Linkedin } from 'lucide-react';
import Link from "next/link";

export function Footer() {
    return (
        <footer className="fixed w-full bottom-0 bg-white dark:bg-[#140d02] z-100">
            <div className="size-full h-12 flex justify-between items-center px-6 animate-slide-up bg-white dark:bg-[#140d02]">
                <p className="text-sm text-foreground">
                    Made By <Link href="https://github.com/surajsahu46/" target="_blank" className="underline transition-colors text-foreground hover:text-LinkOptimizer-primary dark:hover:text-LinkOptimizer-secondary">SURAJ SAHU</Link> • © {new Date().getFullYear()} LinkOptimizer. All rights reserved.
                </p>
                <ul className="flex gap-2.5 items-center ml-4">
                    <li className="overflow-hidden">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="https://www.linkedin.com/in/suraj-sahu-5a8364215/"
                                        target="_blank"
                                        className="overflow-hidden relative size-fit transition-colors text-foreground hover:text-LinkOptimizer-primary dark:hover:text-LinkOptimizer-secondary"
                                    >
                                        <Linkedin size={20} />
                                        <span className="absolute -left-1/2 pointer-events-none size-0">check Linkedin</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>check Linkedin</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                    <li className="overflow-hidden">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="https://github.com/surajsahu46/LinkOptimizer"
                                        target="_blank"
                                        className="overflow-hidden relative size-fit transition-colors text-foreground hover:text-LinkOptimizer-primary dark:hover:text-LinkOptimizer-secondary"
                                    >
                                        <Github size={20} />
                                        <span className="absolute -left-1/2 pointer-events-none size-0">check Github</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>check Github</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
