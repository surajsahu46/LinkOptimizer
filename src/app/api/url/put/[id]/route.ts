import { connectDB } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { UrlModel } from "@/models";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) return NextResponse.json({ message: 'No URL ID has been received for updating.', status: 400 });

    const { newOriginal, newShort } = await req.json();

    let newUrl: Record<string, any> = {};

    // Validations
    if (newOriginal && newOriginal.trim() !== "") newUrl.original = newOriginal;
    if (newShort && newShort.trim() !== "" && (newShort.trim().length >= 5 && newShort.trim().length <= 30)) {
        newUrl.short = newShort;
    }
    if (!newUrl.original && !newUrl.short) {
        return NextResponse.json({ message: 'No new data found to update the URL.', status: 400 });
    }

    const existAlias = await UrlModel.findOne({ short: newUrl.short });
    if (existAlias) {
        return NextResponse.json({
            message: 'The provided alias is not available. Please choose another one.',
            data: existAlias,
            status: 409
        });
    }

    try {
        await connectDB();

        const updatedUrl = await UrlModel.findByIdAndUpdate(id, newUrl, { new: true }); // Option to return the updated document
        if (!updatedUrl) {
            return NextResponse.json({ message: 'The URL you are trying to update was not found.', status: 404 });
        }

        return NextResponse.json({
            message: 'The URL was successfully updated!',
            data: updatedUrl,
            status: 200 // Updated status to 200 for successful updates
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'There was an error updating the URL.', status: 500 });
    }
}
