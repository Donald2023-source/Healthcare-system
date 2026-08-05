import { NextRequest, NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";
import patientService from "@/services/patient.service";
import { auth } from "@/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const consultation =
      await patientService.getConsultationById(
        id,
        session.user.id
      );

    return NextResponse.json({
      message: "Consultation fetched successfully",
      data: consultation,
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