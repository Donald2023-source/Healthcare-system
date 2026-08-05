import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import adminService from "@/services/admin.service";

const service = adminService as any;

export async function GET() {
  try {
    await connectDB();

    const doctors = await service.getDoctors();

    return NextResponse.json({
      data: doctors,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const doctor = await adminService.createDoctor(body);

    return NextResponse.json(
      {
        message: "Doctor created successfully",
        data: doctor,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
