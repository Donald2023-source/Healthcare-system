"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

type DoctorRowProps = {
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    department?: {
      name: string;
    } | null;
    isActive: boolean;
  };
};

export default function DoctorRow({ doctor }: DoctorRowProps) {
  const router = useRouter();

  async function toggleStatus() {
    const response = await fetch(`/api/admin/doctors/${doctor._id}/toggle`, {
      method: "PATCH",
    });

    const result = await response.json();

    if (!response.ok) {
      toast.add({
        title: "Error",
        description: result.message,
        type: "error",
      });

      return;
    }

    toast.add({
      title: "Success",
      description: result.message,
      type: "success",
    });

    router.refresh();
  }

  return (
    <tr className="border-b">
      <td className="px-4 py-3">
        {doctor.firstName} {doctor.lastName}
      </td>

      <td className="px-4 py-3">{doctor.email}</td>

      <td className="px-4 py-3">{doctor.department?.name ?? "-"}</td>

      <td className="px-4 py-3">
        <Badge variant={doctor.isActive ? "default" : "secondary"}>
          {doctor.isActive ? "Active" : "Inactive"}
        </Badge>
      </td>

      <td className="px-4 py-3">
        <Button size="sm" variant="outline" onClick={toggleStatus}>
          {doctor.isActive ? "Deactivate" : "Activate"}
        </Button>
      </td>
    </tr>
  );
}
