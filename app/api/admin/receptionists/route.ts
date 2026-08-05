import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import adminService from "@/services/admin.service";

export async function GET() {
  try {
    await connectDB();

    const receptionists = await adminService.getReceptionists();

    return NextResponse.json({
      data: receptionists,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const receptionist =
      await adminService.createReceptionist(body);

    return NextResponse.json(
      {
        message: "Receptionist created successfully",
        data: receptionist,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}