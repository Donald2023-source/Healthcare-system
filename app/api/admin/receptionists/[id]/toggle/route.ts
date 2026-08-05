import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import adminService from "@/services/admin.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: Request,
  { params }: Props
) {
  try {
    await connectDB();

    const { id } = await params;

    const receptionist =
      await adminService.toggleReceptionist(id);

    return NextResponse.json({
      message: "Receptionist status updated successfully.",
      data: receptionist,
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