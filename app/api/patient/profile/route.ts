import { NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";
import patientService from "@/services/patient.service";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const patient = await patientService.getProfile(
      session.user.id
    );

    return NextResponse.json({
      message: "Profile fetched successfully",
      data: patient,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}