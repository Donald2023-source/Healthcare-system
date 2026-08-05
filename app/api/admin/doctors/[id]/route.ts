import { NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";
import adminService from "@/services/admin.service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const doctor = await adminService.toggleDoctor(id);

    return NextResponse.json({
      message: "Doctor updated",
      data: doctor,
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
