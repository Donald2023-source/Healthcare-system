import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import consultationService from "@/services/consultation.service";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const consultation = await consultationService.findById(id);

    if (!consultation) {
      return Response.json(
        {
          message: "Consultation not found.",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      data: consultation,
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
