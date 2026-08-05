import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";

import patientService from "@/services/patient.service";

export async function GET() {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const dashboard = await patientService.getDashboard(session.user.id);

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}