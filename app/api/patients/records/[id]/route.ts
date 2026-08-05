import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";

import consultationService from "@/services/consultation.service";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
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

    const { id } = await params;

    const record =
      await consultationService.findById(id);

    if (!record) {
      return NextResponse.json(
        {
          message: "Record not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(record);
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