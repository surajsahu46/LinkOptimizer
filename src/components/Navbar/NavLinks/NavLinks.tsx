"use client";

import { Skeleton } from '@/components/ui/skeleton';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

function NavLinkSkeleton() {
    return (
        <ul className="h-full flex gap-3 min-[450px]:gap-5 items-center">
            <li>
                <Skeleton className="h-4 w-[20px] min-[450px]:w-[40px]" />
            </li>
            <li>
                <Skeleton className="h-4 w-[94px] min-[450px]:w-[114px]" />
            </li>
            <li>
                <Skeleton className="h-4 w-[70px] min-[450px]:w-[90px]" />
            </li>
            <li>
                <Skeleton className="h-4 w-[60px] min-[450px]:w-[80px]" />
            </li>
        </ul>
    );
}

function NavLinks() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const [navigateLoader, setNavigateLoader] = useState(false);

    const handleNavigateLoader = (path: string) => {
        if (path === pathname) return;
        setNavigateLoader(true);
    };

    useEffect(() => {
        setNavigateLoader(false);
    }, [pathname, searchParams]);

    const handleSignout = () => signOut({
        callbackUrl: "/auth"
    });

    return (
        <>
            {navigateLoader && <Skeleton className="fixed top-0 left-0 w-full h-1.5" />}
            <ul className="h-full flex gap-6 items-center">
                <li className="flex justify-center items-center" onClick={() => handleNavigateLoader("/")}>
                    <Link href="/" className="h-5 border-none bg-transparent text-wrap text-center mx-auto hover:text-LinkOptimizer-primary/75">Home</Link>
                </li>
                <li className="flex justify-center items-center" onClick={() => handleNavigateLoader("/dashboard")}>
                    <Link href="/dashboard" className="min-[400px]:h-5 border-none bg-transparent text-wrap text-center mx-auto hover:text-LinkOptimizer-primary/75">Dashboard</Link>
                </li>
                {
                    session
                        ? (
                            <li className="flex justify-center items-center" onClick={() => handleNavigateLoader("/auth")}>
                                <button type="button" onClick={handleSignout} className="flex justify-center items-center border border-LinkOptimizer-primary rounded bg-transparent p-1.5 text-wrap text-center hover:border-LinkOptimizer-primary/75 hover:text-LinkOptimizer-primary/75">
                                    <span className="min-[400px]:h-5">Sign Out</span>
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="flex justify-center items-center" onClick={() => handleNavigateLoader("/auth")}>
                                    <Link href="/auth" className="h-5 border-none bg-transparent text-wrap text-center mx-auto hover:text-LinkOptimizer-primary/75">Log In</Link>
                                </li>
                                <li className="flex justify-center items-center" onClick={() => handleNavigateLoader("/auth")}>
                                    <Link href="/auth?mode=signup" className="h-5 border-none bg-transparent text-wrap text-center mx-auto hover:text-LinkOptimizer-primary/75">Sign Up</Link>
                                </li>
                            </>
                        )
                }
            </ul>
        </>
    );
}

export default dynamic(
    async () => NavLinks,
    { ssr: false, loading: () => <NavLinkSkeleton /> }
);
