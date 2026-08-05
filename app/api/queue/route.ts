import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import queueService from "@/services/queue.service";

export async function GET() {
  try {
    await connectDB();

    const queue = await queueService.getTodayQueue();

    return NextResponse.json({
      data: queue,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const queue = await queueService.checkIn(body);

    return NextResponse.json(
      {
        message: "Patient checked in successfully",
        data: queue,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}