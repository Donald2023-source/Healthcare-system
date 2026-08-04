"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { patientSchema, PatientSchema } from "@/lib/validations/patients";
import { toast } from "@/components/ui/toast";
import { Form } from "@/components/ui/form";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import StepIndicator from "./StepIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import ContactInfoStep from "./ContactInfoStep";
import MedicalInfoStep from "./MedicalInfoStep";
import EmergencyContactStep from "./EmergencyContact";
import ReviewStep from "./ReviewStep";

export default function PatientForm() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const form = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),

    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "MALE",
      address: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  async function onSubmit(values: PatientSchema) {
    console.log("Submitting patient form:", values);
    try {
      const response = await api<{
        message: string;
        data: {
          hospitalNumber: string;
          temporaryPassword: string;
        };
      }>("/api/receptionist/patients", {
        method: "POST",
        body: JSON.stringify(values),
      });

      toast.add({
        title: response.message,
        description: `Patient registered successfully. Hospital Number: ${response.data.hospitalNumber}. Temporary Password: ${response.data.temporaryPassword}`,
        type: "success",
      });

      router.push(
        `/receptionist/patients/success?hospitalNumber=${response.data.hospitalNumber}`,
      );
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.message || "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Validation Errors:", errors);
        })}
        className="mx-auto max-w-5xl rounded-xl border bg-card p-8"
      >
        <StepIndicator currentStep={step} />

        <div className="min-h-[450px] rounded-lg border p-6">
          {step === 0 && <PersonalInfoStep form={form} />}
          {step === 1 && <ContactInfoStep form={form} />}

          {step === 2 && <MedicalInfoStep form={form} />}

          {step === 3 && <EmergencyContactStep form={form} />}
          {step === 4 && <ReviewStep form={form} />}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-lg border px-5 py-2"
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="rounded-lg bg-primary px-5 py-2 text-white"
            >
              Next
            </button>
          ) : (
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="rounded-lg cursor-pointer bg-primary px-5 py-2 text-white"
            >
              {form.formState.isSubmitting
                ? "Registering..."
                : "Register Patient"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
