import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import patientService from "@/services/patient.service";
import { patientSchema } from "@/lib/validations/patients";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const data = patientSchema.parse(body);

    const result = (await patientService.create(data)) as {
      patient?: {
        hospitalNumber?: string;
      };
    };

    return NextResponse.json(
      {
        message: "Patient registered successfully.",
        data: {
          hospitalNumber: result?.patient?.hospitalNumber,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
