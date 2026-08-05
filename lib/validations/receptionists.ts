import { z } from "zod";

export const receptionistSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
});

export type ReceptionistSchema = z.infer<typeof receptionistSchema>;