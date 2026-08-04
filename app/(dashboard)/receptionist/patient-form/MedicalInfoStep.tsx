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

export default function MedicalInfoStep({
  form,
}: {
  form: UseFormReturn<PatientSchema>;
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">
        Medical Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g A+"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genotype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genotype</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g AA"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Known Allergies</FormLabel>

              <FormControl>
                <Input
                  placeholder="Optional"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medicalConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical Conditions</FormLabel>

              <FormControl>
                <Input
                  placeholder="Optional"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}