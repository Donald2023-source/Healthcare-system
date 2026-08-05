import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";
import User from "@/models/User";
import { generateHospitalNumber } from "@/lib/generateHospitalNumber";
import Patients from "@/models/Patients";
import patientService from "@/services/patient.service";
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      emergencyContactName,
      emergencyContactPhone,
      address,
      dateOfBirth,
      gender,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !emergencyContactName ||
      !emergencyContactPhone ||
      !address ||
      !dateOfBirth ||
      !gender
    ) {
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

    const result = await patientService.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      hospitalNumber: generateHospitalNumber(),
      emergencyContactName,
      emergencyContactPhone,
      address,
      dateOfBirth,
      gender,
    });
    const user = result.user as any;
    return NextResponse.json(
      {
        message: "Account created successfully.",
        status: 201,
        user: {
          id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          role: "PATIENT",
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
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}
