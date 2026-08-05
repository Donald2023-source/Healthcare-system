import { NextResponse } from "next/server";
import Doctor from "@/models/Doctor";
import User from "@/models/User";

export enum UserRole {
  ADMIN = "ADMIN",
  RECEPTIONIST = "RECEPTIONIST",
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  LAB_TECHNICIAN = "LAB_TECHNICIAN",
  PHARMACIST = "PHARMACIST",
  PATIENT = "PATIENT",
}
export async function GET() {
  try {
    const doctors = User.find({
      role: UserRole.DOCTOR,
    });

    return NextResponse.json({
      data: doctors,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch doctors",
      },
      {
        status: 500,
      },
    );
  }
}
