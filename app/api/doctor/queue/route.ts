import {connectDB} from "@/lib/mongodb";

import Queue, { QueueStatus } from "@/models/Queue";

export async function GET() {
  try {
    await connectDB();

    const queue = await Queue.find({
      status: QueueStatus.WAITING,
    })
      .populate({
        path: "patient",
        populate: {
          path: "user",
        },
      })
      .populate("department")
      .sort({
        createdAt: 1,
      });

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
      },
    );
  }
}
