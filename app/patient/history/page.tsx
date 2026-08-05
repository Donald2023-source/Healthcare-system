"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FileText, Calendar, ChevronRight } from "lucide-react";

import { api } from "@/lib/api";

type Consultation = {
  _id: string;
  diagnosis: string;
  consultationDate: string;

  doctor: {
    firstName: string;
    lastName: string;
  };
};

export default function PatientHistoryPage() {
  const [consultations, setConsultations] = useState<
    Consultation[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const response = await api<{
        data: Consultation[];
      }>("/api/patient/consultations");

      setConsultations(response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 p-5">
      <div>
        <h1 className="text-3xl font-bold">
          Consultation History
        </h1>

        <p className="text-muted-foreground">
          Your previous consultations
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          Loading...
        </div>
      ) : consultations.length === 0 ? (
        <div className="rounded-2xl border bg-card p-8 text-center">
          <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

          <p className="font-medium">
            No consultations yet
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Your completed consultations
            will appear here.
          </p>
        </div>
      ) : (
        consultations.map((consultation) => (
          <Link
            key={consultation._id}
            href={`/patient/history/${consultation._id}`}
            className="block rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold">
                  {consultation.diagnosis}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Dr.{" "}
                  {
                    consultation.doctor
                      .firstName
                  }{" "}
                  {
                    consultation.doctor
                      .lastName
                  }
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />

                  {new Date(
                    consultation.consultationDate
                  ).toLocaleDateString()}
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        ))
      )}
    </div>
  );
}