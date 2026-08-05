import { z } from "zod";

export const doctorSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  department: z.string().min(1),
});

export type DoctorSchema = z.infer<typeof doctorSchema>;