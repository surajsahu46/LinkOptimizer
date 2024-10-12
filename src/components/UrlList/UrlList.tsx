import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, UrlCard } from "@/components";
import { UrlItem } from "@/models";
import { getUrls } from "@/lib";

interface UrlListInterface {
    user: string,
    searchParams: { [key: string]: string }
}

export default async function UrlList({ user, searchParams }: UrlListInterface) {
    const { page, search } = searchParams;
    const filters = {
        page: parseInt(page) || 1,
        search: search,
    }

    const createdUrls = await getUrls(user, filters);

    const previousPageHref = createdUrls.data
        ? `/dashboard?${search ? `search=${search}&page=${createdUrls.data.page - 1}` : `page=${createdUrls.data.page - 1}`}`
        : '';
    const nextPageHref = createdUrls.data
        ? `/dashboard?${search ? `search=${search}&page=${createdUrls.data.page + 1}` : `page=${createdUrls.data.page + 1}`}`
        : '';

    return (
        createdUrls.data && createdUrls.data.docs && user
            ? (
                <>
                    <article className={createdUrls.data.totalPages === 1 ? "min-h-auto" : "min-h-[947px]"}>
                        <ul className="size-fit px-2.5 grid grid-cols-1 grid-rows-auto gap-3 md:px-0 md:grid-cols-2 xl:grid-cols-3">
                            {
                                createdUrls.data.docs.map((url: UrlItem, index: number) => (
                                    <li key={index}>
                                        <UrlCard url={url} />
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                    {
                        createdUrls.data.totalPages > 1 && (
                            <article className="select-none">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            {
                                                createdUrls.data.page - 1 < 1
                                                    ? <PaginationPrevious href={previousPageHref} className="pointer-events-none text-[#aaaaaa]" />
                                                    : <PaginationPrevious href={previousPageHref} />
                                            }
                                        </PaginationItem>
                                        {
                                            createdUrls.data.page > 2 &&
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        }
                                        <PaginationItem>
                                            {
                                                createdUrls.data.page - 1 < 1
                                                    ? <PaginationLink href={previousPageHref} className="pointer-events-none">-</PaginationLink>
                                                    : <PaginationLink href={previousPageHref}>{createdUrls.data.page - 1}</PaginationLink>
                                            }
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href={`/dashboard?${search ? `search=${search}&page=${createdUrls.data.page}` : `page=${createdUrls.data.page}`}`} isActive>{createdUrls.data.page}</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            {
                                                createdUrls.data.page === createdUrls.data.totalPages
                                                    ? <PaginationLink href={nextPageHref} className="pointer-events-none">-</PaginationLink>
                                                    : <PaginationLink href={nextPageHref}>{createdUrls.data.page + 1}</PaginationLink>
                                            }
                                        </PaginationItem>
                                        {
                                            createdUrls.data.page < createdUrls.data.totalPages - 1 &&
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        }
                                        <PaginationItem>
                                            {
                                                createdUrls.data.page === createdUrls.data.totalPages
                                                    ? <PaginationNext href={nextPageHref} className="pointer-events-none text-[#aaaaaa]" />
                                                    : <PaginationNext href={nextPageHref} />
                                            }
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </article>
                        )
                    }
                </>
            ) : (
                <p>{search ? `No URLs match "${searchParams.search}".` : 'No URLs found.'}</p>
            )
    )
}
