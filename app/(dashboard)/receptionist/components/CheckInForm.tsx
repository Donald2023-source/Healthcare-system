"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

interface Department {
  _id: string;
  name: string;
}

export default function CheckInForm({
  patientId,
}: {
  patientId: string;
}) {
  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [departmentId, setDepartmentId] =
    useState("");

  useEffect(() => {
    async function load() {
      const result = await api<{
        data: Department[];
      }>("/api/departments");

      setDepartments(result.data);
    }

    load();
  }, []);

  async function checkIn() {
    await api("/api/receptionist/queue", {
      method: "POST",
      body: JSON.stringify({
        patientId,
        departmentId,
      }),
    });

    alert("Patient checked in successfully.");
  }

  return (
    <div className="max-w-lg rounded-lg border p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Check In Patient
      </h1>

      <select
        className="mb-6 w-full rounded border p-3"
        value={departmentId}
        onChange={(e) =>
          setDepartmentId(e.target.value)
        }
      >
        <option value="">
          Select Department
        </option>

        {departments.map((department) => (
          <option
            key={department._id}
            value={department._id}
          >
            {department.name}
          </option>
        ))}
      </select>

      <button
        onClick={checkIn}
        className="w-full rounded bg-primary py-3 text-white"
      >
        Check In Patient
      </button>
    </div>
  );
}