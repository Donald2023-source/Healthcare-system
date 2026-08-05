"use client";

import Link from "next/link";
import { Search, UserPlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import PatientSearch from "../../components/PatientSearch";
import PatientTable from "../../components/PatientTable";
import { api } from "@/lib/api";
import { Patient } from "@/types/patient";

export default function CheckInPage() {
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadPatients(searchValue);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  async function loadPatients(search?: string) {
    try {
      setLoading(true);

      const url = search?.trim()
        ? `/api/patients/search?q=${encodeURIComponent(search)}`
        : "/api/patients";

      const data = await api<{ data: Patient[] }>(url);
      console.log(data);

      setPatients(data?.data || []);
    } catch (error) {
      console.error(error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Check-In</h1>

          <p className="mt-1 text-muted-foreground">
            Search and select a patient to begin the check-in process.
          </p>
        </div>

        <Link
          href="/receptionist/patients/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
        >
          <UserPlus size={18} />
          Register Patient
        </Link>
      </div>

      {/* Search */}
      <PatientSearch value={searchValue} onChange={setSearchValue} />

      {/* Table */}
      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="flex h-64 items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading patients...
          </div>
        ) : patients.length > 0 ? (
          <PatientTable patients={patients} />
        ) : (
          <div className="flex h-64 flex-col items-center justify-center">
            <Search className="mb-4 h-10 w-10 text-muted-foreground" />

            <h2 className="text-lg font-semibold">No Patients Found</h2>

            <p className="mt-2 text-center text-muted-foreground">
              {searchValue
                ? `No patient matched "${searchValue}".`
                : "There are no registered patients yet."}
            </p>

            <Link
              href="/receptionist/patients/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
            >
              <UserPlus size={18} />
              Register Patient
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
