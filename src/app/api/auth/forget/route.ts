import { UserModel } from '@/models';
import { connectDB } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import { LINK_OPTIMIZER_URL } from '@/constants'; // Updated the constant name for the new project name
import { EmailTemplate } from '@/components';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Valid email validation
  const validEmailRegex = /\S+@\S+\.\S+/;
  if (!email || typeof email !== 'string' || !validEmailRegex.test(email)) {
    return NextResponse.json({ message: 'A valid email was not received.', status: 400 });
  }

  try {
    await connectDB();
    const userFind = await UserModel.findOne({ email });

    // User existence validation
    if (!userFind) {
      return NextResponse.json({ message: 'The email is not registered.', status: 404 });
    }

    const tokenData = {
      id: userFind._id,
      email: userFind.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: 7200 });

    const forgetUrl = `${LINK_OPTIMIZER_URL}change-password?token=${token}`; 

    // Send recovery email
    const { data, error } = await resend.emails.send({
      from: 'LinkOptimizer <onboarding@resend.dev>', 
      to: email,
      subject: 'LinkOptimizer - Password Recovery',
      react: EmailTemplate({ forgetURL: forgetUrl }),
    });

    if (error) {
      return NextResponse.json({ message: 'There was an error sending the recovery email.', status: 400 });
    }

    return NextResponse.json({
      message: 'A recovery email has been sent to the provided email address.',
      status: 201,
      data
    });
  } catch (error) {
    return NextResponse.json({ message: 'There was an error sending the recovery email.', status: 500 });
  }
};
