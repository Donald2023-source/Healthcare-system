"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";

type QueueItem = {
  _id: string;

  queueNumber: number;

  patient: {
    hospitalNumber: string;

    gender: string;

    user: {
      firstName: string;
      lastName: string;
    };
  };

  department: {
    name: string;
  };

  createdAt: string;
};

export default function DoctorQueuePage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQueue();
  }, []);

  async function loadQueue() {
    try {
      const response = await api<{
        data: QueueItem[];
      }>("/api/doctor/queue");

      setQueue(response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading queue...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Patient Queue
        </h1>

        <p className="text-muted-foreground">
          Patients waiting for consultation.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">
                Queue
              </th>

              <th className="p-4 text-left">
                Hospital No.
              </th>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Gender
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {queue.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-muted-foreground"
                >
                  No patients in queue.
                </td>
              </tr>
            ) : (
              queue.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                >
                  <td className="p-4">
                    #{item.queueNumber}
                  </td>

                  <td className="p-4">
                    {item.patient.hospitalNumber}
                  </td>

                  <td className="p-4">
                    {item.patient.user.firstName}{" "}
                    {item.patient.user.lastName}
                  </td>

                  <td className="p-4">
                    {item.patient.gender}
                  </td>

                  <td className="p-4">
                    {item.department.name}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/doctor/consultation/${item._id}`}
                      className="rounded-lg bg-primary px-4 py-2 text-white"
                    >
                      Start Consultation
                    </Link>
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