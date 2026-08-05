import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";

import Patient from "@/models/Patients";

import consultationRequestService from "@/services/consultation-request.service";

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

    const consultations =
      await consultationRequestService.getPatientRequests(
        patient._id.toString()
      );

    return NextResponse.json(consultations);
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

export async function POST(req: Request) {
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

    const body = await req.json();

    const consultation =
      await consultationRequestService.create(
        patient._id.toString(),
        body
      );

    return NextResponse.json(consultation, {
      status: 201,
    });
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