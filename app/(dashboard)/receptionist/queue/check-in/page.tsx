"use client"
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { useState } from "react";

import PatientSearch from "../../components/PatientSearch";
import PatientTable from "../../components/PatientTable";

export default function CheckInPage() {
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState([]);

  

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Patient Check-In
          </h1>

          <p className="text-muted-foreground">
            Search for an existing patient to begin the check-in process.
          </p>
        </div>

        <Link
          href="/receptionist/patients/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
        >
          <UserPlus size={18} />
          Register Patient
        </Link>
      </div>

      {/* Search */}
      <PatientSearch value={searchValue} onChange={setSearchValue} />

      {/* Search Results */}
      <PatientTable patients={patients} />

      {/* Empty State */}
      <div className="rounded-lg border border-dashed p-10 text-center">
        <Search className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

        <h2 className="text-lg font-semibold">
          Search for a Patient
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Search using the patient's hospital number, name, or phone number.
        </p>
      </div>
    </div>
  );
}