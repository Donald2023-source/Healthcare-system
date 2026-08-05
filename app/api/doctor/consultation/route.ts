import { NextRequest } from "next/server";

import { auth } from "@/auth";

import {connectDB} from "@/lib/mongodb";

import consultationService from "@/services/consultation.service";

import { consultationSchema } from "@/lib/validations/consultation";

export async function POST(req: NextRequest) {
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
        }
      );
    }

    const body = await req.json();

    const validated =
      consultationSchema.parse(body);

    const consultation =
      await consultationService.create(
        session.user.id,
        validated
      );

    return Response.json(
      {
        message:
          "Consultation completed successfully.",

        data: consultation,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return Response.json(
      {
        message:
          error.message ||
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}