import { NextRequest } from "next/server";

import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";

import consultationService from "@/services/consultation.service";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const history = await consultationService.getDoctorHistory(session.user.id);

    return Response.json({
      data: history,
    });
  } catch (error: any) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
