import { NextResponse, NextRequest } from "next/server";
import { UrlModel } from "@/models";
import { connectDB } from "@/utils";

export async function POST(req: NextRequest) {    
    const { url, alias, user_email } = await req.json();
    const user = user_email || 'Anonymous';
    let shortUrl: string;

    try {
        await connectDB();

        // Validations for alias
        if (alias && alias.trim() !== "" && (alias.trim().length >= 5 && alias.trim().length <= 30)) {
            shortUrl = alias.trim();
        } else {
            shortUrl = Math.random().toString(36).substring(2, 9); // Generate a random short URL
        }

        if (!url) {
            return NextResponse.json({ message: 'Error obtaining the data.', status: 400 });
        }

        const existAlias = await UrlModel.findOne({ short: shortUrl });
        if (existAlias) {
            // If the alias already exists and the provided alias is valid, return a conflict response
            if (alias && alias.trim() !== "" && (alias.trim().length >= 5 && alias.trim().length <= 30)) {
                return NextResponse.json({
                    message: 'The provided alias is not available. Please choose another one.',
                    data: existAlias,
                    status: 409
                });
            }
            // Generate a new short URL if the alias exists
            shortUrl = Math.random().toString(36).substring(2, 9);
        }

        // Create new URL
        const newShortUrl = await UrlModel.create({
            original: url,
            short: shortUrl,
            createdBy: user,
        });

        return NextResponse.json({
            message: 'URL created successfully.',
            data: newShortUrl,
            status: 201
        });
    } catch (error) {
        console.error(error); // Improved error logging
        return NextResponse.json({ message: 'There was an error creating the URL.', status: 500 });
    }
}
