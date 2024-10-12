"use client";

import { revalidateUrlsAction } from "@/actions";
import { updatedUnauthUrls } from "@/lib";
import { User } from "@/models";

export async function updatedUnauthUrlsWithLocalStorage(user_email: User['email']) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const rawUnauthedUrlIds = localStorage.getItem("unauthedUrls");
  
      if (rawUnauthedUrlIds && rawUnauthedUrlIds.length > 0) {
        const unauthUrlIds = JSON.parse(rawUnauthedUrlIds!);
        await updatedUnauthUrls(user_email!, unauthUrlIds);
        revalidateUrlsAction();
        localStorage.removeItem("unauthedUrls");
      };
    };
  }