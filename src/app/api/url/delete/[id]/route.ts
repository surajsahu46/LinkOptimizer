import { connectDB } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { UrlModel } from "@/models";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) return NextResponse.json({ message: 'No URL ID has been received for deletion.', status: 400 });

    try {
        await connectDB();

        const deletedUrl = await UrlModel.findByIdAndDelete(id);

        if (!deletedUrl) {
            return NextResponse.json({
                message: 'No URL found with the provided ID.',
                status: 404
            });
        }

        return NextResponse.json({
            message: 'The URL was successfully deleted!',
            data: deletedUrl,
            status: 200
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'There was an error deleting the URL.', status: 500 });
    }
}
