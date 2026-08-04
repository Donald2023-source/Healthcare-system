import { NextRequest, NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";
import patientService from "@/services/patient.service";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const query = req.nextUrl.searchParams.get("query") || "";

    const patients = await patientService.search(query);

    return NextResponse.json({
      success: true,
      data: patients,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
