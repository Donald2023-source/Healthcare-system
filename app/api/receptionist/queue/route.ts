import { NextRequest, NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";
import queueService from "@/services/queue.service";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const queue =
      await queueService.checkIn(
        body.patientId,
        body.departmentId
      );

    return NextResponse.json({
      message: "Patient checked in successfully.",
      data: queue,
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