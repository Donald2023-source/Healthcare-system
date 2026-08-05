import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import patientService from "@/services/patient.service";
import { auth } from "@/auth";
import { UserRole } from "@/models/User";

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

    if (
      session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.RECEPTIONIST
    ) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const patients = await patientService.getAll();

    return NextResponse.json({
      data: patients,
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