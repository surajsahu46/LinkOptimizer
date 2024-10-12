import { Search, UrlList, UrlListSkeleton } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Panel de Control | Tiny Target",
}

export default async function Dashboard({ searchParams }: { searchParams: { [key: string]: string } }) {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) return redirect('/auth');

  return (
    <main className="pb-12">
      <section className="flex flex-col items-center gap-8">
        <article className="relative flex flex-col gap-2.5 justify-center items-center w-full max-w-[1024px] pt-8 md:gap-0 md:flex-row lg:justify-end">
          <h1 className="left-0 text-foreground font-bold text-[35px] md:absolute md:pl-5 lg:pl-0">Dashboard</h1>
          <Search />
        </article>
        <Suspense key={searchParams.search + searchParams.page} fallback={<UrlListSkeleton />}>
          <UrlList user={session.user.email} searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  )
}