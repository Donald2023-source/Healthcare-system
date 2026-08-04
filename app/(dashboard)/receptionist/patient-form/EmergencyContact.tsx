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

export default function EmergencyContactStep({
  form,
}: {
  form: UseFormReturn<PatientSchema>;
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">
        Emergency Contact
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="emergencyContactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Full Name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyRelationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g Father, Wife, Brother"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>

              <FormControl>
                <Input
                  placeholder="+234..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContactAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>

              <FormControl>
                <Input
                  placeholder="Contact Address"
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