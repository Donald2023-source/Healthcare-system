import { z } from "zod";

export const patientSchema = z.object({
  firstName: z.string().min(2, "First name is required"),

  middleName: z.string().optional(),

  lastName: z.string().min(2, "Last name is required"),

  email: z.string().email(),

  phoneNumber: z.string().min(11),

  gender: z.enum(["MALE", "FEMALE"]),

  dateOfBirth: z.coerce.date({
    required_error: "Date of birth is required",
  }),

  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),

  bloodGroup: z.string().optional(),

  genotype: z.string().optional(),

  maritalStatus: z.string().optional(),

  address: z.string().min(5),

  emergencyContactName: z.string().min(2),

  emergencyRelationship: z.string().min(1, "Relationship is required"),

  emergencyContactAddress: z.string().min(1, "Address is required"),

  emergencyContactPhone: z.string().min(11),
});

export type PatientSchema = z.infer<typeof patientSchema>;
