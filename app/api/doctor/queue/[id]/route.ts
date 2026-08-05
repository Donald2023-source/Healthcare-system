import { NextRequest } from "next/server";

import {connectDB} from "@/lib/mongodb";
import Queue from "@/models/Queue";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    const queue = await Queue.findById(id)
      .populate({
        path: "patient",
        populate: {
          path: "user",
        },
      })
      .populate("department");

    if (!queue) {
      return Response.json(
        {
          message: "Queue record not found.",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      data: queue,
    });
  } catch (error: any) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}