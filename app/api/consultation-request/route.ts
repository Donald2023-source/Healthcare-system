import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import consultationRequestService from "@/services/consultation-request.service";

import { auth } from "@/auth";

import Patient from "@/models/Patients";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const patient = await Patient.findOne({
      user: session.user.id,
    });

    if (!patient) {
      return NextResponse.json(
        {
          message: "Patient not found",
          session: session,
        },
        {
          status: 404,
        },
      );
    }

    const body = await req.json();

    const request = await consultationRequestService.create(patient.id, body);

    return NextResponse.json(request, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
