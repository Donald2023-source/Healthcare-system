"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ConsultationModal({ request, close, refresh }: any) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    const res = await api<{ data: any[] }>(`/api/receptionist/doctor`);

    setDoctors(res.data);
  }

  async function assign() {
    try {
      setLoading(true);

      await api(`/api/receptionist/consultations/${request._id}/assign`, {
        method: "PATCH",
        body: JSON.stringify({
          doctorId: doctor,
          consultationDate: appointmentDate,
          consultationTime: appointmentTime,
        }),
      });

      await refresh();
      close();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg space-y-5 rounded-xl bg-white p-6">
        <h2 className="text-xl font-bold">Patient Details</h2>

        <div className="space-y-2 text-sm">
          <p>
            Name:{" "}
            <b>
              {request.patient?.user.firstName} {request.patient?.user.lastName}
            </b>
          </p>

          <p>Phone: {request.patient?.user.phoneNumber}</p>

          <p>Reason: {request.reason}</p>

          <p>Department: {request.department.name}</p>
        </div>
        <h3 className="font-semibold">Appointment Schedule</h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            className="rounded-lg border p-3"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />

          <input
            type="time"
            className="rounded-lg border p-3"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
        </div>
        <h3 className="font-semibold">Assign Doctor</h3>

        <select
          className="w-full rounded-lg border p-3"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>

          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              Dr. {doc.firstName} {doc.lastName}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={close} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            disabled={!doctor || loading}
            onClick={assign}
            className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign Doctor"}
          </button>
        </div>
      </div>
    </div>
  );
}
