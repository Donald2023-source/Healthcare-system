import Link from "next/link";
import { Plus } from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import queueService from "@/services/queue.service";
import { auth } from "@/auth";

export default async function QueuePage() {
  const db = await connectDB();
  const session = await auth();
  
  if (!session?.user?.id) {
    return null;
  }
  const queue = await queueService.getTodayQueue(session?.user?.id);

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

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">Queue</th>
              <th className="p-4 text-left">Hospital No.</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Checked In</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {queue?.map((item: any) => (
              <tr key={item._id} className="border-b">
                <td className="p-4">#{item.queueNumber}</td>

                <td className="p-4">{item.patient.hospitalNumber}</td>

                <td className="p-4">
                  {item.patient.user.firstName} {item.patient.user.lastName}
                </td>

                <td className="p-4">{item.department.name}</td>

                <td className="p-4">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </td>

                <td className="p-4">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
