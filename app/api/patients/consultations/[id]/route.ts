import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";

import consultationRequestService from "@/services/consultation-request.service";

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

    const consultation =
      await consultationRequestService.findById(id);

    if (!consultation) {
      return NextResponse.json(
        {
          message: "Consultation not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(consultation);
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