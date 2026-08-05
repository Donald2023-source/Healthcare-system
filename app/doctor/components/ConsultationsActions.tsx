"use client";

import { useRouter } from "next/navigation";

import { UseFormReturn } from "react-hook-form";

import { ConsultationSchema } from "@/lib/validations/consultation";

import { api } from "@/lib/api";

import { toast } from "@/components/ui/toast";

export default function ConsultationActions({
  form,
}: {
  form: UseFormReturn<ConsultationSchema>;
}) {
  const router = useRouter();

  async function onSubmit(
    values: ConsultationSchema
  ) {
    try {
      await api("/api/doctor/consultations", {
        method: "POST",
        body: JSON.stringify(values),
      });

      toast.add({
        title: "Consultation completed.",
        type: "success",
      });

      router.push("/doctor");
    } catch (error: any) {
      toast.add({
        title: error.message,
        type: "error",
      });
    }
  }

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={form.handleSubmit(onSubmit)}
        className="rounded-lg cursor-pointer bg-primary px-6 py-2 text-white"
      >
        Complete Consultation
      </button>
    </div>
  );
}