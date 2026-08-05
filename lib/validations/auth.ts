import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),

  email: z.string().email(),

  phoneNumber: z.string().min(10),

  password: z.string().min(8),

  gender: z.enum(["MALE", "FEMALE"]),

  dateOfBirth: z.string(),

  bloodGroup: z.string().optional(),

  genotype: z.string().optional(),

  maritalStatus: z.string().optional(),

  address: z.string().min(5),

  emergencyContactName: z.string().min(2),

  emergencyContactPhone: z.string().min(10),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
