"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  consultationSchema,
  ConsultationSchema,
} from "@/lib/validations/consultation";

import { api } from "@/lib/api";
import { toast } from "@/components/ui/toast";

import { Form } from "@/components/ui/form";

import DiagnosisCard from "../../components/DiagnosisCard";

import PrescriptionCard from "../../components/PrescriptionCard";

export default function ConsultationPage() {
  const params = useParams();
  const router = useRouter();

  const queueId = params.queueId as string;

  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<any>(null);

  const form = useForm<ConsultationSchema>({
    resolver: zodResolver(consultationSchema),

    defaultValues: {
      queueId: "",
      patientId: "",
      diagnosis: "",
      clinicalNotes: "",
      prescription: "",
    },
  });

  useEffect(() => {
    loadQueue();
  }, []);

  async function loadQueue() {
    try {
      const response = await api<{
        data: any;
      }>(`/api/doctor/queue/${queueId}`);

      setPatient(response.data);

      form.setValue("queueId", response.data._id);

      form.setValue("patientId", response.data.patient._id);
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.message || "Unable to load patient.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: ConsultationSchema) {
    try {
      await api("/api/doctor/consultations", {
        method: "POST",
        body: JSON.stringify(values),
      });

      toast.add({
        title: "Success",
        description: "Consultation completed successfully.",
        type: "success",
      });

      router.push("/doctor/queue");
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.message || "Failed to complete consultation.",
        type: "error",
      });
    }
  }

  if (loading) {
    return <div className="p-8">Loading consultation...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {patient && (
        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-6 text-2xl font-semibold">Patient Information</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Hospital Number</p>

              <p className="font-medium">{patient.patient.hospitalNumber}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Patient Name</p>

              <p className="font-medium">
                {patient.patient.user.firstName}{" "}
                {patient.patient.user.middleName}{" "}
                {patient.patient.user.lastName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Gender</p>

              <p>{patient.patient.gender}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Department</p>

              <p>{patient.department.name}</p>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DiagnosisCard form={form} />

          <PrescriptionCard form={form} />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="rounded-lg bg-primary px-6 py-3 text-white"
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : "Complete Consultation"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
