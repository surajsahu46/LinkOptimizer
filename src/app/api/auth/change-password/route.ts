import { UserModel } from '@/models';
import { connectDB } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { hash } from 'bcryptjs';

export async function PUT(req: NextRequest) {
    const { newPassword, confirmNewPassword } = await req.json();
    if (!newPassword || !confirmNewPassword) {
        return NextResponse.json({ message: 'No new password was received.', status: 400 });
    }
    if (newPassword !== confirmNewPassword) {
        return NextResponse.json({ message: 'Passwords do not match.', status: 400 });
    }

    try {
        await connectDB();

        const headerList = headers();
        const token = headerList.get('Authorization');
        if (!token) {
            return NextResponse.json({ message: 'You are not authorized to perform this operation.', status: 400, redirect: true });
        }

        const isTokenValid = jwt.verify(token, process.env.JWT_SECRET!);
        const data = isTokenValid as JwtPayload;

        const userFind = await UserModel.findById(data.id);
        // User existence validation
        if (!userFind) {
            return NextResponse.json({ message: 'User not found.', status: 404, redirect: true });
        }

        // Encrypt new password
        const hashedPassword = await hash(newPassword, 12);
        userFind.password = hashedPassword;

        await userFind.save();

        return NextResponse.json({ message: 'Password changed successfully.', status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'There was an error changing the password.', status: 500 });
    }
};
