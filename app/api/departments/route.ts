import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { auth } from "@/auth";

import Department from "@/models/Department";
import { UserRole } from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const departments = await Department.find({
      isActive: true,
    }).sort({
      name: 1,
    });

    return NextResponse.json({
      data: departments,
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

export async function POST(request: Request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const department = await Department.create(body);

    return NextResponse.json(
      {
        message: "Department created successfully",
        data: department,
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
