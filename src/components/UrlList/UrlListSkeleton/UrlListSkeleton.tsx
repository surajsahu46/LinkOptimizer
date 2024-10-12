import { Skeleton } from "@/components";

export default function UrlListSkeleton() {
    return (
        <>
            <ul className="w-full max-w-[400px] px-2.5 grid grid-cols-1 grid-rows-auto gap-3 md:px-0 md:grid-cols-2 md:max-w-none md:w-[725px] xl:w-[1024px] xl:grid-cols-3">
                {
                    Array.from({ length: 21 }).map((_, index) => (
                        <li key={index} className="w-full max-w-[375px] h-[125px] rounded-md">
                            <Skeleton className="size-full rounded-md" />
                        </li>
                    ))
                }
            </ul>
            <div className="flex flex-row items-center gap-1 mt-8">
                <Skeleton className="w-20 h-10 rounded-md" />

                <Skeleton className="size-10 rounded-md" />
                <Skeleton className="size-10 rounded-md" />
                <Skeleton className="size-10 rounded-md" />

                <Skeleton className="w-20 h-10 rounded-md" />
            </div>
        </>
    )
}
