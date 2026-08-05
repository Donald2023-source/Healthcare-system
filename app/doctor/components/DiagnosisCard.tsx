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

interface DiagnosisCardProps {
  form: UseFormReturn<ConsultationSchema>;
}

export default function DiagnosisCard({ form }: DiagnosisCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Diagnosis</h2>

      <FormField
        control={form.control}
        name="diagnosis"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diagnosis</FormLabel>

            <FormControl>
              <Textarea
                placeholder="Enter diagnosis..."
                className="p-3"
                rows={8}
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
