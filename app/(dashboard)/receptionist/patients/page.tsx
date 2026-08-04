"use client";

import { useEffect, useState } from "react";

import PatientSearch from "../components/PatientSearch";
import PatientTable from "../components/PatientTable";

import { Patient } from "@/types/patient";

import { api } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";

export default function PatientsPage() {
  const [query, setQuery] = useState("");

  const [patients, setPatients] = useState<
    Patient[]
  >([]);

  const debouncedQuery =
    useDebounce(query);

  useEffect(() => {
    async function search() {
      try {
        const result = await api<{
          data: Patient[];
        }>(
          `/api/receptionist/patients/search?query=${debouncedQuery}`
        );

        setPatients(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    search();
  }, [debouncedQuery]);

  return (
    <div className="space-y-6 p-6">
      <PatientSearch
        value={query}
        onChange={setQuery}
      />

      <PatientTable
        patients={patients}
      />
    </div>
  );
}