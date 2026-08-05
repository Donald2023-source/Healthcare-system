"use client";

import { useEffect, useState } from "react";
import { Loader2, Eye } from "lucide-react";

import { api } from "@/lib/api";
import ConsultationModal from "../../components/ConsultationModal";

export default function ConsultationRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      setLoading(true);

      const res = await api<{ data: any[] }>("/api/receptionist/consultations");

      setRequests(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Pending Consultation Requests</h1>

      <div className="rounded-xl border">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="flex items-center justify-between border-b p-5"
            >
              <div>
                <h3 className="font-semibold">
                  {request.patient.user.fullName}
                </h3>

                <p>
                  Number:
                  {request.patient.hospitalNumber}
                </p>
              </div>

              <button
                onClick={() => setSelected(request)}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
              >
                <Eye size={18} />
                View
              </button>
            </div>
          ))
        )}
      </div>

      {selected && (
        <ConsultationModal
          request={selected}
          close={() => setSelected(null)}
          refresh={loadRequests}
        />
      )}
    </div>
  );
}
