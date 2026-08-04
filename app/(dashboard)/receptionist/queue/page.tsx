import Link from "next/link";
import { Plus, Users } from "lucide-react";

export default function QueuePage() {
  const queue = [
    {
      id: "1",
      queueNumber: 1,
      patient: "John Doe",
      hospitalNumber: "HSP000001",
      department: "General OPD",
      status: "WAITING",
      checkedInAt: "08:15 AM",
    },
    {
      id: "2",
      queueNumber: 2,
      patient: "Jane Smith",
      hospitalNumber: "HSP000002",
      department: "General OPD",
      status: "WAITING",
      checkedInAt: "08:25 AM",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Queue</h1>

          <p className="text-muted-foreground">
            Patients currently waiting for consultation.
          </p>
        </div>

        <Link
          href="/receptionist/queue/check-in"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
        >
          <Plus className="h-4 w-4" />
          Check In Patient
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 text-left">Queue</th>
              <th className="p-4 text-left">Hospital No.</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Checked In</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {queue.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="p-4 font-semibold">#{item.queueNumber}</td>

                <td className="p-4">{item.hospitalNumber}</td>

                <td className="p-4">{item.patient}</td>

                <td className="p-4">{item.department}</td>

                <td className="p-4">{item.checkedInAt}</td>

                <td className="p-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {item.status}
                  </span>
                </td>

                <td className="p-4">
                  <Link
                    href={`/receptionist/patients/${item.id}`}
                    className="text-primary hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {queue.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center">
                  <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

                  <p className="text-muted-foreground">
                    No patients are currently in the queue.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
