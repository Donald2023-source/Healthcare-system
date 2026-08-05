import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";

import Patient from "@/models/Patients";

import consultationService from "@/services/consultation.service";

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

    const patient = await Patient.findOne({
      user: session.user.id,
    });

    if (!patient) {
      return NextResponse.json(
        {
          message: "Patient not found",
        },
        {
          status: 404,
        }
      );
    }

    const records =
      await consultationService.getPatientHistory(
        patient._id.toString()
      );

    return NextResponse.json(records);
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