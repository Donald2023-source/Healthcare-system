import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ConsultationRequestService from "@/services/consultation-request.service";

export async function GET() {
  await connectDB();

  const requests = await ConsultationRequestService.getPendingRequests();

  return NextResponse.json({
    data: requests,
  });
}
