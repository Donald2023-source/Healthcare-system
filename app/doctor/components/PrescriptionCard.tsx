"use client";

import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import { ConsultationSchema } from "@/lib/validations/consultation";

interface PrescriptionCardProps {
  form: UseFormReturn<ConsultationSchema>;
}

export default function PrescriptionCard({ form }: PrescriptionCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Prescription</h2>

      <FormField
        control={form.control}
        name="prescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prescription</FormLabel>

            <FormControl>
              <Textarea
                rows={5}
                placeholder="Write medications, dosage and duration..."
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
