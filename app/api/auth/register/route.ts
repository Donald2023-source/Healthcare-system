import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { fullName, email, phoneNumber, password } = body;

    if (!fullName || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists.",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Account created successfully.",
        status: 201,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
