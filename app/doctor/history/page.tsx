"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Consultation = {
  _id: string;

  diagnosis: string;

  clinicalNotes?: string;

  prescription?: string;

  consultationDate: string;

  patient: {
    hospitalNumber: string;

    user: {
      firstName: string;
      lastName: string;
    };
  };
};

export default function DoctorHistoryPage() {
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
      }>("/api/doctor/history");

      setConsultations(response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading history...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Consultation History
        </h1>

        <p className="text-muted-foreground">
          View all completed consultations.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full">
          <thead className="border-b bg-muted">
            <tr>
              <th className="p-4 text-left">
                Hospital No.
              </th>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Diagnosis
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {consultations.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-muted-foreground"
                >
                  No consultations found.
                </td>
              </tr>
            ) : (
              consultations.map((consultation) => (
                <tr
                  key={consultation._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {
                      consultation.patient
                        .hospitalNumber
                    }
                  </td>

                  <td className="p-4 font-medium">
                    {
                      consultation.patient.user
                        .firstName
                    }{" "}
                    {
                      consultation.patient.user
                        .lastName
                    }
                  </td>

                  <td className="max-w-sm truncate p-4">
                    {consultation.diagnosis}
                  </td>

                  <td className="p-4">
                    {new Date(
                      consultation.consultationDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <button className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}