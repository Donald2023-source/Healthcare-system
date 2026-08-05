"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  doctorSchema,
  DoctorSchema,
} from "@/lib/validations/doctors";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddDoctorPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<DoctorSchema>({
    resolver: zodResolver(doctorSchema),
  });

  async function onSubmit(values: DoctorSchema) {
    console.log("Submitting form with values:");
    try {
      const response = await fetch(
        "/api/admin/doctors",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.add({
        title: "Success",
        description:
          "Doctor created successfully.",
      });

      router.push("/admin/doctors");
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.message,
        type: "error",
      });
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Doctor
        </h1>

        <p className="text-muted-foreground">
          Create a new doctor account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl border bg-card p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            First Name
          </label>

          <Input
            {...register("firstName")}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.firstName?.message}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Last Name
          </label>

          <Input
            {...register("lastName")}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.lastName?.message}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            {...register("email")}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <Input
            {...register("phoneNumber")}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.phoneNumber?.message}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Department
          </label>

          <select
            {...register("department")}
            className="w-full rounded-lg border bg-background p-2"
          >
            <option value="">
              Select Department
            </option>

            <option value="General OPD">
              General OPD
            </option>
            <option value="pharmacy">
              Phaarmacy
            </option>

            <option value="Paediatrics">
              Paediatrics
            </option>

            <option value="Emergency">
              Emergency
            </option>

            <option value="Radiology">
              Radiology
            </option>
          </select>

          <p className="mt-1 text-sm text-red-500">
            {errors.department?.message}
          </p>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating..."
            : "Create Doctor"}
        </Button>
      </form>
    </div>
  );
}