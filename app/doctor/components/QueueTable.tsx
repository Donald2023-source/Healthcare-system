"use client";
import Link from "next/link";

const queue = [
  {
    id: "1",
    queueNumber: 1,
    patient: "John Doe",
    hospitalNumber: "HSP000001",
    department: "General OPD",
  },
  {
    id: "2",
    queueNumber: 2,
    patient: "Jane Smith",
    hospitalNumber: "HSP000002",
    department: "General OPD",
  },
];

export default function QueueTable() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="p-4 text-left">Queue</th>
            <th className="p-4 text-left">Hospital No.</th>
            <th className="p-4 text-left">Patient</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {queue.map((patient) => (
            <tr key={patient.id} className="border-b">
              <td className="p-4">#{patient.queueNumber}</td>

              <td className="p-4">{patient.hospitalNumber}</td>

              <td className="p-4">{patient.patient}</td>

              <td className="p-4">{patient.department}</td>

              <td className="p-4">
                <Link
                  href={`/doctor/consultation/${patient.id}`}
                  className="rounded bg-primary px-3 py-2 text-white"
                >
                  Start Consultation
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
