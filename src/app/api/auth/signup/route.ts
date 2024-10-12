import { NextResponse, NextRequest } from "next/server";
import { UserModel } from "@/models";
import { hash } from 'bcryptjs';
import { connectDB } from "@/utils";

export async function POST(req: NextRequest) {
    const { fullName, email, password } = await req.json();

    // Validations
    if (!fullName || !email || !password) {
        return NextResponse.json({ message: 'Please fill in all fields correctly.' });
    }

    if (fullName.length < 5) {
        return NextResponse.json({ message: 'The name must be at least 5 characters long.', status: 400 });
    }
    if (fullName.length > 40) {
        return NextResponse.json({ message: 'The name must be less than 40 characters long.', status: 400 });
    }

    if (password.length < 8) {
        return NextResponse.json({ message: 'The password must be at least 8 characters long.', status: 400 });
    }
    if (password.length > 40) {
        return NextResponse.json({ message: 'The password must be less than 40 characters long.', status: 400 });
    }

    try {
        await connectDB();

        const isUserFound = await UserModel.findOne({ email });
        if (isUserFound) {
            return NextResponse.json({ message: 'A user is already registered with that email address.', status: 400 });
        }

        // Encrypt password
        const hashedPassword = await hash(password, 12);

        // Create new user
        const newUser = await UserModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        return NextResponse.json({
            message: 'User created successfully.',
            status: 201,
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'There was an error creating the user.',
            status: 500,
        });
    }
}
