import { connectDB } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { UrlModel } from "@/models";

export async function GET(req: NextRequest, { params }: { params: { user: string } }) {
    const { user } = params;
    if (!user) return NextResponse.json({ message: 'No user has been received.', status: 400 });

    const pageQuery = new URL(req.url).searchParams.get('page') || '1';
    const searchQuery = new URL(req.url).searchParams.get('search');

    const options = {
        page: parseInt(pageQuery as string),
        limit: 21,
        sort: { createdAt: -1 },
    };

    let filters: Record<string, any> = { createdBy: user };
    
    if (searchQuery) {
        const regex = new RegExp(searchQuery as string, 'i');

        filters = {
            ...filters,
            $or: [
                { original: regex },
                { short: regex },
            ],
        };
    }

    try {
        await connectDB();

        const urls = await UrlModel.paginate(filters, options);
        if (!urls.docs || urls.docs.length === 0) {
            return NextResponse.json({ message: 'No URLs created by ' + user + ' were found.', status: 404 });
        }

        return NextResponse.json({
            message: 'URLs retrieved successfully!',
            data: urls,
            status: 201
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'There was an error retrieving the URLs.', status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { user: string } }) {
    const { user } = params;
    const { unauthedUrlIds } = await req.json();

    if (!user) return NextResponse.json({ message: 'No user has been received.', status: 400 });
    if (!unauthedUrlIds) return NextResponse.json({ message: 'No unauthenticated URLs have been received for update.', status: 400 });

    try {
        let updatedUrls: Record<string, any>[] = [];

        for (const urlId of unauthedUrlIds) {
            const updateUrl = await UrlModel.findByIdAndUpdate(urlId, { createdBy: user });
            updatedUrls.push(updateUrl);
        }

        return NextResponse.json({
            message: 'The unauthenticated URLs were successfully updated!',
            data: updatedUrls,
            status: 201
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'There was an error updating the unauthenticated URLs.', status: 500 });
    }
}
