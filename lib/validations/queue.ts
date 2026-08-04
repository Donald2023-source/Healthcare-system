import { z } from "zod";

export const checkInSchema = z.object({
  patientId: z.string().min(1),
  departmentId: z.string().min(1),

  doctorId: z.string().optional(),

  visitType: z.enum([
    "WALK_IN",
    "APPOINTMENT",
    "FOLLOW_UP",
    "EMERGENCY",
    "REFERRAL",
  ]),

  priority: z.enum([
    "NORMAL",
    "URGENT",
    "EMERGENCY",
  ]),

  notes: z.string().optional(),
});

export type CheckInSchema = z.infer<typeof checkInSchema>;