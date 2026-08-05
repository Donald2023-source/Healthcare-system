"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Calendar,
  Stethoscope,
  Clipboard,
  Pill,
  UserRound,
} from "lucide-react";

import { api } from "@/lib/api";

type Consultation = {
  diagnosis: string;
  clinicalNotes: string;
  prescription: string;
  consultationDate: string;

  doctor: {
    firstName: string;
    lastName: string;
  };
};

export default function ConsultationDetailsPage() {
  const params = useParams();

  const [consultation, setConsultation] =
    useState<Consultation | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultation();
  }, []);

  async function loadConsultation() {
    try {
      const response = await api<{
        data: Consultation;
      }>(`/api/patient/consultations/${params.id}`);

      setConsultation(response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="p-6">
        Consultation not found.
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5">
      <div>
        <h1 className="text-3xl font-bold">
          Consultation
        </h1>

        <p className="text-muted-foreground">
          Consultation summary
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="mb-4 flex items-center gap-3">
          <Stethoscope className="text-primary" />

          <h2 className="font-semibold">
            Diagnosis
          </h2>
        </div>

        <p>{consultation.diagnosis}</p>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="mb-4 flex items-center gap-3">
          <Clipboard className="text-primary" />

          <h2 className="font-semibold">
            Clinical Notes
          </h2>
        </div>

        <p className="whitespace-pre-wrap">
          {consultation.clinicalNotes}
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="mb-4 flex items-center gap-3">
          <Pill className="text-primary" />

          <h2 className="font-semibold">
            Prescription
          </h2>
        </div>

        <p className="whitespace-pre-wrap">
          {consultation.prescription}
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-5 space-y-4">
        <div className="flex items-center gap-3">
          <UserRound className="text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">
              Doctor
            </p>

            <p className="font-medium">
              Dr. {consultation.doctor.firstName}{" "}
              {consultation.doctor.lastName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">
              Consultation Date
            </p>

            <p>
              {new Date(
                consultation.consultationDate
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}