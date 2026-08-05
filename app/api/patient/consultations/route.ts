import { NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";
import patientService from "@/services/patient.service";
import { auth } from "@/auth";
import consultationService from "@/services/consultation.service";

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

    const consultations =
      await consultationService.getPatientHistory(
        session.user.id
      );

    return NextResponse.json({
      message: "Consultations fetched successfully",
      data: consultations,
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