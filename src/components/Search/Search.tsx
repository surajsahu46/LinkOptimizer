"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let search = new FormData(e.currentTarget).get('search');
        if (search) search = search.toString().replaceAll(' ', '');

        if (search && search.length > 0 && search !== "") {
            router.push('/dashboard?search=' + search, { scroll: false });
        } else {
            const searchQuery = searchParams.get('search');

            if (searchQuery) router.push('/dashboard', { scroll: false });
        }
    }

    return (
        <form className="flex items-center relative" onSubmit={handleSubmit}>
            <Input
                type="text"
                name="search"
                placeholder="Buscar"
                defaultValue={searchParams.get('search') || ""}
                className="rounded-r-none"
            />
            <Button
                type="submit"
                className="rounded-l-none text-secondary"
            >
                <SearchIcon size={18} strokeWidth={3} />
            </Button>
        </form>
    )
}