"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import { usePatientSearch } from "@/hooks/usePatientSearch";

export default function PatientSearch() {
  const [query, setQuery] = useState("");

  const { data, isLoading } =
    usePatientSearch(query);

  return (
    <div className="space-y-5">

      <Input
        placeholder="Search patient..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />

      {isLoading && (
        <p>Searching...</p>
      )}

      {data?.map((patient: any) => (
        <div
          key={patient._id}
          className="rounded-lg border p-4"
        >
          <h3 className="font-semibold">
            {patient.user.firstName}{" "}
            {patient.user.lastName}
          </h3>

          <p>{patient.hospitalNumber}</p>

          <p>{patient.user.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
}