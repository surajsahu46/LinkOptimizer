import { LINK_OPTIMIZER_URL } from "@/constants";
import { User } from "@/models";

export async function signup(newUser: {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
}) {
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    const data = await res.json();

    return data;
}

export async function sendForgetPasswordEmail(email: string) {
    const res = await fetch("/api/auth/forget", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const data = await res.json();

    return data;
}

export async function changePassword({ newPassword, confirmNewPassword, token }: { newPassword: string, confirmNewPassword: string, token: string }) {
    const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ newPassword, confirmNewPassword }),
    });
    const data = await res.json();

    return data;
}

export async function getUrls(user_email: User['email'], filters?: { page?: number | null; search?: string | null }) {
    let URL = LINK_OPTIMIZER_URL + '/api/url/' + user_email;

    const params = new URLSearchParams();

    if (filters?.page !== undefined && filters.page !== null) {
        params.append('page', filters.page.toString());
    }
    if (filters?.search) {
        params.append('search', filters.search);
    }

    // Add the parameters to the URL
    if (params.toString() !== '') {
        URL += `?${params.toString()}`;
    }

    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['urls']
        }
    });
    const data = await response.json();

    return data;
}

export async function createUrl(newUrlData: { user_email: string, url: string; alias?: string }) {
    const response = await fetch('/api/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUrlData)
    });

    const data = await response.json();

    return data;
}

export async function deleteUrl(id: string) {
    const URL = '/api/url/delete/' + id;
    const response = await fetch(URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    return data;
}

export async function updateUrl(id: string, newUrlData: { newOriginal: string; newShort: string }) {
    const URL = '/api/url/put/' + id;
    const response = await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUrlData)
    });
    const data = await response.json();

    return data;
}

export async function updatedUnauthUrls(user_email: User['email'], unauthedUrlIds: string[]) {
    const URL = '/api/url/' + user_email;
    const response = await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unauthedUrlIds })
    });
    const data = await response.json();

    return data;
}
