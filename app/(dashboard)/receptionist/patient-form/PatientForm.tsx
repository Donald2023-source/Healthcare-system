"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  patientSchema,
  PatientSchema,
} from "@/lib/validations/patients";

import { Form } from "@/components/ui/form";

import StepIndicator from "./StepIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import ContactInfoStep from "./ContactInfoStep";

export default function PatientForm() {
  const [step, setStep] = useState(0);

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
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-5xl rounded-xl border bg-card p-8"
      >
        <StepIndicator currentStep={step} />

        <div className="min-h-[450px] rounded-lg border p-6">
          {step === 0 && (
            <ContactInfoStep form={form} />
          )}
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
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2 text-white"
            >
              Register Patient
            </button>
          )}
        </div>
      </form>
    </Form>
  );
}