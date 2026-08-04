import { NextRequest, NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";

import queueService from "@/services/queue.service";

import { checkInSchema } from "@/lib/validations/queue";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validated =
      checkInSchema.parse(body);

    const queue =
      await queueService.checkIn(
        validated as Parameters<(typeof queueService)["checkIn"]>[0]
      );

    return NextResponse.json(
      {
        success: true,
        message: "Patient checked in successfully.",
        data: queue,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}