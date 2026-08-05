import { z } from "zod";

export const consultationSchema = z.object({
  queueId: z.string().min(1),

  patientId: z.string().min(1),

  diagnosis: z.string().min(1, "Diagnosis is required"),

  clinicalNotes: z.string().optional(),

  prescription: z.string().optional(),
});

export type ConsultationSchema = z.infer<
  typeof consultationSchema
>;