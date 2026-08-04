"use client";

import { UseFormReturn } from "react-hook-form";
import { PatientSchema } from "@/lib/validations/patients";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  form: UseFormReturn<PatientSchema>;
}

export default function ContactInfoStep({ form }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>

            <FormControl>
              <Input
                placeholder="08012345678"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Residential Address</FormLabel>

            <FormControl>
              <Textarea
                rows={4}
                placeholder="Patient's residential address..."
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